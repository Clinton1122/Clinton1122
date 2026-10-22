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
  policy:'site',          // 'site' = Ceylon Nooks policy, 'custom' = host's own, 'nonref' = non-refundable listing
  bnpl:true,              // host accepts Reserve now, pay later
  custom:'Free cancellation up to 72 hours before the tour starts, for a full refund less the payment processing fee. Between 72 and 24 hours, 50% back. Less than 24 hours, no refund. If I cancel for weather or safety, you get a full refund or a free new date.',
  customShort:'Full refund up to 72 hours before. 50% back from 72 to 24 hours.',
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

/* Which trust-link scenario applies (spec: akilaliyanage.com/trust-link)
   1: more than 5 days away  -> free cancellation + reserve now, pay later
   2: 48 hours to 5 days     -> free cancellation, pay now required
   3: 48 hours or less       -> non-refundable */
function scenario(){
  if(L.policy==='nonref')return 3;
  const s=startAt(); if(!s)return 1;
  const h=(s-NOW)/HOUR;
  if(h<=FREE_H)return 3;
  if(h<=BNPL_D*24)return 2;
  return 1;
}
const cutoff=()=>new Date(startAt()-FREE_H*HOUR);
const chargeOn=()=>new Date(startAt()-BNPL_D*DAY);

/* Trust signal rows under Reserve Now, per the trust-link spec */
function trustRows(sc){
  const s=startAt(), fee='less a 5% payment processing fee';
  const icon=n=>`<span class="ic"><svg class="i"><use href="#i-${n}"/></svg></span>`;
  if(sc===3) return `<div class="trow amber">${icon('alert')}<div class="tx"><button class="tl" data-pop="cancel">Non-refundable</button><span class="td">${L.policy==='nonref'?'This listing doesn’t offer refunds. Check your date and group before you book.':'Cancellations within 48 hours of your start time are not eligible for a refund.'}</span></div></div>`;
  const cRow=L.policy==='custom'
    ? `<div class="trow">${icon('doc')}<div class="tx"><b class="tl plain">${L.hostShort}’s cancellation policy</b><span class="td">${L.customShort}</span><button class="tl sm" data-goto="cancellation-policy">Read ${L.hostShort}’s full policy</button></div></div>`
    : `<div class="trow">${icon('clockback')}<div class="tx"><button class="tl" data-pop="cancel">Free cancellation</button><span class="td">${s?`Cancel before ${dLong(cutoff())} · ${ft(cutoff())} for a full refund, ${fee}.`:`Cancel up to 48 hours before your start time for a full refund, ${fee}.`}</span></div></div>`;
  if(!L.bnpl)return cRow;
  const bRow=sc===1
    ? `<div class="trow bnpl">${icon('wallet')}<div class="tx"><button class="tl" data-pop="bnpl">Reserve now &amp; pay later</button><span class="td">Secure your spot today. Your card is charged automatically 5 days before your experience${s?`, on ${dLong(chargeOn())}`:''}.</span></div></div>`
    : `<div class="trow off">${icon('card')}<div class="tx"><b class="tl">Pay now required</b><span class="td">Reserve now &amp; pay later isn’t available within 5 days of the service date.</span></div></div>`;
  return cRow+bRow;
}
/* ---------- popups 4 and 5 ---------- */
const mhead=t=>`<div class="grab"></div><div class="mh"><h2 id="m-title">${t}</h2><button class="icon-btn" data-mclose aria-label="Close"><svg class="i"><use href="#i-x"/></svg></button></div>`;
function feeBox(){const t=total(),f=gw(t);
  return `<div class="feebox"><h4><svg class="i"><use href="#i-card"/></svg>Payment processing fee (5%, min. USD 1)</h4><p>When a paid booking is cancelled, our payment gateway charges a fee to reverse the transaction. This 5% fee is passed on at cost. Ceylon Nooks doesn’t keep it.</p>
  <table><tr><td>Your booking amount</td><td>${fmt(t)}</td></tr><tr><td>Refund entitlement (100%)</td><td>${fmt(t)}</td></tr><tr><td>Gateway reversal fee (5%)</td><td>− ${fmt(f)}</td></tr><tr class="tot"><td>Returned to you</td><td>${fmt(t-f)}</td></tr></table>
  <p class="est">Estimate only. The final amount is confirmed when our team reviews it. Refunds reach your card within 5 to 10 business days of approval.</p></div>`}
