'use strict';
// REHAB HAIDER / Architecture case studies.
// All six projects are fictional demonstration briefs. The floor plans, elevations,
// sections, zonings and axonometric diagrams are original SVG illustrations.
// Images are architectural mood references, not verified photos of these projects.
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const photo=(id,w=1000)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w='+w+'&q=80';
const cases=[
 {slug:'courtyard',name:'بيت الفناء',city:'الرياض',type:'سكني',year:'2026',area:'680 م²',variant:0,lead:'بيتٌ يلتفّ حول الضوء.',statement:'فناء صغير يصنع حياة كاملة.',story:'يبدأ المشروع بسؤال الخصوصية: كيف نستقبل الضوء، ونحتفظ بهدوء البيت في الوقت نفسه؟ يعيد التصوّر توزيع الحياة اليومية حول فراغ وسطي مضاء. من المدخل إلى المجلس ثم مناطق العائلة، تتدرّج العلاقات بوضوح دون أن تفقد المنزل انفتاحه.',theme:['الفناء الداخلي','الخصوصية المتدرجة','إضاءة طبيعية'],photos:['photo-1600585154340-be6161a56a0c','photo-1600566752355-35792bedcfea','photo-1600607687939-ce8a6c25118c','photo-1600566753190-17f0baa2a6c3','photo-1600210492486-724fe5c67fb0','photo-1600607687644-c7171b42498f']},
 {slug:'material',name:'ملاذ المواد',city:'جدة',type:'داخلي',year:'2025',area:'265 م²',variant:1,lead:'حين يصبح الملمس لغة.',statement:'هدوء لا يحتاج إلى تفسير.',story:'هذه دراسة لفراغ عائلي يتكوّن من طبقات مواد، لا من زخرفة متكررة. تقود الأرضية الحركة، ويصبح الضوء غير المباشر وسيلة لفهم العمق. المخططات ليست شكلًا بعديًا؛ بل جزء من بناء تجربة يسهل استخدامها وحبّها.',theme:['خامات هادئة','إضاءة طبقية','أثاث مدمج'],photos:['photo-1600566753190-17f0baa2a6c3','photo-1600210492486-724fe5c67fb0','photo-1616486338812-3dadae4b4ace','photo-1600607687939-ce8a6c25118c','photo-1600566753051-f0b89df2dd90','photo-1600585152915-d208bec867a1']},
 {slug:'monolith',name:'جناح السكون',city:'العلا',type:'ضيافة',year:'2026',area:'940 م²',variant:2,lead:'عمارة تستمع إلى الأرض.',statement:'المشهد أوسع من المبنى.',story:'دراسة لجناح ضيافة يوجّه الحركة نحو المشهد بدل فرض حضور صاخب عليه. يتناوب الداخل والخارج عبر العتبات والظلال، ويصبح المقطع أداة لفهم الارتفاع والخصوصية وموضع الضوء. يشكّل المخطط وسيلة لقراءة التجربة قبل تحويلها إلى هيئة مرئية.',theme:['ارتباط بالموقع','ممرات مظلّلة','ضيافة هادئة'],photos:['photo-1487958449943-2429e8be8625','photo-1600585154340-be6161a56a0c','photo-1600566752355-35792bedcfea','photo-1600566753190-17f0baa2a6c3','photo-1600607687939-ce8a6c25118c','photo-1600210492486-724fe5c67fb0']},
 {slug:'urban',name:'دار الأفق',city:'الخبر',type:'تجاري',year:'2025',area:'1,320 م²',variant:3,lead:'هوية تبدأ قبل الدخول.',statement:'واجهة تقود إلى فكرة واضحة.',story:'كيف يمكن لمقر عمل أن يبدو واثقًا دون مبالغة؟ يتدرج التصوّر من ساحة دخول إلى ردهة استقبال ثم مساحات عمل مرنة. رُسمت الحركة العامة والخاصة كمسارين متجاورين، وحُددت نقاط الضوء والانفتاح لتكوين بيئة عملية تمثل شخصية المكان.',theme:['وصول واضح','مكاتب مرنة','هوية معمارية'],photos:['photo-1486406146926-c627a92ad1ab','photo-1497366754035-f200968a6e72','photo-1487958449943-2429e8be8625','photo-1600607687939-ce8a6c25118c','photo-1600566753190-17f0baa2a6c3','photo-1600210492486-724fe5c67fb0']},
 {slug:'quiet',name:'مجلس النور',city:'الدمام',type:'داخلي',year:'2024',area:'310 م²',variant:4,lead:'خصوصية تستقبل الآخرين.',statement:'ضوء خافت. حضور لا يُنسى.',story:'في هذا التصوّر، يصبح استقبال الضيف تجربة سلسة تبدأ من محور الحركة وتنتهي عند نقطة جلوس دافئة. اعتمدت العلاقات الوظيفية على الفصل بين الحركة والخدمة ومناطق الجلوس، مع دراسة للمفروشات والنسب، بعيدًا عن الزخرفة بوصفها الحل الوحيد للفخامة.',theme:['ضوء غير مباشر','مجالس معاصرة','توزيع متوازن'],photos:['photo-1600607687939-ce8a6c25118c','photo-1616486338812-3dadae4b4ace','photo-1600210492486-724fe5c67fb0','photo-1600566753190-17f0baa2a6c3','photo-1600566753051-f0b89df2dd90','photo-1600585152915-d208bec867a1']},
 {slug:'open',name:'بيت الظل',city:'الرياض',type:'سكني',year:'2026',area:'750 م²',variant:5,lead:'الظل جزء من التصميم.',statement:'نرسم الظل كي نسمح للنور.',story:'منزل عائلي افتراضي يستعمل كتل الواجهة وامتداد السقف وتدرجات العمق لصنع مناطق نصف خارجية. تفسر المخططات اتصال المعيشة بالحديقة ومسار الضيف مع المحافظة على خصوصية العائلة. ثم يقرأ المقطع علاقة فتحات الإضاءة بالارتفاع.',theme:['تظليل مدروس','تراس عائلي','تدرّج المسارات'],photos:['photo-1600566752355-35792bedcfea','photo-1600585154340-be6161a56a0c','photo-1600607687644-c7171b42498f','photo-1600607687939-ce8a6c25118c','photo-1600566753190-17f0baa2a6c3','photo-1600210492486-724fe5c67fb0']}
];
const slug=new URLSearchParams(location.search).get('case');
const index=Math.max(0,cases.findIndex(p=>p.slug===slug));
const p=cases[index],next=cases[(index+1)%cases.length];
const houseAssembly = $('#assembly');
if(p.slug==='courtyard'){
  const loader=document.createElement('script');
  loader.type='module';loader.src='./assembly.js';
  loader.onerror=()=>{const el=$('#assemblyLoader');if(el)el.textContent='تعذّر تشغيل العرض ثلاثي الأبعاد. يمكنك متابعة المخططات والصور في بقية الملف.';};
  document.body.appendChild(loader);
}else if(houseAssembly){houseAssembly.hidden=true;}

