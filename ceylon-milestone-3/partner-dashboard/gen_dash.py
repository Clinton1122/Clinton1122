# Generates dash.html: the rest of the partner dashboard (Today, Bookings, booking details + hard-to-reach cancel, Listings, Messages, Money, Account).
import os
ON=' class="on"'
D=os.path.dirname(os.path.abspath(__file__))
TABS=[('today','Today',''),('cal','Bookings',''),('back','Refunds','2'),('chat','Messages','1'),('compass','Listings',''),('wallet','Money',''),('user','Account','')]
def hd(on,time='10:20 AM'):
    t=''.join(f'<span{ON if n==on else ""}><svg class="i"><use href="#{i}"/></svg>{n}{f"<em>{c}</em>" if c else ""}</span>' for i,n,c in TABS)
    return f'''<div class="hd px-p"><span class="logo"><!--LOGO--><span class="portal">Partner</span></span><span class="sp"></span><span class="slt"><svg class="i s"><use href="#clock"/></svg>Sri Lanka <b>{time}</b></span><span class="icb"><svg class="i"><use href="#help"/></svg></span><span class="icb"><svg class="i"><use href="#bell"/></svg><span class="dot"></span></span><span class="me">AS</span></div>
<div class="band px-p"><div class="tray">{t}</div></div>'''
def tb(on):
    items=[('today','Today',''),('cal','Bookings',''),('back','Refunds','2'),('chat','Messages','1'),('more','More','')]
    return '<div class="tb">'+''.join(f'<span{ON if n==on else ""}><svg class="i"><use href="#{i}"/></svg>{n}{f"<em>{c}</em>" if c else ""}</span>' for i,n,c in items)+'</div>'
def frame(fid,name,body,w=1440,extra=''):
    return f'<div class="fig-frame screen" id="{fid}" data-name="{name}" style="width:{w}px;background:var(--page){extra}">{body}</div>\n'
def phone(fid,name,body):
    return f'<div class="fig-frame phone" id="{fid}" data-name="{name}"><div class="sb"><span>9:41</span><span>●●● 4G</span></div>{body}</div>\n'
def pill(t,tone): return f'<span class="zp {tone}">{t}</span>'
def ptrack(marker=None):
    m=f'<span class="zmk" style="left:{marker[0]}%">{marker[1]}</span>' if marker else ''
    return f'''<div class="ztrack">{m}<div><i style="background:var(--ok)"></i><b>Full refund</b><small>until Sat 19 Sep, 5:30 AM</small></div><div><i style="background:#D9A021"></i><b>50% back</b><small>until Wed 23 Sep, 5:30 AM</small></div><div><i style="background:var(--line)"></i><b>No refund</b><small>after that</small></div></div>'''

