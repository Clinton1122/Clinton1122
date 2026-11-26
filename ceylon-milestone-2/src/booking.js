/* ================= Booking rules shared by listing, checkout and confirmation ================= */
/* Prototype clock: Tue 13 Oct 2026, 10:00 in Colombo. All times are Sri Lanka time. */
const NOW=new Date('2026-10-13T10:00:00+05:30'), HOUR=36e5, DAY=24*HOUR;
const FREE_H=48, BNPL_D=5, FEE=.05, FEE_MIN=1, SERVICE=.079, VAT=.18;
const RATE={adult:100,child:70};
const fd=(d,o)=>d.toLocaleDateString('en-GB',{timeZone:'Asia/Colombo',...o});
const ft=d=>d.toLocaleTimeString('en-US',{timeZone:'Asia/Colombo',hour:'numeric',minute:'2-digit'});
const dLong=d=>fd(d,{weekday:'short',day:'numeric',month:'short'});
const dYear=d=>fd(d,{weekday:'short',day:'numeric',month:'short',year:'numeric'});

/* listing settings (the host chooses these when creating the listing) */
const L={
  host:'Aravinda Perera',hostShort:'Aravinda',
  policy:'moderate',      // 'flexible' | 'moderate' | 'strict' preset, 'custom' = host's own tiers, 'nonref'
  bnpl:true,              // host accepts Reserve now, pay later
  custom:'Free cancellation up to 72 hours before the tour starts, for a full refund less the payment processing fee. Between 72 and 24 hours, 50% back. Less than 24 hours, no refund. If I cancel for weather or safety, you get a full refund or a free new date.',
  customShort:'Full refund up to 72 hours before. 50% back from 72 to 24 hours.',
  customTiers:[[72,100],[24,50]], // hours before the start, % of the booking back
  creds:{sltda:true,police:true},
  vat:true,               // host is VAT registered: VAT (18%) is collected for the host on top of their price
  langs:['English','Sinhala','Tamil']
};
/* booking state */
const S={date:null,time:'08:00',adults:2,children:0};
const startAt=()=>S.date?new Date(`${S.date}T${S.time}:00+05:30`):null;
const r2=n=>Math.round(n*100)/100;
const lines=()=>{const a=S.adults*RATE.adult,c=S.children*RATE.child;return {a,c,sub:a+c,fee:r2((a+c)*SERVICE),vat:L.vat?r2((a+c)*VAT):0}};
const total=()=>{const l=lines();return r2(l.sub+l.fee+l.vat-(S.disc||0))};
/* Fees: one line on the listing ("Service fee & VAT" or "Service fee") with the breakdown in a tooltip;
   two separate lines on checkout, confirmation and every booking detail page after payment. */
const FEE_TIP='This helps us operate our platform and offer 24/7 customer support for your orders.';
const VAT_TIP='Your host is VAT registered. We collect this on their behalf and pass it on in full.';
const tip=(label,body,aria)=>`<span class="tip">${label}<button type="button" aria-label="${aria||'More about '+label}"><svg class="i"><use href="#i-info"/></svg></button><span class="bub" role="tooltip">${body}</span></span>`;
function feeRows(l,split,row){
  if(!split){const lab=l.vat?'Service fee &amp; VAT':'Service fee';
    return row(tip(lab,l.vat?`<span class="brk"><span>Service fee</span><span>${fmt(l.fee)}</span></span><span class="brk"><span>VAT (18%), collected for the host</span><span>${fmt(l.vat)}</span></span>`:FEE_TIP,'What is included?'),fmt(r2(l.fee+l.vat)))}
  return row(tip('Service fee',FEE_TIP,'What is the service fee?'),fmt(l.fee))+(l.vat?row(tip('VAT (18%), collected for the host',VAT_TIP,'About VAT'),fmt(l.vat)):'')}
let POPSTYLE='brand';   // popup 4 state A colour: 'brand' (orange tint) or 'positive' (soft green), for review
const gw=t=>Math.max(FEE_MIN,Math.round(t*FEE*100)/100);

/* Cancellation policies (brief, Nov 2026): every policy is a list of tiers, shown to travellers
   as real dates. A refund is that % of the booking; 5% of the amount refunded (min USD 1) is kept as
   a processing fee, none if the host cancels. Cancelling inside a tier is instant. */
