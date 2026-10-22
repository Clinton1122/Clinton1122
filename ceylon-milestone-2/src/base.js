const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const svg=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
function toast(m){const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200)}
const IMG='{{IMG}}';
/* photo path; the single-file build swaps in embedded copies */
const pic=f=>(typeof IMGS!=='undefined'&&IMGS[f.replace('.jpg','')])||IMG+f;

/* ---------- currency: rates of 9 Oct 2026 (open.er-api.com), rounded ---------- */
const CUR={USD:{r:1,s:'USD',n:'US dollar'},AUD:{r:1.4379,s:'AUD',n:'Australian dollar'},EUR:{r:.8923,s:'EUR',n:'Euro'},GBP:{r:.7565,s:'GBP',n:'British pound'},JPY:{r:158.03,s:'JPY',n:'Japanese yen'}};
const FLAG={
 USD:'<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#fff"/><path d="M0 1h16M0 4h16M0 7h16M0 10h16M0 13h16" stroke="#D2232A" stroke-width="1.5"/><rect width="8" height="8" fill="#2B3A8C"/></svg>',
 AUD:'<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#1F3A8A"/><path d="M0 0l8 8M8 0L0 8" stroke="#fff" stroke-width="1.6"/><path d="M4 0v8M0 4h8" stroke="#D2232A" stroke-width="1.4"/><circle cx="12" cy="11" r="1.2" fill="#fff"/><circle cx="4" cy="12.5" r="1.4" fill="#fff"/></svg>',
 EUR:'<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#1F3A8A"/><g fill="#F7C948">'+[...Array(10)].map((_,i)=>{const a=i/10*2*Math.PI;return `<circle cx="${(8+4.6*Math.cos(a)).toFixed(1)}" cy="${(8+4.6*Math.sin(a)).toFixed(1)}" r=".8"/>`}).join('')+'</g></svg>',
 GBP:'<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#1F3A8A"/><path d="M0 0l16 16M16 0L0 16" stroke="#fff" stroke-width="3"/><path d="M8 0v16M0 8h16" stroke="#fff" stroke-width="4.5"/><path d="M8 0v16M0 8h16" stroke="#D2232A" stroke-width="2.4"/></svg>',
 JPY:'<svg viewBox="0 0 16 16"><rect width="16" height="16" fill="#fff"/><circle cx="8" cy="8" r="3.6" fill="#D2232A"/></svg>'};
let cur='USD';
const fmt=v=>{const c=CUR[cur],x=v*c.r;return cur==='JPY'?`${c.s} ${Math.round(x).toLocaleString('en-US')}`:`${c.s} ${x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`};
const fmt0=v=>{const c=CUR[cur],x=v*c.r;return `${c.s} ${Math.round(x).toLocaleString('en-US')}`};
if($('#curmenu'))$('#curmenu').innerHTML+=Object.entries(CUR).map(([k,c])=>`<button role="menuitemradio" aria-checked="${k===cur}" data-cur="${k}"><span class="flag">${FLAG[k]}</span>${k}<span class="n">${c.n}</span></button>`).join('');
function setCur(k){cur=k;try{localStorage.setItem('cn-cur',k)}catch(e){}
  if($('#cur-lab'))$('#cur-lab').textContent='ENG | '+k;if($('#cur-flag'))$('#cur-flag').innerHTML=FLAG[k];
  $$('#curmenu [data-cur]').forEach(b=>b.setAttribute('aria-checked',b.dataset.cur===k));
  $$('[data-p]').forEach(e=>e.textContent=fmt(+e.dataset.p));$$('[data-p0]').forEach(e=>e.textContent=fmt0(+e.dataset.p0));
  if(window.onCur)onCur()}
if($('#cur-flag'))$('#cur-flag').innerHTML=FLAG.USD;
/* keep the traveller's currency from page to page (this browser only) */
try{const c=localStorage.getItem('cn-cur');if(c&&CUR[c]&&c!=='USD')setCur(c)}catch(e){}