CSS='''<style>
.zg{display:grid;grid-template-columns:1fr 360px;gap:28px;margin-top:28px;align-items:start}
.zh2{font-size:13px;font-weight:800;color:var(--mut);letter-spacing:.2px;margin:0 0 10px}
.zneed{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:20px;padding:20px 22px;margin-bottom:12px}
.zneed.hot{border:2px solid var(--pri);padding:19px 21px;background:#fff}
.zneed .k2{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;color:var(--pri-t)}
.zneed h3{font-size:18px;font-weight:800;margin-top:6px}
.zneed p{font-size:14px;color:var(--body);margin-top:4px;line-height:1.5}
.zneed q{display:block;font-size:15px;color:var(--ink);margin-top:8px;quotes:"“" "”";line-height:1.5}
.zneed .clk{text-align:right}
.zneed .clk b{display:block;font-family:var(--h);font-size:30px;letter-spacing:-.6px;color:var(--bad);line-height:1}
.zneed .clk small{display:block;font-size:12.5px;color:var(--mut);margin:4px 0 12px}
.ztl{background:#fff;border:1px solid var(--line);border-radius:20px;padding:8px 22px}
.ztl .row{display:grid;grid-template-columns:96px 64px 1fr auto;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}
.ztl .row:last-child{border-bottom:0}
.ztl .tm{font-family:var(--h);font-size:22px;font-weight:700;letter-spacing:-.3px}
.ztl .tm small{display:block;font-family:var(--t);font-size:12px;font-weight:700;color:var(--mut);letter-spacing:0}
.ztl img{width:64px;height:64px;border-radius:12px;object-fit:cover}
.ztl b{display:block;font-size:15.5px}
.ztl .sub2{display:block;font-size:13.5px;color:var(--mut);margin-top:3px}
.ztl .row.past{opacity:.55}
.zp{display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:999px;font-size:12px;font-weight:800;white-space:nowrap}
.zp.neu{background:var(--neu-bg);color:var(--neu)}.zp.info{background:var(--info-bg);color:var(--info)}.zp.ok{background:var(--ok-bg);color:var(--ok)}.zp.warn{background:var(--warn-bg);color:var(--warn)}.zp.bad{background:var(--bad-bg);color:var(--bad)}.zp.act{background:var(--pri);color:#fff}
.zside{display:flex;flex-direction:column;gap:14px}
.zbox{background:#fff;border:1px solid var(--line);border-radius:20px;padding:20px 22px}
.zbox h3{font-size:15px;font-weight:800}
.zbox .big2{font-family:var(--h);font-size:30px;font-weight:700;letter-spacing:-.6px;margin-top:6px}
.zbox p{font-size:13.5px;color:var(--body);line-height:1.5;margin-top:6px}
.zbox .kv{display:flex;justify-content:space-between;font-size:14px;padding:9px 0;border-top:1px solid var(--line);color:var(--body)}
.zbox .kv b{color:var(--ink)}
.zwx{background:var(--info-bg);border:0}
.zwx h3{color:var(--info);display:flex;gap:8px;align-items:center}
.zfil{display:flex;gap:8px;align-items:center;margin-top:24px}
.zchip{display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 14px;border-radius:999px;border:1px solid var(--inp);background:#fff;font-size:13.5px;font-weight:700;color:var(--body)}
.zchip.on{background:var(--ink);border-color:var(--ink);color:#fff}
.zsearch{margin-left:auto;display:flex;align-items:center;gap:8px;height:40px;width:300px;padding:0 14px;border:1px solid var(--inp);border-radius:12px;background:#fff;font-size:14px;color:var(--mut)}
.zday{display:flex;align-items:baseline;gap:10px;margin:26px 0 8px}
.zday b{font-family:var(--h);font-size:20px;letter-spacing:-.2px}
.zday span{font-size:13.5px;color:var(--mut);font-weight:600}
.zbr{display:grid;grid-template-columns:84px 56px 1.4fr 1fr 150px 130px;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 18px;margin-top:8px}
.zbr .tm{font-family:var(--h);font-size:19px;font-weight:700}
.zbr img{width:56px;height:56px;border-radius:10px;object-fit:cover}
.zbr b{display:block;font-size:15px}
.zbr small{display:block;font-size:13px;color:var(--mut);margin-top:2px}
.zbr .amt{text-align:right;font-weight:800;font-size:15px}
.zbr .amt small{font-weight:600}
.zcrumb{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--body)}
.zcrumb svg{transform:rotate(180deg)}
.zhero{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;margin-top:14px}
.zhero h1{font-family:var(--h);font-size:34px;letter-spacing:-.6px;line-height:1.1}
.zhero p{font-size:15px;color:var(--mut);margin-top:6px}
.zhero p b{color:var(--ink)}
.zbg{display:grid;grid-template-columns:1fr 400px;gap:28px;margin-top:24px;align-items:start}
.zfacts{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--line);border-radius:18px;background:#fff;overflow:hidden}
.zfacts div{padding:16px 18px;border-left:1px solid var(--line)}
.zfacts div:first-child{border-left:0}
.zfacts small{display:block;font-size:12.5px;font-weight:700;color:var(--mut)}
.zfacts b{display:block;font-size:16px;margin-top:4px}
.zfacts span{display:block;font-size:13px;color:var(--body);margin-top:2px}
.ztrack{position:relative;display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-top:30px}
.ztrack i{display:block;height:6px;border-radius:3px}
.ztrack b{display:block;font-size:13px;margin-top:8px}
.ztrack small{display:block;font-size:12px;color:var(--mut)}
.zmk{position:absolute;top:-26px;transform:translateX(-50%);height:22px;padding:0 8px;border-radius:6px;background:var(--ink);color:#fff;font-size:11.5px;font-weight:800;display:flex;align-items:center;white-space:nowrap}
.zwho{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center}
.zav{width:52px;height:52px;border-radius:50%;background:#E9EEF6;color:var(--info);display:grid;place-items:center;font-weight:800;font-size:16px}
.zwho b{display:block;font-size:16px}.zwho small{display:block;font-size:13px;color:var(--mut);margin-top:2px}
.zrow{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}
.zquiet{margin-top:40px;padding:22px 0 0;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;font-size:13.5px;color:var(--mut)}
.zquiet b{color:var(--body);font-weight:700}
.zquiet .q2{color:var(--body);font-weight:700;text-decoration:underline;text-underline-offset:3px}
.zalt{display:grid;grid-template-columns:44px 1fr auto;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px 20px;margin-top:10px}
.zalt .ic{width:44px;height:44px;border-radius:12px;background:var(--tint);color:var(--pri-t);display:grid;place-items:center}
.zalt b{display:block;font-size:16px}
.zalt small{display:block;font-size:13.5px;color:var(--body);margin-top:3px;line-height:1.45}
.zlast{margin-top:28px;padding:18px 20px;border:1px dashed var(--inp);border-radius:16px;display:flex;justify-content:space-between;align-items:center;font-size:14px;color:var(--body)}
.zlast b{color:var(--ink)}
.zform{max-width:760px}
.zf{margin-top:22px}
.zf label{display:block;font-size:14px;font-weight:800;margin-bottom:8px}
.zf label span{font-weight:500;color:var(--mut)}
.zf .h{font-size:12.5px;color:var(--mut);margin-top:6px;line-height:1.45}
.zsel{height:48px;border:1px solid var(--inp);border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 14px;font-size:15px}
.zin{height:52px;border:1px solid var(--inp);border-radius:12px;background:#fff;display:flex;align-items:center;padding:0 16px;font-size:17px;font-weight:700;letter-spacing:.6px}
.zin.ok{border:2px solid var(--ok)}
.zta{border:1px solid var(--inp);border-radius:12px;background:#fff;padding:12px 14px;font-size:14.5px;line-height:1.55;min-height:96px;color:var(--ink)}
.zcons{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.zcons .t2{padding:18px 22px;border-bottom:1px solid var(--line);font-size:15px;font-weight:800}
.zcons ul{list-style:none;padding:8px 22px 14px}
.zcons li{display:grid;grid-template-columns:22px 1fr;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.5;color:var(--body)}
.zcons li:last-child{border-bottom:0}
.zcons li b{color:var(--ink)}
.zchk{display:grid;grid-template-columns:22px 1fr;gap:12px;align-items:start;margin-top:18px;font-size:14px;line-height:1.5;color:var(--body)}
.zchk i{width:22px;height:22px;border-radius:6px;background:var(--ink);display:grid;place-items:center;color:#fff}
.zbar{display:flex;align-items:center;gap:14px;margin-top:28px;padding-top:22px;border-top:1px solid var(--line)}
.btn.bad{background:var(--bad);border-color:var(--bad);color:#fff}
.zlist{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:24px}
.zl{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.zl img{width:100%;height:170px;object-fit:cover;display:block}
.zl .b2{padding:16px 18px 18px}
.zl b{display:block;font-size:16px;line-height:1.3;margin-top:8px}
.zl small{display:block;font-size:13px;color:var(--mut);margin-top:4px}
.zl .meta{display:flex;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);font-size:13.5px;color:var(--body)}
.zl .meta b{display:inline;font-size:13.5px;margin:0}
.zl.draft{border-style:dashed}
.zprog{height:6px;border-radius:3px;background:var(--tray);margin-top:12px;overflow:hidden}
.zprog i{display:block;height:100%;background:var(--ink)}
.zmsg{display:grid;grid-template-columns:340px 1fr 320px;height:760px;margin-top:24px;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.zinbox{border-right:1px solid var(--line)}
.zinbox .it{display:grid;grid-template-columns:40px 1fr auto;gap:12px;padding:14px 16px;border-bottom:1px solid var(--line)}
.zinbox .it.on{background:var(--page);box-shadow:inset 3px 0 0 var(--pri)}
.zinbox .av2{width:40px;height:40px;border-radius:50%;background:#E9EEF6;color:var(--info);display:grid;place-items:center;font-weight:800;font-size:13px}
.zinbox .av2.cn{background:var(--tint);color:var(--pri-t)}
.zinbox b{display:block;font-size:14.5px}
.zinbox small{display:block;font-size:12.5px;color:var(--mut);margin-top:2px}
.zinbox p{font-size:13px;color:var(--body);margin-top:4px;line-height:1.4}
.zinbox .tm3{font-size:12px;color:var(--mut);font-weight:700;text-align:right}
.zinbox .tm3 em{display:block;margin-top:6px;margin-left:auto;width:10px;height:10px;border-radius:50%;background:var(--pri)}
.zthr{display:flex;flex-direction:column}
.zthr .th2{padding:16px 22px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
.zthr .th2 b{font-size:16px}
.zthr .th2 small{display:block;font-size:12.5px;color:var(--mut)}
.zbub{flex:1;padding:22px;display:flex;flex-direction:column;gap:12px;background:var(--page)}
.zb{max-width:420px;padding:12px 14px;border-radius:16px;font-size:14.5px;line-height:1.5;background:#fff;border:1px solid var(--line)}
.zb.me2{align-self:flex-end;background:var(--ink);color:#fff;border-color:var(--ink)}
.zb small{display:block;font-size:11.5px;color:var(--mut);margin-top:6px}
.zb.me2 small{color:rgba(255,255,255,.7)}
.zsys{align-self:center;font-size:12.5px;color:var(--mut);font-weight:700}
.zcomp{border-top:1px solid var(--line);padding:14px 18px}
.zqr{display:flex;gap:8px;flex-wrap:wrap}
.zqr span{height:32px;padding:0 12px;border-radius:999px;background:var(--page);border:1px solid var(--line);font-size:13px;font-weight:700;display:flex;align-items:center;color:var(--body)}
.zbox2{display:flex;gap:10px;margin-top:10px;align-items:flex-end}
.zbox2 .ta3{flex:1;min-height:52px;border:1px solid var(--inp);border-radius:12px;padding:14px;font-size:14.5px;color:var(--ink)}
.zctx{border-left:1px solid var(--line);padding:18px 20px;background:#FBFAF8}
.zctx img{width:100%;height:130px;border-radius:14px;object-fit:cover}
.zctx b{display:block;font-size:15px;margin-top:12px}
.zctx small{display:block;font-size:13px;color:var(--mut);margin-top:3px}
.zctx .kv{display:flex;justify-content:space-between;font-size:13.5px;padding:9px 0;border-top:1px solid var(--line);color:var(--body);margin-top:6px}
.zctx .kv b{display:inline;font-size:13.5px;margin:0}
.zst{display:grid;grid-template-columns:1fr 380px;gap:28px;margin-top:28px;align-items:start}
.zsm{display:grid;grid-template-columns:150px 1fr 160px 160px 120px;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:16px;padding:16px 20px;margin-top:8px;font-size:14px;color:var(--body)}
.zsm b{color:var(--ink);font-size:15px}
.zsm .n2{text-align:right;color:var(--ink);font-weight:700}
.zsm small{display:block;font-size:12.5px;color:var(--mut)}
.zbank{display:grid;grid-template-columns:56px 1fr auto;gap:16px;align-items:center}
.zbank .bi{width:56px;height:56px;border-radius:14px;background:var(--neu-bg);display:grid;place-items:center}
.zacc{display:grid;grid-template-columns:240px 1fr;gap:32px;margin-top:28px;align-items:start}
.zsub{display:flex;flex-direction:column;gap:2px}
.zsub span{height:42px;display:flex;align-items:center;gap:10px;padding:0 14px;border-radius:10px;font-size:14.5px;font-weight:600;color:var(--body)}
.zsub span.on{background:#fff;color:var(--ink);font-weight:800;border:1px solid var(--line)}
.zsec{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px 26px}
.zsec+.zsec{margin-top:16px}
.zsec h2{font-size:18px;font-weight:800}
.zsec .lead{font-size:14px;color:var(--mut);margin-top:4px}
.zfg{display:grid;grid-template-columns:1fr 1fr;gap:16px 20px;margin-top:18px}
.zfg label{display:block;font-size:13px;font-weight:800;margin-bottom:6px}
.zfg .v2{height:46px;border:1px solid var(--inp);border-radius:12px;display:flex;align-items:center;padding:0 14px;font-size:14.5px;background:#fff}
.zfg .v2.ro{background:var(--page);color:var(--body)}
.ztbl{width:100%;border-collapse:collapse;margin-top:14px;font-size:14px}
.ztbl th{text-align:left;font-size:12.5px;color:var(--mut);font-weight:700;padding:0 0 10px;border-bottom:1px solid var(--line)}
.ztbl td{padding:12px 0;border-bottom:1px solid var(--line);color:var(--body)}
.ztbl td b{color:var(--ink)}
.ztog{width:40px;height:24px;border-radius:999px;background:var(--ok);position:relative;display:inline-block;vertical-align:middle}
.ztog::after{content:none}
.ztog i{position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff}
.ztog.off{background:var(--inp)}.ztog.off i{right:auto;left:3px}
.zmsgh{display:grid;grid-template-columns:1fr 80px 80px;gap:10px;font-size:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.zmsgh b{display:block}.zmsgh small{display:block;font-size:12.5px;color:var(--mut)}
.zmsgh .c{text-align:center}
.zph{padding:16px;flex:1;overflow:hidden}
.zph .hi{font-family:var(--h);font-size:26px;font-weight:700;letter-spacing:-.4px}
.zph .hi2{font-size:14.5px;color:var(--body);margin-top:4px}
.zpn{background:#fff;border:2px solid var(--pri);border-radius:18px;padding:14px 16px;margin-top:14px}
.zpn .k2{font-size:12px;font-weight:800;color:var(--pri-t)}
.zpn b{display:block;font-size:16px;margin-top:4px}
.zpn .r2{display:flex;justify-content:space-between;align-items:center;margin-top:10px}
.zpn .r2 strong{font-family:var(--h);font-size:22px;color:var(--bad)}
.zpn2{background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px 16px;margin-top:10px}
.zpn2 .k2{font-size:12px;font-weight:800;color:var(--mut)}
.zpn2 b{display:block;font-size:15px;margin-top:4px}
.zpn2 p{font-size:13.5px;color:var(--body);margin-top:4px}
.zpt{display:grid;grid-template-columns:62px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}
.zpt .tm{font-family:var(--h);font-size:17px;font-weight:700}
.zpt b{display:block;font-size:14.5px}.zpt small{display:block;font-size:12.5px;color:var(--mut);margin-top:2px}
</style>'''
F=[]
# ---------- Z1 TODAY ----------
F.append(frame('z1','Partner · Today · desktop 1440',hd('Today')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt"><h1>Good morning, Arkam</h1><p><b>2 things need you today.</b> Daniel's refund reply is due first, <span class="hot">in 7 h 53 m</span>.</p></div>
 <div class="zg">
  <div>
   <div class="zh2">Needs you</div>
   <div class="zneed hot"><div><span class="k2"><svg class="i s"><use href="#back"/></svg>Refund request</span><h3>Daniel Okafor asked for a refund</h3><p>Pidurangala sunset hike · Wed 23 Sep, 4:00 PM · 2 adults</p><q>I've come down with a fever and the doctor says I should rest for three days.</q></div>
    <div class="clk"><b>7 h 53 m</b><small>to reply, by 8:05 PM today</small><span class="btn p">Reply to Daniel</span></div></div>
   <div class="zneed"><div><span class="k2" style="color:var(--info)"><svg class="i s"><use href="#chat"/></svg>Message, 3 hours ago</span><h3>Emma Walsh is waiting for an answer</h3><p>Sigiriya sunrise climb · Sat 26 Sep · 2 adults</p><q>Hi! Could you pick us up from our hotel in Dambulla instead of Sigiriya?</q></div>
    <div class="clk"><small style="margin-top:0">Most partners reply within 1 hour</small><span class="btn">Reply</span></div></div>
   <div class="zh2" style="margin-top:28px">Today, Tue 22 Sep</div>
   <div class="ztl">
    <div class="row past"><div class="tm">5:30 AM<small>Ended</small></div><img src="@img:sigiriya:140" alt=""><div><b>Sigiriya sunrise climb</b><span class="sub2">Olivia Chen · 2 adults · guide Nuwan</span></div>'''+pill('Ended','neu')+'''</div>
    <div class="row"><div class="tm">4:00 PM<small>in 5 h 40 m</small></div><img src="@img:pidurangala:140" alt=""><div><b>Pidurangala sunset hike</b><span class="sub2">Lena Fischer + 3 · 4 adults · pickup Habarana, 3:15 PM</span></div>'''+pill('Booked','neu')+'''</div>
    <div class="row"><div class="tm">6:30 PM<small>in 8 h 10 m</small></div><img src="@img:kandy-temple:140" alt=""><div><b>Kandy temple and tea country</b><span class="sub2">Ravi Menon · 1 adult · meets at the Temple gate</span></div>'''+pill('Booked','neu')+'''</div>
   </div>
   <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:14px;color:var(--body)"><span>Tomorrow: <b style="color:var(--ink)">3 bookings, 7 guests</b>. First at 5:30 AM.</span><span class="link">All bookings</span></div>
  </div>
  <div class="zside">
   <div class="zbox"><h3>Next payout</h3><div class="big2 n">LKR 143,714</div><p>Thu 24 Sep, to Commercial Bank ending 3307. 3 bookings, after two refunds.</p><div style="margin-top:12px"><span class="link" style="font-size:14px">See the payout</span></div></div>
   <div class="zbox zwx"><h3><svg class="i s"><use href="#alert"/></svg>Rain likely Thu 24 Sep</h3><p style="color:var(--info)">Heavy rain in Sigiriya after 2 PM. You have 2 afternoon bookings. If you can't run them safely, cancel the day and everyone gets a full refund.</p><div style="margin-top:12px"><span class="btn sm">Look at Thu 24 Sep</span></div></div>
   <div class="zbox"><h3>This week</h3><div class="kv"><span>Bookings</span><b class="n">9</b></div><div class="kv"><span>Guests</span><b class="n">21</b></div><div class="kv"><span>Reply time, last 30 days</span><b>48 min</b></div><div class="kv"><span>Rating</span><b>4.9 · 86 reviews</b></div></div>
  </div>
 </div>
</div>'''))
# ---------- Z2 BOOKINGS LIST ----------
def br(t,img,title,who,st,amt,sub=''):
    return f'<div class="zbr"><div class="tm">{t}</div><img src="@img:{img}:120" alt=""><div><b>{title}</b><small>{who}</small></div><div><small style="margin:0">{sub}</small></div><div>{st}</div><div class="amt n">USD {amt}<small>you receive</small></div></div>'
F.append(frame('z2','Partner · Bookings · Upcoming · desktop 1440',hd('Bookings')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>Bookings</h1><p><b>14 upcoming</b> in the next 7 days, 33 guests.</p></div><div class="seg"><span class="on">List</span><span>Calendar</span></div></div>
 <div class="zfil"><span class="zchip on">Upcoming 14</span><span class="zchip">Today 3</span><span class="zchip">Past</span><span class="zchip">Cancelled</span><span class="zchip"><svg class="i s"><use href="#filter"/></svg>All listings</span><span class="zsearch"><svg class="i s"><use href="#search"/></svg>Name or booking reference</span></div>
 <div class="zday"><b>Today, Tue 22 Sep</b><span>2 more today</span></div>
 '''+br('4:00 PM','pidurangala','Lena Fischer + 3','Pidurangala sunset hike · 4 adults',pill('Booked','neu'),'214.40','Pickup Habarana 3:15 PM')+br('6:30 PM','kandy-temple','Ravi Menon','Kandy temple and tea country · 1 adult',pill('Booked','neu'),'150.09','Meets at the Temple gate')+'''
 <div class="zday"><b>Tomorrow, Wed 23 Sep</b><span>3 bookings, 7 guests</span></div>
 '''+br('5:30 AM','sigiriya','Hiro Sato','Sigiriya sunrise climb · 2 adults',pill('Booked','neu'),'300.17','Pickup Dambulla 4:45 AM')+br('4:00 PM','pidurangala','Daniel Okafor','Pidurangala sunset hike · 2 adults',pill('Refund asked, reply by 8:05 PM','act'),'107.20','Pickup Habarana 3:15 PM')+br('6:30 PM','kandy-temple','Aisha Khan','Kandy temple and tea country · 2 adults',pill('Booked','neu'),'300.17','')+'''
 <div class="zday"><b>Thu 24 Sep</b><span>2 bookings · rain likely after 2 PM</span></div>
 '''+br('5:30 AM','sigiriya','Tom Becker','Sigiriya sunrise climb · 2 adults',pill('Booked','neu'),'300.17','')+br('4:00 PM','pidurangala','Mei Tanaka','Pidurangala sunset hike · 3 adults',pill('Booked','neu'),'160.80','')+'''
 <div class="zday"><b>Sat 26 Sep</b><span>1 booking</span></div>
 '''+br('5:30 AM','sigiriya','Emma Walsh','Sigiriya sunrise climb · 2 adults',pill('New message','info'),'300.17','Pickup Sigiriya 4:45 AM')+'''
</div>'''))
# ---------- Z3 BOOKING DETAILS ----------
F.append(frame('z3','Partner · Booking details · Emma Walsh · desktop 1440',hd('Bookings')+'''
<div class="px-p" style="padding-top:28px;padding-bottom:56px">
 <span class="zcrumb"><svg class="i s"><use href="#arrow"/></svg>Bookings</span>
 <div class="zhero"><div><h1>Emma Walsh, Sat 26 Sep</h1><p>Sigiriya sunrise climb · 2 adults · booking <b>CNE71232877</b> · booked Mon 7 Sep</p></div><div style="display:flex;gap:10px">'''+pill('Booked','neu')+'''</div></div>
 <div class="zbg">
  <div>
   <div class="zfacts"><div><small>Starts</small><b>5:30 AM</b><span>Sat 26 Sep</span></div><div><small>Pickup</small><b>4:45 AM</b><span>Sigiriya Village hotel</span></div><div><small>Guests</small><b>2 adults</b><span>Emma, James</span></div><div><small>Guide</small><b>Nuwan</b><span>English</span></div></div>
   <div class="card" style="margin-top:16px"><div class="zwho"><span class="zav">EW</span><div><b>Emma Walsh</b><small>From Ireland · 3rd trip with Ceylon Nooks · speaks English</small></div><span class="btn sm"><svg class="i s"><use href="#chat"/></svg>Message Emma</span></div>
    <div class="info i" style="margin-top:16px"><svg class="i s" style="margin-top:2px"><use href="#chat"/></svg><span><b>Unanswered, 3 hours ago:</b> “Could you pick us up from our hotel in Dambulla instead of Sigiriya?”</span></div></div>
   <div class="card"><h3>Cancellation policy for this booking: Moderate</h3><p class="lead">If Emma cancels now she gets 50% of your price back. You don't need to do anything; it happens on its own.</p>'''+ptrack((60,'Today, Tue 22 Sep'))+'''</div>
   <div class="card"><h3>Notes for your team</h3><p class="lead">Only you and your guides see these.</p><div class="ta fill" style="margin-top:12px;min-height:64px">James is vegetarian. Bring the spare head torches.</div></div>
  </div>
  <div>
   <div class="rc"><h3>Your money for this booking</h3>
    <div class="ln"><span>Your price, 2 adults</span><span class="dl"></span><span class="v n">USD 280.00</span></div>
    <div class="ln"><span>VAT collected for you, 18%</span><span class="dl"></span><span class="v n">+50.40</span></div>
    <div class="ln"><span>Commission, 10% of your price</span><span class="dl"></span><span class="v n">−28.00</span></div>
    <div class="ln"><span>VAT handling fee</span><span class="dl"></span><span class="v n">−2.23</span></div>
    <div class="ln sum"><span>You receive</span><span class="dl"></span><span class="v n">USD 300.17</span></div>
    <div class="ft">Paid out on Mon 28 Sep, after the trip. Emma paid USD 358.40 in total, including a USD 28.00 service fee to Ceylon Nooks that isn't taken from your earnings.</div></div>
   <div class="zbox" style="margin-top:14px"><h3>Booking actions</h3><div class="zrow" style="flex-direction:column;align-items:stretch"><span class="btn">Change pickup or guide</span><span class="btn">Offer Emma another date</span><span class="btn">Print guest list</span></div></div>
  </div>
 </div>
 <div class="zquiet"><span>Booking reference CNE71232877 · Emma paid by card · <b>Something wrong with this booking?</b></span><span class="q2">Get help with this booking</span></div>
</div>'''))
# ---------- Z4 GET HELP (alternatives first) ----------
def alt(icon,t,s,b): return f'<div class="zalt"><span class="ic"><svg class="i"><use href="#{icon}"/></svg></span><div><b>{t}</b><small>{s}</small></div><span class="btn sm">{b}</span></div>'
F.append(frame('z4','Partner · Get help with a booking · alternatives first · desktop 1440',hd('Bookings')+'''
<div class="px-p" style="padding-top:28px;padding-bottom:56px">
 <span class="zcrumb"><svg class="i s"><use href="#arrow"/></svg>Emma Walsh, Sat 26 Sep</span>
 <div style="display:grid;grid-template-columns:1fr 380px;gap:40px;margin-top:14px;align-items:start">
  <div class="zform" style="max-width:none">
   <div class="pt"><h1>What's the problem?</h1><p>Most problems can be fixed without cancelling. Emma booked months ahead and is counting on this trip.</p></div>
   <div style="margin-top:20px">
   '''+alt('cal','Move Emma to another date','Offer up to 3 dates. Emma picks one, or says no and our team helps. Nobody pays a fee.','Offer dates')+alt('users','Change the guide or vehicle','Swap who runs it. Emma is told automatically if her guide changes.','Change')+alt('chat','Talk to Emma','Sort out the time, pickup or anything else directly.','Message')+alt('alert','Bad weather on the day','Cancel the whole day for every booking at once. Everyone gets a full refund and it doesn\'t count against you.','Cancel a day')+alt('help','Ask our partner team','We can find another partner to run it, or help you decide. Phone or WhatsApp, 7 AM to 10 PM.','Contact us')+'''
   </div>
   <div class="zlast"><span>None of these work and <b>you can't run this booking at all</b>?</span><span class="q2" style="font-weight:700;text-decoration:underline;text-underline-offset:3px">Cancel this booking</span></div>
  </div>
  <div class="zbox" style="margin-top:8px"><h3>Why we ask first</h3><p>When a partner cancels, the traveller loses their plans, often with no time to find something else. It also hurts trust in every partner on Ceylon Nooks.</p><p>That's why cancelling is the last option here and our team checks every one.</p></div>
 </div>
</div>'''))
# ---------- Z5 CANCEL FORM ----------
F.append(frame('z5','Partner · Cancel a booking · filled in, ready to send · desktop 1440',hd('Bookings')+'''
<div class="px-p" style="padding-top:28px;padding-bottom:56px">
 <span class="zcrumb"><svg class="i s"><use href="#arrow"/></svg>What's the problem?</span>
 <div style="display:grid;grid-template-columns:1fr 420px;gap:40px;margin-top:14px;align-items:start">
  <div class="zform">
   <div class="pt"><h1>Cancel Emma's booking</h1><p>Sigiriya sunrise climb · Sat 26 Sep, 5:30 AM · 2 adults · CNE71232877</p></div>
   <div class="zf"><label>Why can't you run it?</label><div class="zsel">Our only vehicle for this trip is being repaired<svg class="i s"><use href="#down"/></svg></div></div>
   <div class="zf"><label>Tell our team what happened</label><div class="zta">The van broke down on Sunday and the garage says it won't be ready until next week. We've tried to hire another one in Sigiriya but none are free on Saturday morning.</div><div class="h">Our team reads this before Emma's booking is cancelled. Emma doesn't see it.</div></div>
   <div class="zf"><label>Proof <span>(optional)</span></label><div class="dt add" style="width:max-content"><svg class="i s"><use href="#plus"/></svg>garage-invoice.jpg added</div></div>
   <div class="zf"><label>Type the booking reference to confirm</label><div class="zin ok n">CNE71232877</div><div class="h">It's at the top of this page.</div></div>
   <div class="zchk"><i><svg class="i s"><use href="#check"/></svg></i><span>I understand Emma gets everything back, I won't be paid for this booking, and this cancellation stays on my account.</span></div>
   <div class="zbar"><span class="btn bad">Send to our team to cancel</span><span class="btn">Keep the booking</span></div>
  </div>
  <div class="zcons"><div class="t2">What happens if you cancel</div><ul>
   <li><svg class="i s" style="color:var(--mut)"><use href="#hour"/></svg><span><b>Our team checks it first</b>, within 2 hours, and may call you to try another option. Emma isn't told until then.</span></li>
   <li><svg class="i s" style="color:var(--mut)"><use href="#back"/></svg><span><b>Emma gets USD 358.40 back</b>, everything she paid, with no fee.</span></li>
   <li><svg class="i s" style="color:var(--mut)"><use href="#wallet"/></svg><span><b>You won't receive USD 300.17</b> for this booking. If it had been paid out, it would come off your next payout.</span></li>
   <li><svg class="i s" style="color:var(--mut)"><use href="#cal"/></svg><span><b>Sat 26 Sep, 5:30 AM closes</b> for new bookings of this trip.</span></li>
   <li><svg class="i s" style="color:var(--bad)"><use href="#alert"/></svg><span><b style="color:var(--bad)">This would be your 2nd cancellation in 12 months.</b> At 3, our team reviews your listings and may pause them.</span></li>
  </ul></div>
 </div>
</div>'''))
# ---------- Z6 / Z7 panels ----------
F.append(f'''<div class="fig-frame panel-frame" id="z6" data-name="Partner · Cancel a booking · trip within 48 hours, call us">
<div class="pcap">Daniel's trip is tomorrow, so it can't be cancelled online</div>
<div class="zbox" style="padding:24px"><div class="pt"><h1 style="font-size:26px">Call us to cancel this booking</h1><p style="font-size:15px">Daniel's trip starts in <b>30 hours</b>. Bookings that start within 48 hours can only be cancelled by our partner team, so we can try to find someone else to run it first.</p></div>
<div class="rc" style="margin-top:16px;background:var(--page);border:0"><div class="ln"><span>Partner team, phone</span><span class="dl"></span><span class="v">+94 11 234 5678</span></div><div class="ln"><span>WhatsApp</span><span class="dl"></span><span class="v">+94 77 123 4567</span></div><div class="ln"><span>Open</span><span class="dl"></span><span class="v">7 AM to 10 PM</span></div></div>
<div class="zbar" style="margin-top:18px;padding-top:18px"><span class="btn d">Call the partner team</span><span class="btn">Back to the booking</span></div>
<div class="info n" style="margin-top:14px"><svg class="i s" style="margin-top:2px"><use href="#info"/></svg><span>Bad weather? Cancel the whole day instead. It works up to the start time.</span></div></div></div>
''')
F.append(f'''<div class="fig-frame panel-frame" id="z7" data-name="Partner · Cancel a booking · sent, our team is checking">
<div class="pcap">After sending</div>
<div class="zbox" style="padding:24px"><span class="zp info">With our team</span><div class="pt" style="margin-top:10px"><h1 style="font-size:26px">We'll check this within 2 hours</h1><p style="font-size:15px">Emma's booking is still on until we confirm. We may call you on +94 77 555 0142 to try another option first.</p></div>
<ol class="steps"><li><span class="d done"><svg class="i s"><use href="#check"/></svg></span><div><b>You asked to cancel</b><small>Tue 22 Sep, 10:42 AM. Reason: vehicle being repaired.</small></div></li><li><span class="d now">2</span><div><b>Our team checks</b><small>By 12:42 PM today. We look for another vehicle or partner first.</small></div></li><li><span class="d">3</span><div><b>Emma is told and refunded</b><small>Only if we confirm the cancellation. You'll get WhatsApp and email.</small></div></li></ol>
<div class="zbar" style="margin-top:6px;padding-top:18px"><span class="btn">Withdraw my request</span><span class="btn lk">Back to bookings</span></div></div></div>
''')
# ---------- Z8 LISTINGS ----------
def lc(img,st,title,sub,meta1,meta2,extra='',cls=''):
    return f'<div class="zl {cls}"><img src="@img:{img}:600" alt=""><div class="b2">{st}<b>{title}</b><small>{sub}</small>{extra}<div class="meta"><span>{meta1}</span><span>{meta2}</span></div></div></div>'
