"""Build design/home.html (v4) from design/src/v4-home.html.

Portable models use the real studio shots on the clay backdrop. The web product
photos on the live site (wooden table, offices) look computer-generated; the
heavy-duty range has no real photo yet, so those cards keep the site's current
images until a shoot is done.
Run: python3 design/src/build_v4.py
"""
import json, pathlib
from build_v3 import MODELS, CHIPS, WA, naira, IK

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent

REAL = {0: 'LEH_2765.jpg', 1: 'LEH_2756.jpg', 2: 'LEH_2753.jpg', 3: 'LEH_2745.jpg', 4: 'LEH_2747.jpg'}
for m in MODELS:
    if m['i'] in REAL:
        m['img'] = f'{IK}{REAL[m["i"]]}?tr=w-900'


def box(m):
    pick = ' pick' if m['i'] == 3 else ''
    return (f'<a class="box{pick}" href="#" data-i="{m["i"]}"><div class="ph"><img src="{m["img"]}" alt="Lumey {m["name"]}" width="900" height="900" loading="lazy"></div>'
            f'<div class="body"><div class="mark"><img src="{{MARK_B}}" alt="" width="30" height="16"><span class="label">{m["tag"]}</span></div>'
            f'<h4>{m["name"]}</h4><p class="spec">{m["spec"]}</p><p class="runs">{m["runs"]}</p>'
            f'<div class="prices"><b class="num">{naira(m["box"])}</b><span>or {naira(m["bundle"])} with panels</span></div></div></a>')


def build():
    html = (SRC / 'v4-home.html').read_text()
    reps = {
        '{CARDS_PORT}': ''.join(box(m) for m in MODELS[:5]),
        '{CARDS_HEAVY}': ''.join(box(m) for m in MODELS[5:]),
        '{CHIPS}': ''.join(f'<li><button class="chip" type="button" data-need="{n}" aria-pressed="{str(on).lower()}">{t}</button></li>' for t, n, on in CHIPS),
        '{OPTIONS}': ''.join(f'<option value="{m["i"]}"{" selected" if m["i"] == 3 else ""}>{m["name"]} with panels, {naira(m["bundle"])}</option>' for m in MODELS),
        '{MODELS}': json.dumps([{k: m[k] for k in ('i', 'name', 'box', 'bundle', 'why')} | {'img': m['img'].replace('w-900', 'w-1000')} for m in MODELS], ensure_ascii=False),
        '{IMG_2600}': MODELS[3]['img'].replace('w-900', 'w-1000'),
        '{WA}': WA,
    }
    for k, v in reps.items():
        html = html.replace(k, v)
    html = html.replace('{MARK_B}', (OUT / 'assets/lumey-mark-black.png.b64').read_text())
    html = html.replace('{MARK_Y}', (OUT / 'assets/lumey-mark-yellow.png.b64').read_text())
    assert '{MARK' not in html and '{WA}' not in html and '{CARDS' not in html
    (OUT / 'home.html').write_text(html)
    print('built', OUT / 'home.html', len(html) // 1024, 'KB')


if __name__ == '__main__':
    build()
