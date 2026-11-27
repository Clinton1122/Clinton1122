// One-page flow board: how cancellations link traveller, partner and admin.
const fs=require('fs');const {chromium}=require('playwright');const D=__dirname+'/';
const COLX=[260,600,940,1280,1620,1960,2300], CW=300, TH=170;
const LANE={T:230,P:700,A:1170}, LH=430;
const cardTop=l=>LANE[l]+64;
const cards=[ // key, lane, col, badge, title, caption, image, where in Figma
 ['n1','T',0,'1','Books, with the policy as real dates','The listing, checkout and confirmation show each refund period as a date.','trav-listing-0.png','Traveller cancellation, 1'],
 ['a', 'T',1,'A','Cancels inside a refund period','Instant. The % back, less 5% of the refund. Nobody needs to decide.','trav-dash-2.png','Traveller cancellation, 3'],
 ['n2','T',2,'2','Asks for a refund after the periods','Reason and evidence. The booking stays on while it’s looked at.','trav-dash-4.png','Traveller cancellation, 4'],
 ['d', 'T',4,'D','Gets a new date offer','Accepts it, or says no and it goes to our team.','trav-dash-7.png','Traveller cancellation, 5'],
 ['h', 'T',5,'H','Sees “Your host cancelled”','Everything back, no fee, with other dates to choose.','trav-dash-11.png','Traveller cancellation, 5'],
 ['n7','T',6,'7','Tracker: refund on its way','The outcome and the amount back to their card.','trav-dash-9.png','Traveller cancellation, 5'],
 ['e', 'P',0,'E','Sets the cancellation policy','Listing form, step 4. Live preview of what travellers see and what they receive.','partner-p1.png','Partner cancellation, 4'],
 ['n3','P',2,'3','Gets WhatsApp, email and a badge','The link opens the request straight away.','partner-n1.png','Partner cancellation, 5'],
 ['n4','P',3,'4','Sees it at the top of Refunds','The traveller’s words, the policy as dates and a countdown.','v2-s02.png','Dashboard system plan, 1'],
 ['n5','P',4,'5','Replies in one of four ways','The receipt shows what the traveller gets back and the new payout.','partner-r1.png','Partner cancellation, 1'],
 ['g', 'P',5,'G','Cancels a booking or a whole day','Weather or can’t run it. Full refund to travellers, no fee.','partner-c1.png','Partner cancellation, 3'],
 ['n8','P',6,'8','Sees it in Money','Refunds and cancellations on the next payout and the monthly statement.','money-y1.png','Partner cancellation, 6'],
 ['f', 'A',0,'F','Approves a custom policy','Current and proposed versions side by side. Approve, edit or send back.','adminx-a5.png','Admin cancellation, 3'],
 ['b', 'A',1,'B','Checks automatic refunds','10 a week picked at random. Mark right or flag.','adminx-a6.png','Admin cancellation, 4'],
 ['c', 'A',3,'C','Waits for the partner','Countdown, reminder, and “decide now” for urgent cases.','adminx-a3.png','Admin cancellation, 2'],
 ['n6','A',5,'6','Decides','% of the partner’s price, fee and reason. Three receipts: traveller, partner, Ceylon Nooks.','adminx-a1.png','Admin cancellation, 1'],
];
const pos={};cards.forEach(([k,l,c])=>pos[k]={x:COLX[c],y:cardTop(l),l});
const CH=292; // card height
const mid=k=>({x:pos[k].x+CW/2,y:pos[k].y+CH/2});
const R=k=>({x:pos[k].x+CW,y:pos[k].y+CH/2}), Lf=k=>({x:pos[k].x,y:pos[k].y+CH/2}), Tp=k=>({x:pos[k].x+CW/2,y:pos[k].y}), Bt=k=>({x:pos[k].x+CW/2,y:pos[k].y+CH});
// arrows: points, label, label position index, style
const arrows=[
 [[Tp('e'),Bt('n1')],'Preset policies show straight away',0,''],
 [[Bt('e'),Tp('f')],'A custom policy is checked first',0,''],
 [[Bt('a'),Tp('b')],'Some are sampled',0,'dash'],
 [[Bt('n2'),Tp('n3')],'',0,''],
 [[R('n3'),Lf('n4')],'',0,''],
 [[Bt('n4'),{x:Bt('n4').x,y:Tp('c').y}],'While waiting',0,'dash'],
 [[R('n4'),Lf('n5')],'',0,''],
 [[Tp('n5'),Bt('d')],'If they offer a date',0,'dash'],
 [[Bt('n5'),{x:Bt('n5').x,y:LANE.A+24},{x:mid('n6').x,y:LANE.A+24},Tp('n6')],'Reply goes to our team',1,''],
 [[R('c'),Lf('n6')],'Window closed',0,'dash'],
 [[R('n6'),{x:COLX[6]-22,y:R('n6').y},{x:COLX[6]-22,y:Lf('n7').y},Lf('n7')],'',0,''],
 [[{x:COLX[6]-22,y:Lf('n8').y},Lf('n8')],'',0,''],
 [[Tp('g'),Bt('h')],'',0,''],
 [[R('g'),{x:COLX[6]-36,y:R('g').y+60},{x:COLX[6],y:R('g').y+60}],'',0,'dash'],
];
function path(pts){return 'M'+pts.map(p=>`${p.x},${p.y}`).join(' L')}
function head(a,b){const ang=Math.atan2(b.y-a.y,b.x-a.x),s=11;const p1={x:b.x-s*Math.cos(ang-0.45),y:b.y-s*Math.sin(ang-0.45)},p2={x:b.x-s*Math.cos(ang+0.45),y:b.y-s*Math.sin(ang+0.45)};return `<polygon points="${b.x},${b.y} ${p1.x},${p1.y} ${p2.x},${p2.y}" fill="#1C1A17"/>`}
(async()=>{
 const b=await chromium.launch();const p=await b.newPage();
 const thumb=async f=>{const b64=fs.readFileSync(D+f).toString('base64');return await p.evaluate(async d=>{const im=new Image();im.src=d;await im.decode();const w=600,h=Math.round(600*170/300);const sw=im.naturalWidth,sh=Math.min(im.naturalHeight,Math.round(sw*h/w));const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(im,0,0,sw,sh,0,0,w,Math.round(sh*w/sw));return c.toDataURL('image/jpeg',.84)},'data:image/png;base64,'+b64)};
 let cardsHtml='';
 for(const [k,l,c,badge,t,cap,img,src] of cards){const {x,y}=pos[k];const main=/^[0-9]$/.test(badge);
  cardsHtml+=`<div class="card${main?'':' side'}" style="left:${x}px;top:${y}px"><div class="ct"><span class="bd">${badge}</span><b>${t}</b></div><div class="th"><img src="${await thumb(img)}" alt=""></div><p>${cap}</p><span class="src">Figma: ${src}</span></div>`}
 let svg='',labels='';
 for(const [pts,lab,li,st] of arrows){svg+=`<path d="${path(pts)}" fill="none" stroke="#1C1A17" stroke-width="2"${st?' stroke-dasharray="6 5"':''}/>`+head(pts[pts.length-2],pts[pts.length-1]);
  if(lab){const a=pts[li],z=pts[li+1];labels+=`<span class="lab" style="left:${(a.x+z.x)/2}px;top:${(a.y+z.y)/2}px">${lab}</span>`}}
 const W=2660,H=LANE.A+LH+170;
 const lanes=[['T','Traveller','Ceylon Nooks site and dashboard','#FDF1EA'],['P','Partner','Partner dashboard, WhatsApp and email','#F3EFE9'],['A','Admin','Ceylon Nooks team','#E9EEF6']].map(([k,n,s,c])=>`<div class="lane" style="top:${LANE[k]}px;height:${LH}px;background:${c}"><div class="ln"><b>${n}</b><span>${s}</span></div></div>`).join('');
 const font=fs.readFileSync(D+'fonts/fonts-inline.css','utf8');
 const html=`<!doctype html><html><head><meta charset="utf-8"><style>${font}
 *{box-sizing:border-box;margin:0;padding:0}body{background:#DDD7CE;padding:40px;font-family:Manrope,sans-serif;color:#1C1A17}
 .board{position:relative;width:${W}px;height:${H}px;background:#fff;overflow:hidden}
 .hd{position:absolute;left:60px;top:48px;right:60px}
 .hd .k{font-size:14px;font-weight:700;color:#C43D12}
 .hd h1{font-family:'Bricolage Grotesque',sans-serif;font-size:46px;letter-spacing:-1px;margin-top:6px}
 .hd p{font-size:17px;color:#4A443D;margin-top:8px;max-width:1500px;line-height:1.5}
 .key{position:absolute;right:60px;top:60px;display:flex;gap:22px;font-size:14px;color:#4A443D;align-items:center}
 .key i{display:inline-block;vertical-align:middle;margin-right:8px}
 .lane{position:absolute;left:30px;right:30px;border-radius:24px}
 .ln{position:absolute;left:28px;top:28px;width:180px}
 .ln b{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:28px;letter-spacing:-.5px}
 .ln span{display:block;font-size:14px;color:#6B645C;margin-top:4px;line-height:1.4}
 svg.ar{position:absolute;left:0;top:0}
 .card{position:absolute;width:${CW}px;height:${CH}px;background:#fff;border:1px solid #E7E2DB;border-radius:18px;padding:12px;box-shadow:0 1px 2px rgba(28,26,23,.06)}
 .card.side{border-style:dashed;border-color:#CFC7BC}
 .ct{display:flex;gap:10px;align-items:center;min-height:40px}
 .ct b{font-size:15px;line-height:1.25}
 .bd{flex:none;width:30px;height:30px;border-radius:50%;background:#F15623;color:#fff;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center}
 .side .bd{background:#1C1A17}
 .th{margin-top:8px;height:120px;border-radius:10px;overflow:hidden;border:1px solid #EFEAE3;background:#F7F5F2}
 .th img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
 .card p{font-size:12.5px;line-height:1.4;color:#4A443D;margin-top:8px}
 .src{position:absolute;left:12px;bottom:10px;font-size:11px;font-weight:700;color:#8A8178}
 .lab{position:absolute;transform:translate(-50%,-50%);background:#fff;border:1px solid #E7E2DB;border-radius:999px;padding:4px 10px;font-size:12.5px;font-weight:700;white-space:nowrap;color:#1C1A17}
 </style></head><body><div class="fig-frame board" data-name="Flow · How cancellations link traveller, partner and admin">
 <div class="hd"><div class="k">Cancellations · how it all links together · 27 Nov 2026</div><h1>From a traveller's request to the partner's payout</h1><p>Follow the orange numbers for a refund request, 1 to 8. The black letters are the other ways in: instant cancellations (A, B), the partner setting a policy (E, F), waiting for a reply (C, D) and the partner cancelling (G, H). Each card says where to find the full screen in Figma.</p></div>
 <div class="key"><span><i style="width:22px;height:22px;border-radius:50%;background:#F15623"></i>Main path</span><span><i style="width:22px;height:22px;border-radius:50%;background:#1C1A17"></i>Other ways in</span><span><svg width="44" height="8"><path d="M0 4H44" stroke="#1C1A17" stroke-width="2" stroke-dasharray="6 5"/></svg> Sometimes</span></div>
 ${lanes}<svg class="ar" width="${W}" height="${H}">${svg}</svg>${cardsHtml}${labels}</div></body></html>`;
 fs.writeFileSync(D+'flow.html',html);
 await p.setViewportSize({width:W+80,height:H+80});await p.goto('file://'+D+'flow.html');await p.waitForTimeout(500);
 await (await p.$('.board')).screenshot({path:D+'flow.png'});console.log('ok',Math.round(html.length/1024)+'KB');await b.close();})();