F.append(frame('z8','Partner · Listings · desktop 1440',hd('Listings')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt" style="display:flex;justify-content:space-between;align-items:flex-end"><div><h1>Listings</h1><p><b>4 live</b>, 1 waiting for our team, 1 draft.</p></div><span class="btn p"><svg class="i s"><use href="#plus"/></svg>New listing</span></div>
 <div class="zfil"><span class="zchip on">All 6</span><span class="zchip">Live 4</span><span class="zchip">With our team 1</span><span class="zchip">Drafts 1</span></div>
 <div class="zlist">
 '''+lc('galle-fort',pill('Changes with our team','info'),'Galle Fort walk','Custom cancellation policy sent Mon 21 Sep','Live with the old policy','<span class="link">View</span>')+lc('ella-nine-arch',pill('Draft, step 4 of 6','neu'),'5-Day Cultural Triangle and Hill Country Private Tour','Next: cancellation policy','Last edited Sun 20 Sep','<span class="link">Continue</span>','<div class="zprog"><i style="width:60%"></i></div>','draft')+lc('sigiriya',pill('Live','ok'),'Sigiriya sunrise climb','USD 140 per adult · Moderate policy','<b>4.9</b> · 51 reviews','Next: Wed 23 Sep')+lc('pidurangala',pill('Live','ok'),'Pidurangala sunset hike','USD 50 per adult · Moderate policy','<b>4.8</b> · 22 reviews','Next: today, 4 PM')+lc('kandy-temple',pill('Live','ok'),'Kandy temple and tea country','USD 140 per adult · Flexible policy','<b>5.0</b> · 13 reviews','Next: today, 6:30 PM')+lc('mirissa-whale',pill('Paused by you','neu'),'Mirissa whale watching','Paused until Sat 1 Nov, outside the season','No bookings','<span class="link">Resume</span>')+'''
 </div>
</div>'''))
# ---------- Z9 MESSAGES ----------
def it(av,name,sub,msg,tm,on=False,unread=False,cn=False):
    return f'<div class="it{" on" if on else ""}"><span class="av2{" cn" if cn else ""}">{av}</span><div><b>{name}</b><small>{sub}</small><p>{msg}</p></div><div class="tm3">{tm}{"<em></em>" if unread else ""}</div></div>'
F.append(frame('z9','Partner · Messages · desktop 1440',hd('Messages')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:56px">
 <div class="pt"><h1>Messages</h1><p><b>1 waiting for you.</b> Travellers see your usual reply time on your listings.</p></div>
 <div class="zmsg">
  <div class="zinbox">
  '''+it('EW','Emma Walsh','Sigiriya sunrise climb · Sat 26 Sep','Could you pick us up from our hotel in Dambulla instead…','7:18 AM',True,True)+it('DO','Daniel Okafor','Pidurangala sunset hike · Wed 23 Sep','Thanks, I\'ve sent the doctor\'s note with my request.','Mon')+it('CN','Ceylon Nooks partner team','Your Galle Fort policy','We\'ve received your new policy and will check it by Wed.','Mon',cn=True)+it('LF','Lena Fischer','Pidurangala sunset hike · today','Great, see you at 3:15!','Sun')+it('HS','Hiro Sato','Sigiriya sunrise climb · Wed 23 Sep','Do we need to bring water?','Sat')+'''
  </div>
  <div class="zthr">
   <div class="th2"><div><b>Emma Walsh</b><small>Sigiriya sunrise climb · Sat 26 Sep · 2 adults</small></div><span class="btn sm">Open booking</span></div>
   <div class="zbub">
    <span class="zsys">Booked Mon 7 Sep</span>
    <div class="zb">Hi Arkam, we're so excited for the sunrise climb! 🌅<small>Mon 7 Sep, 6:02 PM</small></div>
    <div class="zb me2">Hi Emma, thanks for booking! Pickup is at 4:45 AM from your hotel. Bring a light jacket, it's cool before sunrise.<small>Mon 7 Sep, 6:40 PM</small></div>
    <span class="zsys">Today</span>
    <div class="zb">Hi! Could you pick us up from our hotel in Dambulla instead of Sigiriya? We've changed our plans. It's the Amaya Lake hotel.<small>Tue 22 Sep, 7:18 AM</small></div>
   </div>
   <div class="zcomp"><div class="zqr"><span>Yes, pickup changed</span><span>There's an extra charge</span><span>Sorry, we can't</span></div><div class="zbox2"><div class="ta3">Hi Emma, no problem. We'll pick you up from Amaya Lake at 4:30 AM, 15 minutes earlier.</div><span class="btn p">Send</span></div></div>
  </div>
  <div class="zctx"><img src="@img:sigiriya:600" alt=""><b>Sigiriya sunrise climb</b><small>Sat 26 Sep, 5:30 AM · 2 adults</small>
   <div class="kv" style="margin-top:14px"><span>Pickup</span><b>Sigiriya Village, 4:45 AM</b></div><div class="kv"><span>Reference</span><b>CNE71232877</b></div><div class="kv"><span>You receive</span><b>USD 300.17</b></div>
   <div style="margin-top:14px"><span class="btn sm" style="width:100%">Change pickup</span></div>
   <div class="info n" style="margin-top:14px;font-size:12.5px"><svg class="i s" style="margin-top:2px"><use href="#info"/></svg><span>Keep messages here. Payments or contact details shared outside Ceylon Nooks aren't protected.</span></div></div>
 </div>
</div>'''))
# ---------- Z10 MONEY STATEMENTS ----------
def sm(m,sub,b,refunds,net,st):
    return f'<div class="zsm"><div><b>{m}</b><small>{sub}</small></div><div>{b}</div><div class="n2 n">{refunds}</div><div class="n2 n">{net}</div><div style="text-align:right">{st}</div></div>'
