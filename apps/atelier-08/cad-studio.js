/* Rehab Haider / precision concept drawing. All labels are independently authored.
   Shared geometrical datum with house-config.js; units in metres. Not construction issue. */
(()=>{'use strict';
const H=window.REHAB_HOUSE_GEOMETRY;if(!H)return;
const rooms=[['01','مجلس الضيوف','MAJLIS',2.8,6.4],['02','غرفة ضيف','GUEST',2.8,10.7],
['03','صالة المعيشة','LIVING',15.1,6.4],['04','غرفة نوم','BEDROOM',15.1,10.7],
['05','منطقة الطعام','DINING',2.8,2.1],['06','صالة عائلية','FAMILY',7.25,2.1],
['07','المطبخ','KITCHEN',15.1,2.1],['08','الفناء الداخلي','COURTYARD',9,10.5]];
const walls=[[0,0,18,0,.25],[0,0,0,12.55,.25],[18,0,18,12.55,.25],
[0,12.55,5.75,12.55,.25],[12.25,12.55,18,12.55,.25],
[5.75,4.2,5.75,12.55,.25],[12.25,4.2,12.25,12.55,.25],
[0,4.2,5.75,4.2,.18],[12.25,4.2,18,4.2,.18],[5.75,4.2,12.25,4.2,.18],
[5.75,0,5.75,4.2,.18],[12.25,0,12.25,4.2,.18],[8.8,0,8.8,4.2,.16],
[0,8.6,5.75,8.6,.16],[12.25,8.6,18,8.6,.16]];
const glass=[[1.2,0,3,'h'],[13.8,0,3,'h'],[0,5.2,2.15,'v'],[18,5.2,2.15,'v'],
[5.75,4.55,2.25,'v'],[5.75,9.35,2.25,'v'],[12.25,4.55,2.45,'v'],
[12.25,9.35,2.25,'v'],[6.6,4.2,4.8,'h']];
const door=[[2,8.6,.9,0],[14.2,8.6,.9,0],[5.75,2.1,1,270],[12.25,2.1,1,90],
[8.8,2.1,.9,270],[5.75,6.9,1.15,270],[12.25,7.1,1.15,90]];
const furnishings=[[1.15,5.35,2.45,.77],[1.15,6.45,.8,1.25],[3.97,5.1,.65,1.8],
[1.3,9.7,2,1.35],[14.1,9.78,2.3,1.33],[13.05,5.28,3,.79],
[14.35,6.35,.95,1.23],[1.1,1,2.9,.95],[6.6,1.08,1.8,.72],
[13.7,1.15,2.6,.84],[15.9,2.35,.7,1.1]];
const lights=[[2.8,1.65],[6.8,2.15],[10.2,2.15],[15,1.65],[2.8,6.3],
[2.8,10.5],[15,6.3],[15,10.5],[6.8,6],[11.2,6],[6.8,10.1],[11.2,10.1]];
const S=32,X=145,Y=170;
const p=(a,b)=>(X+a*S)+','+(Y+b*S), x=a=>X+a*S, y=a=>Y+a*S;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const line=(a,b,c,d,cl)=>'<line x1="'+x(a)+'" y1="'+y(b)+'" x2="'+x(c)+'" y2="'+y(d)+'" class="'+cl+'"/>';
const rect=(a,b,w,h,cl,fill)=>'<rect x="'+x(a)+'" y="'+y(b)+'" width="'+w*S+'" height="'+h*S+'" class="'+cl+'"'+(fill?' fill="'+fill+'"':'')+'/>';
const text=(t,a,b,cl)=>'<text x="'+x(a)+'" y="'+y(b)+'" class="'+cl+'">'+esc(t)+'</text>';
const circ=(a,b,r,cl)=>'<circle cx="'+x(a)+'" cy="'+y(b)+'" r="'+r*S+'" class="'+cl+'"/>';
function layerSite(){
 let out='<rect x="73" y="99" width="715" height="623" class="cad-property"/>';
 const trees=[[91,125],[750,135],[100,686],[763,680]];
 for(const [cx,cy] of trees){
   out+='<circle cx="'+cx+'" cy="'+cy+'" r="13" class="cad-site-tree"/>'+
   '<circle cx="'+cx+'" cy="'+cy+'" r="7" class="cad-site-tree"/>';
 }
 // Access paving outside the southwest/central entry remains separate from house.
 out+='<path d="M'+x(9)+' '+y(14)+'V'+y(12.6)+'" stroke="#a99372" stroke-width="3" stroke-dasharray="5 5"/>';
 out+='<text x="91" y="110" class="cad-doc-sub">SITE LIMIT</text>'+
 '<text x="766" y="711" text-anchor="end" class="cad-doc-sub">PLOT / DESIGN STUDY</text>';
 return out;
}
function layerWalls(){let s=walls.map(([a,b,c,d,t])=>Math.abs(d-b)<.001?
rect(Math.min(a,c),b-t/2,Math.abs(c-a),t,'cad-wall'):rect(a-t/2,Math.min(b,d),t,Math.abs(d-b),'cad-wall')).join('');
return s;}
function layerGlass(){let s=glass.map(([a,b,len,d])=>d==='h'?line(a,b-.05,a+len,b-.05,'cad-window')+line(a,b+.05,a+len,b+.05,'cad-window'):line(a-.05,b,a-.05,b+len,'cad-window')+line(a+.05,b,a+.05,b+len,'cad-window')).join('');
for(const [a,b,r,degree] of door){let t=degree*Math.PI/180,ex=a+r*Math.cos(t+Math.PI/2),ey=b+r*Math.sin(t+Math.PI/2);
s+='<path d="M'+p(a+r*Math.cos(t),b+r*Math.sin(t))+' A'+r*S+' '+r*S+' 0 0 1 '+p(ex,ey)+'" class="cad-door"/>'+line(a,b,ex,ey,'cad-door');}
return s;}
function layerFurn(){let s=furnishings.map(([a,b,w,h])=>rect(a,b,w,h,'cad-furn')).join('');
s+=rect(6.25,5,5.5,4.25,'cad-water-edge')+rect(6.42,5.17,5.16,3.9,'cad-water');
s+=circ(7.3,10.75,.24,'cad-tree')+circ(7.3,10.75,.6,'cad-canopy')+circ(7.3,10.75,.78,'cad-canopy');
for(let i=0;i<16;i++){const t=i*Math.PI/8;s+=line(7.3+.25*Math.cos(t),10.75+.25*Math.sin(t),7.3+.65*Math.cos(t),10.75+.65*Math.sin(t),'cad-branch');}
for(let i=0;i<9;i++)s+=line(6.3,9.6+i*.24,11.7,9.6+i*.24,'cad-paving');
return s;}
function layerLights(){return lights.map(([a,b],i)=>circ(a,b,.15,'cad-lamp')+line(a-.22,b,a+.22,b,'cad-light-axis')+line(a,b-.22,a,b+.22,'cad-light-axis')).join('');}
function dimension(a,b,c,d,label){const horiz=Math.abs(b-d)<.001;
return line(a,b,c,d,'cad-dim')+(horiz?line(a,b-.13,a,b+.13,'cad-dim')+line(c,d-.13,c,d+.13,'cad-dim'):
line(a-.13,b,a+.13,b,'cad-dim')+line(c-.13,d,c+.13,d,'cad-dim'))+
text(label,(a+c)/2,(b+d)/2-.18,'cad-dim-label');}
function layerAnno(){let s=rooms.map(([id,ar,en,a,b])=>text(id,a,b-.20,'cad-num')+text(en,a,b+.18,'cad-room')).join('');
s+=text('REFLECTING POOL',9,8.88,'cad-room');
for(const [a,b,t] of [[0,5.75,'5.75'],[5.75,12.25,'6.50'],[12.25,18,'5.75']])s+=dimension(a,-1.05,b,-1.05,t);
s+=dimension(0,-1.95,18,-1.95,'18.00 m');
for(const [a,b,t] of [[0,4.2,'4.20'],[4.2,12.55,'8.35'],[12.55,14,'1.45']])s+=dimension(19.15,a,19.15,b,t);
s+=dimension(20.25,0,20.25,14,'14.00 m');
for(const [a,t] of [[0,'A'],[5.75,'B'],[9,'C'],[12.25,'D'],[18,'E']])s+=line(a,-.4,a,13.1,'cad-grid')+circ(a,-.38,.27,'cad-grid-disc')+text(t,a,-.31,'cad-grid-num');
for(const [a,t] of [[0,'1'],[4.2,'2'],[8.6,'3'],[12.55,'4']])s+=line(-.35,a,18.35,a,'cad-grid')+circ(-.46,a,.27,'cad-grid-disc')+text(t,-.46,a+.08,'cad-grid-num');
for(const [a,b,c,d,label] of [[5.75,7.1,4.55,7.8,'GL-01'],[11.75,5.05,12.9,5.8,'PL-01'],[2,8.6,3.55,9.3,'D-01'],[15.2,5.25,16.7,4.8,'W-03']]){
s+=circ(a,b,.07,'cad-dim-dot')+line(a,b,c,d,'cad-leader')+text(label,c,d-.16,'cad-callout');}
return s;}
function overlay(kind){
 if(kind==='zoning'){
 const A=[ [0,0,5.75,4.2,'#d1ba91'],[5.75,0,6.5,4.2,'#b0c7bc'],[12.25,0,5.75,4.2,'#d5cbb6'],
 [0,4.2,5.75,8.35,'#e1d4b6'],[12.25,4.2,5.75,8.35,'#b2c7bd'],[5.75,4.2,6.5,8.35,'#d8e4dc']];
 return '<g opacity=".55">'+A.map(([a,b,w,h,color])=>rect(a,b,w,h,'cad-zone',color)).join('')+'</g>';
 }
 if(kind==='circulation'){
 const route=[[9,14,9,12.0],[9,12,9,10.6],[9,10.6,5.15,10.6],[9,10.6,13,10.6],[5.15,10.6,3,6.7],[13,10.6,15,6.7]];
 return '<g fill="none" stroke="#b2824b" stroke-width="6" stroke-dasharray="11 9" stroke-linecap="round" opacity=".86">'+
 route.map(([a,b,c,d])=>line(a,b,c,d,'cad-circulation')).join('')+'</g>'+
 '<circle cx="'+x(9)+'" cy="'+y(10.6)+'" r="8" fill="#ba915e"/>';
 }
 return '';
}
function technicalFrame(kind){
 if(kind==='elevation')return elevation();
 if(kind==='section')return section();
 if(kind==='details')return details();
 if(kind==='zoning'||kind==='circulation'){
 const svg=sheet(3);
 const base='<g data-drawing-layer="overlay">'+overlay(kind)+'</g>';
 return svg.replace('<g data-drawing-layer="walls">',base+'<g data-drawing-layer="walls">');
 }
 if(kind==='furniture')return sheet(4);
 if(kind==='sun'||kind==='lighting')return sheet(5);
 if(kind==='dimensions'||kind==='plan')return sheet(6);
 return sheet(6);
}
function sheet(stage=6,mode='normal'){
const levels=[
'<g data-drawing-layer="site">'+layerSite()+'</g>',
'<g data-drawing-layer="walls">'+layerWalls()+'</g>',
'<g data-drawing-layer="openings">'+layerGlass()+'</g>',
'<g data-drawing-layer="furniture">'+layerFurn()+'</g>',
'<g data-drawing-layer="lighting">'+layerLights()+'</g>',
'<g data-drawing-layer="dimensions">'+layerAnno()+'</g>'];
const content=levels.slice(0,Math.max(1,Math.min(6,stage))).join('');
let legend=rooms.map(([id,arabic,en],i)=>'<g transform="translate(865 '+(225+i*48)+')"><circle cx="12" cy="0" r="13" fill="#34483d"/><text x="12" y="4" class="cad-key-id">'+id+'</text><text x="41" y="5" class="cad-key-ar">'+esc(arabic)+'</text><text x="41" y="20" class="cad-key-en">'+esc(en)+'</text></g>').join('');
return '<svg xmlns="http://www.w3.org/2000/svg" class="rh-cad-svg" viewBox="0 0 1300 825" role="img" aria-label="مخطط توضيحي تفصيلي لمسكن بفناء داخلي، مع جدران وفتحات وفرش وإضاءة وأبعاد">'+
'<rect width="1300" height="825" fill="#edece5"/>'+
'<text x="70" y="54" class="cad-doc-heading">REHAB HAIDER / ARCHITECTURAL DESIGN STUDY</text>'+
'<text x="70" y="85" class="cad-doc-sub">COURTYARD HOUSE  /  GROUND FLOOR  /  CONCEPT REV. 01</text>'+
'<text x="1218" y="60" text-anchor="end" class="cad-sheet-no">A—101</text>'+
'<path d="M812 114V756M42 758H1252" stroke="#c0c5b8"/>'+
content+
'<path d="M755 146v48l-12-19 12 4 12-4Z" fill="#536a55"/><text x="755" y="132" text-anchor="middle" class="cad-doc-sub">N</text>'+
'<text x="865" y="158" class="cad-panel-title">مفتاح الفراغات</text><text x="865" y="186" class="cad-doc-sub">ROOM SCHEDULE / CONCEPT</text>'+
legend+
'<text x="865" y="690" class="cad-doc-sub">DRAWING SCALE: INDICATIVE / SVG</text>'+
'<text x="865" y="723" class="cad-doc-sub">EXTERNAL ENVELOPE: 18.00 × 14.00 m</text>'+
'<text x="60" y="794" class="cad-doc-sub">NOT FOR CONSTRUCTION · NOT AN AS-BUILT RECORD</text>'+
'<text x="1240" y="794" text-anchor="end" class="cad-doc-sub">ORIGINAL VECTOR DRAWING / CAD CONCEPT</text>'+
'</svg>';}
function elevation(){
let out='<svg xmlns="http://www.w3.org/2000/svg" class="rh-cad-svg" viewBox="0 0 1300 825" role="img" aria-label="الواجهة الداخلية مفاهيمية">'+
'<rect width="1300" height="825" fill="#edece5"/><text x="72" y="70" class="cad-doc-heading">COURTYARD HOUSE / COURTYARD ELEVATION</text><text x="1210" y="70" class="cad-sheet-no" text-anchor="end">A—201</text>';
const rect2=(a,b,w,h,cls)=>'<rect x="'+(143+a*54)+'" y="'+(576-(b+h)*54)+'" width="'+w*54+'" height="'+h*54+'" class="'+cls+'"/>';
out+=rect2(0,0,5.75,3.7,'cad-wall-soft')+rect2(12.25,0,5.75,3.7,'cad-wall-soft')+rect2(0,3.7,10.6,3.1,'cad-wall-soft');
out+=rect2(1,.75,3.3,2.4,'cad-glass-fill')+rect2(13.5,.75,3.3,2.4,'cad-glass-fill')+rect2(1,4.12,8.6,2.18,'cad-glass-fill');
for(const a of [1,2.1,3.2,4.3,13.5,14.6,15.7,16.8])out+='<line x1="'+(143+a*54)+'" x2="'+(143+a*54)+'" y1="'+(576-.75*54)+'" y2="'+(576-3.15*54)+'" class="cad-window"/>';
for(const [b,t] of [[0,'±0.00'],[3.7,'+3.70'],[6.8,'+6.80']])out+='<line x1="90" x2="1160" y1="'+(576-b*54)+'" y2="'+(576-b*54)+'" class="cad-level"/><text x="1180" y="'+(566-b*54)+'" class="cad-doc-sub">'+t+'</text>';
out+='<text x="70" y="734" class="cad-doc-sub">ELEVATION DRAWN FROM COURTYARD HOUSE ENVELOPE — NOT FOR CONSTRUCTION</text></svg>';return out;
}
function section(){let a='<svg xmlns="http://www.w3.org/2000/svg" class="rh-cad-svg" viewBox="0 0 1300 825" role="img" aria-label="قطاع A-A معماري تصوري"><rect width="1300" height="825" fill="#edece5"/><text x="72" y="70" class="cad-doc-heading">COURTYARD HOUSE / SECTION A—A</text><text x="1210" y="70" class="cad-sheet-no" text-anchor="end">A—301</text>';
const L=(x1,y1,x2,y2)=>'<line x1="'+(142+x1*54)+'" y1="'+(582-y1*54)+'" x2="'+(142+x2*54)+'" y2="'+(582-y2*54)+'" class="cad-wall-line"/>';
a+=L(0,0,18,0);for(const x0 of [0,5.75,12.25,18])a+=L(x0,0,x0,3.7);
for(const [x1,x2] of [[0,5.75],[12.25,18]])a+=L(x1,3.7,x2,3.7);
a+='<rect x="142" y="'+(582-6.8*54)+'" width="'+(10.6*54)+'" height="'+(3.1*54)+'" class="cad-wall-soft"/>';
for(const [lv,txt] of [[0,'±0.00'],[3.7,'+3.70'],[6.8,'+6.80']])a+='<path d="M90 '+(582-lv*54)+'H1160" class="cad-level"/><text x="1180" y="'+(577-lv*54)+'" class="cad-doc-sub">'+txt+'</text>';
return a+'<text x="72" y="734" class="cad-doc-sub">CONCEPT SECTION / LEVELS ASSUMED / NOT FOR CONSTRUCTION</text></svg>';
}
function frame(kind){
if(kind==='elevation')return elevation();if(kind==='section')return section();
if(kind==='furniture')return sheet(4);if(kind==='sun')return sheet(5);
if(kind==='dimensions')return sheet(6);
if(kind==='zoning')return sheet(2);
return sheet(6);
}
// Editable DXF generation intentionally retired from the public demonstration.
function details(){
 const panel=(x,y,title,subtitle,inner)=>'<g transform="translate('+x+' '+y+')"><rect width="540" height="292" fill="#eceae1" stroke="#b9c3b6" stroke-width="1.5"/><text x="24" y="37" font-size="21" font-weight="700" fill="#2e4736" font-family="Alexandria,Arial">'+esc(title)+'</text><text x="24" y="60" font-size="11" fill="#7e8c7a" font-family="Manrope,Arial">'+subtitle+'</text>'+inner+'</g>';
 const p1=panel(65,116,'تفصيلة التقاء السقف والواجهة','D-01 / ROOF EDGE — SCHEMATIC',
 '<g transform="translate(40 94)"><rect x="33" y="75" width="120" height="95" fill="#c4cabd" stroke="#465a4d" stroke-width="2"/><rect x="22" y="57" width="275" height="18" fill="#748572" stroke="#435d48" stroke-width="2"/>'+
 '<rect x="22" y="42" width="275" height="13" fill="#d2b581" stroke="#8a754e"/><path d="M152 77v91M172 77v91" stroke="#658e7d" stroke-width="4"/>'+
 '<path d="M300 42H425M299 65H425M172 130H425" stroke="#a38c63" stroke-width="1.3"/>'+
 '<text x="306" y="34" font-size="12" fill="#32493a">01 / ROOF FINISH</text><text x="306" y="58" font-size="12" fill="#32493a">02 / EDGE</text><text x="306" y="124" font-size="12" fill="#32493a">03 / WALL</text></g>');
 const p2=panel(655,116,'التقاء الزجاج والكسوة','D-02 / GLAZING JOINT — SCHEMATIC',
 '<g transform="translate(54 90)"><rect x="20" y="35" width="112" height="155" fill="#d6ceb9" stroke="#5c6b5b"/><rect x="138" y="35" width="18" height="155" fill="#405248"/>'+
 '<rect x="164" y="36" width="14" height="154" fill="#89c0b6" stroke="#426f68"/><rect x="181" y="36" width="14" height="154" fill="#a6d2c8" stroke="#426f68"/>'+
 '<path d="M190 80H420M156 116H420M132 164H420" stroke="#b18c5d" stroke-width="1.3"/>'+
 '<text x="236" y="74" font-size="12" fill="#32493a">01 / DOUBLE GLAZING</text><text x="236" y="109" font-size="12" fill="#32493a">02 / FRAME</text><text x="236" y="157" font-size="12" fill="#32493a">03 / WALL CLADDING</text></g>');
 const p3=panel(65,444,'تفصيلة الشرائح الخشبية','D-03 / TIMBER FINS — SCHEMATIC',
 '<g transform="translate(55 86)"><rect x="28" y="24" width="276" height="170" fill="#ddd8cb" stroke="#a1aa98"/>'+
 [0,1,2,3,4,5,6,7,8].map(i=>'<rect x="'+(46+i*26)+'" y="27" width="12" height="165" fill="#967457" stroke="#554c3d"/>' ).join('')+
 '<path d="M313 56H420M313 108H420M313 177H420" stroke="#b18c5d"/>'+
 '<text x="319" y="50" font-size="11" fill="#32493a">01 / FIN</text><text x="319" y="102" font-size="11" fill="#32493a">02 / SUPPORT</text><text x="319" y="171" font-size="11" fill="#32493a">03 / BACKING</text></g>');
 const p4=panel(655,444,'تفصيلة حافة المسبح','D-04 / POOL EDGE — SCHEMATIC',
 '<g transform="translate(40 87)"><rect x="20" y="64" width="310" height="135" fill="#9ec3c0" stroke="#56827a"/>'+
 '<path d="M18 63H324" stroke="#468a89" stroke-width="3"/><rect x="20" y="33" width="136" height="25" fill="#dad5c9" stroke="#797c6b"/>'+
 '<rect x="20" y="60" width="15" height="139" fill="#6b796e"/><rect x="35" y="181" width="295" height="18" fill="#56675d"/>'+
 '<path d="M164 45H420M328 65H420M333 186H420" stroke="#b18c5d"/>'+
 '<text x="220" y="39" font-size="11" fill="#32493a">01 / STONE COPING</text><text x="334" y="59" font-size="11" fill="#32493a">02 / WATER</text><text x="335" y="179" font-size="11" fill="#32493a">03 / SHELL</text></g>');
 return '<svg xmlns="http://www.w3.org/2000/svg" class="rh-cad-svg" viewBox="0 0 1260 825" role="img" aria-label="أربع رسومات تفاصيل مفاهيمية لحافة السقف، الزجاج، الشرائح الخشبية، وحافة المسبح">'+
 '<rect width="1260" height="825" fill="#edece5"/><text x="64" y="57" class="cad-doc-heading">REHAB HAIDER / ARCHITECTURAL DETAIL EXPLORATION</text>'+
 '<text x="1214" y="57" text-anchor="end" class="cad-sheet-no">A—401</text>'+p1+p2+p3+p4+
 '<text x="64" y="785" class="cad-doc-sub">DETAIL PRINCIPLES ONLY — NO MATERIAL SPECIFICATION, WATERPROOFING OR STRUCTURAL APPROVAL IMPLIED</text></svg>';
}

window.REHAB_CAD={data:{rooms,walls,glass,door,lights},sheet,frame:technicalFrame,elevation,section,details,config:H};
})();