/* ---------- signed in or not (prototype: kept in this browser) ---------- */
let SIGNED=false;try{SIGNED=localStorage.getItem('cn-auth')==='1'}catch(e){}
function setSigned(v){SIGNED=v;document.body.classList.toggle('signed-in',v);try{localStorage.setItem('cn-auth',v?'1':'0')}catch(e){}}
setSigned(SIGNED);
/* Opens the sign-in sheet. Calls next() once the traveller has signed in or created an account. */
function requireAuth(next,mode='login',why=''){
  if(SIGNED){next&&next();return}
  let a=$('#auth');if(!a){document.body.insertAdjacentHTML('beforeend','<div class="auth-scrim" id="auth-scrim"></div><div class="auth" id="auth" role="dialog" aria-modal="true" aria-labelledby="auth-h"></div>');a=$('#auth')}
  const reg=mode==='register';
  a.innerHTML=`<button class="icon-btn x" data-auth-close aria-label="Close"><svg class="i"><use href="#i-x"/></svg></button>
   <h2 id="auth-h">${why?why:reg?'Create your account':'Log in to Ceylon Nooks'}</h2><p class="sub">${why?'It takes a few seconds, and your booking details will be filled in for you.':reg?'Save trips, book faster and manage every booking in one place.':'Welcome back.'}</p>
   <div class="sso"><button class="btn" data-auth-go><svg class="glogo" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continue with Google</button><button class="btn" data-auth-go><svg class="alogo" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-4.1zM13.9 5c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg>Continue with Apple</button></div>
   <div class="or">or</div>
   <form id="auth-f"><label for="auth-em">Email</label><input type="email" id="auth-em" autocomplete="email" placeholder="you@example.com" required><button class="btn primary go" type="submit">Continue with email</button></form>
   <p class="fine">${reg?'Already have an account? <a href="#" data-auth="login">Log in</a>':'New to Ceylon Nooks? <a href="#" data-auth="register">Create an account</a>'}</p>`;
  a.classList.add('open');$('#auth-scrim').classList.add('open');setTimeout(()=>$('#auth-em')?.focus(),60);
  const done=()=>{close();setSigned(true);toast('Signed in as John Carter');next&&next()};
  const close=()=>{a.classList.remove('open');$('#auth-scrim').classList.remove('open')};
  $('#auth-f').onsubmit=e=>{e.preventDefault();done()};
  a.onclick=e=>{const b=e.target.closest('button,a');if(!b)return;if(b.dataset.authGo!==undefined)done();if(b.dataset.authClose!==undefined)close();if(b.dataset.auth){e.preventDefault();e.stopPropagation();requireAuth(next,b.dataset.auth,why)}};
  $('#auth-scrim').onclick=close;
}