F.append(frame('z10','Partner · Money · Statements · desktop 1440',hd('Money')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt" style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px"><div><h1>Money</h1><p>Monthly statements for your records and your accountant.</p></div><div class="seg"><span>Payouts</span><span class="on">Statements</span><span>Bank details</span></div></div>
 <div class="zst">
  <div>
   <div class="zsm" style="background:transparent;border:0;padding:0 20px;margin-top:0;font-size:12.5px;font-weight:700;color:var(--mut)"><span>Month</span><span>Bookings</span><span style="text-align:right">Refunds, USD</span><span style="text-align:right">Paid to you, LKR</span><span></span></div>
   '''+sm('September 2026','so far, final on 1 Oct','26 bookings · 61 guests','−530.65','250,500.14','<span class="zp neu">Not final yet</span>')+sm('August 2026','ST-2608-00418','31 bookings · 70 guests','−107.20','1,021,446.80','<span class="link">PDF</span>')+sm('July 2026','ST-2607-00418','28 bookings · 66 guests','0.00','944,102.37','<span class="link">PDF</span>')+sm('June 2026','ST-2606-00418','19 bookings · 41 guests','−53.60','601,880.12','<span class="link">PDF</span>')+sm('May 2026','ST-2605-00418','12 bookings · 25 guests','0.00','352,410.66','<span class="link">PDF</span>')+'''
   <div style="margin-top:14px;font-size:13.5px;color:var(--mut)">You joined in May 2026, so these are all your statements.</div>
  </div>
  <div class="zside">
   <div class="zbox"><h3>2026 so far</h3><div class="big2 n">LKR 3,170,340</div><p>Paid to your bank from 1 January to today.</p>
    <div class="kv" style="margin-top:10px"><span>VAT collected for you</span><b class="n">USD 1,804.32</b></div><div class="kv"><span>Commission</span><b class="n">USD 1,002.40</b></div><div class="kv"><span>VAT handling fee</span><b class="n">USD 79.75</b></div>
    <div style="margin-top:12px"><span class="btn sm" style="width:100%"><svg class="i s"><use href="#dl"/></svg>Download the year as CSV</span></div></div>
   <div class="info n"><svg class="i s" style="margin-top:2px"><use href="#info"/></svg><span>Statements aren't tax invoices. Ceylon Nooks sends a separate monthly invoice for commission and the VAT handling fee.</span></div>
  </div>
 </div>
</div>'''))
# ---------- Z11 BANK DETAILS ----------
F.append(frame('z11','Partner · Money · Bank details · desktop 1440',hd('Money')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt" style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px"><div><h1>Money</h1><p>Where your payouts go, every Monday and Thursday.</p></div><div class="seg"><span>Payouts</span><span>Statements</span><span class="on">Bank details</span></div></div>
 <div class="zst">
  <div>
   <div class="zsec"><div class="zbank"><span class="bi"><svg class="i"><use href="#bank"/></svg></span><div><b style="font-size:17px">Commercial Bank, ending 3307</b><div style="font-size:13.5px;color:var(--mut);margin-top:3px">LKR account · Arkam Sahdi Tours (Pvt) Ltd · Dambulla branch</div></div>'''+pill('Checked','ok')+'''</div>
    <div class="zfg"><div><label>Account name</label><div class="v2 ro">Arkam Sahdi Tours (Pvt) Ltd</div></div><div><label>Account number</label><div class="v2 ro">•••• •••• 3307</div></div><div><label>Bank</label><div class="v2 ro">Commercial Bank of Ceylon</div></div><div><label>Branch</label><div class="v2 ro">Dambulla</div></div></div>
    <div class="zbar" style="margin-top:22px;padding-top:18px"><span class="btn">Change bank account</span><span style="font-size:13px;color:var(--mut)">Used for all payouts. One account per currency.</span></div></div>
   <div class="zsec"><h2>Payout schedule</h2><p class="lead">Bookings that ended are paid on the next Monday or Thursday, in LKR. The exchange rate is fixed when the payout runs.</p>
    <div class="kv" style="display:flex;justify-content:space-between;font-size:14px;padding:12px 0;border-bottom:1px solid var(--line);margin-top:10px;color:var(--body)"><span>Next payout</span><b style="color:var(--ink)">Thu 24 Sep · about LKR 143,714</b></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;padding:12px 0;color:var(--body)"><span>After that</span><b style="color:var(--ink)">Mon 28 Sep</b></div></div>
  </div>
  <div class="zside"><div class="zbox"><h3>Changing your bank account</h3><p>For your safety, our team checks a new account before it's used. Payouts keep going to the old one until then, usually within 1 working day.</p><p>We'll email and WhatsApp you when the change is made, and if you didn't make it, call us straight away.</p></div></div>
 </div>
</div>'''))
# ---------- Z12 ACCOUNT ----------
def mrow(t,s,w,e): return f'<div class="zmsgh"><div><b>{t}</b><small>{s}</small></div><div class="c"><span class="ztog{"" if w else " off"}"><i></i></span></div><div class="c"><span class="ztog{"" if e else " off"}"><i></i></span></div></div>'
F.append(frame('z12','Partner · Account · Business and notifications · desktop 1440',hd('Account')+'''
<div class="px-p" style="padding-top:32px;padding-bottom:64px">
 <div class="pt"><h1>Account</h1><p>Your business details, team and how we reach you.</p></div>
 <div class="zacc">
  <div class="zsub"><span class="on"><svg class="i s"><use href="#user"/></svg>Business</span><span><svg class="i s"><use href="#users"/></svg>Team</span><span><svg class="i s"><use href="#bell"/></svg>Notifications</span><span><svg class="i s"><use href="#shield"/></svg>Sign-in and security</span><span><svg class="i s"><use href="#doc"/></svg>Agreement</span></div>
  <div>
   <div class="zsec"><h2>Business</h2><p class="lead">Travellers see your trading name and photo on every listing.</p>
    <div class="zfg"><div><label>Trading name</label><div class="v2">Arkam Sahdi Tours</div></div><div><label>Registered name</label><div class="v2 ro">Arkam Sahdi Tours (Pvt) Ltd</div></div><div><label>Business registration</label><div class="v2 ro">PV 00248117</div></div><div><label>VAT registration</label><div class="v2 ro">Registered · 114 228 900 7000</div></div><div><label>Phone for our team</label><div class="v2">+94 77 555 0142</div></div><div><label>Email</label><div class="v2">bookings@arkamtours.lk</div></div></div>
    <div class="info n" style="margin-top:18px"><svg class="i s" style="margin-top:2px"><use href="#info"/></svg><span>You're VAT registered, so 18% VAT is added to your prices and paid to you. To change this, message our team.</span></div></div>
   <div class="zsec"><h2>Notifications</h2><p class="lead">Refund requests and cancellations always come by WhatsApp and email, so you can't miss a deadline.</p>
    <div class="zmsgh" style="font-size:12.5px;font-weight:700;color:var(--mut);padding-top:16px"><span>Message</span><span class="c">WhatsApp</span><span class="c">Email</span></div>
    '''+mrow('Refund requests','Always on: they have a reply deadline',True,True)+mrow('New bookings','Including pay-later bookings',True,True)+mrow('Messages from travellers','After 10 minutes unread',True,False)+mrow('Payouts and statements','When a payout is sent',False,True)+mrow('Reviews','When a traveller leaves a review',False,True)+'''</div>
   <div class="zsec"><h2>Team</h2><p class="lead">People who can use this dashboard. Guides only see their own trips.</p>
    <table class="ztbl"><tr><th>Name</th><th>Role</th><th>Can see money</th></tr><tr><td><b>Arkam Sahdi</b> (you)</td><td>Owner</td><td>Yes</td></tr><tr><td><b>Nuwan Perera</b></td><td>Guide</td><td>No</td></tr><tr><td><b>Shalini Fernando</b></td><td>Bookings manager</td><td>No</td></tr></table>
    <div style="margin-top:14px"><span class="btn sm"><svg class="i s"><use href="#plus"/></svg>Invite someone</span></div></div>
  </div>
 </div>
</div>'''))
# ---------- PHONES ----------
F.append(phone('z13','Partner · Today · phone 390','''<div class="phd"><!--LOGOSM--><span class="sp" style="flex:1"></span><span class="icb" style="width:36px;height:36px"><svg class="i s"><use href="#bell"/></svg><span class="dot"></span></span></div>
<div class="zph"><div class="hi">Good morning, Arkam</div><div class="hi2">2 things need you today.</div>
<div class="zpn"><span class="k2">Refund request</span><b>Daniel Okafor asked for a refund</b><div style="font-size:13px;color:var(--mut);margin-top:2px">Pidurangala sunset hike · Wed 23 Sep</div><div class="r2"><strong>7 h 53 m</strong><span class="btn p sm">Reply</span></div></div>
<div class="zpn2"><span class="k2" style="color:var(--info)">Message, 3 hours ago</span><b>Emma Walsh is waiting</b><p>“Could you pick us up from our hotel in Dambulla…”</p></div>
<div class="zh2" style="margin-top:18px">Today, Tue 22 Sep</div>
<div class="zpt" style="opacity:.55"><span class="tm">5:30</span><div><b>Sigiriya sunrise climb</b><small>Olivia Chen · 2 adults · ended</small></div></div>
<div class="zpt"><span class="tm">4:00</span><div><b>Pidurangala sunset hike</b><small>Lena Fischer + 3 · pickup 3:15 PM</small></div></div>
<div class="zpt" style="border-bottom:0"><span class="tm">6:30</span><div><b>Kandy temple and tea country</b><small>Ravi Menon · 1 adult</small></div></div>
</div>'''+tb('Today')))
F.append(phone('z14','Partner · Booking details, bottom of page · phone 390','''<div class="pgh"><svg class="i bkk"><use href="#arrow"/></svg>Emma Walsh, Sat 26 Sep</div>
<div class="zph">
<div class="rc" style="padding:14px 16px"><h3>Your money</h3><div class="ln" style="font-size:13.5px"><span>Your price, 2 adults</span><span class="dl"></span><span class="v n">280.00</span></div><div class="ln" style="font-size:13.5px"><span>VAT for you</span><span class="dl"></span><span class="v n">+50.40</span></div><div class="ln" style="font-size:13.5px"><span>Commission 10%</span><span class="dl"></span><span class="v n">−28.00</span></div><div class="ln" style="font-size:13.5px"><span>VAT handling</span><span class="dl"></span><span class="v n">−2.23</span></div><div class="ln sum" style="font-size:14.5px"><span>You receive</span><span class="dl"></span><span class="v n">USD 300.17</span></div></div>
<div class="zbox" style="margin-top:12px;padding:16px"><h3>Booking actions</h3><div style="display:flex;flex-direction:column;gap:8px;margin-top:10px"><span class="btn sm">Message Emma</span><span class="btn sm">Change pickup or guide</span><span class="btn sm">Offer another date</span></div></div>
<div style="margin-top:28px;padding-top:16px;border-top:1px solid var(--line);font-size:13px;color:var(--mut);line-height:1.6">Booking reference CNE71232877<br>Emma paid by card on Mon 7 Sep<br><b style="color:var(--body)">Something wrong with this booking?</b> <span style="color:var(--body);font-weight:700;text-decoration:underline;text-underline-offset:3px">Get help</span></div>
</div>'''+tb('Bookings')))
# ---------- NOTES ----------
F.append('''<div class="fig-frame doc" id="z15" data-name="Notes · The rest of the partner dashboard">
<div class="k">Notes · partner dashboard</div>
<h1 style="font-size:40px">The rest of the partner dashboard, and how a partner cancels</h1>
<p class="lede">Seven tabs, one job each. Today puts what needs the partner first, at full size. Every other tab is a place to look things up or change them. Cancelling an accepted booking exists, as Akila asked, but it's deliberately hard to reach.</p>
<div class="flow" style="margin-top:36px">
 <div class="fs"><em>Step 1 · Booking page</em><b>No cancel button</b><span>The booking page only offers helpful actions. At the very bottom, in grey: “Something wrong with this booking? Get help”.</span></div><div class="ar"><svg class="i"><use href="#arrow"/></svg></div>
 <div class="fs"><em>Step 2 · What's the problem?</em><b>Alternatives first</b><span>Move to another date, change the guide or vehicle, message the traveller, cancel a day for weather, or ask our team. “Cancel this booking” is a quiet link under them.</span></div><div class="ar"><svg class="i"><use href="#arrow"/></svg></div>
 <div class="fs"><em>Step 3 · Cancel form</em><b>Reason, consequences, confirm</b><span>A reason and a note are required. The partner sees what they lose, types the booking reference and ticks a box. Within 48 hours of the trip they must call us instead.</span></div><div class="ar"><svg class="i"><use href="#arrow"/></svg></div>
 <div class="fs"><em>Step 4 · Our team</em><b>Checked before it happens</b><span>The booking stays on until our team confirms, within 2 hours. We try to save it first. Only then is the traveller told and fully refunded.</span></div>
</div>
<div class="c2" style="margin-top:40px;gap:48px">
 <div><h2>Questions for Akila</h2><p class="sub" style="max-width:none">1. Should our team check every partner cancellation (as designed), or should it happen straight away?<br>2. Is 48 hours the right cut-off for “call us instead”?<br>3. What happens after repeated cancellations? The design says our team reviews listings at 3 in 12 months. Is there a penalty fee?<br>4. Weather cancellations of a whole day don't count against the partner. Agreed?<br>5. The partner team phone and WhatsApp numbers shown are placeholders. What are the real ones?</p></div>
 <div><h2>How the tabs link</h2><p class="sub" style="max-width:none">Today links to the refund reply, the message thread and the day's bookings. A booking links to its messages, its money and its refund request if there is one. Money has Payouts (already designed), Statements and Bank details. Account holds business details, VAT status, team and WhatsApp or email settings. The Ledger stays admin only, as agreed.</p></div>
</div>
</div>
''')
# ---------- assemble ----------
ICONS='''<svg width="0" height="0" style="position:absolute">
  <symbol id="today" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></symbol>
  <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
  <symbol id="hour" viewBox="0 0 24 24"><path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9"/></symbol>
  <symbol id="info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></symbol>
</svg>'''
html='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Partner dashboard</title><!--V2CSS--><!--PCSS-->'+CSS+'</head><body><!--SPRITE-->'+ICONS+''.join(F)+'</body></html>'
open(os.path.join(D,'dash.html'),'w').write(html)
print('frames',len(F),'KB',len(html)//1024)
