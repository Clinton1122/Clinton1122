"""Builds the Milestone 2 pages.

Each file in src/pages/ is a page template. These placeholders are filled in:
{{BASE_CSS}} {{SPRITE}} {{HEADER}} {{FOOTER}} {{BASE_JS}} {{IMG}}

Writes <name>.html (photos linked from ../ceylon-traveller-dashboard/img/)
and Ceylon-<Name>.html (single file, photos embedded) next to this folder.
Run: python3 src/build.py
"""
import base64, os, re, sys
SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(SRC)
IMGDIR = os.path.join(OUT, '..', 'ceylon-traveller-dashboard', 'img')
IMG = '../ceylon-traveller-dashboard/img/'
part = lambda n: open(os.path.join(SRC, n)).read()

def build(name):
    s = part(os.path.join('pages', name + '.html'))
    for k, f in [('BASE_CSS', 'base.css'), ('SPRITE', 'sprite.svg'), ('HEADER', 'header.html'), ('FOOTER', 'footer.html'), ('BASE_JS', 'base.js')]:
        s = s.replace('{{%s}}' % k, part(f))
    s = s.replace('{{IMG}}', IMG)
    open(os.path.join(OUT, name + '.html'), 'w').write(s)
    # standalone: inline every photo the page names
    used = sorted(set(re.findall(r"[a-z0-9\-]+(?=\.jpg)", s)))
    imgs = {u: base64.b64encode(open(os.path.join(IMGDIR, u + '.jpg'), 'rb').read()).decode() for u in used if os.path.exists(os.path.join(IMGDIR, u + '.jpg'))}
    st = re.sub(re.escape(IMG) + r'([a-z0-9\-]+)\.jpg', lambda m: 'data:image/jpeg;base64,' + imgs[m.group(1)], s)
    # photos built in script (IMG + name + '.jpg') resolve through a lookup
    st = st.replace("const IMG='%s';" % IMG, "const IMG='';const IMGS=%s;" % ('{' + ','.join('"%s":"data:image/jpeg;base64,%s"' % (k, v) for k, v in imgs.items()) + '}'))
    title = name.replace('-', ' ').title().replace(' ', '-')
    open(os.path.join(OUT, 'Ceylon-%s.html' % title), 'w').write(st)
    print(name, round(len(s) / 1e3), 'KB,', 'standalone', round(len(st) / 1e6, 1), 'MB')

for n in (sys.argv[1:] or [f[:-5] for f in sorted(os.listdir(os.path.join(SRC, 'pages')))]):
    build(n)