const technical=[
 {id:'plan',name:'المسقط الأفقي',sub:'منطق توزيع الفراغات',description:'رسم متجهي مفاهيمي لتقسيم المساحة وعلاقة الغرف بالمحور الرئيس.'},
 {id:'furniture',name:'فرش وتوزيع',sub:'مقياس الإنسان داخل الفراغ',description:'أماكن الجلوس والطاولات والفراغات المساعدة على المخطط نفسه.'},
 {id:'zoning',name:'التحليل الوظيفي',sub:'مناطق عامة وخاصّة',description:'طبقة ألوان تشرح توزيع الوظائف وإمكانية قراءتها بسرعة.'},
 {id:'circulation',name:'حركة الاستخدام',sub:'رحلة من المدخل إلى الداخل',description:'مسارات متجهة على المخطط لتوضيح العلاقات بين مناطق الحركة.'},
 {id:'sun',name:'دراسة الضوء',sub:'مسارات شمس افتراضية',description:'طبقة رمزية توضح مناطق وصول الضوء؛ ليست محاكاة شمس هندسية معتمدة.'},
 {id:'dimensions',name:'مخطط الأبعاد',sub:'نظام القياس ونقاط المرجع',description:'إسقاطات قياس توضيحية وليست أبعادًا تنفيذية صالحة للبناء.'},
 {id:'elevation',name:'الواجهة',sub:'التكوين المعماري الخارجي',description:'إيقاع الفتحات والكتل والارتدادات المعمارية في رسم مبسط.'},
 {id:'section',name:'المقطع A–A',sub:'التناسب والارتفاع والضوء',description:'قراءة عمودية تظهر العلاقة بين السقف والفتحات والفراغ الداخلي.'},
 {id:'axon',name:'التجسيم الهندسي',sub:'المخطط يرتفع إلى كتلة',description:'منظور أكسونومتري منشأ من نفس حدود المخطط التجريبي.'},
 {id:'materials',name:'دراسة المواد',sub:'لوحة الألوان والخامات',description:'اقتراح ألوان وخامات يُكمل لغة المشروع دون الادعاء بأنها مواصفات نهائية.'}
];
const captions=['الكتلة والواجهة','اللقطة الخارجية','ضوء المساحات','حضور المواد','إيقاع التفاصيل','أجواء المساء'];
const frames=[
 ...technical.map((x,i)=>({...x,kind:'drawing',index:i,code:x.id})),
 ...p.photos.map((src,i)=>({id:'ref'+i,kind:'reference',name:captions[i],sub:'مرجع بصري للأجواء والمواد',description:'صورة فوتوغرافية مرجعية مستقلة؛ ليست تنفيذًا فعليًا أو لقطة من المشروع الخيالي.',src,index:i+10}))
];
document.title=p.name+' | دراسة معمارية — رحاب حيدر';
$('#metaDescription').content=p.name+' — دراسة معمارية تصوّرية تشمل 16 محطة بصرية ومخططات وواجهات ومقاطع تفاعلية.';
$('#heroImage').src=photo(p.photos[0],1800);$('#heroImage').alt='صورة مرجعية تصور روح '+p.name;
$('#caseTitle').textContent=p.name;$('#caseLead').textContent=p.lead;$('#caseNumber').textContent=String(index+1).padStart(2,'0')+' / 06';
$('#caseHeroMeta').textContent=p.city+' / '+p.type+' / '+p.year;
$('#caseStatement').textContent=p.statement;$('#caseStory').textContent=p.story;
$('#caseFacts').innerHTML=[['المجال',p.type],['المدينة الافتراضية',p.city],['مساحة افتراضية',p.area],['الحالة','تصوّر غير منفّذ']].map(a=>'<div><small>'+a[0]+'</small><strong>'+a[1]+'</strong></div>').join('');
$('#nextCaseName').textContent=next.name;$('#nextCase').href='./project.html?case='+encodeURIComponent(next.slug);
const chapterRows=[
 ['منطق توزيع الفراغات','يمكن استبدال هذا المخطط بمساقط العمل الفعلية بعد مراجعة حقوق النشر واستلام الملفات الأصلية. الفكرة هنا أن يرى العميل كيف تتصل الغرف، من أين يدخل، وكيف تتدرّج الخصوصية.'],
 ['المقاطع والواجهات','لا يُكتفى بصورة الواجهة. نحكي العلاقة بين فتحات النور، ارتفاع السقف، الظل، والكتلة الخارجية؛ مع توضيح الخطوات التي تحوّل الفكرة إلى قرار معماري.'],
 ['المواد والتفاصيل','حجر طبيعي أو دهانات أو خشب؟ تعرض هذه اللوحات اختيارات جمالية تصوّرية، وتُستبدل لاحقًا بعينات ومواصفات واقعية معتمدة لصاحب المشروع.'],
 ['من العرض إلى الملف التنفيذي','في النسخة التجارية يمكن إدراج ملفات DWG/PDF المعتمدة، مخططات السقف والإضاءة، جداول التشطيب، ورسومات التفاصيل، على أن يرفعها صاحب الحق وبعد التأكد من توافقها مع نطاق المشروع.']
];
$('#detailAccordion').innerHTML=chapterRows.map(([title,description])=>'<details><summary>'+title+'<span aria-hidden="true">＋</span></summary><p>'+description+'</p></details>').join('');

