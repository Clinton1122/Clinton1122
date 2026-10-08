"""Assemble the standalone HTML view files in design/ from design/src/.

Each output file is self-contained (CSS inlined) so it opens on its own.
Run:  python3 design/src/build.py
"""
import json, pathlib, re
from scene import build as scene_svg

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent

# Prices and specs: Lumey Website PRD (pricing sheet and flyer).
MODELS = [
    dict(i=0, slug='powerbox-600', name='PowerBox 600', short='600', wh=600, inverter='400W', panels='1 × 200W', box=260000, bundle=320000, chem='lithium-ion',
         runs='Lights, fans, a 32" TV and decoder, laptops and phones'),
    dict(i=1, slug='powerbox-1500', name='PowerBox 1500', short='1500', wh=1500, inverter='1kW', panels='1 × 400W', box=380000, bundle=500000, chem='lithium-ion',
         runs='All of that, plus a table-top fridge, a 10kg washing machine, a blender, an inverter iron'),
    dict(i=2, slug='powerbox-1900', name='PowerBox 1900', short='1900', wh=1900, inverter='1kW', panels='1 × 600W', box=440000, bundle=590000, chem='lithium-ion',
         runs='The same as the 1500, for longer', twin=True),
    dict(i=3, slug='powerbox-2600', name='PowerBox 2600', short='2600', wh=2600, inverter='2kW (2.5kVA)', panels='2 × 600W', box=700000, bundle=1000000, chem='lithium-ion',
         runs='The whole house: fridge or chest freezer, microwave, washing machine, induction cooker'),
    dict(i=4, slug='powerbox-3100', name='PowerBox 3100', short='3100', wh=3100, inverter='2kW (2.5kVA)', panels='2 × 600W', box=800000, bundle=1100000, chem='lithium-ion',
         runs='The same as the 2600, for longer', twin=True),
    dict(i=5, slug='powerbox-4000', name='PowerBox 4000', short='4000', wh=4000, inverter='4kW (5kVA)', panels='4 × 600W', box=1550000, bundle=2150000, chem='LiFePO4',
         runs='The whole house, plus a pumping machine and one inverter AC by day'),
    dict(i=6, slug='powerbox-8000', name='PowerBox 8000', short='8000', wh=8000, inverter='4kW (5kVA)', panels='4 × 600W', box=2000000, bundle=2600000, chem='LiFePO4',
         runs='The same as the 4000, for longer, with some AC after dark', twin=True),
    dict(i=7, slug='powerbox-8000-plus', name='PowerBox 8000 Plus', short='8000 Plus', wh=8000, inverter='8kW (10kVA)', panels='6 × 600W', box=2300000, bundle=3200000, chem='LiFePO4',
         runs='Heavy home and office loads, a pumping machine, two 1hp inverter ACs'),
]
MAX_WH = 8000


def naira(n):
    return '₦' + f'{n:,}'


WA = ('<svg class="wa-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
      '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 10c0 2.8 2.2 5 5 5l1-1.2-1.8-.9-.7.7a3.5 3.5 0 0 1-2.1-2.1l.7-.7-.9-1.8z" fill="currentColor" stroke="none"/></svg>')

# The real logo goes in assets/lumey-logo.svg; until then the name is set in type.
LOGO = '<a class="logo" href="home.html" aria-label="Lumey Energy home"><span class="logo-word">Lumey Energy</span></a>'


def range_items(current=3, as_links=False):
    out = []
    for m in MODELS:
        h = max(4, round(m['wh'] / MAX_WH * 100))
        cls = 'heavy' if m['i'] >= 5 else ''
        label = f'{m["name"]}, {m["wh"]:,}Wh battery, {naira(m["box"])}'
        inner = f'<span class="bar" style="--h:{h}"></span><span class="m">{m["short"].replace(" Plus", "+")}</span><span class="p">{naira(m["box"])}</span>'
        if as_links:
            cur = ' aria-current="page"' if m['i'] == current else ''
            href = 'powerbox-2600.html' if m['i'] == 3 else f'home.html#row-{m["slug"]}'
            out.append(f'<li class="{cls}"><a href="{href}" aria-label="{label}"{cur}>{inner}</a></li>')
        else:
            out.append(f'<li class="{cls}"><button type="button" data-i="{m["i"]}" aria-label="{label}" aria-pressed="{str(m["i"] == current).lower()}">{inner}</button></li>')
    return ''.join(out)