const POL={flexible:{name:'Flexible',tiers:[[48,100]]},moderate:{name:'Moderate',tiers:[[168,100],[72,50]]},
  strict:{name:'Strict',tiers:[[336,100],[168,50]]},custom:{name:'Host’s own',tiers:null},nonref:{name:'Non-refundable',tiers:[]}};
const pol=()=>POL[L.policy==='site'?'moderate':L.policy]||POL.moderate;
const tiersOf=()=>L.policy==='custom'?L.customTiers:pol().tiers;
const relH=h=>h>=48?`${h/24} days`:`${h} hours`;
const pctTxt=p=>p===100?'Full refund':`${p}% back`;
/* dated tiers for the chosen start: [{p, until}] */
const dated=()=>{const s=startAt();return s?tiersOf().map(([h,p])=>({p,h,until:new Date(+s-h*HOUR)})):[]};
const pctNow=()=>{const s=startAt();if(!s)return 100;const left=(s-NOW)/HOUR;const t=tiersOf().find(([h])=>left>=h);return t?t[1]:0};
const fullEnd=()=>{const t=dated().find(x=>x.p===100);return t?t.until:null};
/* pay later: charged on the earlier of 5 days before the start or 2 days before the full refund ends,
   offered only if there are 3 days left to remind before that, never on non-refundable listings */
const chargeOn=()=>{const s=startAt(),a=new Date(+s-BNPL_D*DAY),f=fullEnd();return f&&+f-2*DAY<+a?new Date(+f-2*DAY):a};
const remindOn=()=>new Date(+chargeOn()-3*DAY);
const bnplOk=()=>L.bnpl&&L.policy!=='nonref'&&!!fullEnd()&&NOW<remindOn();
const cutoff=()=>fullEnd()||startAt();
/* which situation applies now
   1: refundable and pay later possible   2: refundable, pay now   3: nothing back if cancelled now */
function scenario(){
  if(L.policy==='nonref')return 3;
  if(!startAt())return 1;
  if(pctNow()===0)return 3;
  return bnplOk()?1:2;
}
/* the policy as lines of text: dated when there's a date, relative when not */
function polText(all){const d=dated().filter(x=>all||x.until>NOW);
  if(!tiersOf().length)return ['No refund if you cancel'];
  if(startAt())return [...d.map(x=>`${pctTxt(x.p)} until ${dLong(x.until)}, ${ft(x.until)}${x.until<=NOW?' (ended)':''}`),'No refund after that'];
  return [...tiersOf().map(([h,p])=>`${pctTxt(p)} up to ${relH(h)} before`),`No refund in the last ${relH(tiersOf().at(-1)[0])}`]}
/* the policy drawn as a line of stretches, widths in proportion to the time between booking and start */
function polTrack(){const s=startAt(),d=dated();if(!s||!d.length)return '';
  const span=+s-NOW,pts=d.map(x=>Math.max(0,+x.until-NOW)),cls=p=>p===100?'f':p>=50?'h':'q';
  let prev=0,segs='';d.forEach((x,i)=>{const w=pts[i]-prev;if(w>0)segs+=`<i class="${cls(x.p)}" style="flex:${w}"></i>`;prev=Math.max(prev,pts[i])});
  segs+=`<i class="z" style="flex:${Math.max(span-prev,span*.04)}"></i>`;
  return `<div class="ptrack" aria-hidden="true">${segs}</div>`}