/* Payment brand marks, drawn inline so they work offline in the prototype */
const PAYMARK={
  VISA:'<svg class="pmk" viewBox="0 0 38 24" aria-label="Visa"><rect x=".5" y=".5" width="37" height="23" rx="3.5" fill="#fff" stroke="#E4E4E7"/><text x="19" y="16" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="10" font-weight="900" font-style="italic" fill="#1A1F71">VISA</text></svg>',
  MASTERCARD:'<svg class="pmk" viewBox="0 0 38 24" aria-label="Mastercard"><rect x=".5" y=".5" width="37" height="23" rx="3.5" fill="#fff" stroke="#E4E4E7"/><circle cx="15.5" cy="12" r="6.5" fill="#EB001B"/><circle cx="22.5" cy="12" r="6.5" fill="#F79E1B"/><path d="M19 6.5a6.5 6.5 0 0 1 0 11 6.5 6.5 0 0 1 0-11z" fill="#FF5F00"/></svg>',
  AMEX:'<svg class="pmk" viewBox="0 0 38 24" aria-label="American Express"><rect width="38" height="24" rx="4" fill="#1F72CD"/><text x="19" y="15.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="8.5" font-weight="900" fill="#fff">AMEX</text></svg>',
  gpay:'<svg class="pmk" viewBox="0 0 50 24" aria-label="Google Pay"><rect x=".5" y=".5" width="49" height="23" rx="11.5" fill="#fff" stroke="#DADCE0"/><g transform="translate(7 5) scale(.29)"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></g><text x="22" y="16" font-family="Arial,Helvetica,sans-serif" font-size="10.5" font-weight="500" fill="#3C4043">Pay</text></svg>',
  apay:'<svg class="pmk" viewBox="0 0 50 24" aria-label="Apple Pay"><rect width="50" height="24" rx="5" fill="#000"/><g transform="translate(9 5) scale(.55)" fill="#fff"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-4.1zM13.9 5c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></g><text x="22" y="16.5" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="11" font-weight="600" fill="#fff">Pay</text></svg>',
  alipay:'<svg class="pmk" viewBox="0 0 50 24" aria-label="Alipay"><rect x=".5" y=".5" width="49" height="23" rx="4" fill="#fff" stroke="#E4E4E7"/><rect x="5" y="5" width="14" height="14" rx="3.5" fill="#1677FF"/><text x="12" y="15.6" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="900" fill="#fff">支</text><text x="22" y="15.8" font-family="Arial,Helvetica,sans-serif" font-size="9" font-weight="700" fill="#1677FF">Alipay</text></svg>'
};

/* ---------- natural search: keywords, trip lengths and places in one box ---------- */
const S_EXP=[['Kandy Cultural City Tour','Private tour · Kandy','kandy-temple.jpg',['kandy','temple','culture','city tour','tooth']],['Sigiriya and Dambulla day trip','Private tour · Sigiriya','sigiriya.jpg',['sigiriya','rock','fortress','dambulla','day trip','climb']],['Blue whale watching in Mirissa','Boat trip · Mirissa','mirissa-whale.jpg',['whale','mirissa','boat','dolphin']],['Ella Rock day hike','Small group · Ella','ella-nine-arch.jpg',['ella','hike','hiking','trek','trekking','rock']],['Nine Arches Bridge and tea estate walk','Activity · Ella','ella-nine-arch.jpg',['nine arch','bridge','tea','ella','walk']],['Yala leopard safari','Jeep safari · Yala','pidurangala.jpg',['yala','safari','leopard','wildlife','jeep']],['Udawalawe elephant safari','Jeep safari · Udawalawe','pidurangala.jpg',['udawalawe','safari','elephant','wildlife']],['Galle Fort walking tour','Small group · Galle','galle-fort.jpg',['galle','fort','walk','colonial']],['Colombo city tour by tuk-tuk','Small group · Colombo','colombo.jpg',['colombo','city tour','tuk','food']],['Anuradhapura ancient city by bicycle','Small group · Anuradhapura','anuradhapura.jpg',['anuradhapura','ancient','bike','bicycle','cycling']],['Adam’s Peak night climb','Small group · Adam’s Peak','adams-peak.jpg',['adam','peak','climb','hike','pilgrimage']],['3-day Cultural Triangle tour','Multi-day · from Colombo','sigiriya.jpg',['3 day','cultural triangle','multi-day','sigiriya','kandy']],['2-week Sri Lanka itinerary with a driver','Multi-day · island-wide','trincomalee.jpg',['2 week','itinerary','driver','round trip']]];
const S_PLACE=[['Ella','Uva Province'],['Kandy','Central Province'],['Sigiriya','Cultural Triangle'],['Galle','Southern Province'],['Mirissa','South coast'],['Colombo','Western Province'],['Anuradhapura','Cultural Triangle'],['Trincomalee','East coast'],['Arugam Bay','East coast'],['Jaffna','Northern Province'],['Nuwara Eliya','Hill Country'],['Yala National Park','Southern Province'],['Udawalawe National Park','Sabaragamuwa'],['Nine Arches Bridge','Ella, Uva Province'],['Sigiriya Rock Fortress','Matale District']];
const S_KEY=['safari','whale watching','hiking','trekking','temple','surf','cooking class','tea','train','elephant','bike tour','city tour','snorkelling','diving','ayurveda','day trip','itinerary','food tour'];
function parseIntent(q){const t=q.toLowerCase(),out=[];
  const d=t.match(/(\d+|one|two|three|four|five|six|seven)\s*-?\s*(hour|day|night|week|month)s?/);
  if(d){const n={one:1,two:2,three:3,four:4,five:5,six:6,seven:7}[d[1]]||+d[1];out.push(['Trip length',`${n} ${d[2]}${n>1?'s':''}`])}
  S_KEY.filter(k=>{const w=k.split(' ')[0];return t.includes(k)||(w.length>3&&w!=='day'&&new RegExp('\\b'+w).test(t))}).slice(0,2).forEach(k=>out.push(['Activity',k[0].toUpperCase()+k.slice(1)]));
  S_PLACE.filter(([p])=>t.includes(p.toLowerCase().split(' ')[0])).slice(0,1).forEach(([p])=>out.push(['Place',p]));
  return out}