def rate_rows(pick=None):
    rows = []
    for m in MODELS:
        if m['i'] == 5:
            rows.append('<tr class="divider"><th colspan="5" scope="rowgroup"><span class="d-3">Heavy duty</span> '
                        '<span class="small quiet" style="font-weight:400">LiFePO4 batteries with a five-year warranty. These run pumping machines and inverter air conditioners.</span></th></tr>')
        if m['i'] == 0:
            rows.append('<tr class="divider"><th colspan="5" scope="rowgroup" style="padding-top:var(--s3)"><span class="d-3">Portable</span> '
                        '<span class="small quiet" style="font-weight:400">Lithium-ion, 12-month inverter warranty. Light enough to move between rooms.</span></th></tr>')
        w = round(m['wh'] / MAX_WH * 100, 1)
        runs = f'<span class="quiet">{m["runs"]}</span>' if m.get('twin') else m['runs']
        cls = ' class="pick"' if pick == m['i'] else ''
        rows.append(
            f'<tr id="row-{m["slug"]}"{cls}><th scope="row" class="model"><a href="{"powerbox-2600.html" if m["i"] == 3 else "#row-" + m["slug"]}">{m["name"].replace("PowerBox ", "")}</a></th>'
            f'<td><div class="meter"><i style="--w:{w}"></i></div><div class="spec">{m["wh"]:,}Wh {m["chem"]}, {m["inverter"]} inverter</div></td>'
            f'<td class="runs">{runs}</td><td class="money">{naira(m["box"])}</td><td class="money">{naira(m["bundle"])}</td></tr>')
    return ''.join(rows)


def stack_svg():
    # An exploded view of the box: four slabs, bottom to top.
    layers = ['Lithium battery', 'Hybrid pure sine wave inverter', 'Charge controller', 'Protection system']
    w, h, dx, dy, gap = 250, 40, 70, 40, 30
    x0, base = 20, 380
    parts = ['<svg class="stack-diagram" viewBox="0 0 560 420" role="img" aria-labelledby="stack-t">'
             '<title id="stack-t">Exploded view of a PowerBox: lithium battery, hybrid pure sine wave inverter, charge controller and protection system stacked in one box.</title>']
    for k, name in enumerate(layers):
        y = base - h - k * (h + gap)
        top = f'{x0},{y} {x0+dx},{y-dy} {x0+dx+w},{y-dy} {x0+w},{y}'
        side = f'{x0+w},{y} {x0+w+dx},{y-dy} {x0+w+dx},{y-dy+h} {x0+w},{y+h}'
        parts.append(f'<polygon class="slab-side" points="{side}"/><rect class="slab" x="{x0}" y="{y}" width="{w}" height="{h}"/><polygon class="slab-top" points="{top}"/>')
        ty = y + h / 2 + 6
        parts.append(f'<line class="lead" x1="{x0+w+dx+6}" y1="{y-dy/2+h/2}" x2="{x0+w+dx+20}" y2="{y-dy/2+h/2}"/>')
        parts.append(f'<text x="{x0+w+dx+26}" y="{y-dy/2+h/2+6}">{name.replace("Hybrid pure sine wave ", "Pure sine wave ")}</text>')
    parts.append('</svg>')
    return ''.join(parts)


FOOTER = '''<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div><span class="logo-word" style="color:var(--moon)">Lumey Energy</span>
        <p class="small" style="color:var(--dead);max-width:22em">Solar generators and power stations, designed and built in Akure for Nigerian homes and businesses.</p></div>
      <div><h2>PowerBox</h2><ul><li><a href="#">Portable: 600 to 3100</a></li><li><a href="#">Heavy duty: 4000 to 8000 Plus</a></li><li><a href="home.html#rates">All prices</a></li><li><a href="#">Which one do I need?</a></li></ul></div>
      <div><h2>Buying</h2><ul><li><a href="#">Where to buy</a></li><li><a href="#">Payment plans</a></li><li><a href="#">Verify a PowerBox</a></li><li><a href="#">Custom systems</a></li></ul></div>
      <div><h2>After you buy</h2><ul><li><a href="#">Setup guide</a></li><li><a href="#">Warranty</a></li><li><a href="#">Troubleshooting</a></li><li><a href="#">Contact</a></li></ul></div>
    </div>
    <div class="legal"><span>© 2026 Lumey Energy</span><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Warranty policy</a></div>
  </div>
</footer>'''


def assemble(name, extra=None):
    html = (SRC / name).read_text()
    css = (SRC / 'lumey.css').read_text()
    reps = {
        '<!--CSS-->': css, '<!--SCENE-->': scene_svg(), '<!--RANGE-->': range_items(),
        '<!--RANGE-LINKS-->': range_items(as_links=True), '<!--ROWS-->': rate_rows(),
        '<!--ROWS-PICK-->': rate_rows(pick=3),
        '<!--ROWS-SAMPLE-->': '</tr>'.join(rate_rows().split('</tr>')[3:6]) + '</tr>',
        '<!--STACK-->': stack_svg(), '<!--LOGO-->': LOGO,
        '<!--WA-->': WA, '<!--FOOTER-->': FOOTER,
        '<!--DATA-->': 'var MODELS = ' + json.dumps([{k: m[k] for k in ('name', 'slug', 'wh', 'inverter', 'panels', 'box', 'bundle')} for m in MODELS], ensure_ascii=False) + ';',
    }
    reps.update(extra or {})
    for k, v in reps.items():
        html = html.replace(k, v)
    left = re.findall(r'<!--[A-Z-]+-->', html)
    assert not left, f'{name}: unreplaced {left}'
    (OUT / name).write_text(html)
    print('built', OUT / name, f'{len(html)//1024}KB')


if __name__ == '__main__':
    for f in sorted(SRC.glob('*.html')):
        assemble(f.name)