/* Trust signal rows under Reserve Now, per the trust-link spec */
function trustRows(sc){
  const s=startAt();
  const icon=n=>`<span class="ic"><svg class="i"><use href="#i-${n}"/></svg></span>`;
  if(sc===3) return `<div class="trow amber">${icon('alert')}<div class="tx"><button class="tl" data-pop="cancel">${L.policy==='nonref'?'Non-refundable':'No refund for this date'}</button><span class="td">${L.policy==='nonref'?'This listing doesn’t offer refunds. Check the date and details before you book.':`Your start time is inside the last ${relH(tiersOf().at(-1)[0])}, so cancelling wouldn’t give anything back.`}</span></div></div>`;
  const src=L.policy==='custom'?`${L.hostShort}’s own policy`:`${pol().name} policy`;
  const pt=polText();
  const cRow=`<div class="trow">${icon(L.policy==='custom'?'doc':'clockback')}<div class="tx"><button class="tl" data-pop="cancel">${s?pt[0]:pt[0]}</button><span class="td">${pt.slice(1,-1).map(x=>'Then '+x.charAt(0).toLowerCase()+x.slice(1)).join('. ')}${pt.length>2?'. ':''}${src}. Less a 5% processing fee.</span></div></div>`;
  if(!L.bnpl||L.policy==='nonref')return cRow;
  const bRow=sc===1
    ? `<div class="trow bnpl">${icon('wallet')}<div class="tx"><button class="tl" data-pop="bnpl">Reserve now &amp; pay later</button><span class="td">${s?`Nothing to pay today. Charged automatically on ${dLong(chargeOn())}.`:'Nothing to pay today. Choose a date to see when you’d be charged.'}</span></div></div>`
    : `<div class="trow off">${icon('card')}<div class="tx"><b class="tl">Pay now required</b><span class="td">Pay later needs time for a reminder before the charge, so it isn’t available this close to the date.</span></div></div>`;
  return cRow+bRow;
}
/* ---------- popups 4 and 5 ---------- */
const mhead=t=>`<div class="grab"></div><div class="mh"><h2 id="m-title">${t}</h2><button class="icon-btn" data-mclose aria-label="Close"><svg class="i"><use href="#i-x"/></svg></button></div>`;
function feeBox(){const t=total(),p=pctNow(),r=r2(t*p/100),f=r?Math.min(r,gw(r)):0;
  return `<div class="feebox"><h4><svg class="i"><use href="#i-card"/></svg>Payment processing fee (5% of the refund, min. USD 1)</h4><p>When a paid booking is cancelled, the payment gateway charges to send the money back. We keep 5% of the amount refunded to cover it. There’s no fee if your host cancels.</p>
  <table><tr><td>Your booking amount</td><td>${fmt(t)}</td></tr><tr><td>${startAt()?`If you cancel today (${p}%)`:'Refund (100%)'}</td><td>${fmt(r)}</td></tr><tr><td>Processing fee, 5% of ${fmt(r)}</td><td>− ${fmt(f)}</td></tr><tr class="tot"><td>Back to your card</td><td>${fmt(r2(r-f))}</td></tr></table>
  <p class="est">Cancelling inside your policy is instant. Refunds reach your card within 5 to 10 working days, depending on your bank.</p></div>`}