const hl=(s,q)=>{if(!q)return s;const i=s.toLowerCase().indexOf(q.toLowerCase());return i<0?s:s.slice(0,i)+'<mark>'+s.slice(i,i+q.length)+'</mark>'+s.slice(i+q.length)};
function suggestHTML(q){
  q=q.trim();
  const qs=t=>`?from=search&q=${encodeURIComponent(t)}`;
  if(!q)return `<h5>Popular searches</h5>`+[['Sigiriya','pin'],['Whale watching','wave'],['Ella train and tea walks','route'],['3-day tours','cal'],['Yala safari','paw'],['Kandy cooking class','pot']].map(([t,ic])=>`<a href="category.html${qs(t)}" role="option"><span class="si">${svg(ic)}</span>${t}</a>`).join('')+
    `<h5>By trip length</h5>`+['Day trips','2 to 3 days','1 week','2 weeks'].map(t=>`<a href="category.html${qs(t)}" role="option"><span class="si">${svg('clock')}</span>${t}</a>`).join('');
  const t=q.toLowerCase(),words=t.split(/\s+/).filter(w=>w.length>1&&!/^\d+$/.test(w)&&!['day','days','week','weeks','tour','tours','trip','trips','in','to','the','and'].includes(w));
  const score=x=>words.reduce((a,w)=>a+(x[0].toLowerCase().includes(w)||x[3].some(k=>k.includes(w)||w.includes(k))?1:0),0)+(t.match(/\d+\s*-?\s*day/)&&x[0].match(/\d-day/)?1:0)+(t.includes('week')&&x[0].includes('week')?2:0);
  const exp=S_EXP.map(x=>[x,score(x)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  const pl=S_PLACE.filter(([p,r])=>words.some(w=>p.toLowerCase().includes(w)||r.toLowerCase().includes(w)));
  const it=parseIntent(q);
  let rows=[`<a href="category.html${qs(q)}" role="option" aria-selected="true"><span class="si">${svg('search')}</span><span>Search for “${q.replace(/</g,'&lt;')}”<small>All matching experiences</small></span></a>`];
  if(it.length)rows.push(`<div class="intent">${it.map(([k,v])=>`<span>${k}: ${v}</span>`).join('')}</div>`);
  const ex=exp.slice(0,5).map(x=>`<a href="listing.html${qs(q)}" role="option"><span class="si"><img src="${pic(x[2])}" alt=""></span><span>${hl(x[0],words[0]||'')}<small>${x[1]}</small></span></a>`);
  const pls=pl.slice(0,Math.max(1,9-1-ex.length)).map(([p,r])=>`<a href="category.html${qs(q)}" role="option"><span class="si">${svg('pin')}</span><span>${hl(p,words.find(w=>p.toLowerCase().includes(w))||'')}<small>${r}</small></span></a>`);
  if(ex.length)rows.push('<h5>Experiences</h5>',...ex);
  if(pls.length)rows.push('<h5>Places</h5>',...pls);
  if(!ex.length&&!pls.length)rows.push(`<p style="font-size:13px;color:var(--cn-muted);padding:6px 10px 10px">No exact matches yet. Search anyway and we’ll show the closest experiences.</p>`);
  return rows.join('');
}
/* hook any input up to a suggestion box; at most 10 suggestions are shown */
function attachSearch(input,box,opts={}){
  if(!input||!box)return;
  const show=()=>{box.innerHTML=suggestHTML(input.value);box.classList.add('open');opts.onShow&&opts.onShow()};
  input.addEventListener('focus',show);input.addEventListener('input',show);
  input.addEventListener('keydown',e=>{const o=$$('a[role=option]',box);let i=o.findIndex(a=>a.getAttribute('aria-selected')==='true');
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();i=(i+(e.key==='ArrowDown'?1:-1)+o.length)%o.length;o.forEach((a,j)=>a.setAttribute('aria-selected',j===i))}
    if(e.key==='Enter'){e.preventDefault();const a=o[i]||o[0];if(a)location.href=a.getAttribute('href')}
    if(e.key==='Escape'){box.classList.remove('open');input.blur()}});
  document.addEventListener('click',e=>{if(!box.classList.contains('static')&&!e.target.closest('#'+box.id)&&e.target!==input)box.classList.remove('open')});
}
attachSearch($('#hs-in'),$('#hs-sugg'));
attachSearch($('#ms-in'),$('#ms-sugg'));
$('#hsearch')?.addEventListener('submit',e=>e.preventDefault());
/* ---------- breadcrumbs: one sliding line on phones, with "Back to results" only after a search ---------- */
const FROM=new URLSearchParams(location.search),FROM_SEARCH=FROM.get('from')==='search',FROM_Q=FROM.get('q')||'';
function setupCrumbs(){
  $$('nav.crumbs,nav.tcrumbs').forEach(nav=>{
    const row=document.createElement('div');row.className='crumbrow';nav.before(row);
    const cs=getComputedStyle(nav);row.style.padding=cs.padding;nav.style.padding='0';
    if(FROM_SEARCH&&!/category/i.test(location.pathname))row.insertAdjacentHTML('beforeend',`<a class="crumb-back" href="category.html?from=search&q=${encodeURIComponent(FROM_Q)}">${svg('chev')}<span>Back to results</span></a>`);
    row.appendChild(nav);
    /* the fade shows only on a side that has more to see, like the photo rows */
    const upd=()=>{nav.classList.toggle('more-l',nav.scrollLeft>2);nav.classList.toggle('more-r',nav.scrollLeft+nav.clientWidth<nav.scrollWidth-2)};
    if(nav.scrollWidth-nav.clientWidth>6)nav.scrollLeft=nav.scrollWidth;upd();nav.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  });
}
setupCrumbs();
/* a listing opened from search results keeps that trail */
if(FROM_SEARCH)document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href');if(/^(listing\.html|Ceylon-Listing\.html)(#|$)/.test(h))a.setAttribute('href',h.replace(/(\.html)/,`$1?from=search&q=${encodeURIComponent(FROM_Q)}`))},true);$('#msearch-f')?.addEventListener('submit',e=>e.preventDefault());

/* ---------- dropdown menus: open on hover with a short delay, or on click and keyboard ---------- */
let mmTimer=null;
function openMM(k){$$('.mm').forEach(p=>p.hidden=p.dataset.panel!==k);$$('.mtrig').forEach(b=>b.setAttribute('aria-expanded',b.dataset.mm===k))}
function closeMM(){$$('.mm').forEach(p=>p.hidden=true);$$('.mtrig').forEach(b=>b.setAttribute('aria-expanded','false'))}
$$('.mtrig').forEach(b=>{
  b.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches){clearTimeout(mmTimer);mmTimer=setTimeout(()=>openMM(b.dataset.mm),120)}});
  b.addEventListener('click',()=>{clearTimeout(mmTimer);b.getAttribute('aria-expanded')==='true'?closeMM():openMM(b.dataset.mm)});
  b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();openMM(b.dataset.mm);$(`#mm-${b.dataset.mm} a`)?.focus()}});
});
$('#site')?.addEventListener('mouseleave',()=>{clearTimeout(mmTimer);mmTimer=setTimeout(closeMM,180)});
$('#site')?.addEventListener('mouseenter',()=>clearTimeout(mmTimer));
$$('.mm').forEach(p=>p.addEventListener('mouseenter',()=>clearTimeout(mmTimer)));

