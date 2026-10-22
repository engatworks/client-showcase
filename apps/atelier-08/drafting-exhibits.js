/* Rehab Haider / Documentation studies
 * Original, explicitly fictional demonstration drawings in an SVG plotting system.
 * No actual client drawings, editable CAD files, data endpoints, or download actions.
 * Coordinates are derived from the existing 18 × 14 m concept envelope.
 */
(() => {
'use strict';
const H=window.REHAB_HOUSE_GEOMETRY, CAD=window.REHAB_CAD;
if(!H||!CAD)return;
const ar=document.documentElement.lang==='ar';
const L=(a,b)=>ar?a:b;
const px=v=>Math.round(v*100)/100;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const T=(x,y,s,cl='tx',extra='')=>'<text x="'+px(x)+'" y="'+px(y)+'" class="'+cl+'" '+extra+'>'+esc(s)+'</text>';
const line=(x1,y1,x2,y2,cl='stroke')=>'<line x1="'+px(x1)+'" y1="'+px(y1)+'" x2="'+px(x2)+'" y2="'+px(y2)+'" class="'+cl+'"/>';
const rect=(x,y,w,h,cl='stroke')=>'<rect x="'+px(x)+'" y="'+px(y)+'" width="'+px(w)+'" height="'+px(h)+'" class="'+cl+'"/>';
const path=(d,cl='stroke')=>'<path d="'+d+'" class="'+cl+'"/>';
const circ=(x,y,r,cl='stroke')=>'<circle cx="'+px(x)+'" cy="'+px(y)+'" r="'+px(r)+'" class="'+cl+'"/>';
const paper=(id,title,subtitle,markup,revision='A')=>`<svg class="drafting-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 920" role="img" aria-label="${esc(title)}">
<defs><pattern id="hatch-${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="#b0b3af" stroke-width=".6"/></pattern><pattern id="softgrid-${id}" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#e8e9e6" stroke-width=".5"/></pattern></defs>
<rect width="1400" height="920" fill="#f9faf7"/><rect x="24" y="24" width="1352" height="872" class="frame"/><rect x="36" y="36" width="1328" height="813" class="plot-area"/>
<g class="plot-head">${T(55,66,'R / H — TECHNICAL DOCUMENTATION','name')}${T(55,87,'CONCEPT DEMONSTRATION / NOT FOR CONSTRUCTION','subtitle')}${T(1338,68,id,'sheet-number','text-anchor="end"')}${T(1338,89,'REV '+revision+' / 2026','subtitle','text-anchor="end"')}</g>
${markup}
<g class="titleblock">${line(36,849,1364,849,'frame')}${line(36,895,1364,895,'frame')}${line(355,849,355,895,'frame')}${line(740,849,740,895,'frame')}${line(1050,849,1050,895,'frame')}${line(1220,849,1220,895,'frame')}
${T(51,867,'STUDY / REHAB HAIDER','tiny')}${T(51,886,title,'title-small')}
${T(371,867,'DRAWING','tiny')}${T(371,886,subtitle,'title-small')}
${T(756,867,'VIEW SCALE','tiny')}${T(756,886,'NOT TO SCALE ON SCREEN','title-small')}
${T(1066,867,'STATUS','tiny')}${T(1066,886,'CONCEPT ONLY','title-small')}
${T(1237,882,id,'sheet-number-sm')}
</g></svg>`;
const dimH=(a,b,y,label,from=0)=>line(a,from,a,y+8,'dimension')+line(b,from,b,y+8,'dimension')+line(a,y,b,y,'dimension')+line(a-4,y-5,a+4,y+5,'dimension')+line(b-4,y-5,b+4,y+5,'dimension')+T((a+b)/2,y-6,label,'dimension-label','text-anchor="middle"');
const dimV=(a,b,x,label,from=0)=>line(from,a,x+8,a,'dimension')+line(from,b,x+8,b,'dimension')+line(x,a,x,b,'dimension')+line(x-5,a-4,x+5,a+4,'dimension')+line(x-5,b-4,x+5,b+4,'dimension')+T(x+12,(a+b)/2,label,'dimension-label','transform="rotate(-90 '+px(x+12)+' '+px((a+b)/2)+')" text-anchor="middle"');
const tree=(x,y,r=17)=>circ(x,y,r,'tree')+circ(x,y,r*.73,'vegetation')+
  Array.from({length:10},(_,i)=>{const angle=i*Math.PI/5;return line(x+Math.cos(angle)*r*.1,y+Math.sin(angle)*r*.1,x+Math.cos(angle)*r*.82,y+Math.sin(angle)*r*.82,'vegetation')}).join('');
function site(){
const S=22.5, X=155,Y=158;
const x=a=>X+a*S,y=a=>Y+a*S,plotW=28*S,plotH=25*S;
let m=rect(X,Y,plotW,plotH,'boundary')+rect(X+5*S,Y+4*S,18*S,14*S,'building-outline')+rect(X+5*S+5.75*S,Y+8.2*S,6.5*S,8.35*S,'courtyard');
m+=rect(X+5*S,Y+4*S,18*S,14*S,'envelope-hatch')+rect(X+5*S+5.75*S,Y+8.2*S,6.5*S,8.35*S,'courtyard-white');
for(const [a,b,c,d,t] of CAD.data.walls){
  const xx=x(5+a),yy=y(4+b),ww=Math.abs(c-a)*S,hh=Math.abs(d-b)*S,th=Math.max(2,t*S);
  m+=Math.abs(d-b)<.001?rect(Math.min(xx,x(5+c)),yy-th/2,ww,th,'wall'):rect(xx-th/2,Math.min(yy,y(4+d)),th,hh,'wall');
}
for(const [a,b,len,dir] of CAD.data.glass){
 if(dir==='h'){
 m+=line(x(5+a),y(4+b)-2,x(5+a+len),y(4+b)-2,'glazing')+line(x(5+a),y(4+b)+2,x(5+a+len),y(4+b)+2,'glazing');
 } else {
 m+=line(x(5+a)-2,y(4+b),x(5+a)-2,y(4+b+len),'glazing')+line(x(5+a)+2,y(4+b),x(5+a)+2,y(4+b+len),'glazing');
 }
}
// Door swing arcs are calculated from the same conceptual openings, not decorative flourishes.
for(const [a,b,r,degree] of CAD.data.door){
 const rad=degree*Math.PI/180,hx=x(5+a),hy=y(4+b),rr=r*S;
 const ex=hx+rr*Math.cos(rad),ey=hy+rr*Math.sin(rad);
 const endx=hx+rr*Math.cos(rad+Math.PI/2),endy=hy+rr*Math.sin(rad+Math.PI/2);
 m+=line(hx,hy,ex,ey,'door')+path('M'+px(ex)+' '+px(ey)+' A'+px(rr)+' '+px(rr)+' 0 0 1 '+px(endx)+' '+px(endy),'door');
}
// Furnishings are conceptual orthographic symbols, not an as-built survey.
const furnishing=[
 [6.3,9.4,2.5,.8],[6.3,11.1,.8,1.4],[9.1,9.5,.55,1.4],
 [19.2,9.4,2.7,.8],[20.0,11.2,.9,1.4],
 [6.6,13.4,2.1,1.35],[19.2,13.4,2.2,1.45],
 [6.5,5.1,3.0,.82],[13.0,5.1,1.9,.9],[19.0,5.1,2.2,.85]
];
for(const [a,b,w,h] of furnishing){
 m+=rect(x(a),y(b),w*S,h*S,'furniture')+
    rect(x(a)+4,y(b)+4,w*S-8,Math.max(5,h*S-8),'furniture-detail');
}
for(const [a,b] of [[8,6.6],[13.8,6.5],[20,6.5]])m+=circ(x(a),y(b),7,'furniture-round');
m+=rect(x(11.35),y(9),5.4*S,3.4*S,'pool');
m+=T(x(14),y(10.7),'COURTYARD','roomlabel','text-anchor="middle"')+T(x(14),y(12),'LIGHT / AIR','tiny','text-anchor="middle"');
for(const [txt,a,b] of [['MAJLIS',7.8,8.6],['GUEST',7.8,13.1],['LIVING',20.4,8.6],['BEDROOM',20.4,13.1],['DINING',7.7,5.0],['FAMILY',13.5,5.0],['KITCHEN',20.4,5.0]]){
 m+=T(x(a),y(b),txt,'roomlabel','text-anchor="middle"');
}
m+=rect(x(5),y(0),18*S,4*S,'setback')+rect(x(0),y(0),5*S,25*S,'setback')+
 rect(x(23),y(0),5*S,25*S,'setback')+rect(x(5),y(18),18*S,7*S,'setback');
m+=rect(x(11.2),y(18),5.6*S,7*S,'driveway');
for(let i=0;i<9;i++)m+=line(x(11.2+i*.7),y(18),x(11.2+i*.7)-25,y(25),'paving');
for(const [a,b,r] of [[2,2,18],[26,3,17],[3,14,15],[25.6,19,15],[2,22,13],[26,23,12],[20,21,15]])m+=tree(x(a),y(b),r);
m+=line(x(0),y(25)+36,x(28),y(25)+36,'road')+line(x(0),y(25)+92,x(28),y(25)+92,'road')+
 path('M'+x(0)+' '+(y(25)+62)+'H'+x(28),'road-center');
m+=T(x(14),y(25)+83,'PUBLIC ACCESS / 6 m ROAD — SCHEMATIC','roadlabel','text-anchor="middle"');
m+=dimH(x(0),x(28),y(0)-35,'28.00 m',y(0));
m+=dimH(x(5),x(23),y(4)-27,'18.00 m',y(4));
m+=dimH(x(5),x(10.75),y(4)+18,'5.75',y(4));
m+=dimH(x(10.75),x(17.25),y(4)+18,'6.50',y(4));
m+=dimH(x(17.25),x(23),y(4)+18,'5.75',y(4));
m+=dimV(y(0),y(25),x(28)+29,'25.00 m',x(28));
m+=dimV(y(0),y(4),x(0)-30,'4.00',x(0));
m+=dimV(y(18),y(25),x(0)-30,'7.00',x(0));
m+=dimH(x(0),x(5),y(22),'5.00',y(22))+dimH(x(23),x(28),y(22),'5.00',y(22));
m+=line(x(5),y(0),x(5),y(25),'grid')+line(x(23),y(0),x(23),y(25),'grid')+
 line(x(0),y(4),x(28),y(4),'grid')+line(x(0),y(18),x(28),y(18),'grid');
for(const [a,k] of [[5,'A'],[10.75,'B'],[17.25,'C'],[23,'D']]){
 m+=circ(x(a),y(0)-15,11,'bubble')+T(x(a),y(0)-11,k,'bubble-text','text-anchor="middle"');
}
for(const [a,k] of [[4,'1'],[8.2,'2'],[12.5,'3'],[18,'4']]){
 m+=circ(x(28)+15,y(a),10,'bubble')+T(x(28)+15,y(a)+4,k,'bubble-text','text-anchor="middle"');
}
m+=T(950,160,'PLOT / SITE LAYOUT','panel-heading')+line(950,180,1315,180,'hairline');
m+=T(950,222,'01  PLOT BOUNDARY','key')+T(1270,222,'28.00 × 25.00 m','key-value','text-anchor="end"');
m+=T(950,260,'02  DESIGN ENVELOPE','key')+T(1270,260,'18.00 × 14.00 m','key-value','text-anchor="end"');
m+=T(950,298,'03  INNER COURT','key')+T(1270,298,'6.50 × 8.35 m','key-value','text-anchor="end"');
m+=T(950,336,'04  SETBACKS','key')+T(1270,336,'CONCEPT ONLY','key-value','text-anchor="end"');
m+=T(950,390,'DRAWING NOTES','panel-heading')+line(950,410,1315,410,'hairline');
for(const [i,txt] of [
['N01','DIMENSIONS IN METRES / INDICATIVE'],
['N02','NORTH IS CONCEPTUAL; NOT SURVEYED'],
['N03','NO PROPERTY OR PERMIT RECORD'],
['N04','ROOMS FOLLOW 18 × 14 m MODEL'],
['N05','CHECK ALL LOCAL CODES BEFORE USE'],
['N06','ROAD / ACCESS LOCATION ASSUMED']
])m+=T(950,450+36*(+i.slice(1)-1),i+'   '+txt,'note');
m+=line(x(6),y(10),x(22),y(10),'section-cut')+circ(x(6),y(10),10,'section-bubble')+T(x(6),y(10)+4,'A','bubble-text','text-anchor="middle"')+circ(x(22),y(10),10,'section-bubble')+T(x(22),y(10)+4,'A','bubble-text','text-anchor="middle"');
m+=T(950,705,'SYMBOLS / LINEWORK','panel-heading')+line(950,727,1315,727,'hairline');
m+=line(956,751,1023,751,'boundary')+T(1035,755,'SITE BOUNDARY','tiny');
m+=line(956,780,1023,780,'wall')+T(1035,784,'WALL / PLAN','tiny');
m+=line(956,809,1023,809,'grid')+T(1035,813,'REFERENCE GRID','tiny');
m+=path('M850 185 l0 -65 -9 16 9 -5 9 5Z','north-arrow')+T(850,111,'N','north');
return paper('A-001',L('مخطط الموقع','Site layout study'),'PLOT / ACCESS / SETBACKS / ROOM ENVELOPE',m);
}
function ceiling(){
 const scale=32,ox=205,oy=170,x=v=>ox+v*scale,y=v=>oy+v*scale;
 let m=rect(ox,oy,18*scale,14*scale,'building-outline');
 const widths=[0,5.75,12.25,18],depths=[0,4.2,8.6,12.55,14];
 for(const a of widths)m+=line(x(a),y(0),x(a),y(14),'grid');
 for(const b of depths)m+=line(x(0),y(b),x(18),y(b),'grid');
 for(const [a,b,c,d,t] of CAD.data.walls){
 const h=Math.max(3,t*scale),sx=x(Math.min(a,c)),sy=y(Math.min(b,d));
 m+=Math.abs(d-b)<.001?rect(sx,sy-h/2,Math.abs(c-a)*scale,h,'wall'):rect(sx-h/2,sy,h,Math.abs(d-b)*scale,'wall');
 }
 const lights=CAD.data.lights;
 for(let i=0;i<lights.length;i++){
 const [a,b]=lights[i],sx=x(a),sy=y(b);
 m+=circ(sx,sy,7,'lighting')+circ(sx,sy,3,'lighting-fill')+
   line(sx-12,sy,sx+12,sy,'light-axis')+line(sx,sy-12,sx,sy+12,'light-axis');
 m+=T(sx+13,sy-9,'L'+String(i+1).padStart(2,'0'),'tiny');
 }
 for(let i=0;i<lights.length-1;i++){const [a,b]=lights[i],[c,d]=lights[i+1];
 if(i===3||i===7)continue;
 m+=path('M'+x(a)+' '+y(b)+' L'+x(c)+' '+y(b)+' L'+x(c)+' '+y(d),'circuit');
 }
 for(const [a,b,id] of [[1,4.8,'S1'],[13,4.8,'S2'],[7,1.9,'S3'],[4.8,10,'S4']]){
 m+=rect(x(a),y(b),13,13,'switch')+T(x(a)+17,y(b)+11,id,'tiny');
 }
 m+=T(930,160,'REFLECTED CEILING','panel-heading')+line(930,180,1325,180,'hairline');
 m+=T(930,230,'LIGHTING POINTS','key')+T(1285,230,String(lights.length).padStart(2,'0'),'key-value','text-anchor="end"');
 m+=T(930,273,'SWITCH GROUPS','key')+T(1285,273,'04','key-value','text-anchor="end"');
 m+=T(930,345,'CIRCUIT KEY','panel-heading');
 for(const [n,label] of [['L-01','RECESSED DOWNLIGHT'],['S-01','WALL SWITCH'],['C-01','DASHED ROUTE']]){
 m+=T(930,390+50*(['L-01','S-01','C-01'].indexOf(n)),n+'  /  '+label,'note');
 }
 m+=T(930,595,'NOTE: CIRCUITS SHOWN ARE','note')+T(930,617,'ILLUSTRATIVE — NO ELECTRICAL','note')+
 T(930,639,'DESIGN OR APPROVAL IMPLIED.','note');
 m+=dimH(x(0),x(18),y(0)-42,'18.00 m',y(0))+dimV(y(0),y(14),x(18)+43,'14.00 m',x(18));
 return paper('E-101',L('مخطط الإنارة','Lighting coordination'),'LIGHTING / FIXTURES / SWITCHES / RCP',m);
}
function details(){
 let m='';
 function unit(x,y,title,type){
   m+=rect(x,y,540,264,'detail-border')+T(x+20,y+31,title,'panel-heading')+line(x+20,y+41,x+520,y+41,'hairline');
   if(type===0){
     m+=rect(x+70,y+80,320,28,'wall')+rect(x+72,y+108,318,13,'hatch')+
      rect(x+120,y+121,26,104,'wall')+rect(x+146,y+121,13,104,'glazing-frame')+
      rect(x+164,y+121,10,104,'glass')+rect(x+180,y+121,10,104,'glass')+
      line(x+100,y+76,x+100,y+237,'leader')+
      T(x+406,y+95,'FINISH / 20','tiny')+T(x+406,y+135,'GASKET','tiny')+T(x+406,y+173,'DOUBLE GLAZING','tiny')+T(x+406,y+213,'PROFILE','tiny');
   }else if(type===1){
      m+=rect(x+80,y+80,300,17,'wall')+rect(x+80,y+99,23,131,'wall')+rect(x+348,y+99,32,131,'wall')+
      rect(x+103,y+188,245,15,'joinery')+rect(x+103,y+203,245,20,'hatch')+
      rect(x+134,y+108,12,80,'joinery')+rect(x+310,y+108,12,80,'joinery');
      m+=T(x+399,y+116,'CABINET TOP','tiny')+T(x+399,y+160,'DOOR / OPEN','tiny')+T(x+399,y+204,'PLINTH','tiny');
   }else if(type===2){
      m+=rect(x+75,y+85,292,50,'wall')+rect(x+75,y+135,292,12,'hatch')+
      rect(x+220,y+147,19,97,'joinery')+rect(x+200,y+147,19,97,'glass')+
      path('M'+(x+100)+' '+(y+169)+' H'+(x+420),'leader')+
      T(x+399,y+112,'RC SLAB','tiny')+T(x+399,y+154,'EDGE DETAIL','tiny')+T(x+399,y+210,'SEAL / STUDY','tiny');
   }else{
      m+=rect(x+80,y+88,300,140,'furniture')+rect(x+102,y+112,256,10,'joinery')+
       rect(x+102,y+134,256,10,'joinery')+rect(x+102,y+156,256,10,'joinery')+
       rect(x+102,y+178,256,10,'joinery')+rect(x+102,y+200,256,10,'joinery');
      m+=T(x+396,y+130,'SHELF A','tiny')+T(x+396,y+177,'SHELF B','tiny')+
       T(x+396,y+220,'FIXING TBC','tiny');
   }
 }
 unit(100,145,'D-01   ROOF EDGE / SCHEMATIC',0);
 unit(730,145,'D-02   CABINET / JOINERY',1);
 unit(100,472,'D-03   GLAZING JUNCTION',2);
 unit(730,472,'D-04   INTERNAL DETAIL',3);
 return paper('A-401',L('تفاصيل معمارية','Architectural details'),'FOUR STUDIES / CONNECTIONS / FINISHES',m);
}
const cache={site,lighting:ceiling,details,
 plan:()=>CAD.sheet(6),elevation:()=>CAD.elevation(),section:()=>CAD.section()};
function get(name){
 try{return (cache[name]||cache.site)()}catch(e){return ''}
}
function mount(el,name){
 if(!el)return;
 const sheet=get(name);
 if(!sheet)return;
 el.innerHTML=sheet;
 el.classList.remove('cad-paper--empty');
 el.dataset.drawingType=name;
}
document.querySelectorAll('[data-drafting-sheet]').forEach(el=>mount(el,el.dataset.draftingSheet));
document.querySelectorAll('[data-cad-build] [data-cad-paper="site"]').forEach(el=>{
 const target=el.querySelector('.cad-paper-inner');
 if(target)mount(target,'site');
});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver((entries,o)=>{
 for(const e of entries){if(e.isIntersecting){e.target.classList.add('is-drawn');o.unobserve(e.target);}}
 },{threshold:.13});
 document.querySelectorAll('[data-cad-build] .cad-paper').forEach(el=>observer.observe(el));
}
const zoomDialog=document.createElement('dialog');
zoomDialog.className='draft-viewer';
zoomDialog.setAttribute('aria-label',L('معاينة الرسومات','Technical drawing viewer'));
zoomDialog.innerHTML='<div class="draft-viewer-head"><span class="draft-viewer-title">R / H — TECHNICAL SHEET</span><div class="draft-viewer-tools"><button type="button" data-zoom-out aria-label="'+L('تصغير','Zoom out')+'">−</button><button type="button" data-zoom-reset>'+L('ملاءمة','Fit')+'</button><button type="button" data-zoom-in aria-label="'+L('تكبير','Zoom in')+'">+</button><button type="button" data-zoom-close aria-label="'+L('إغلاق','Close')+'">×</button></div></div><div class="draft-viewer-scroll"><div class="draft-viewer-paper"></div></div><p class="draft-viewer-disclaimer">'+L('معاينة لمخطط تجريبي، ما ملف تنفيذ معتمد.','Concept study preview. Not a construction drawing.')+'</p>';
document.body.appendChild(zoomDialog);
const viewport=zoomDialog.querySelector('.draft-viewer-scroll');
const draw=zoomDialog.querySelector('.draft-viewer-paper');
let ratio=1;
function setRatio(value){
 ratio=Math.max(1,Math.min(4,value));
 draw.style.width=(100*ratio)+'%';
}
document.addEventListener('click',e=>{
 const trigger=e.target.closest('[data-open-drawing]');
 if(!trigger)return;
 const wrapper=trigger.closest('[data-cad-paper],.case-drafting');
 const actual=wrapper?.querySelector('.drafting-svg,.rh-cad-svg');
 if(!actual)return;
 draw.replaceChildren(actual.cloneNode(true));
 setRatio(1);
 viewport.scrollTop=0;viewport.scrollLeft=0;
 zoomDialog.showModal();
});
zoomDialog.querySelector('[data-zoom-in]').addEventListener('click',()=>setRatio(ratio+.5));
zoomDialog.querySelector('[data-zoom-out]').addEventListener('click',()=>setRatio(ratio-.5));
zoomDialog.querySelector('[data-zoom-reset]').addEventListener('click',()=>setRatio(1));
zoomDialog.querySelector('[data-zoom-close]').addEventListener('click',()=>zoomDialog.close());
zoomDialog.addEventListener('click',e=>{if(e.target===zoomDialog)zoomDialog.close()});
})();
