"""Build design/home.html (v3) from design/src/v3-home.html.

Photos are the client's own, served from their ImageKit account. The logo mark is
cut from their logo.jpg (design/assets). Prices: Website PRD pricing sheet.
Run: python3 design/src/build_v3.py
"""
import json, pathlib

SRC = pathlib.Path(__file__).parent
OUT = SRC.parent
IK = 'https://ik.imagekit.io/wxeoxjool/Lumey/'


def img(name, w=900):
    return f'{IK}{name}?tr=w-{w}'


# img: the photo the current site uses for that model. Note: 2600 and 8000 Plus have
# no photo of their own on the live site; these reuse the nearest model's photo.
MODELS = [
    dict(i=0, name='PowerBox 600', spec='400W inverter, 600Wh lithium battery', runs='Lights, fans, a 32" TV, decoder, laptop and phones',
         box=260000, bundle=320000, img=img('550%201.jpeg'), tag='Personal use',
         why='Runs lights, fans, a TV, decoder and laptops. Not for fridges, irons or air conditioners.'),
    dict(i=1, name='PowerBox 1500', spec='1kW inverter, 1,500Wh lithium battery', runs='Adds a table-top fridge, a 10kg washing machine and a blender',
         box=380000, bundle=500000, img=img('1500%201.jpeg'), tag='Small home',
         why='Adds a table-top fridge up to 120L, a washing machine and a blender. Not for freezers, microwaves or air conditioners.'),
    dict(i=2, name='PowerBox 1900', spec='1kW inverter, 1,900Wh lithium battery', runs='Same as the 1500, for longer nights',
         box=440000, bundle=590000, img=img('1900.jpeg'), tag='Longer backup',
         why='Same appliances as the 1500, with a bigger battery for longer nights.'),
    dict(i=3, name='PowerBox 2600', spec='2kW (2.5kVA) inverter, 2,600Wh lithium battery', runs='The whole house: full fridge or freezer, microwave, washing machine',
         box=700000, bundle=1000000, img=img('3100.jpeg'), tag='Most families', feature=True,
         why='Runs a full fridge or freezer and a microwave. Air conditioners and pumping machines need a heavy-duty PowerBox.'),
    dict(i=4, name='PowerBox 3100', spec='2kW (2.5kVA) inverter, 3,100Wh lithium battery', runs='Same as the 2600, for longer nights',
         box=800000, bundle=1100000, img=img('3100%201.jpeg'), tag='Longer backup',
         why='Same appliances as the 2600, with a bigger battery for longer nights.'),
    dict(i=5, name='PowerBox 4000', spec='4kW (5kVA) inverter, 4kWh LiFePO4 battery', runs='Pumping machine and one inverter AC by day',
         box=1550000, bundle=2150000, img=img('4000.jpeg'), tag='Home and office',
         why='Runs a pumping machine and one inverter AC by day, on a LiFePO4 battery with a five-year warranty.'),
    dict(i=6, name='PowerBox 8000', spec='4kW (5kVA) inverter, 8kWh LiFePO4 battery', runs='Same as the 4000, with some AC after dark',
         box=2000000, bundle=2600000, img=img('8000.jpeg'), tag='Longer backup',
         why='Same appliances as the 4000, with double the battery for longer backup.'),
    dict(i=7, name='PowerBox 8000 Plus', spec='8kW (10kVA) inverter, 8kWh LiFePO4 battery', runs='Two 1hp inverter ACs and a pumping machine',
         box=2300000, bundle=3200000, img=img('4000%201.jpeg'), tag='Large homes',
         why='Runs one or two 1hp inverter ACs and a pumping machine. The biggest standard PowerBox.'),
]

CHIPS = [
    ('Lights and fans', 0, True), ('TV and decoder', 0, True), ('Laptop and Wi-Fi', 0, False),
    ('Table-top fridge', 1, False), ('Washing machine', 1, False), ('Full fridge or freezer', 3, True),
    ('Microwave', 3, False), ('Pumping machine', 5, False), ('One air conditioner', 5, False),
    ('Two air conditioners', 7, False),
]

WA = ('<svg class="wa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
      '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 10c0 2.8 2.2 5 5 5l1-1.2-1.8-.9-.7.7a3.5 3.5 0 0 1-2.1-2.1l.7-.7-.9-1.8z" fill="currentColor" stroke="none"/></svg>')


def naira(n):
    return '₦' + f'{n:,}'


def card(m):
    cls = 'card feature' if m.get('feature') else 'card'
    return (f'<a class="{cls}" href="#"><div class="ph"><img src="{m["img"]}" alt="Lumey {m["name"]}" width="900" height="675" loading="lazy">'
            f'<span class="label">{m["tag"]}</span></div><div class="body"><h3>{m["name"]}</h3><p class="spec">{m["spec"]}</p>'
            f'<p class="runs">{m["runs"]}</p><div class="prices"><span class="price">{naira(m["box"])}</span>'
            f'<small>or {naira(m["bundle"])} with panels</small></div></div></a>')


def build():
    html = (SRC / 'v3-home.html').read_text()
    reps = {
        '{CARDS_PORT}': ''.join(card(m) for m in MODELS[:5]),
        '{CARDS_HEAVY}': ''.join(card(m) for m in MODELS[5:]),
        '{CHIPS}': ''.join(f'<li><button class="chip" type="button" data-need="{n}" aria-pressed="{str(on).lower()}">{t}</button></li>' for t, n, on in CHIPS),
        '{OPTIONS}': ''.join(f'<option value="{m["i"]}"{" selected" if m["i"] == 3 else ""}>{m["name"]} with panels, {naira(m["bundle"])}</option>' for m in MODELS),
        '{MODELS}': json.dumps([{k: m[k] for k in ('i', 'name', 'box', 'bundle', 'why')} | {'img': m['img'].replace('w-900', 'w-1000')} for m in MODELS], ensure_ascii=False),
        '{MARK_B}': (OUT / 'assets/lumey-mark-black.png.b64').read_text(),
        '{MARK_Y}': (OUT / 'assets/lumey-mark-yellow.png.b64').read_text(),
        '{WA}': WA,
    }
    for k, v in reps.items():
        html = html.replace(k, v)
    assert '{' + 'CARDS' not in html and '{MARK' not in html and '{WA}' not in html
    (OUT / 'home.html').write_text(html)
    print('built', OUT / 'home.html', len(html) // 1024, 'KB')


if __name__ == '__main__':
    build()