function popCancel(){
  const sc=scenario(),s=startAt(),pt=polText(),src=L.policy==='custom'?`${L.hostShort}’s own policy`:`${pol().name} policy`;
  const stateA=`<div class="pstate${POPSTYLE==='positive'?' pos':''}"><svg class="i"><use href="#i-shield"/></svg><span><b>${pt[0]}</b><small>${src}${s?'':'. Choose a date to see the exact dates.'}</small></span></div>
    ${polTrack()}
    <ul class="rules">${pt.map((x,i)=>`<li><span class="dot ${i===pt.length-1?'no':'ok'}"><svg class="i"><use href="#i-${i===pt.length-1?'x':'check'}"/></svg></span><span><b style="color:var(--cn-ink)">${x}</b>${i===pt.length-1?'':', less the processing fee'}.</span></li>`).join('')}
      <li><span class="dot ok"><svg class="i"><use href="#i-check"/></svg></span><span><b style="color:var(--cn-ink)">If ${L.hostShort} cancels:</b> everything back, with no fee.</span></li></ul>
    <p style="font-size:13px;color:var(--cn-muted);margin-top:8px">Times are Sri Lanka time. Cancelling inside the policy is instant, from your booking.</p>
    <div class="resched"><svg class="i"><use href="#i-cal"/></svg><span><b>Plans changed? Move your date instead.</b> Change your date as often as you like at no cost, as long as your host has availability.</span></div>`;
  const stateB=`<div class="pstate amber"><svg class="i"><use href="#i-alert"/></svg><span><b>${L.policy==='nonref'?'This booking is non-refundable':'No refund for this date'}</b><small>${L.policy==='nonref'?'The host doesn’t offer refunds on this listing.':`Your start time is inside the last ${relH(tiersOf().at(-1)[0])}, so the refund periods have passed.`}</small></span></div>
    <div class="exc"><b>If something serious happens</b>You can still ask for a refund from your booking. We ask ${L.hostShort} first, then our team decides. Your booking stays on while we look at it.</div>`;
  openModal(`${mhead('Cancellation policy')}<div class="mb-body">${sc===3?stateB:stateA}${sc===3?'':feeBox()}<a class="mlink" href="#" data-act="sitepol">View full cancellation policy<svg class="i"><use href="#i-arrow"/></svg></a></div>`);
}
function popBnpl(){
  const s=startAt(),t=total(),f=gw(t);
  openModal(`${mhead('Reserve now &amp; pay later')}<div class="mb-body"><p>Secure your spot today with no upfront payment. Your card is charged automatically on the earlier of 5 days before your experience or 2 days before your full refund ends. No extra fees.</p>
  <ol class="ssteps">
   <li><span class="n">1</span><div><b>Find your experience</b><p>Choose the experience you love. Your spot is held with no upfront payment.</p></div></li>
   <li><span class="n">2</span><div><b>Make a reservation</b><p>Reserve now with zero stress. Your card is checked but not charged.</p>${s?`<span class="when">Today</span>`:''}</div></li>
   <li><span class="n">3</span><div><b>Payment is automatic</b><p>We’ll email you a reminder 3 days before the charge, so you always have time to cancel for free.</p>${s?`<span class="when">Charged on ${dLong(chargeOn())}</span>`:''}</div></li>
   <li><span class="n">4</span><div><b>Enjoy your experience</b><p>You’re all set. Have a fantastic time!</p>${s?`<span class="when">${dLong(s)}, ${ft(s)}</span>`:''}</div></li>
  </ol>
  <div class="cancel2"><h4>If you need to cancel</h4>
   <div class="r"><svg class="i"><use href="#i-check"/></svg><span><b style="color:var(--cn-ink)">Before the automatic charge</b>${s?` (before ${dLong(chargeOn())})`:''}: your card is never charged. No fee.</span></div>
   <div class="r fee"><svg class="i"><use href="#i-card"/></svg><span><b style="color:var(--cn-ink)">After the charge</b>: you get back what your policy gives, less 5% of the amount refunded for payment processing. For a full refund on this booking: ${fmt(t)} less ${fmt(f)}, so ${fmt(t-f)} comes back to you.</span></div></div>
  <a class="mlink" href="#" data-act="bnplpol">View full Reserve now &amp; pay later policy<svg class="i"><use href="#i-arrow"/></svg></a></div>`);
}
/* a host credential: what it means and what we checked. Shared by the listing and the host profile. */
const CRED={sltda:['badge','Registered with Sri Lanka Tourism','Aravinda is registered with the Sri Lanka Tourism Development Authority (SLTDA) as a national tourist guide. Registered guides have passed the SLTDA training and exam, and are licensed to guide visitors anywhere in Sri Lanka.',[['Licence type','National tourist guide'],['Registration no.','SLTDA/NG/2041'],['Valid until','March 2027'],['Checked by Ceylon Nooks','2 October 2026']]],
           police:['shield','Police clearance checked','Aravinda gave us a police clearance report issued by the Sri Lanka Police. It confirms there are no criminal records.',[['Issued by','Sri Lanka Police, Kandy'],['Issued','14 August 2026'],['Checked by Ceylon Nooks','2 October 2026']]],
           id:['user','ID verified','Aravinda’s name and photo were matched to a government ID (national identity card) when the account was set up.',[['Document','Sri Lankan national identity card'],['Checked by Ceylon Nooks','11 March 2019']]]};
function popCred(k){
  const [ic,t,p,dl]=CRED[k];
  openModal(`${mhead(t)}<div class="mb-body credm"><span class="ic"><svg class="i"><use href="#i-${ic}"/></svg></span><p>${p}</p><dl>${dl.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl><p style="font-size:12.5px;color:var(--cn-muted);margin-top:16px">${k==='id'?'Every host verifies their ID before they can take bookings. We don’t show the document itself.':'Hosts share these documents with us by choice. We check them before the badge appears, and again when they expire. We don’t show the documents themselves.'}</p></div>`);
}
let lastFocus=null;
function openModal(h){lastFocus=document.activeElement;$('#modal').innerHTML=h;$('#modal').classList.add('open');$('#mscrim').classList.add('open');setTimeout(()=>$('#modal [data-mclose]').focus(),60)}
function closeModal(){$('#modal').classList.remove('open');$('#mscrim').classList.remove('open');lastFocus?.focus?.()}

