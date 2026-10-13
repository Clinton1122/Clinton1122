/* ================= Trip tools: one trip shared by every tool =================
   Saved in this browser only (localStorage), so answers carry from tool to tool.
   In the build, signed-in travellers would keep it on their account. */
const PLACES=['Colombo','Negombo','Kandy','Sigiriya','Anuradhapura','Polonnaruwa','Trincomalee','Jaffna','Nuwara Eliya','Ella','Yala','Arugam Bay','Galle','Mirissa','Hikkaduwa','Udawalawe'];
const TRIP_DEF={start:'',end:'',adults:2,children:0,stops:[],style:'mid'};
let TRIP=Object.assign({},TRIP_DEF);
try{Object.assign(TRIP,JSON.parse(localStorage.getItem('cn-trip')||'{}'))}catch(e){}
function saveTrip(){try{localStorage.setItem('cn-trip',JSON.stringify(TRIP))}catch(e){}renderTripBar();if(window.onTrip)onTrip()}
const tDays=()=>TRIP.start&&TRIP.end?Math.max(1,Math.round((new Date(TRIP.end)-new Date(TRIP.start))/864e5)+1):0;
const dShort=s=>new Date(s+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
function tripDatesTxt(){return TRIP.start&&TRIP.end?`${dShort(TRIP.start)} to ${dShort(TRIP.end)} · ${tDays()} days`:'No dates yet'}
function renderTripBar(){
  const el=$('#tripbar');if(!el)return;
  el.innerHTML=`<div class="wrap"><span class="lab">Your trip</span><span><svg class="i"><use href="#i-cal"/></svg><b>${tripDatesTxt()}</b></span><span><svg class="i"><use href="#i-users"/></svg><b>${TRIP.adults} adult${TRIP.adults>1?'s':''}${TRIP.children?`, ${TRIP.children} child${TRIP.children>1?'ren':''}`:''}</b></span><span><svg class="i"><use href="#i-pin"/></svg><b>${TRIP.stops.length?TRIP.stops.join(', '):'0 stops'}</b></span><span><svg class="i"><use href="#i-globe"/></svg><b>Prices in ${cur}</b></span><button data-trip-edit>Edit trip</button></div>`;
}
function tripModal(){
  let m=$('#tm');if(!m){document.body.insertAdjacentHTML('beforeend','<div class="tm-scrim" id="tm-scrim"></div><div class="tm" id="tm" role="dialog" aria-modal="true" aria-labelledby="tm-h"></div>');m=$('#tm')}
  const T=Object.assign({},TRIP,{stops:[...TRIP.stops]});
  const draw=()=>{m.innerHTML=`<div class="h"><h2 id="tm-h">Your trip</h2><button class="icon-btn" data-tm-close aria-label="Close"><svg class="i"><use href="#i-x"/></svg></button></div>
   <div class="b"><div class="q two"><div><label for="tm-s">Arrive</label><input type="date" id="tm-s" value="${T.start}" min="2026-10-13"></div><div><label for="tm-e">Leave</label><input type="date" id="tm-e" value="${T.end}" min="${T.start||'2026-10-13'}"></div></div>
   <div class="q"><span class="ql">Travellers</span>${[['adults','Adults','Age 12 and over',1],['children','Children','Age 2 to 11',0]].map(([k,l,s,min])=>`<div class="stepper"><span><b>${l}</b><small>${s}</small></span><span class="st"><button type="button" data-tm-g="${k}" data-d="-1" ${T[k]<=min?'disabled':''} aria-label="Fewer ${l.toLowerCase()}">−</button><output>${T[k]}</output><button type="button" data-tm-g="${k}" data-d="1" aria-label="More ${l.toLowerCase()}">+</button></span></div>`).join('')}</div>
   <div class="q"><span class="ql">Places you’re thinking of, in order</span><div class="pills">${PLACES.map(p=>{const i=T.stops.indexOf(p);return `<button type="button" class="pill" data-tm-p="${p}" aria-pressed="${i>=0}">${i>=0?`<b style="font-size:12px">${i+1}</b>`:''}${p}</button>`}).join('')}</div></div></div>
   <div class="f"><button class="btn" data-tm-clear>Clear trip</button><button class="btn primary" data-tm-save>Save trip</button></div>`;
   $('#tm-s').onchange=e=>{T.start=e.target.value;if(T.end&&T.end<T.start)T.end=T.start;draw()};$('#tm-e').onchange=e=>{T.end=e.target.value};};
  draw();m.classList.add('open');$('#tm-scrim').classList.add('open');
  m.onclick=e=>{const b=e.target.closest('button');if(!b)return;const x=b.dataset;
    if(x.tmClose!==undefined){close()}
    if(x.tmG){T[x.tmG]=Math.max(x.tmG==='adults'?1:0,T[x.tmG]+ +x.d);draw()}
    if(x.tmP){const i=T.stops.indexOf(x.tmP);i>=0?T.stops.splice(i,1):T.stops.push(x.tmP);draw()}
    if(x.tmClear!==undefined){Object.assign(TRIP,TRIP_DEF,{stops:[]});saveTrip();close();toast('Trip cleared')}
    if(x.tmSave!==undefined){T.end=$('#tm-e').value||T.end;Object.assign(TRIP,T);saveTrip();close();toast('Trip saved. Every tool now uses it.')}};
  const close=()=>{m.classList.remove('open');$('#tm-scrim').classList.remove('open')};
  $('#tm-scrim').onclick=close;
}
document.addEventListener('click',e=>{if(e.target.closest('[data-trip-edit]'))tripModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#tm')?.classList.contains('open')){$('#tm').classList.remove('open');$('#tm-scrim').classList.remove('open')}});
const _oc=window.onCur;window.onCur=()=>{renderTripBar();_oc&&_oc()};
/* every tool, for the hub and the "next" links */
const TOOLS=[
 ['Decide','tool-quiz','Traveller quiz','Five questions to find the Sri Lanka trip that suits you, with a route to match.','spark',1],
 ['Decide','tool-best-time','Best time to go','Pick your dates. See which coast is dry, what’s on and which days are holidays.','sun',1],
 ['Decide','','Safari park picker','Yala, Udawalawe, Wilpattu or Minneriya, matched to what you want to see.','paw',0],
 ['Plan','','Trip planner','Lay out stops and nights. We flag long drives and rainy stretches as you go.','route',0],
 ['Plan','tool-travel-times','Travel times','Realistic door-to-door times by car, train and bus between 16 places.','car',1],
 ['Plan','tool-budget','Budget','A daily cost range for your travel style, in your currency.','tag',1],
 ['Plan','','Itinerary check','Paste a plan from anywhere. We’ll flag the days that won’t work.','list',0],
 ['Get ready','tool-visa','Visa and entry','Find out if you need a visa, what it costs and how long you can stay.','passport',1],
 ['Get ready','tool-first-24-hours','First 24 hours','Visa, SIM, cash and getting out of the airport, as a checklist.','clock',1],
 ['Get ready','tool-packing-list','Packing list','Built from your route and dates: temples, hills, beaches and monsoon.','bag',1],
 ['Get ready','','Phrase cards','Sinhala and Tamil, with allergy cards you can show at every meal.','chat',0],
 ['On the ground','','Food decoder','What hoppers, kottu and lamprais are, and how spicy they get.','pot',0],
 ['On the ground','','Fair prices','What a tuk-tuk, a coconut or a train ticket should cost.','tag',0]];
/* page links; the single-file build points them at the Ceylon-… copies */
const pageUrl=s=>s+'.html';
const toolCard=([g,href,t,p,ic,live])=>live?`<a class="tcard" href="${pageUrl(href)}"><span class="ic"><svg class="i"><use href="#i-${ic}"/></svg></span><span><h3>${t}</h3><p>${p}</p></span></a>`:`<div class="tcard soon" aria-disabled="true"><span class="ic"><svg class="i"><use href="#i-${ic}"/></svg></span><span><h3>${t}<span class="soon-tag">Soon</span></h3><p>${p}</p></span></div>`;
function nextTools(skip,n=3){const el=$('#next-tools');if(!el)return;const live=TOOLS.filter(x=>x[5]),i=live.findIndex(x=>x[1]===skip);el.innerHTML=[...live.slice(i+1),...live.slice(0,Math.max(i,0))].slice(0,n).map(toolCard).join('')}
renderTripBar();
function markUsed(id){try{const u=JSON.parse(localStorage.getItem('cn-tools-used')||'[]');if(!u.includes(id)){u.push(id);localStorage.setItem('cn-tools-used',JSON.stringify(u))}}catch(e){}}
