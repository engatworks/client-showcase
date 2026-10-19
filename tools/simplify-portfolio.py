"""Build the small, static Rehab Haider demonstration portfolio."""
import json
from pathlib import Path
from html import escape
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'apps/atelier-08'
cases = json.loads(Path(__file__).with_name('portfolio-content.json').read_text())
selection = [
 ['photo-1600585154340-be6161a56a0c','photo-1600607687939-ce8a6c25118c'],
 ['photo-1616486338812-3dadae4b4ace','photo-1600210492486-724fe5c67fb0'],
 ['photo-1600585152915-d208bec867a1','photo-1600607687644-c7171b42498f'],
 ['photo-1497366754035-f200968a6e72','photo-1486406146926-c627a92ad1ab'],
 ['photo-1600210492486-724fe5c67fb0','photo-1616486338812-3dadae4b4ace'],
 ['photo-1600566753190-17f0baa2a6c3','photo-1600607687939-ce8a6c25118c']
]
descriptions = [
    'دراسة لفكرة المسكن حول فناء داخلي، مع التركيز على الضوء الطبيعي والخصوصية واتصال مساحات العائلة.',
    'دراسة داخلية تجمع درجات محايدة وخامات طبيعية. التركيز على الملمس، والضوء الهادئ، والبساطة في توزيع الأثاث.',
    'تصوّر للضيافة يستكشف العلاقة بين الكتلة والمشهد، والمساحات المفتوحة والممرات المظلّلة.',
    'دراسة لمقر عمل معاصر، من وضوح المدخل إلى مرونة مساحات العمل وحضور الضوء الطبيعي.',
    'دراسة لمساحة استقبال هادئة، توازن بين الجلوس المريح، والإضاءة غير المباشرة، ووضوح الحركة.',
    'تصوّر لمسكن عائلي يدرس الظل والعتبات، وعلاقة المساحات الداخلية بالحديقة والتراس.'
]
for i, p in enumerate(cases):
    p['selected'] = selection[i]
    p['description'] = descriptions[i]
    p['type'] = 'تصميم داخلي' if p['type'] == 'داخلي' else p['type']

def image(p, n=0, prefix='./', card=False):
    key = p['selected'][n].removeprefix('photo-')
    alt = escape(f"مرجع بصري لدراسة {p['name']} — صورة مستقلة وليست من أعمال رحاب حيدر")
    width, height = Image.open(ROOT / 'assets' / f'{key}-1440.webp').size
    sizes = '(max-width: 680px) 100vw, 50vw' if card else '(max-width: 680px) 100vw, 90vw'
    return f'<img src="{prefix}assets/{key}-1440.webp" srcset="{prefix}assets/{key}-640.webp 640w, {prefix}assets/{key}-1440.webp 1440w" sizes="{sizes}" width="{width}" height="{height}" alt="{alt}" loading="{("eager" if n == 0 and not card else "lazy")}" decoding="async">'

def head(title, prefix='./'):
    return f'''<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} | رحاب حيدر</title><meta name="description" content="رحاب حيدر — معرض تصوّري للعمارة والتصميم الداخلي. دراسات بصرية مختصرة وصور مرجعية.">
<meta name="theme-color" content="#faf9f6"><link rel="icon" href="{prefix}favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{prefix}portfolio.css?v=2"><script src="{prefix}gallery.js?v=2" defer></script></head><body>
<a class="skip" href="#main">تجاوز إلى المحتوى</a><div class="shell">
<header class="header"><a class="brand" href="{prefix}index.html" aria-label="رحاب حيدر — الرئيسية"><img src="{prefix}favicon.svg" width="36" height="36" alt=""><span><strong>رحاب حيدر</strong><small lang="en" dir="ltr">REHAB HAIDER</small></span></a><nav aria-label="التنقل الرئيسي"><a href="{prefix}index.html#work">المشاريع</a><a href="{prefix}index.html#about">عن المعرض</a></nav></header>'''

def footer(prefix='./'):
    return f'''<footer><span>رحاب حيدر <span lang="en" dir="ltr">/ REHAB HAIDER</span></span><a href="{prefix}index.html#work">جميع المشاريع ←</a><small>نسخة عرض تصوّرية · الصور مراجع مستقلة وليست أعمالًا منسوبة إلى رحاب حيدر.</small></footer></div>
<dialog id="viewer" aria-label="عرض الصورة"><button class="close" type="button" aria-label="إغلاق الصورة">إغلاق ×</button><img alt=""><p>صورة مرجعية مستقلة · ليست صورة لمشروع منفّذ</p></dialog></body></html>'''

