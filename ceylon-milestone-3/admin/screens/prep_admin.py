import re,os
d=os.path.dirname(os.path.abspath(__file__))
s=open(d+'/admin.html').read()
tabs=[('today','Today',''),('back','Refunds','4'),('wallet','Payouts',''),('cal','Bookings',''),('list','Listings','1'),('doc','Policies','3'),('users','People',''),('gear','Settings','')]
def head(on):
    parts=[]
    for i,n,c in tabs:
        cls=' class="on"' if n==on else ''
        em='<em>'+c+'</em>' if c else ''
        parts.append('<span'+cls+'><svg class="i"><use href="#'+i+'"/></svg>'+n+em+'</span>')
    return ('<div class="hd px-a"><span class="logo"><!--LOGO--><span class="portal">Admin</span></span><span class="srch"><svg class="i s"><use href="#search"/></svg>Search bookings, partners, travellers<kbd>/</kbd></span><span class="sp"></span><span class="slt"><svg class="i s"><use href="#clock"/></svg>Sri Lanka <b>12:10 PM</b></span><span class="icb"><svg class="i"><use href="#bell"/></svg><i class="dot"></i></span><span class="me" style="background:#E4ECF7;color:#244A7A">AL</span></div>'
      '<div class="band px-a"><div class="tray">'+''.join(parts)+'</div></div>')
open(d+'/adminx.html','w').write(re.sub(r'<!--AHEAD:(\w+)-->',lambda m:head(m.group(1)),s))
