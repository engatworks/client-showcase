/* Rehab Haider | scroll-directed CAD construction.
   A lightweight native-scroll editorial sequence, no cartoon WebGL model.
   Every technical frame is generated from the same CAD source and has a clear stage. */
(()=>{'use strict';
const section=document.getElementById('assembly');
if(!section || !window.REHAB_CAD || new URLSearchParams(location.search).get('case')!=='courtyard')return;
const cad=window.REHAB_CAD;
const phases=[
 {number:'01',title:'نبدأ بالموقع.',small:'دراسة الموقع',description:'قبل ما نرسم أي جدار، نحدّد أبعاد الأرض وحدود البناء. من هنا تبدأ القرارات المهمة.'},
 {number:'02',title:'المخطط ياخذ شكله.',small:'الجدران والتوزيع',description:'نوزّع المجلس، المعيشة والغرف حول الفناء. كل مساحة لها وظيفة واضحة ومسار وصول مدروس.'},
 {number:'03',title:'نضبط كل فتحة.',small:'الأبواب والواجهات',description:'تظهر فتحات الأبواب والنوافذ ومسارات الدخول. هذه الطبقة تكشف كيف يتصل البيت بالفناء.'},
 {number:'04',title:'التفاصيل تصنع الفرق.',small:'الفرش والفناء',description:'نضيف فرشًا توضيحيًا ومسطحًا مائيًا ومناطق جلوس. الهدف فهم المقياس وكيف نستخدم المكان يوميًا.'},
 {number:'05',title:'الضوء له مخطط.',small:'توزيع الإضاءة',description:'نضيف نقاط الإضاءة على طبقة منفصلة، ونراجع علاقتها بمناطق الحركة والجلسات.'},
 {number:'06',title:'وكل خط له معنى.',small:'الأبعاد والملاحظات',description:'تكتمل الأبعاد والشبكات والرموز والملاحظات. هذي دراسة قابلة للتطوير إلى ملف مشروع موثّق.'},
 {number:'07',title:'نشوف الصورة الأكبر.',small:'الواجهات والقطاع',description:'ننتقل من المسقط الأفقي إلى قراءة الواجهات والقطاع. والصورة المرجعية هنا توضح الجو العام فقط؛ ليست تنفيذًا لهذا المخطط.'}
];
const svg=()=>cad.sheet(1);
section.className='cad-journey';
section.innerHTML='<div class="cad-sticky">'+
 '<div class="cad-topline"><span>رحلة التصميم / بيت الفناء</span><span dir="ltr">A-101 → A-201 → A-301</span></div>'+
 '<div class="cad-journey-copy" id="cadStoryText"></div>'+
 '<div class="cad-sheet-frame" id="cadStorySheet">'+svg()+'</div>'+
 '<div class="cad-journey-final" id="cadStoryFinal" hidden>'+
   '<div class="cad-final-pair"><div id="cadFinalElevation">'+cad.elevation()+'</div><div id="cadFinalSection">'+cad.section()+'</div></div>'+
   '<div class="cad-real-reference"><img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1080&q=79" alt="صورة فوتوغرافية مرجعية لمنزل معاصر — لا تمثل هذا المخطط"/>'+
   '<span>صورة مرجعية للأجواء المعمارية، وليست صورة لتنفيذ هذا المخطط.</span></div>'+
 '</div>'+
 '<div class="cad-journey-bottom"><div class="cad-phase-tabs" id="cadPhaseTabs" role="group" aria-label="التنقل بين مراحل دراسة المخطط"></div>'+
 '<div class="cad-progress-meta"><span id="cadPhaseNumber">01 / 07</span><span>مرّر الصفحة لتكتمل طبقات الرسم ↓</span><button id="cadExport4k" type="button">لوحة 4K ↗</button><button id="cadDownload" type="button">ملف DXF ↗</button></div>'+
 '<div class="cad-progress-line"><span id="cadProgressBar"></span></div></div>'+
 '<p class="cad-disclosure">دراسة رسم هندسي تصوّرية · ملفات تعليمية قابلة للتحرير · ليست مستندات تنفيذ معتمدة</p>'+
 '</div>';
const copy=section.querySelector('#cadStoryText');
const frame=section.querySelector('#cadStorySheet');
const final=section.querySelector('#cadStoryFinal');
const tabs=section.querySelector('#cadPhaseTabs');
const currentNum=section.querySelector('#cadPhaseNumber');
const progressBar=section.querySelector('#cadProgressBar');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
tabs.innerHTML=phases.map((p,i)=>'<button type="button" data-phase="'+i+'"'+(i===0?' class="active" aria-current="step"':'')+'>'+p.small+'</button>').join('');
let last=-1;
const total=()=>Math.max(1,section.offsetHeight-innerHeight);
function stepContent(i){
 const p=phases[i];
 copy.innerHTML='<span class="cad-phase-count">'+p.number+' / 07 — '+p.small+'</span>'+
 '<h2>'+p.title+'</h2><p>'+p.description+'</p>'+
 '<a href="#lab" class="cad-drawing-link">شوف الرسومات بالتفصيل <span>↗</span></a>';
 if(i===6){frame.hidden=true;final.hidden=false;}
 else{frame.hidden=false;final.hidden=true;frame.innerHTML=cad.sheet(i+1); }
 tabs.querySelectorAll('button').forEach((el,j)=>{el.classList.toggle('active',j===i);el.setAttribute('aria-current',j===i?'step':'false');});
 currentNum.textContent=p.number+' / 07';
}
function update(){
 const bounds=section.getBoundingClientRect();
 const at=Math.max(0,Math.min(1,-bounds.top/total()));
 const idx=Math.min(6,Math.floor(at*7));
 if(idx!==last){last=idx;stepContent(idx);}
 // Reveal each drawing layer progressively with the scroll rather than
 // replacing completed stages like a slide deck.
 if(idx<6){
   const layerName=['site','walls','openings','furniture','lighting','dimensions'][idx];
   const layer=frame.querySelector('[data-drawing-layer="'+layerName+'"]');
   if(layer){
     const local=Math.min(1,Math.max(0,at*7-idx));
     layer.style.clipPath='inset(0 '+(100-local*100)+'% 0 0)';
     layer.style.opacity=String(Math.min(1,local*1.45));
   }
 }
 progressBar.style.transform='scaleX('+Math.max(.001,at)+')';
}
let ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{update();ticking=false;});},{passive:true});
addEventListener('resize',update,{passive:true});
tabs.addEventListener('click',e=>{
 const button=e.target.closest('button[data-phase]');if(!button)return;
 const i=Number(button.dataset.phase);
 const y=section.getBoundingClientRect().top+scrollY+(i+.05)/7*total();
 scrollTo({top:y,behavior:reduce?'auto':'smooth'});
});
section.querySelector('#cadDownload').addEventListener('click',()=>{
 const contents=cad.dxf();
 const blob=new Blob([contents],{type:'application/dxf'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='rehab-haider-courtyard-concept.dxf';
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
});

section.querySelector('#cadExport4k').addEventListener('click',async e=>{
  const button=e.currentTarget,original=button.textContent;
  button.disabled=true;button.textContent='تجهيز صورة 4K...';
  try{
    // Raster export is on-demand. Embed same-origin CAD styles into the SVG
    // so every lineweight, annotation and colour survives standalone rendering.
    const cadStyle=[...document.styleSheets]
      .filter(sh=>sh.href&&sh.href.includes('/cad-journey.css'))
      .flatMap(sh=>{try{return [...sh.cssRules].map(rule=>rule.cssText)}catch{return []}})
      .join('\n');
    const svg=cad.sheet(6).replace('<svg ','<svg width="1300" height="825" ')
      .replace('</svg>','<style>'+cadStyle.replace(/<\/style>/gi,'')+'</style></svg>');
    const image=new Image();
    const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const loaded=new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;});
    image.src=url;await loaded;
    const canvas=document.createElement('canvas');canvas.width=3840;canvas.height=2160;
    const context=canvas.getContext('2d',{alpha:false});
    context.fillStyle='#edece5';context.fillRect(0,0,3840,2160);
    // Keep the original vector aspect ratio, without distorting technical dimensions.
    const drawW=3404,drawH=2160;
    context.drawImage(image,(3840-drawW)/2,0,drawW,drawH);
    URL.revokeObjectURL(url);
    await new Promise(resolve=>canvas.toBlob(output=>{
      if(output){
        const href=URL.createObjectURL(output);
        const a=document.createElement('a');a.href=href;a.download='rehab-haider-courtyard-plan-3840x2160.png';a.click();
        setTimeout(()=>URL.revokeObjectURL(href),1200);
      }
      resolve();
    },'image/png'));
    button.textContent='جاهز ✓';
  }catch(err){button.textContent='تعذّر تجهيز الصورة';console.error(err);}
  finally{setTimeout(()=>{button.disabled=false;button.textContent=original;},2400);}
});

stepContent(0);update();
})();