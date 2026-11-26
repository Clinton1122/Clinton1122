// Capture traveller cancellation states into self-contained composite pages, one per source page.
const fs=require('fs');const {chromium}=require('playwright');
const O=__dirname+'/';const M2='file:///home/user/Clinton1122/ceylon-milestone-2/';
const DB='file:///home/user/Clinton1122/ceylon-traveller-dashboard/index.html';
async function grab(p,items){ // items: [name,selector,width,setup]
  const frames=[];
  for(const [name,sel,w,setup] of items){
    if(setup)await p.evaluate(setup);await p.waitForTimeout(350);
    const h=await p.evaluate(s=>{const e=document.querySelector(s);return e?e.outerHTML:null},sel);
    if(!h){console.log('missing',name,sel);continue}
    frames.push(`<div class="fig-frame" data-name="${name}" style="width:${w}px;padding:24px;background:var(--cn-page,#F7F5F2);box-sizing:border-box">${h}</div>`);
  }
  return await p.evaluate(fr=>{
    const sprites=[...document.querySelectorAll('body svg')].filter(s=>s.querySelector('symbol')).map(s=>s.outerHTML).join('');
    return '<!doctype html><html'+(document.documentElement.getAttribute('data-theme')?'':'')+'><head>'+document.head.innerHTML.replace(/<script[\s\S]*?<\/script>/g,'')+
      '<style>body{display:flex;flex-direction:column;gap:60px;align-items:flex-start;padding:40px;background:#DDD7CE}.fig-frame .modal,.fig-frame #modal,.fig-frame .dlg{position:static!important;transform:none!important;opacity:1!important;visibility:visible!important;display:block!important;max-height:none!important;inset:auto!important;margin:0!important}.fig-frame .sheet{position:static!important;transform:none!important}</style></head><body>'+sprites+fr.join('')+'</body></html>'},frames);
}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});p.setDefaultTimeout(8000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 // listing
 await p.goto(M2+'listing.html');await p.waitForTimeout(700);
 let html=await grab(p,[
  ['Listing · Cancellation policy, Moderate, date chosen','#cancellation-policy',860,()=>{L.policy='moderate';S.date=PRESET.s1;renderAll()}],
  ['Listing · Booking box, Moderate, pay later','#tsig',460,null],
  ['Listing · Booking box, host’s own policy, 3 days away','#tsig',460,()=>{L.policy='custom';S.date=PRESET.s2;renderAll()}],
  ['Listing · Booking box, no refund for this date','#tsig',460,()=>{L.policy='moderate';S.date=PRESET.s2;renderAll()}],
  ['Listing · Cancellation policy popup','#modal',600,()=>{L.policy='moderate';S.date=PRESET.s1;renderAll();popCancel()}],
 ]);fs.writeFileSync(O+'trav-listing.html',html);
 // checkout
 await p.goto(M2+'checkout.html#d=2026-10-28&t=08:00&a=2&c=0&p=moderate&b=1&v=1');await p.waitForTimeout(700);
 html=await grab(p,[['Checkout · When to pay, Moderate, pay later','#opts',760,()=>{payLater=true;render()}]]);fs.writeFileSync(O+'trav-checkout.html',html);
 // confirmation
 await p.goto(M2+'confirmation.html#ref=CNE71623408&d=2026-10-28&t=08:00&a=2&c=0&p=moderate&b=1&v=1&later=1');await p.waitForTimeout(700);
 html=await grab(p,[['Confirmation · What happens next, pay later','#next',640,null]]);fs.writeFileSync(O+'trav-confirm.html',html);
 // dashboard
 await p.goto(DB);await p.waitForTimeout(900);
 const items=[
  ['Dashboard · Mirissa policy panel, full refund period, not charged yet','#pol-panel',640,()=>openSheet('mirissa')],
  ['Dashboard · Cancel Mirissa, not charged yet','#dlg',560,()=>{closeSheet();cur=trips.find(t=>t.id==='mirissa');cancelStep(1)}],
  ['Dashboard · Cancel inside full refund, paid','#dlg',560,()=>{closeDlg();const t=trips.find(t=>t.id==='mirissa');t.pay={kind:'paid',brand:'Visa',last:'4242',on:t.booked};cur=t;cancelStep(3)}],
  ['Dashboard · Sigiriya policy panel, refund periods ended','#pol-panel',640,()=>{closeDlg();openSheet('sigiriya')}],
  ['Dashboard · Request a refund, step 1','#dlg',560,()=>{closeSheet();cur=trips.find(t=>t.id==='sigiriya');cancelStep(1)}],
  ['Dashboard · Request a refund, sent','#dlg',560,()=>{cur=trips.find(t=>t.id==='sigiriya');cancelStep(4)}],
 ];
 for(const st of ['host','offer','team','refunded','declined','hostcancel'])items.push([`Dashboard · Request tracker · ${{host:'waiting for the host',offer:'new date offered',team:'with our team',refunded:'refunded',declined:'declined, still booked',hostcancel:'host cancelled'}[st]}`,'#req-panel',640,new Function(`closeDlg();const t=trips.find(t=>t.id==='sigiriya');t.req={stage:'${st}',sent:new Date(+NOW-3*HOUR).toISOString(),reason:'Illness or injury'};renderAll();openSheet('sigiriya')`)]);
 html=await grab(p,items);fs.writeFileSync(O+'trav-dash.html',html);
 // render check
 for(const f of ['trav-listing','trav-checkout','trav-confirm','trav-dash']){await p.goto('file://'+O+f+'.html');await p.waitForTimeout(500);
   const n=await p.$$('.fig-frame');let i=0;for(const e of n){await e.screenshot({path:`${O}${f}-${i++}.png`})}console.log(f,n.length,Math.round(fs.statSync(O+f+'.html').size/1024)+'KB');}
 console.log('ERR',errs);await b.close();})();
