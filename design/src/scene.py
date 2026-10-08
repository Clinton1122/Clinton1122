"""Builds the outage-scene SVG: a section through a Nigerian bungalow at night.

Every appliance carries data-need = the index of the smallest PowerBox that runs it
(0 = 600, 1 = 1500, 3 = 2600, 5 = 4000, 7 = 8000 Plus), taken from the PRD's
"what it powers" lists. build(level) renders the drawing already set for one model,
so it is correct with no JavaScript; the page script re-renders it on change.
"""
import math

W = 800
FLOOR, CEIL = 420, 222
WALLS = [220, 370, 545, 690, 790]
LEVEL = 3


def gear(need, name, body, xmark, outside=False):
    cls = 'gear' + (' outside' if outside else '') + (' on' if need <= LEVEL else '')
    mx, my = xmark
    return (f'<g class="{cls}" data-need="{need}" data-name="{name}">{body}'
            f'<path class="x" d="M{mx} {my}l8 8m0-8l-8 8"/></g>')


def fan(cx):
    return gear(0, 'ceiling fan',
                f'<line x1="{cx}" y1="{CEIL}" x2="{cx}" y2="{CEIL+14}"/><line x1="{cx-20}" y1="{CEIL+16}" x2="{cx+20}" y2="{CEIL+16}"/>'
                f'<circle class="solid" cx="{cx}" cy="{CEIL+16}" r="3.5"/>', (cx + 24, CEIL + 6))


def ac(x, y, need, name):
    return gear(need, name,
                f'<rect x="{x}" y="{y}" width="50" height="15" rx="3"/><line x1="{x+6}" y1="{y+11}" x2="{x+44}" y2="{y+11}"/>'
                f'<path class="flow" d="M{x+10} {y+22}q4 6 0 12M{x+25} {y+22}q4 6 0 12M{x+40} {y+22}q4 6 0 12" opacity=".7"/>',
                (x + 54, y - 4))


def bed(x, w):
    return (f'<g class="furn"><rect x="{x}" y="{FLOOR-22}" width="{w}" height="14"/>'
            f'<rect x="{x}" y="{FLOOR-40}" width="8" height="32"/><line x1="{x}" y1="{FLOOR-8}" x2="{x}" y2="{FLOOR}"/>'
            f'<line x1="{x+w}" y1="{FLOOR-8}" x2="{x+w}" y2="{FLOOR}"/></g>')


def panels():
    a, b = (505, 140), (805, 222)
    dx, dy = b[0] - a[0], b[1] - a[1]
    n = math.hypot(dx, dy)
    ux, uy = dy / n, -dx / n  # unit perpendicular, pointing up off the roof
    lo, hi = 1.5, 9
    out = []
    for ta, tb in [(0.12, 0.34), (0.37, 0.59), (0.62, 0.84)]:
        p1 = (a[0] + dx * ta, a[1] + dy * ta)
        p2 = (a[0] + dx * tb, a[1] + dy * tb)
        pts = [(p1[0] + ux * lo, p1[1] + uy * lo), (p2[0] + ux * lo, p2[1] + uy * lo),
               (p2[0] + ux * hi, p2[1] + uy * hi), (p1[0] + ux * hi, p1[1] + uy * hi)]
        out.append('<polygon class="panel" points="' + ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts) + '"/>')
    return ''.join(out)


def room(x0, x1, name, inner):
    return (f'<g class="lit" data-room="{name}"><rect class="room" x="{x0+2}" y="{CEIL}" width="{x1-x0-4}" height="{FLOOR-CEIL}"/>'
            f'<circle class="bulb" cx="{(x0+x1)//2}" cy="{CEIL+30}" r="5"/>{inner}</g>'
            f'<text class="label" x="{x0+10}" y="{CEIL-10}">{name}</text>')


