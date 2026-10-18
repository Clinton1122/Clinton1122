"""Builds the Milestone 2 pages.

Each file in src/pages/ is a page template. These placeholders are filled in:
{{BASE_CSS}} {{SPRITE}} {{HEADER}} {{FOOTER}} {{BASE_JS}} {{BOOKING_CSS}} {{BOOKING_JS}}
{{TOOLS_CSS}} {{TOOLS_JS}} {{IMG}} {{IMG2}}

Writes <name>.html (photos linked from ../ceylon-traveller-dashboard/img/)
and Ceylon-<Name>.html (single file, photos embedded) next to this folder.
Run: python3 src/build.py
"""
import base64, os, re, shutil, subprocess, sys, tempfile
SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(SRC)
IMGDIR = os.path.join(OUT, '..', 'ceylon-traveller-dashboard', 'img')
IMG = '../ceylon-traveller-dashboard/img/'
# photos added for Milestone 2 only live here, so the dashboard folder is left alone
IMG2DIR = os.path.join(OUT, 'assets', 'img')
IMG2 = 'assets/img/'
srcof = lambda u: next((os.path.join(d, u + '.jpg') for d in (IMGDIR, IMG2DIR) if os.path.exists(os.path.join(d, u + '.jpg'))), None)
part = lambda n: open(os.path.join(SRC, n)).read()

PAGES = [f[:-5] for f in sorted(os.listdir(os.path.join(SRC, 'pages')))]
standalone = lambda n: 'Ceylon-%s.html' % n.replace('-', ' ').title().replace(' ', '-')

TOOL_SHELL = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} | Ceylon Nooks trip tools</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
{{{{BASE_CSS}}}}
{{{{TOOLS_CSS}}}}
{css}
</style>
</head>
<body>
{{{{SPRITE}}}}
{{{{HEADER}}}}
<div class="tripbar" id="tripbar"></div>
<section class="thero"><div class="wrap">
  <nav class="tcrumbs" aria-label="Breadcrumb"><a href="homepage.html">Home</a><svg class="i"><use href="#i-chev"/></svg><a href="tools.html">Trip tools</a><svg class="i"><use href="#i-chev"/></svg><span aria-current="page">{title}</span></nav>
  <span class="ic"><svg class="i"><use href="#i-{icon}"/></svg></span>
  <h1>{h1}</h1>
  <p class="lede">{lede}</p>
  <span class="shares"><svg class="i"><use href="#i-route"/></svg>{shares}</span>
</div></section>
<main class="wrap">
{body}
  <section class="next-tools" aria-labelledby="nt-h"><h2 id="nt-h">Keep planning</h2><div class="tgrid" id="next-tools"></div>
  <div class="bookcta"><span><h3>{cta_h}</h3><p>{cta_p}</p></span><a class="btn primary" href="category.html">Browse tours</a></div></section>
</main>
{{{{FOOTER}}}}
<script>
{{{{BASE_JS}}}}
{{{{TOOLS_JS}}}}
/* ================= {title} ================= */
if('{slug}'!=='tool-quiz')markUsed('{slug}');nextTools('{slug}');
{js}
</script>
</body>
</html>
'''

def tool_page(src, name):
    head, rest = src.split('-->', 1)
    meta = dict(l.split(':', 1) for l in head.replace('<!--TOOL', '').strip().splitlines())
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    grab = lambda tag: (re.search(r'<%s>(.*?)</%s>' % (tag, tag), rest, re.S) or [None, ''])[1]
    meta.setdefault('h1', meta['title'])
    meta.setdefault('shares', 'Uses your trip')
    meta.setdefault('cta_h', 'Ready to book something?')
    meta.setdefault('cta_p', 'Tours and activities run by local hosts, with free cancellation on most.')
    return TOOL_SHELL.format(css=grab('style'), body=grab('main'), js=grab('script'), slug=name, **meta)

def photo(u):
    """Photo bytes for a standalone page: large photos are resized to 1200 px and recompressed
    (ImageMagick, if installed) so that each single-file page stays small."""
    src = srcof(u)
    if os.path.getsize(src) < 120000 or not shutil.which('convert'):
        return open(src, 'rb').read()
    out = os.path.join(tempfile.gettempdir(), 'cn-photo-' + u + '.jpg')
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        subprocess.run(['convert', src, '-resize', '1200x1200>', '-strip', '-quality', '70', out], check=True)
    return open(out, 'rb').read()

def build(name):
    s = part(os.path.join('pages', name + '.html'))
    if s.startswith('<!--TOOL'):
        s = tool_page(s, name)
    for k, f in [('TOOLS_CSS', 'tools.css'), ('TOOLS_JS', 'tools.js'), ('BOOKING_CSS', 'booking.css'), ('BOOKING_JS', 'booking.js'), ('BASE_CSS', 'base.css'), ('SPRITE', 'sprite.svg'), ('HEADER', 'header.html'), ('FOOTER', 'footer.html'), ('BASE_JS', 'base.js')]:
        s = s.replace('{{%s}}' % k, part(f))
    s = s.replace('{{IMG2}}', IMG2).replace('{{IMG}}', IMG)
    open(os.path.join(OUT, name + '.html'), 'w').write(s)
    # standalone: inline every photo the page names
    used = sorted(set(re.findall(r"[a-z0-9\-]+(?=\.jpg)", s)))
    imgs = {u: base64.b64encode(photo(u)).decode() for u in used if srcof(u)}
    st = re.sub('(?:' + re.escape(IMG) + '|' + re.escape(IMG2) + r')([a-z0-9\-]+)\.jpg', lambda m: 'data:image/jpeg;base64,' + imgs[m.group(1)], s)
    # photos built in script (IMG + name + '.jpg') resolve through a lookup
    st = st.replace("const IMG='%s';" % IMG, "const IMG='';const IMGS=%s;" % ('{' + ','.join('"%s":"data:image/jpeg;base64,%s"' % (k, v) for k, v in imgs.items()) + '}'))
    # standalone pages link to each other's standalone copies
    for n in PAGES:
        st = re.sub(r'(["\'])%s\.html' % re.escape(n), lambda m: m.group(1) + standalone(n), st)
    st = st.replace("const pageUrl=s=>s+'.html';", "const pageUrl=s=>'Ceylon-'+s.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join('-')+'.html';")
    st = st.replace('../ceylon-traveller-dashboard/index.html', '../ceylon-traveller-dashboard/Ceylon-Traveller-Dashboard.html')
    open(os.path.join(OUT, standalone(name)), 'w').write(st)
    print(name, round(len(s) / 1e3), 'KB,', 'standalone', round(len(st) / 1e6, 1), 'MB')

for n in (sys.argv[1:] or PAGES):
    build(n)