cards = ''.join(f'''<article class="card"><a href="./projects/{p['slug']}.html">{image(p,card=True)}<div class="card-meta"><div><h2>{p['name']}</h2><p>{p['type']} · دراسة تصوّرية</p></div><span class="number" aria-hidden="true">{i+1:02} ↗</span></div></a></article>''' for i,p in enumerate(cases))
home = head('العمارة والتصميم الداخلي') + f'''<main id="main"><section class="intro"><div><p class="eyebrow" lang="en" dir="ltr">ARCHITECTURE & INTERIORS</p><h1>العمارة والتصميم الداخلي.</h1></div><p class="intro-note">مساحات، مواد، وضوء.<br>مجموعة من الدراسات البصرية في العمارة والتصميم الداخلي.</p></section>
<section id="work" aria-labelledby="work-title"><div class="section-heading"><h2 id="work-title">دراسات مختارة</h2><span>٠١ — ٠٦</span></div><p class="disclosure">مشاريع افتراضية لأغراض العرض. الصور مراجع بصرية مستقلة، وليست صورًا لهذه المشاريع أو أعمالًا موثّقة لرحاب حيدر.</p><div class="grid">{cards}</div></section>
<section id="about" class="about"><h2>عن المعرض</h2><div><p>معرض تصوّري باسم رحاب حيدر، يجمع أفكارًا للعمارة السكنية والتصميم الداخلي ومساحات العمل والضيافة.</p><p class="muted">كل دراسة تقدّم فكرة مختصرة ومراجع بصرية للأجواء والمواد. هذا المعرض لا يوثّق مشاريع منفّذة أو خبرات مهنية معتمدة.</p></div></section></main>''' + footer()
(ROOT/'index.html').write_text(home)
(ROOT/'projects').mkdir(exist_ok=True)
for i,p in enumerate(cases):
    next_p=cases[(i+1)%len(cases)]
    figures=''.join(f'''<figure class="project-image"><a href="../assets/{photo.removeprefix('photo-')}-1440.webp" data-viewer aria-label="تكبير الصورة المرجعية {n+1}">{image(p,n,'../')}</a><figcaption><span>{'المرجع الرئيسي' if n==0 else 'مرجع إضافي للأجواء والمواد'}</span><span>صورة مرجعية مستقلة / {n+1:02}</span></figcaption></figure>''' for n,photo in enumerate(p['selected']))
    page=head(p['name'],'../')+f'''<main id="main"><a class="back" href="../index.html#work">→ جميع المشاريع</a><section class="project-intro"><div><p class="eyebrow">{p['type']} / دراسة تصوّرية</p><h1>{p['name']}</h1></div><div><p class="description">{p['description']}</p><p class="themes">{' · '.join(p['theme'])}</p></div></section><p class="disclosure">تصوّر غير منفّذ. الصور التالية مراجع مستقلة للفكرة والمواد، وليست صورًا لنفس المبنى أو أعمالًا منسوبة إلى رحاب حيدر.</p><div class="gallery">{figures}</div><nav class="project-navigation" aria-label="تصفح المشاريع"><a href="../index.html#work">→ العودة إلى المشاريع</a><a href="./{next_p['slug']}.html"><small>الدراسة التالية</small><strong>{next_p['name']} ←</strong></a></nav></main>'''+footer('../')
    (ROOT/'projects'/f"{p['slug']}.html").write_text(page)

# Existing deep links continue to work, including old fragment links.
(ROOT/'project.html').write_text(head('المشاريع')+'''<main id="main" class="about"><h1>المشاريع</h1><p><a href="./index.html#work">استعرض جميع المشاريع ←</a></p></main><script src="./project.js?v=2"></script>'''+footer())
slugs=json.dumps([p['slug'] for p in cases])
(ROOT/'project.js').write_text(f"'use strict';\nconst validCases = {slugs};\nconst requested = new URLSearchParams(location.search).get('case');\nlocation.replace(validCases.includes(requested) ? './projects/' + requested + '.html' : './index.html#work');\n")
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://atelier-08-demo.pages.dev/'+p+'</loc></url>' for p in ['']+['projects/'+p['slug']+'.html' for p in cases])+'</urlset>')
Path('/tmp/rehab-assets.json').write_text(json.dumps(sorted(set(x for p in cases for x in p['selected']))))
