"""Static release checks. Does not replace hardware/browser acceptance testing."""
from pathlib import Path
import re
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
class Inspector(HTMLParser):
    def __init__(self): super().__init__();self.ids=set();self.links=[];self.scripts=[]
    def handle_starttag(self,t,a):
        a=dict(a)
        if a.get('id'):
            assert a['id'] not in self.ids, f'duplicate id: {a["id"]}'
            self.ids.add(a['id'])
        if t=='a':self.links.append(a.get('href',''))
        if t=='script' and a.get('src'):self.scripts.append(a['src'])
for page in [ROOT/'index.html',ROOT/'projects/heart-monitor.html']:
    assert page.exists(),page
    parser=Inspector();parser.feed(page.read_text())
    for target in parser.links + parser.scripts:
        if target.startswith('mailto:') or target.startswith(('https://','http://','tel:')) or not target: continue
        f=target.split('#')[0].split('?')[0]
        if not f: continue
        f=(page.parent/f).resolve()
        assert f.exists(),f'missing local resource in {page.name}: {target}'
    if page.name=='index.html':
        for important in ['hero-canvas','work','three-phase','ac-scope','simulator','about','contact','ac-current','ac-reactive']:
            assert important in parser.ids,important
for f in ['main.js','director.js','three-phase.js','styles.css','director.css','three-phase.css','case-study.css','favicon.svg']:
    assert (ROOT/f).exists(),f
js=(ROOT/'three-phase.js').read_text()
assert 'Math.sqrt(3)*v*f' in js and 'Math.acos(f)' in js
print('PASS: routes, IDs, local resources, interactive AC lab, supporting assets')