// One shared geometric configuration drives every plan, section and massing study.
// These are expressive vector illustrations, NOT DWG deliverables or approved technical plans.
function geom(){
 const v=p.variant, a=278+(v%3)*21, b=505-(v%2)*16, c=237+(v%4)*12, d=354-(v%3)*9;
 return {x:105,y:82,w:580,h:360,a,b,c,d,top:82,right:685,bottom:442,left:105};
}
const g=geom(), icol='#c3d5c0', accent='#dcb37d', olive='#83a98e';
function svgWrap(content,aria,light=false){
 const bg=light?'#2c3f32':'#213429';
 return '<svg viewBox="0 0 800 535" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+aria+'" preserveAspectRatio="xMidYMid meet">'+
 '<rect width="800" height="535" fill="'+bg+'"/><g opacity=".16" stroke="#9bb3a1" stroke-width=".7">'+
 Array.from({length:33},(_,i)=>'<path d="M'+(i*25)+' 0V535"/>').join('')+
 Array.from({length:22},(_,i)=>'<path d="M0 '+(i*25)+'H800"/>').join('')+'</g>'+
 '<g fill="#e8e9d7" font-size="10" font-family="Manrope,Arial,sans-serif" letter-spacing="2">'+
 '<text x="41" y="40">REHAB HAIDER / CONCEPT DRAWING</text><text x="735" y="40" text-anchor="end">RH / 0'+(index+1)+'</text><text x="40" y="512">STUDY ONLY / NOT FOR CONSTRUCTION</text><text x="753" y="512" text-anchor="end">01 : 100</text></g>'+content+'</svg>';
}