function popCancel(){
  const sc=scenario(),s=startAt();
  const stateA=`<div class="pstate${POPSTYLE==='positive'?' pos':''}"><svg class="i"><use href="#i-shield"/></svg><span><b>${s?`Free cancellation before ${dYear(cutoff())} · ${ft(cutoff())}`:'Free cancellation up to 48 hours before your start time'}</b><small>Calculated from your start time, not when you cancel. Times are Sri Lanka local time.</small></span></div>
    <ul class="rules"><li><span class="dot ok"><svg class="i"><use href="#i-check"/></svg></span><span><b style="color:var(--cn-ink)">At least 48 hours before:</b> full refund, less the payment processing fee.</span></li><li><span class="dot no"><svg class="i"><use href="#i-x"/></svg></span><span><b style="color:var(--cn-ink)">Less than 48 hours before:</b> no refund.</span></li><li><span class="dot no"><svg class="i"><use href="#i-x"/></svg></span><span><b style="color:var(--cn-ink)">No-show without cancelling:</b> no refund. The host keeps the full payment.</span></li></ul>
    <div class="resched"><svg class="i"><use href="#i-cal"/></svg><span><b>Plans changed? Move your date instead.</b> Change your date as often as you like at no cost, as long as your host has availability.</span></div>`;
  const stateB=`<div class="pstate amber"><svg class="i"><use href="#i-alert"/></svg><span><b>This booking is non-refundable</b><small>${L.policy==='nonref'?'The host doesn’t offer refunds on this listing.':'Your start time is within 48 hours, so the free cancellation window has passed.'}</small></span></div>
    <div class="exc"><b>Exceptional circumstances</b>If you have a genuine emergency, you can still send a request with an explanation. Refunds in these cases are at Ceylon Nooks’ discretion and aren’t guaranteed.</div>`;
  openModal(`${mhead('Cancellation policy')}<div class="mb-body">${sc===3?stateB:stateA}${feeBox()}<a class="mlink" href="#" data-act="sitepol">View full cancellation policy<svg class="i"><use href="#i-arrow"/></svg></a></div>`);
}
function popBnpl(){
  const s=startAt(),t=total(),f=gw(t);
  openModal(`${mhead('Reserve now &amp; pay later')}<div class="mb-body"><p>Secure your spot today with no upfront payment. Your card is charged automatically 5 days before your experience. No extra fees.</p>
  <ol class="ssteps">
   <li><span class="n">1</span><div><b>Find your experience</b><p>Choose the experience you love. Your spot is held with no upfront payment.</p></div></li>
   <li><span class="n">2</span><div><b>Make a reservation</b><p>Reserve now with zero stress. Your card is checked but not charged.</p>${s?`<span class="when">Today</span>`:''}</div></li>
   <li><span class="n">3</span><div><b>Payment is automatic</b><p>We’ll email you a reminder 3 days before the charge. Your card is charged 5 days before your start time.</p>${s?`<span class="when">Charged on ${dLong(chargeOn())}</span>`:''}</div></li>
   <li><span class="n">4</span><div><b>Enjoy your experience</b><p>You’re all set. Have a fantastic time!</p>${s?`<span class="when">${dLong(s)}, ${ft(s)}</span>`:''}</div></li>
  </ol>
  <div class="cancel2"><h4>If you need to cancel</h4>
   <div class="r"><svg class="i"><use href="#i-check"/></svg><span><b style="color:var(--cn-ink)">Before the automatic charge</b> (more than 5 days before): your card is never charged. No fee.</span></div>
   <div class="r fee"><svg class="i"><use href="#i-card"/></svg><span><b style="color:var(--cn-ink)">After the charge</b>: a 5% payment processing fee is taken off. It covers the gateway’s cost of reversing the payment and isn’t kept by Ceylon Nooks. For this booking: ${fmt(t)} × 5% = ${fmt(f)} fee, so ${fmt(t-f)} comes back to you.</span></div></div>
  <a class="mlink" href="#" data-act="bnplpol">View full Reserve now &amp; pay later policy<svg class="i"><use href="#i-arrow"/></svg></a></div>`);
}
let lastFocus=null;
function openModal(h){lastFocus=document.activeElement;$('#modal').innerHTML=h;$('#modal').classList.add('open');$('#mscrim').classList.add('open');setTimeout(()=>$('#modal [data-mclose]').focus(),60)}
function closeModal(){$('#modal').classList.remove('open');$('#mscrim').classList.remove('open');lastFocus?.focus?.()}