def build(level=3):
    global LEVEL
    LEVEL = level
    w1, w2, w3, w4, w5 = WALLS
    r1 = room(w1, w2, 'Bedroom', fan((w1 + w2) // 2 + 22) + ac(w1 + 14, CEIL + 44, 5, 'air conditioner') + bed(w1 + 34, 92))
    tv = gear(0, 'TV and decoder',
              f'<rect x="{w3-74}" y="{FLOOR-78}" width="54" height="32" rx="2"/>'
              f'<rect class="screen" x="{w3-70}" y="{FLOOR-74}" width="46" height="24" fill="none" stroke="none"/>'
              f'<line x1="{w3-47}" y1="{FLOOR-46}" x2="{w3-47}" y2="{FLOOR-30}"/><rect x="{w3-70}" y="{FLOOR-30}" width="46" height="10"/>',
              (w3 - 18, FLOOR - 86))
    # The PowerBox on the parlour floor, its face showing the logo's stepped bars.
    box = (f'<g class="powerbox" aria-hidden="true"><rect class="box" x="{w2+104}" y="{FLOOR-44}" width="34" height="44" rx="2"/>'
           + ''.join(f'<rect class="box-bar" x="{w2+110+i*6}" y="{FLOOR-12-h}" width="4" height="{h}"/>' for i, h in enumerate([8, 13, 18, 24]))
           + '</g>')
    sofa = '<g class="furn"><path d="M%d %dh70v-20h-6v12h-58v-12h-6z"/></g>' % (w2 + 18, FLOOR - 4)
    r2 = room(w2, w3, 'Parlour', fan((w2 + w3) // 2) + sofa + tv + box)
    c = FLOOR - 52
    kitchen = (
        f'<g class="furn"><line x1="{w3+6}" y1="{c}" x2="{w4-6}" y2="{c}"/><line x1="{w3+6}" y1="{c}" x2="{w3+6}" y2="{FLOOR}"/></g>'
        + gear(1, 'table-top fridge', f'<rect x="{w3+12}" y="{c-30}" width="20" height="30" rx="2"/><line x1="{w3+12}" y1="{c-18}" x2="{w3+32}" y2="{c-18}"/>', (w3 + 14, c - 46))
        + gear(3, 'microwave', f'<rect x="{w3+42}" y="{c-20}" width="34" height="20" rx="2"/><rect x="{w3+46}" y="{c-16}" width="20" height="12"/>', (w3 + 60, c - 36))
        + gear(1, 'washing machine', f'<rect x="{w3+12}" y="{FLOOR-44}" width="34" height="44" rx="2"/><circle cx="{w3+29}" cy="{FLOOR-20}" r="10"/>', (w3 + 30, FLOOR - 64))
        + gear(3, 'chest freezer', f'<rect x="{w3+60}" y="{FLOOR-36}" width="66" height="36" rx="2"/><line x1="{w3+60}" y1="{FLOOR-28}" x2="{w3+126}" y2="{FLOOR-28}"/>', (w3 + 108, FLOOR - 52))
    )
    r3 = room(w3, w4, 'Kitchen', kitchen)
    r4 = room(w4, w5, 'Bedroom', fan((w4 + w5) // 2 + 10) + ac(w4 + 24, CEIL + 44, 7, 'second air conditioner') + bed(w4 + 18, 64))

    tx = 140
    # Overhead tank on its stand, filled by the pumping machine: a compound staple.
    outside = (
        f'<g class="furn-out"><rect x="{tx}" y="232" width="56" height="58" rx="6"/>'
        f'<line x1="{tx+6}" y1="290" x2="{tx}" y2="{FLOOR}"/><line x1="{tx+50}" y1="290" x2="{tx+56}" y2="{FLOOR}"/>'
        f'<line x1="{tx+3}" y1="350" x2="{tx+53}" y2="350"/><path d="M{tx+28} 290v58"/></g>'
        + gear(5, 'pumping machine', f'<rect x="{tx+16}" y="{FLOOR-16}" width="26" height="16" rx="2"/><circle cx="{tx+29}" cy="{FLOOR-8}" r="4"/>', (tx + 44, FLOOR - 30), outside=True)
    )
    # The neighbour, on a petrol generator: one flickering orange window and a noisy box.
    neighbour = (
        '<g class="neighbour"><polygon class="roof" points="0,300 60,262 122,300"/>'
        f'<rect class="wall" x="6" y="300" width="110" height="{FLOOR-300}"/>'
        '<rect class="gen-window" x="26" y="324" width="28" height="22"/>'
        '<rect x="70" y="324" width="28" height="22" fill="#1A2537"/>'
        f'<rect x="96" y="{FLOOR-16}" width="22" height="16" fill="none" stroke="#8A94A8" stroke-width="2"/>'
        f'<path d="M110 {FLOOR-22}q-4-8 2-14q6-6 0-14" fill="none" stroke="#8A94A8" stroke-width="1.5" opacity=".7"/></g>'
    )
    roof = f'<polygon class="roof" points="205,{CEIL} 505,140 805,{CEIL}"/>'
    walls = ''.join(f'<line class="wall" x1="{x}" y1="{CEIL}" x2="{x}" y2="{FLOOR}"/>' for x in WALLS)
    defs = ('<defs><radialGradient id="roomlight" cx="50%" cy="8%" r="95%">'
            '<stop offset="0" stop-color="#FFF3B0"/><stop offset=".45" stop-color="#FFD21F"/><stop offset="1" stop-color="#E9B800"/></radialGradient></defs>')
    return (f'<svg viewBox="0 112 {W} 318" role="img" aria-labelledby="scene-title scene-desc">'
            '<title id="scene-title">A house during a power cut</title>'
            '<desc id="scene-desc">Cross-section of a bungalow at night with a PowerBox in the parlour. The appliances it can run are drawn lit; the rest are crossed out. The list beside the drawing says the same in words.</desc>'
            + defs + neighbour + outside + roof + panels() + r1 + r2 + r3 + r4 + walls
            + f'<line class="ground" x1="0" y1="{FLOOR}" x2="{W}" y2="{FLOOR}"/></svg>')
