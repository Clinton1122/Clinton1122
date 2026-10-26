"""Build the white + pink version of the Ashmore pages from the approved dark file.
Usage: python3 build_light.py   (writes ashmore-direction-6-light.html and its standalone copy)"""
import re, base64

SRC, OUT = 'ashmore-direction-6.html', 'ashmore-direction-6-light.html'
s = open(SRC).read()

LIGHT = """:root{
  --bg:#FFFFFF;
  --bg-2:#FDF0F1;
  --ink:#241E1D;
  --mute:#6B5E5B;
  --hair:#EBDCDC;
  --coral:#F58D94;        /* brand coral: surfaces + large display accents */
  --coral-text:#A93F49;   /* deep coral for small text on white (AA) */
  --on-coral:#1B1413;
  --on-coral-mute:#5A3437;
  --lace-on-coral:#E77880;
  --lace-dark:#F6DCDE;
  --tbc:#8A5A12;
  --tbc-bg:#FBEBC8;
  --focus:#A93F49;
"""
a = s.index(':root{'); b = s.index('\n\n  --display:', a)
s = s[:a] + LIGHT.rstrip('\n') + s[b:]
s = s.replace('  color-scheme:dark;\n}', '  color-scheme:light;\n}', 1)
s = s.replace('<title>Ashmore Dentistry Direction Six</title>', '<title>Ashmore Dentistry Direction Six Light</title>')

# The hero photo stays a dark, photographic moment: re-scope its tokens so text over the
# verandah ceiling keeps its contrast while the rest of the page is white and pink.
s = s.replace('.hero{position:relative;overflow:hidden;background:var(--bg)}',
  '.hero{position:relative;overflow:hidden;--bg:#161211;--bg-2:#1F1918;--ink:#F4E9E6;--mute:#B3A39F;--hair:#332927;--coral-text:#FCB4B9;--focus:#FCB4B9;background:var(--bg);color:var(--ink)}')
assert '--bg:#161211;--bg-2' in s

# Dark wordmark on the white nav
s = s.replace('img/ashmore-logo-light.png', 'img/ashmore-logo-dark.png')
# Light-theme details
s = s.replace('.btn-dark:hover{background:#3A2A29}', '.btn-dark:hover{background:#4A3A37}')
s = s.replace('.more textarea::placeholder{color:#8C7D79}', '.more textarea::placeholder{color:#8F817E}')
# Team cards: white cards on the pink section, with a hairline so they read as objects
s = s.replace('.card{flex:0 0 clamp(15.5rem,22vw,18.5rem);scroll-snap-align:start;background:var(--bg);',
              '.card{flex:0 0 clamp(15.5rem,22vw,18.5rem);scroll-snap-align:start;background:var(--bg);border:1px solid var(--hair);')

# Buttons on coral keep light text (the ink token is dark in this theme)
s = s.replace('.btn-dark{background:var(--on-coral);color:var(--ink)}', '.btn-dark{background:var(--on-coral);color:#FBF1EC}')
assert 'color:#FBF1EC}' in s
# Large pink display text on white/pink: brand coral is only 2.3:1 here, so use a deeper pink (4.1:1)
extra = """
/* light theme: pink display text deep enough to read on white and soft pink */
:root{--coral-display:#D6505C}
.ap-hero h1 em,.hv h2 em,.ab-head h1 em,.story-row > b,.book-copy h2 em,.inside-h em,.tgroup.calm-group h2,.t-row.calm-row h3,.t-row:hover h3,.steps li::before,.names li::after,.tx-group,.ask-row:has(input:checked) b{color:var(--coral-display)}
.more-head h2 em{color:var(--coral-display)!important}
.ask-row input:checked{background:var(--coral-display);border-color:var(--coral-display)}
"""
k = s.index('</style>'); s = s[:k] + extra + s[k:]
open(OUT, 'w').write(s)

# Standalone copy with images embedded
t = re.sub(r'img/[\w/-]+\.(?:jpg|png)', lambda m: 'data:%s;base64,%s' % ('image/png' if m.group(0).endswith('png') else 'image/jpeg', base64.b64encode(open(m.group(0), 'rb').read()).decode()), s)
i = t.index('</style>') + 8
open(OUT.replace('.html', '-standalone.html'), 'w').write('<!doctype html>\n<html lang="en-AU">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + t[:i] + '\n</head>\n<body>\n' + t[i:].strip() + '\n</body>\n</html>\n')
print('built', OUT)
