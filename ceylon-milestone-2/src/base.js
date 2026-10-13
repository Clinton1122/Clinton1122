
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const svg=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200)}
const IMG='{{IMG}}';
/* photo path; the single-file build swaps in embedded copies */
const pic=f=>(typeof IMGS!=='undefined'&&IMGS[f.replace('.jpg','')])||IMG+f;

/* currency: rates of 9 Oct 2026 (open.er-api.com), rounded */
const CUR={USD:{r:1,s:'USD',n:'US dollar'},AUD:{r:1.4379,s:'AUD',n:'Australian dollar'},EUR:{r:.8923,s:'EUR',n:'Euro'},GBP:{r:.7565,s:'GBP',n:'British pound'},JPY:{r:158.03,s:'JPY',n:'Japanese yen'}};
let cur='USD';
const fmt=v=>{const c=CUR[cur],x=v*c.r;return cur==='JPY'?`${c.s} ${Math.round(x).toLocaleString('en-US')}`:`${c.s} ${x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`};
const fmt0=v=>{const c=CUR[cur],x=v*c.r;return `${c.s} ${Math.round(x).toLocaleString('en-US')}`};
$('#curmenu').innerHTML+=Object.entries(CUR).map(([k,c])=>`<button role="menuitemradio" aria-checked="${k===cur}" data-cur="${k}">${k}<span>${c.n}</span></button>`).join('');
function setCur(k){cur=k;$('#cur-lab').textContent=(innerWidth>600?'ENG · ':'')+k;$$('#curmenu [data-cur]').forEach(b=>b.setAttribute('aria-checked',b.dataset.cur===k));$$('[data-p]').forEach(e=>e.textContent=fmt(+e.dataset.p));$$('[data-p0]').forEach(e=>e.textContent=fmt0(+e.dataset.p0));const o=Object.keys(CUR).filter(x=>x!==k);if(window.onCur)onCur();if($('#alt-cur'))$('#alt-cur').textContent=`Or the same amount in ${o.slice(0,-1).join(', ')} or ${o.at(-1)}.`}

if(innerWidth<=600&&$('#cur-lab'))$('#cur-lab').textContent='USD';

/* shared header: currency menu, drawer, placeholder links */
document.addEventListener('click',e=>{
  const b=e.target.closest('button,a,[data-close]');
  if($('#curmenu')&&!e.target.closest('.cur'))$('#curmenu').classList.remove('open');
  if(!b)return;
  if(b.id==='cur-btn'){const m=$('#curmenu'),o=!m.classList.contains('open');m.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
  if(b.dataset.cur){setCur(b.dataset.cur);$('#curmenu').classList.remove('open');toast('Prices now in '+b.dataset.cur)}
  if(b.id==='hamb'){$('#drawer').classList.add('open');$('#scrim').classList.add('open');b.setAttribute('aria-expanded','true')}
  if(b.hasAttribute('data-close')&&$('#drawer')){$('#drawer').classList.remove('open');$('#scrim').classList.remove('open');$('#hamb').setAttribute('aria-expanded','false')}
  if(b.tagName==='A'&&b.getAttribute('href')==='#'){e.preventDefault();toast('Opens the page (prototype)')}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#drawer')){$('#drawer').classList.remove('open');$('#scrim').classList.remove('open');$('#curmenu')?.classList.remove('open')}});
