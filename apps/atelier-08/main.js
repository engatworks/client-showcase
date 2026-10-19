'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const img=(id,w=1300)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w='+w+'&q=82';

// Every record below is a fictional design study for the demo: no real client, location,
// built status, professional award or project ownership is asserted.
const projects=[
 {slug:'courtyard',name:'بيت الفناء',type:'سكني',place:'الرياض',year:'2026',area:'680 م²',lead:'بيتٌ يلتفّ حول الضوء.',desc:'تصوّر لفيلا سعودية تعيد الفناء إلى قلب الحياة اليومية، حيث تبدأ الخصوصية من التكوين المعماري لا من إغلاق النوافذ.',story:'تتوزّع الفراغات حول قلب مضاء يخلق علاقة هادئة بين الداخل والخارج. الكتل الصامتة، تدرّج الخصوصية، وممرات الظل تشكّل حياةً تتبدّل مع حركة الشمس خلال اليوم.',image:'photo-1600585154340-be6161a56a0c',secondary:'photo-1600607687939-ce8a6c25118c',details:['فناء مركزي','طبقات خصوصية','واجهات حجرية'],aspect:'1.03'},
 {slug:'material',name:'ملاذ المواد',type:'داخلي',place:'جدة',year:'2025',area:'265 م²',lead:'حين يصبح الملمس لغة.',desc:'تصوّر لصالة معيشة معاصرة تتعامل مع الخشب والحجر والضوء باعتبارها عناصر معمارية لا إضافات زخرفية.',story:'اعتمدنا لوحة خامات هادئة تسمح لاختلاف الضوء بأن يمنح الفراغ شخصية جديدة عند كل ساعة. الرفوف المدمجة، الإضاءة غير المباشرة، ونعومة انتقال المواد تصنع دفئًا دون صخب.',image:'photo-1600566753190-17f0baa2a6c3',secondary:'photo-1600210492486-724fe5c67fb0',details:['خشب طبيعي','إضاءة مخفية','تفاصيل نجارة'],aspect:'1.11'},
 {slug:'monolith',name:'جناح السكون',type:'ضيافة',place:'العلا',year:'2026',area:'940 م²',lead:'عمارة تستمع إلى الأرض.',desc:'مفهوم جناح ضيافة منخفض الكتلة يختار الانسجام مع المشهد بدل منافسته، مع إطلالات مؤطّرة بعناية.',story:'تم تخيّل المسارات كرحلة عبر الظل والحجر، بحيث تصبح لحظة الانتقال من الخارج إلى الداخل جزءًا من التجربة. لا يفرض المكان نفسه على الطبيعة؛ بل يكشفها تدريجيًا.',image:'photo-1487958449943-2429e8be8625',secondary:'photo-1600566752355-35792bedcfea',details:['ضيافة بوتيكية','مسارات ظل','ارتباط بالموقع'],aspect:'1.2'},
 {slug:'urban',name:'دار الأفق',type:'تجاري',place:'الخبر',year:'2025',area:'1,320 م²',lead:'هوية تبدأ قبل الدخول.',desc:'تصوّر لمقر أعمال معاصر يحوّل الاستقبال والحركة والواجهات إلى تجربة واحدة تعكس وضوح العلامة.',story:'فصلنا بين الحركة العامة والمساحات المركّزة، وبنينا منطقة وصول تحمل حضورًا معماريًا واضحًا. زجاج محسوب، أسقف عالية، وتكوين يوازن بين الانفتاح والاحتواء.',image:'photo-1486406146926-c627a92ad1ab',secondary:'photo-1497366754035-f200968a6e72',details:['مقار عمل','واجهات مؤسسية','هوية مكانية'],aspect:'1.04'},
 {slug:'quiet',name:'مجلس النور',type:'داخلي',place:'الدمام',year:'2024',area:'310 م²',lead:'خصوصية تستقبل الآخرين.',desc:'تصوّر لمجلس ضيافة منزلي يحتفظ بروح الكرم، ويعبّر عنها عبر نسب مريحة ومواد غنية دون مبالغة.',story:'صاغت الإضاءة غير المباشرة إحساسًا مرحّبًا، بينما وفّرت المقاعد وتوزيعات الحركة تجربة اجتماعية سهلة. الفكرة هنا هي أن تكون الفخامة محسوسة قبل أن تكون مرئية.',image:'photo-1600607687939-ce8a6c25118c',secondary:'photo-1616486338812-3dadae4b4ace',details:['مجالس خاصة','ضوء دافئ','مواد هادئة'],aspect:'1.12'},
 {slug:'open',name:'بيت الظل',type:'سكني',place:'الرياض',year:'2026',area:'750 م²',lead:'الظل جزء من التصميم.',desc:'تصوّر لمنزل عائلي تستثمر واجهاته البروزات والتجويفات لتمنح كل غرفة خصوصيتها من دون فقدان انفتاحها.',story:'تُرسم التجربة عبر العلاقة بين فتحات الضوء وكتل الظل والتراسات. يفتح المخطط تدريجيًا من المدخل إلى المنطقة العائلية، بينما تبقى الواجهات بسيطة وواضحة.',image:'photo-1600566752355-35792bedcfea',secondary:'photo-1600607687939-ce8a6c25118c',details:['منازل معاصرة','تظليل سلبي','تراس داخلي'],aspect:'1.03'}
];
const byId=s=>projects.find(p=>p.slug===s);
const state={filter:'الكل',selected:'courtyard'};
function thumbnailPlan(i){

 if(i===0&&window.REHAB_CAD){
   return window.REHAB_CAD.sheet(4)
     .replace('viewBox="0 0 1300 825"','viewBox="125 150 620 520"');
 }
 const split=44+i*4, edge=91-i*2;
 return '<svg viewBox="0 0 150 115" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+
 '<g fill="none" stroke="#d9ddcb" stroke-width="2.2"><path d="M13 13H137V101H13Z"/>'+
 '<path d="M'+split+' 13V101M'+edge+' 13V67M13 56H137M'+split+' 80H137"/></g>'+
 '<g fill="none" stroke="#c9a870" stroke-width="1.1"><path d="M19 20H'+(split-5)+'V51H19Z"/><path d="M'+(split+6)+' 20H'+(edge-5)+'V50H'+(split+6)+'Z"/><path d="M'+(edge+7)+' 20H128V48H'+(edge+7)+'Z"/></g>'+
 '<path d="M6 106H142M145 8V107" stroke="#d9ddcb" stroke-opacity=".35" stroke-dasharray="3 4"/>'+
 '<text x="17" y="109" fill="#e0d1b1" font-family="Arial" font-size="6.5">PLAN — 0'+(i+1)+'</text></svg>';
}
function renderProjects(){
  const filtered=projects.filter(p=>state.filter==='الكل'||p.type===state.filter);
  $('#projectGrid').innerHTML=filtered.map(p=>{
    const n=projects.indexOf(p);
    return '<article class="project">'+
      '<a href="./project.html?case='+encodeURIComponent(p.slug)+'" class="project-cover" aria-label="استعرض الدراسة التفصيلية لمشروع '+p.name+'">'+
       '<img src="'+img(p.image)+'" alt="صورة معمارية توضيحية لتصوّر '+p.name+'" loading="lazy" decoding="async">'+
       '<span class="cover-index">'+String(n+1).padStart(2,'0')+' / 06</span>'+
       '<span class="cover-tag">تصوّر تصميمي · 16 لوحة معمارية</span>'+
       '<span class="project-plan-thumb" aria-hidden="true">'+thumbnailPlan(n)+'</span>'+
       '<span class="cover-arrow" aria-hidden="true">↗</span></a>'+
      '<div class="project-text"><div><p>'+p.place+' / '+p.type+'</p><h3>'+p.name+'</h3></div><span class="project-year">'+p.year+'</span></div>'+
      '<div class="project-note">'+p.lead+' <span class="go-case">استكشف المخططات والمقاطع ←</span></div>'+
     '</article>';
  }).join('');
}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
  state.filter=b.dataset.filter;
  $$('[data-filter]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});
  renderProjects();
}));
$$('[data-scene-button]').forEach(b=>b.addEventListener('click',()=>{
  const ix=b.dataset.sceneButton;
  $$('.hero-photo').forEach(p=>p.classList.toggle('active',p.dataset.scene===ix));
  $$('[data-scene-button]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});
}));
const palettes={
 stone:{title:'ذاكرة الحجر',text:'عاجي، رملي، وبيج دافئ — درجات تترك الضوء يؤدي دوره.',tones:['#dfd6c7','#b9ae99','#897d6d']},
 wood:{title:'دفء الملمس',text:'خشب جوزي، فخار ناعم، ولمسة كريمية تضفي قربًا وهدوءًا.',tones:['#e2cdb6','#9e7759','#5d4436']},
 shadow:{title:'عمق الظلال',text:'زيتوني مترب، فحمي رقيق، وبرونزي مطفأ لتجربة أكثر حميمية.',tones:['#888b79','#47453d','#242923']}
};
$$('[data-palette]').forEach(b=>b.addEventListener('click',()=>{
 const p=palettes[b.dataset.palette];$('#paletteName').textContent=p.title;$('#paletteDescription').textContent=p.text;
 $$('.palette-bars i').forEach((el,i)=>el.style.background=p.tones[i]);
 $$('[data-palette]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});
}));
const layerDescription={
 plan:'اللوحة A-101 / توزيع المساحات والمداخل',
 light:'مخطط الإنارة / نقاط إضاءة تصوّرية',
 flow:'مسارات الحركة / من المدخل إلى الفراغات'
};
function updateFloorPlan(mode){
  if(!window.REHAB_CAD)return;
  const kind=mode==='light'?'sun':mode==='flow'?'circulation':'plan';
  $('#floorPlan').innerHTML=window.REHAB_CAD.frame(kind);
  $('#boardCaption').textContent=layerDescription[mode];
}
$$('[data-layer]').forEach(b=>b.addEventListener('click',()=>{
 const active=b.dataset.layer;
 updateFloorPlan(active);
 $$('[data-layer]').forEach(x=>{const yes=x===b;x.classList.toggle('active',yes);x.setAttribute('aria-pressed',String(yes));});
}));
updateFloorPlan('plan');
const menuButton=$('#menuToggle'),menu=$('#mobileMenu');
function setMenu(open){
 menu.classList.toggle('open',open);menu.inert=!open;document.body.classList.toggle('menu-open',open);
 menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');
}
menuButton.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
$$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))setMenu(false);});
$('#inquiryForm').addEventListener('submit',e=>{
 e.preventDefault();const d=new FormData(e.currentTarget);
 $('#inquiryText').textContent='مرحبًا، أنا '+d.get('name')+'.\n\nأرغب في مناقشة مشروع '+d.get('type')+(d.get('city')?' في '+d.get('city'):'')+'.\n\nملامح الفكرة:\n'+d.get('brief')+'\n\nأرغب في معرفة الخطوات التالية، وشكرًا لكم.';
 $('#inquiryResult').hidden=false;
 $('#inquiryResult').scrollIntoView({block:'nearest',behavior:reduced?'auto':'smooth'});
});
$('#copyInquiry').addEventListener('click',async e=>{
 try{await navigator.clipboard.writeText($('#inquiryText').textContent);e.currentTarget.textContent='تم النسخ ✓';}
 catch{e.currentTarget.textContent='حدد النص بالأعلى لنسخه';}
});
if(!reduced && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');observer.unobserve(e.target);}}),{threshold:.09});
 $$('[data-reveal]').forEach(el=>observer.observe(el));
}else{$$('[data-reveal]').forEach(el=>el.classList.add('shown'));}
const readProgress=$('#readProgress');
let queued=false;
addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{
 const total=document.documentElement.scrollHeight-innerHeight;
 readProgress.style.width=(total>0?scrollY/total*100:0)+'%';queued=false;
});},{passive:true});
// A restrained, one-time Arabic grapheme reveal in the hero kicker.
const heroIndicator=$('.hero-indicator span:last-child');
if(heroIndicator && !reduced){
 const message=heroIndicator.textContent.trim();
 const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('ar',{granularity:'grapheme'}):null;
 const glyphs=segmenter?Array.from(segmenter.segment(message),x=>x.segment):Array.from(message);
 heroIndicator.setAttribute('aria-label',message);
 heroIndicator.textContent='';
 let letter=0;
 const write=()=>{heroIndicator.textContent=glyphs.slice(0,++letter).join('');if(letter<glyphs.length)setTimeout(write,36);};
 setTimeout(write,1100);
}

renderProjects();
