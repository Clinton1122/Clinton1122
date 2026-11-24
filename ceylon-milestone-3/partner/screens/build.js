// Build v2 boards: inline fonts, sprite, logo, resized photos; then screenshot each frame.
const fs=require('fs');const {chromium}=require('playwright');
const dir=__dirname;
const IMG='/home/user/Clinton1122/ceylon-traveller-dashboard/img/';
const SHOTS={'live-refunds':dir+'/../research/live/partner1440/bookings_n_finance_refunds.png'};
(async()=>{
 const b=await chromium.launch();const p=await b.newPage();
 let s=fs.readFileSync(dir+'/'+process.argv[2]+'.html','utf8').replace('<!--V2CSS-->',fs.readFileSync(dir+'/v2.html','utf8').match(/<style>[\s\S]*?<\/style>/)[0]);
 s=s.replace('/*FONTS*/',fs.readFileSync(dir+'/fonts/fonts-inline.css','utf8'));
 s=s.replace('<!--SPRITE-->',fs.readFileSync(dir+'/sprite.svg','utf8'));
 const logo=fs.readFileSync('/home/user/Clinton1122/ceylon-milestone-2/assets/ceylon-logo.svg','utf8').replace(/<\?xml[^>]*>/,'').trim();
 s=s.split('<!--LOGO-->').join(logo);
 s=s.split('<!--LOGOSM-->').join(logo.replace('<svg ','<svg class="lg" '));
 const resize=async(file,w,crop)=>{const b64=fs.readFileSync(file).toString('base64');const mime=file.endsWith('.png')?'image/png':'image/jpeg';
   return await p.evaluate(async([d,w,crop])=>{const im=new Image();im.src=d;await im.decode();
     const sw=im.naturalWidth, sh=crop?Math.min(im.naturalHeight,Math.round(sw*crop)):im.naturalHeight;
     const c=document.createElement('canvas');c.width=w;c.height=Math.round(sh*w/sw);c.getContext('2d').drawImage(im,0,0,sw,sh,0,0,c.width,c.height);
     return c.toDataURL('image/jpeg',0.82);},[`data:${mime};base64,${b64}`,w,crop]);};
 const cache={};
 for(const m of [...new Set(s.match(/@img:[a-z-]+:\d+/g)||[])]){const [,n,w]=m.split(':');cache[m]=await resize(IMG+n+'.jpg',+w);}
 for(const m of [...new Set(s.match(/@shot:[a-z-]+:\d+/g)||[])]){const [,n,w]=m.split(':');cache[m]=await resize(SHOTS[n],+w,0.62);}
 for(const k in cache) s=s.split(k).join(cache[k]);
 fs.writeFileSync(dir+'/'+process.argv[2]+'-built.html',s);
 console.log('size KB',Math.round(s.length/1024));
 await p.setViewportSize({width:1960,height:1200});
 await p.goto('file://'+dir+'/'+process.argv[2]+'-built.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 const fr=await p.$$('.fig-frame');
 for(const f of fr){const id=await f.getAttribute('id');await f.screenshot({path:`${dir}/${process.argv[2]}-${id}.png`});const bb=await f.boundingBox();console.log(id,Math.round(bb.width),Math.round(bb.height));}
 // overflow check: elements wider than their frame
 console.log(await p.evaluate(()=>[...document.querySelectorAll('.fig-frame')].map(f=>{const r=f.getBoundingClientRect();const bad=[...f.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&q.right>r.right+1}).slice(0,3).map(e=>e.className+':'+e.textContent.slice(0,30));return f.id+' '+bad.join(' | ')}).join('\n')));
 await b.close();})();
