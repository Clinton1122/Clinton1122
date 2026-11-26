"""Build Ceylon-Traveller-Dashboard.html: index.html with every img/*.jpg inlined as a data URI."""
import base64, os, re
d = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(d, 'index.html'), encoding='utf-8').read()
def uri(m):
    f = os.path.join(d, m.group(1))
    return 'data:image/jpeg;base64,' + base64.b64encode(open(f, 'rb').read()).decode()
s = re.sub(r'(img/[a-z0-9-]+\.jpg)', uri, s)
open(os.path.join(d, 'Ceylon-Traveller-Dashboard.html'), 'w', encoding='utf-8').write(s)
print(round(len(s) / 1e6, 1), 'MB')