/* ---------- shared header events ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('button,a,[data-close]');
  if($('#curmenu')&&!e.target.closest('.cur'))$('#curmenu').classList.remove('open');
  if(!e.target.closest('#site'))closeMM();
  if(!b)return;
  if(b.id==='cur-btn'){const m=$('#curmenu'),o=!m.classList.contains('open');m.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
  if(b.dataset.cur){setCur(b.dataset.cur);$('#curmenu').classList.remove('open');toast('Prices now in '+b.dataset.cur)}
  if(b.id==='hamb'){$('#drawer').classList.add('open');$('#scrim').classList.add('open');b.setAttribute('aria-expanded','true')}
  if(b.hasAttribute('data-close')&&$('#drawer')){$('#drawer').classList.remove('open');$('#scrim').classList.remove('open');$('#hamb').setAttribute('aria-expanded','false')}
  if(b.dataset.openSearch!==undefined){$('#msearch').hidden=false;document.body.style.overflow='hidden';$('#ms-in').focus()}
  if(b.dataset.closeSearch!==undefined){$('#msearch').hidden=true;document.body.style.overflow=''}
  if(b.dataset.auth&&!b.closest('#auth')){e.preventDefault();$('#drawer')?.classList.remove('open');$('#scrim')?.classList.remove('open');requireAuth(null,b.dataset.auth);return}
  if(b.tagName==='A'&&b.getAttribute('href')==='#'&&!b.dataset.auth){e.preventDefault();toast('Opens the page (prototype)')}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMM();$('#drawer')?.classList.remove('open');$('#scrim')?.classList.remove('open');$('#curmenu')?.classList.remove('open');if($('#msearch')&&!$('#msearch').hidden){$('#msearch').hidden=true;document.body.style.overflow=''}$('#auth')?.classList.remove('open');$('#auth-scrim')?.classList.remove('open')}});

/* ---------- dark mode switch: the choice is remembered, otherwise the device setting is followed ---------- */
const themeNow=()=>document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
function themeLabels(){const d=themeNow()==='dark';$$('[data-theme-toggle]').forEach(b=>{if(b.classList.contains('dtheme')){b.setAttribute('aria-pressed',d);}else{b.setAttribute('aria-label',d?'Switch to light mode':'Switch to dark mode');b.title=d?'Light mode':'Dark mode';}})}
function setTheme(t,save){document.documentElement.setAttribute('data-theme',t);if(save)try{localStorage.setItem('cn-theme',t)}catch(e){}themeLabels();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-theme-toggle]');if(b)setTheme(themeNow()==='dark'?'light':'dark',true)});
try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{let s=null;try{s=localStorage.getItem('cn-theme')}catch(_){}if(!s)setTheme(e.matches?'dark':'light')})}catch(e){}
themeLabels();