// Featured house uses EXACTLY the master footprint also loaded by the live Three.js
// assembly. Technical SVG is an explanatory representation, not DWG construction data.
function courtyardPlanSvg(kind='plan'){
 const H=window.REHAB_HOUSE_GEOMETRY;
 const px=x=>173+(x+9)*25.2,py=z=>76+(z+7)*25.2;
 const rect=(x,z,w,d,attrs='')=>'<rect x="'+px(x)+'" y="'+py(z)+'" width="'+w*25.2+'" height="'+d*25.2+'" '+attrs+'/>';
 const paths='<g fill="none" stroke="#cfdbcd" stroke-width="5">'+
  rect(-9,-7,18,4.2)+rect(-9,-2.8,H.sideWing,H.courtLength)+rect(H.innerEastX,-2.8,H.sideWing,H.courtLength)+
  '<path d="M'+px(-3.25)+' '+py(-2.8)+'V'+py(5.55)+'M'+px(3.25)+' '+py(-2.8)+'V'+py(5.55)+'" stroke="#a1bcaa" stroke-width="3"/></g>';
 const furniture='<g fill="none" stroke="#d6b27d" stroke-width="1.9">'+
 rect(-7.9,-.2,3.2,.9,'rx="5"')+rect(4.5,-.1,3.2,.95,'rx="5"')+
 rect(-7.4,2.4,1.65,1.6,'rx="6"')+rect(4.9,2.3,1.7,1.4,'rx="6"')+
 rect(-1.35,.7,2.7,1.2,'rx="2"')+
 '</g>';
 const zoning='<g opacity=".43">'+rect(-9,-7,18,4.2,'fill="#92a89b"')+rect(-9,-2.8,5.75,8.35,'fill="#d7b985"')+rect(3.25,-2.8,5.75,8.35,'fill="#a6c1b3"')+rect(-3.25,-2.8,6.5,8.35,'fill="#6a907a"')+'</g>';
 const route='<g fill="none" stroke="#e5be7d" stroke-width="7" stroke-dasharray="12 9" stroke-linecap="round"><path d="M'+px(0)+' '+py(7.15)+'V'+py(2.5)+'H'+px(-4.2)+'V'+py(-1)+'"/><path d="M'+px(0)+' '+py(2.5)+'H'+px(5.2)+'V'+py(-1)+'"/></g>';
 const sun='<g fill="#ebca91" fill-opacity=".25"><path d="M50 56L'+px(-2.9)+' '+py(1)+'L'+px(1.5)+' '+py(5)+'L50 236Z"/><path d="M765 80L'+px(5)+' '+py(-1)+'L'+px(2)+' '+py(4)+'Z"/></g>';
 let dims='<g font-size="12" font-family="Manrope,Arial" fill="#dac69d"><path d="M'+px(-9)+' 56H'+px(9)+'M'+px(-9)+' 48V64M'+px(9)+' 48V64M151 '+py(-7)+'V'+py(7)+'" stroke="#d8b47d" stroke-width="1.5" fill="none"/><text x="400" y="49" text-anchor="middle">18,000</text><text x="138" y="254" transform="rotate(-90 138 254)">14,000</text></g>';
 const detail='<g fill="none" stroke="#b5c8b8" stroke-width="1.4">'+
  '<path d="M'+px(-3.25)+' '+py(-1.5)+'v60M'+px(3.25)+' '+py(-1.5)+'v60" stroke="#7bc9b6" stroke-width="3"/>'+
  '<path d="M'+px(-9)+' '+py(2.1)+'h8M'+px(9)+' '+py(1.2)+'h-8M'+px(0)+' '+py(-2.8)+'v8" stroke="#ebc58c"/>'+
  '</g>';
 const labels='<g fill="#e6e9d8" font-family="Manrope,Arial" font-size="12" text-anchor="middle"><text x="'+px(-5.7)+'" y="'+py(1)+'">WEST WING</text><text x="'+px(5.7)+'" y="'+py(1)+'">EAST WING</text><text x="'+px(0)+'" y="'+py(-4.8)+'">REAR LIVING</text><text x="'+px(0)+'" y="'+py(1.5)+'">COURT</text></g>';
 const under=kind==='zoning'?zoning:kind==='sun'?sun:'';
 const top=kind==='furniture'?furniture:kind==='circulation'?route:kind==='dimensions'?dims:'';
 return svgWrap(under+paths+detail+top+labels,'مخطط بيت الفناء مطابق لأبعاد نموذج البيت ثلاثي الأبعاد');
}
function courtyardAxonSvg(){
 const proj=(x,z,y)=>[402+(x-z)*14.5,282+(x+z)*6.3-y*19];
 const pt=(x,z,y)=>proj(x,z,y).map(v=>v.toFixed(1)).join(',');
 const face=(a,b,c,d,fill)=>'<polygon points="'+[a,b,c,d].map(q=>pt(...q)).join(' ')+'" fill="'+fill+'" stroke="#ced9c8" stroke-width="1.5"/>';
 function prism(x1,x2,z1,z2,y0,h){
  const y=y0+h;
  return face([x1,z2,y0],[x2,z2,y0],[x2,z2,y],[x1,z2,y],'#a2ab9b')+
   face([x2,z1,y0],[x2,z2,y0],[x2,z2,y],[x2,z1,y],'#d5d4be')+
   face([x1,z1,y],[x2,z1,y],[x2,z2,y],[x1,z2,y],'#e6e0d0');
 }
 const building=prism(-9,9,-7,-2.8,0,3.7)+prism(-9,-3.25,-2.8,5.55,0,3.7)+prism(3.25,9,-2.8,5.55,0,3.7)+prism(-8.9,1.7,-6.7,-3.1,3.7,3.1);
 const labels='<g fill="#e9e5d3" font-family="Manrope,Arial" font-size="12"><text x="65" y="66">SAME HOUSE / 18 x 14</text><text x="65" y="466">VOLUMETRIC STUDY</text></g>';
 return svgWrap(building+labels,'تجسيم كتلي لبيت الفناء من هندسة الأجنحة الثلاثة نفسها');
}
function courtyardElevationSvg(){
 const facade='<g fill="none" stroke="#dfe6d3" stroke-width="3">'+
 '<path d="M100 369H700M114 369V213H291V369M509 369V213H686V369"/>'+
 '<path d="M114 213H686"/>'+
 '<path d="M115 213V144H423V213M115 141H423" stroke="#d7bc91"/>'+
 '</g><g fill="#8db2a2" fill-opacity=".24" stroke="#d7e2d0" stroke-width="1.8">'+
 '<rect x="147" y="238" width="113" height="106"/><rect x="540" y="238" width="114" height="106"/>'+
 '<rect x="162" y="166" width="230" height="40"/></g>'+
 '<g stroke="#baa27d" stroke-width="2">'+Array.from({length:6},(_,i)=>'<path d="M'+(119+i*24)+' 239V349"/>').join('')+'</g>'+
 '<g fill="#e4e6d5" font-family="Manrope,Arial" font-size="11"><text x="104" y="398">SOUTH COURT ELEVATION</text><text x="690" y="398" text-anchor="end">±0.00</text></g>';
 return svgWrap(facade,'واجهة منزل الفناء توضح جناحي البيت والفناء الوسطي والدور العلوي الخلفي');
}
function courtyardSectionSvg(){
 const content='<g stroke="#d9e3d4" stroke-width="4" fill="#799782" fill-opacity=".19">'+
 '<path d="M110 388V230H282V388M518 388V230H690V388M110 229H282M518 229H690"/>'+
 '<path d="M110 225V138H389V225" fill="#d3d9bd" fill-opacity=".19"/>'+
 '</g><path d="M95 390H708" stroke="#c4d2c1" stroke-width="4"/>'+
 '<g fill="#dabc82" fill-opacity=".24"><path d="M350 156L464 306L406 388L282 215Z"/></g>'+
 '<g stroke="#9ac1a9" stroke-width="2"><path d="M274 235V372M526 235V372"/></g>'+
 '<g fill="#f1e7d3" font-family="Manrope,Arial" font-size="12"><text x="110" y="423">SECTION A-A / THE COURTYARD GAP</text><text x="690" y="423" text-anchor="end">0.00</text></g>';
 return svgWrap(content,'مقطع تصوّري عبر الفناء والجناحين والسقف والكتلة العليا');
}
function planSvg(kind='plan'){
 if(p.slug==='courtyard')return courtyardPlanSvg(kind);
 const {a,b,c,d}=g;
 const cadDetails='<g fill="none" stroke="#a7c6b8" stroke-width="1.4">'+
  '<path d="M'+(a-3)+' '+(c+35)+'a34 34 0 0 1 34 34M'+(b-3)+' 164a31 31 0 0 1 31 31M'+(a+56)+' '+(d-3)+'a30 30 0 0 1 30 30" stroke="#d9ba88"/>'+
  '<path d="M181 85V77H260V85M504 442V450H596V442M105 170H97V225H105" stroke="#b2d0c4"/>'+
  '<path d="M181 81H260M504 447H596M101 170V225" stroke="#7bc1b6" stroke-width="3"/>'+
  '<path d="M'+(a+3)+' '+(c+35)+'h30M'+(b+2)+' 164h30M'+(a+56)+' '+(d+2)+'v30" stroke="#d9ba88"/>'+
  '<path d="M715 102l14 -23 14 23M729 80V139M711 140H746" stroke="#d4c7a1"/>'+
  '<path d="M67 82H92M67 442H92M82 63V461" stroke-dasharray="5 7" opacity=".48"/>'+
  '</g><g fill="#d0ddcf" font-size="10" font-family="Manrope,Arial,sans-serif">'+
  '<text x="722" y="65">N</text><text x="40" y="266" transform="rotate(-90 40 266)">SECTION A–A</text></g>';
 const base='<g fill="none" stroke="#b9cfbd" stroke-width="5" stroke-linejoin="miter">'+
 '<path d="M105 82H685V442H105Z"/>'+
 '<path d="M'+a+' 82V442M'+b+' 82V'+d+'M105 '+c+'H685M'+a+' '+d+'H685"/>'+
 '</g><g stroke="#b9cfbd" fill="none" stroke-width="1.3" opacity=".75"><path d="M105 105H'+a+'M'+a+' 102H'+b+'M'+b+' 102H685M128 82V'+c+'M128 '+c+'V442"/>'+
 '<path d="M'+(a+18)+' 82V'+c+'M'+(b-18)+' 82V'+c+'"/></g>';
 let extra='';
 if(kind==='zoning')extra='<g opacity=".48"><rect x="111" y="88" width="'+(a-117)+'" height="'+(c-94)+'" fill="#dab984"/><rect x="'+(a+6)+'" y="88" width="'+(b-a-12)+'" height="'+(c-94)+'" fill="#91b29f"/><rect x="'+(b+6)+'" y="88" width="'+(679-b)+'" height="'+(c-94)+'" fill="#d4cdb2"/><rect x="111" y="'+(c+6)+'" width="'+(a-117)+'" height="'+(436-c)+'" fill="#738d87"/><rect x="'+(a+6)+'" y="'+(c+6)+'" width="'+(679-a)+'" height="'+(436-c)+'" fill="#8e9e7d"/></g>';
 if(kind==='furniture'){
  extra='<g fill="none" stroke="'+accent+'" stroke-width="2"><rect x="130" y="120" width="116" height="52" rx="12"/><rect x="148" y="202" width="74" height="12" rx="3"/><rect x="'+(a+40)+'" y="125" width="92" height="58" rx="28"/><rect x="'+(b+32)+'" y="123" width="65" height="55" rx="5"/><rect x="139" y="'+(c+45)+'" width="83" height="75" rx="9"/><rect x="'+(a+55)+'" y="'+(c+42)+'" width="120" height="60" rx="6"/><circle cx="'+(a+115)+'" cy="'+(c+120)+'" r="23"/></g>';
 }
 if(kind==='circulation')extra='<g fill="none" stroke="'+accent+'" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M395 486V395H'+(a+20)+'V'+(c-35)+'H178V143" stroke-dasharray="12 10"/><path d="M395 395H585V177" stroke-dasharray="12 10"/></g><g fill="'+accent+'"><circle cx="178" cy="143" r="13"/><circle cx="585" cy="177" r="13"/></g>';
 if(kind==='sun')extra='<g fill="none" stroke="'+accent+'" stroke-width="2"><path d="M50 65L205 175M720 60L550 180M745 390L545 290" stroke-dasharray="8 8"/><circle cx="50" cy="65" r="27" fill="#d5ab70" fill-opacity=".7"/><path d="M50 20V4M50 110V127M5 65H0M85 30L100 15"/></g><path d="M73 80L300 80L360 365L80 365Z" fill="#dab36f" opacity=".13"/>';
 if(kind==='dimensions')extra='<g stroke="'+accent+'" fill="'+accent+'" stroke-width="1.4" font-family="Manrope,Arial,sans-serif" font-size="13"><path d="M105 60H685M105 48V71M685 48V71M82 82V442M69 82H94M69 442H94"/><text x="395" y="53" text-anchor="middle" stroke="none">18.00</text><text x="52" y="260" text-anchor="middle" stroke="none" transform="rotate(-90 52 260)">12.00</text><path d="M'+a+' 82V49M'+b+' 82V49M105 '+c+'H73M105 '+d+'H73" opacity=".8"/></g>';
 return svgWrap(extra+base+cadDetails+'<g font-family="Manrope,Arial,sans-serif" font-size="13" fill="#dce7d6" text-anchor="middle" letter-spacing="1">'+
 '<text x="'+((105+a)/2)+'" y="'+((82+c)/2)+'">LIVING</text><text x="'+((a+b)/2)+'" y="'+((82+c)/2)+'">COURT</text><text x="'+((b+685)/2)+'" y="'+((82+c)/2)+'">DINING</text><text x="'+((105+a)/2)+'" y="'+((c+442)/2)+'">LOUNGE</text><text x="'+((a+685)/2)+'" y="'+((d+442)/2)+'">PRIVATE</text></g>',"مخطط مفاهيمي "+p.name);
}
function isoPt(x,y,z){return [385+(x-y)*.70,92+(x+y)*.34-z*.85];}
function point(x,y,z){const [a,b]=isoPt(x,y,z);return a.toFixed(1)+','+b.toFixed(1);}
function poly(points,fill,stroke='#a8b59a'){return '<polygon points="'+points.map(q=>point(...q)).join(' ')+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.7"/>';}
function wall(x1,y1,x2,y2,h,color){return poly([[x1,y1,0],[x2,y2,0],[x2,y2,h],[x1,y1,h]],color);}
function axonSvg(){
 if(p.slug==='courtyard')return courtyardAxonSvg();
 const W=g.w,H=g.h,xa=g.a-g.x,xb=g.b-g.x,yc=g.c-g.y,yd=g.d-g.y;
 // Same x/y extents and subdivisions as planSvg, projected into a readable isometric.
 const bg='<rect width="800" height="535" fill="#213429"/><g stroke="#7d967d" opacity=".15" stroke-width="1">'+Array.from({length:19},(_,i)=>'<path d="M0 '+(i*30)+'H800"/>').join('')+'</g>';
 const base=poly([[0,0,0],[W,0,0],[W,H,0],[0,H,0]],'#bbc6ad');
 const courtyard=poly([[xa,0,1],[xb,0,1],[xb,yc,1],[xa,yc,1]],'#83987c');
 const walls=wall(0,0,W,0,93,'#efe8d2')+wall(W,0,W,H,93,'#9da88e')+wall(0,H,W,H,93,'#b7bea7')+wall(0,0,0,H,93,'#d5d9c3')+
 wall(xa,0,xa,H,67,'#d8dfca')+wall(xb,0,xb,yd,67,'#c5ccb7')+wall(0,yc,W,yc,60,'#edf0db')+wall(xa,yd,W,yd,60,'#bbc4b0');
 const roof=poly([[0,0,93],[xa,0,93],[xa,yc,93],[0,yc,93]],'#c5ccba')+
 poly([[xb,0,93],[W,0,93],[W,yc,93],[xb,yc,93]],'#dedbc6')+
 poly([[0,yc,93],[xa,yc,93],[xa,H,93],[0,H,93]],'#e7deca');
 const topMarks='<g font-family="Manrope,Arial,sans-serif" font-size="10" fill="#dbe6d7"><text x="35" y="35">RH / VOLUME STUDY</text><text x="35" y="510">SAME GEOMETRY AS PLAN / NO BUILT CLAIM</text></g>';
 return '<svg viewBox="0 0 800 535" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="كتلة ثلاثية الأبعاد متجهة منشأة من هندسة مخطط '+p.name+'">'+bg+base+courtyard+walls+roof+topMarks+'</svg>';
}
function elevationSvg(){
 if(p.slug==='courtyard')return courtyardElevationSvg();
 const v=p.variant;let apertures='';
 for(let i=0;i<5;i++){let x=110+i*112+(v%3)*4;apertures+='<rect x="'+x+'" y="'+(145+(i%2)*12)+'" width="'+(68+(v%2)*5)+'" height="'+(166-(i%2)*28)+'" fill="#799d88" fill-opacity=".3" stroke="#c9d2be" stroke-width="2"/>';}
 const content='<path d="M72 355H735M110 335V120H680V335Z" fill="#647c69" fill-opacity=".22" stroke="#dce6d3" stroke-width="4"/>'+apertures+
 '<path d="M90 120H700M90 340H700" stroke="#dbb981" stroke-width="2"/><g font-family="Manrope,Arial,sans-serif" fill="#e5e7d7" font-size="12"><text x="55" y="405">ELEVATION / 01</text><text x="675" y="405" text-anchor="end">±0.00</text></g>';
 return svgWrap(content,'الواجهة الأمامية المفاهيمية '+p.name);
}
function sectionSvg(){
 if(p.slug==='courtyard')return courtyardSectionSvg();
 const v=p.variant, split=300+v*11,mid=520-v*6;
 const content='<path d="M95 377H708M120 112H690V377H120Z" fill="#6f8771" fill-opacity=".19" stroke="#cfdaca" stroke-width="4"/>'+
 '<path d="M120 235H690M'+split+' 235V377M'+mid+' 112V235" stroke="#ccd7c8" stroke-width="6"/>'+
 '<path d="M180 377V260H260V377M'+(mid+18)+' 235V142H'+(mid+105)+'V235" fill="#94b9a1" fill-opacity=".2" stroke="#d8d5b8" stroke-width="2"/>'+
 '<path d="M82 112H105M82 235H105M82 377H105M75 112V377" stroke="#d2b27c" stroke-width="1.5"/>'+
 '<g fill="#e7e6cf" font-family="Manrope,Arial,sans-serif" font-size="12"><text x="38" y="115">+6.2</text><text x="38" y="240">+3.1</text><text x="38" y="378">±0.0</text><text x="687" y="405" text-anchor="end">SECTION A–A</text></g>';
 return svgWrap(content,'مقطع معماري مفاهيمي '+p.name);
}
function materialSvg(){
 const sets=[['#e6dccb','#bfae98','#787d72','#d4c8b5'],['#e0c9b6','#8f755b','#d4bc9e','#657267'],['#dbd0b8','#a9947c','#6e7661','#baa389'],['#d7d9d1','#879991','#3d4a47','#b5ac91'],['#eadfce','#a18e78','#847867','#b9b7ac'],['#e5dccb','#b6b4a9','#768371','#bda78c']];
 const sw=sets[p.variant];return svgWrap('<g font-family="Manrope,Arial,sans-serif" fill="#dce7d9" font-size="13"><text x="80" y="100">REHAB HAIDER / MATERIAL BOARD</text></g>'+
 sw.map((c,i)=>'<rect x="'+(78+i*164)+'" y="165" width="138" height="225" rx="2" fill="'+c+'"/><text x="'+(78+i*164)+'" y="417" font-size="13" fill="#e2e5d2" font-family="Manrope,Arial,sans-serif">M—0'+(i+1)+'</text>').join(''),'لوحة مواد وألوان تصوّرية');
}
function drawingSvg(kind){
 if(['plan','furniture','zoning','circulation','sun','dimensions'].includes(kind))return planSvg(kind);
 if(kind==='axon')return axonSvg();
 if(kind==='elevation')return elevationSvg();
 if(kind==='section')return sectionSvg();
 return materialSvg();
}
$('#planLayer').innerHTML=planSvg('plan');
$('#spaceLayer').innerHTML=axonSvg();
$('#elevationDisplay').innerHTML=elevationSvg();
$('#sectionDisplay').innerHTML=sectionSvg();
// The drag axis is left-to-right for consistent physical manipulation, independent of Arabic RTL text.
const compare=$('#comparison'),planLayer=$('#planLayer'),range=$('#compareRange'),rule=$('#compareRule');
function setComparison(v){
 const percentage=Math.max(0,Math.min(100,+v));
 planLayer.style.clipPath='inset(0 '+(100-percentage)+'% 0 0)';
 rule.style.left=percentage+'%';
 range.setAttribute('aria-valuetext',percentage+' بالمئة من المخطط ظاهرة');
}
range.addEventListener('input',e=>setComparison(e.target.value));
setComparison(range.value);
let activeDrawing='plan';
const layerExplanations={plan:'مخطط مفاهيمي يوضّح تقسيم الفراغات وعلاقاتها.',furniture:'توزيع الأثاث يكشف مساحة الحركة ونقاط الجلوس.',dimensions:'أبعاد توضيحية لفهم النسب، ليست قياسات إنشائية معتمدة.',circulation:'الخط المتقطّع يبيّن مسار الحركة في المخطط.',sun:'مسار شمس رمزي لدراسة أثر الضوء، وليس تحليلًا شمسيًا دقيقًا.'};
$$('[data-technical]').forEach(b=>b.addEventListener('click',()=>{
 const k=b.dataset.technical;activeDrawing=k;$('#planLayer').innerHTML=drawingSvg(k);$('#layerExplanation').textContent=layerExplanations[k];
 $$('[data-technical]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on));});
}));

let group='all';
function renderAtlas(){
 const filtered=frames.filter(f=>group==='all'||f.kind===group);
 $('#atlasCount').textContent=filtered.length+' / 16 FRAME';
 $('#atlasGrid').innerHTML=filtered.map(f=>'<article class="atlas-item" data-kind="'+f.kind+'">'+
 '<button type="button" class="atlas-thumb" data-frame="'+f.id+'" aria-label="فتح '+f.name+'">'+
 (f.kind==='drawing'?drawingSvg(f.code):'<img src="'+photo(f.src,930)+'" alt="صورة مرجعية: '+f.name+'" loading="lazy" decoding="async">')+
 '<span class="thumb-plus" aria-hidden="true">+</span></button>'+
 '<div class="atlas-meta"><div><h3>'+f.name+'</h3><p>'+f.sub+'</p></div><span>'+String(f.index+1).padStart(2,'0')+' / 16</span></div></article>').join('');
 $$('[data-frame]').forEach(btn=>btn.addEventListener('click',()=>openFrame(btn.dataset.frame)));
}
$$('[data-group]').forEach(b=>b.addEventListener('click',()=>{
 const update=()=>{group=b.dataset.group;$('[data-group]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on));});renderAtlas();};
 if(document.startViewTransition&&!reduced)document.startViewTransition(update);else update();
}));
$('#downloadSvg').addEventListener('click',()=>{
 const markup=drawingSvg(activeDrawing);
 const blob=new Blob([markup],{type:'image/svg+xml;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const anchor=document.createElement('a');
 anchor.href=url;anchor.download='rehab-haider-'+p.slug+'-'+activeDrawing+'-concept.svg';
 document.body.appendChild(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const lightbox=$('#lightbox');let lightboxId='plan';
function visibleFrames(){return frames.filter(f=>group==='all'||f.kind===group);}
function showFrame(id){
 const f=frames.find(x=>x.id===id)||frames[0];lightboxId=f.id;
 $('#lbMedia').innerHTML=f.kind==='drawing'?drawingSvg(f.code):'<img src="'+photo(f.src,1500)+'" alt="صورة مرجعية: '+f.name+'">';
 $('#lbIndex').textContent=String(f.index+1).padStart(2,'0')+' / 16 — '+(f.kind==='drawing'?'DRAWING':'VISUAL REFERENCE');
 $('#lbTitle').textContent=f.name;$('#lbDesc').textContent=f.description;
}
function openFrame(id){showFrame(id);lightbox.showModal();document.body.classList.add('lb-open');}
function moveFrame(direction){const a=visibleFrames(),i=a.findIndex(f=>f.id===lightboxId);showFrame(a[(i+direction+a.length)%a.length].id);}
$('#lbPrev').addEventListener('click',()=>moveFrame(-1));
$('#lbNext').addEventListener('click',()=>moveFrame(1));
$('#lbClose').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('close',()=>document.body.classList.remove('lb-open'));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
document.addEventListener('keydown',e=>{if(!lightbox.open)return;if(e.key==='ArrowLeft')moveFrame(-1);if(e.key==='ArrowRight')moveFrame(1);});
renderAtlas();
const progress=$('#readingProgress');let ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?scrollY/total*100:0)+'%';ticking=false;});},{passive:true});
