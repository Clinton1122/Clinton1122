import re
s=open('dash-built.html').read()
head=s[:s.index('<body>')+6]
body=s[s.index('<body>')+6:s.rindex('</body>')]
first=body.index('<div class="fig-frame')
pre=body[:first]
# split frames by top-level fig-frame starts
starts=[m.start() for m in re.finditer(r'<div class="fig-frame',body)]
frames={}
for i,st in enumerate(starts):
    en=starts[i+1] if i+1<len(starts) else len(body)
    chunk=body[st:en]
    fid=re.search(r'id="(z\d+)"',chunk).group(1);frames[fid]=chunk
groups=[['z1','z2'],['z3','z4','z5'],['z6','z7','z15'],['z8'],['z9','z10','z11'],['z12','z13','z14']]
for gi,g in enumerate(groups):
    open(f'dash-up{gi}.html','w').write(head+pre+''.join(frames[f] for f in g)+'</body></html>')
    print(gi,g,len(open(f'dash-up{gi}.html').read())//1024,'KB')
