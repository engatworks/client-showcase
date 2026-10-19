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
[5.75,4.55,2.45,'v'],[5.75,9.35,2.25,'v'],[12.25,4.55,2.45,'v'],
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
function layerSite(){let s='<rect x="75" y="102" width="700" height="615" class="cad-property"/>';
for(let i=0;i<42;i++){const a=80+(i*37%690),b=107+(i*67%604);
s+='<circle cx="'+a+'" cy="'+b+'" r="'+(4+i%6)+'" class="cad-site-tree"/>';}
return s;}
function layerWalls(){let s=walls.map(([a,b,c,d,t])=>Math.abs(d-b)<.001?
rect(Math.min(a,c),b-t/2,Math.abs(c-a),t,'cad-wall'):rect(a-t/2,Math.min(b,d),t,Math.abs(d-b),'cad-wall')).join('');
return s;}
function layerGlass(){let s=glass.map(([a,b,len,d])=>d==='h'?line(a,b-.05,a+len,b-.05,'cad-window')+line(a,b+.05,a+len,b+.05,'cad-window'):line(a-.05,b,a-.05,b+len,'cad-window')+line(a+.05,b,a+.05,b+len,'cad-window')).join('');
for(const [a,b,r,degree] of door){let t=degree*Math.PI/180,ex=a+r*Math.cos(t+Math.PI/2),ey=b+r*Math.sin(t+Math.PI/2);
s+='<path d="M'+p(a+r*Math.cos(t),b+r*Math.sin(t))+' A'+r*S+' '+r*S+' 0 0 1 '+p(ex,ey)+'" class="cad-door"/>'+line(a,b,ex,ey,'cad-door');}
return s;}
function layerFurn(){let s=furnishings.map(([a,b,w,h])=>rect(a,b,w,h,'cad-furn')).join('');
s+=rect(6.25,5,5.5,4.25,'cad-water-edge')+rect(6.42,5.17,5.16,3.9,'cad-water');
s+=circ(9,7.2,.6,'cad-tree')+circ(9,7.2,1.05,'cad-canopy')+circ(9,7.2,1.30,'cad-canopy');
for(let i=0;i<16;i++){const t=i*Math.PI/8;s+=line(9+.63*Math.cos(t),7.2+.63*Math.sin(t),9+1.04*Math.cos(t),7.2+1.04*Math.sin(t),'cad-branch');}
for(let i=0;i<9;i++)s+=line(6.3,9.6+i*.24,11.7,9.6+i*.24,'cad-paving');
return s;}
function layerLights(){return lights.map(([a,b],i)=>circ(a,b,.15,'cad-lamp')+line(a-.22,b,a+.22,b,'cad-light-axis')+line(a,b-.22,a,b+.22,'cad-light-axis')).join('');}
function dimension(a,b,c,d,label){const horiz=Math.abs(b-d)<.001;
return line(a,b,c,d,'cad-dim')+(horiz?line(a,b-.13,a,b+.13,'cad-dim')+line(c,d-.13,c,d+.13,'cad-dim'):
line(a-.13,b,a+.13,b,'cad-dim')+line(c-.13,d,c+.13,d,'cad-dim'))+
text(label,(a+c)/2,(b+d)/2-.18,'cad-dim-label');}
function layerAnno(){let s=rooms.map(([id,ar,en,a,b])=>text(id,a,b-.20,'cad-num')+text(en,a,b+.18,'cad-room')).join('');
s+=text('REFLECTING POOL',9,9.46,'cad-room');
for(const [a,b,t] of [[0,5.75,'5.75'],[5.75,12.25,'6.50'],[12.25,18,'5.75']])s+=dimension(a,-1.05,b,-1.05,t);
s+=dimension(0,-1.95,18,-1.95,'18.00 m');
for(const [a,b,t] of [[0,4.2,'4.20'],[4.2,12.55,'8.35'],[12.55,14,'1.45']])s+=dimension(19.15,a,19.15,b,t);
s+=dimension(20.25,0,20.25,14,'14.00 m');
for(const [a,t] of [[0,'A'],[5.75,'B'],[9,'C'],[12.25,'D'],[18,'E']])s+=line(a,-.4,a,13.1,'cad-grid')+circ(a,-.38,.27,'cad-grid-disc')+text(t,a,-.31,'cad-grid-num');
for(const [a,t] of [[0,'1'],[4.2,'2'],[8.6,'3'],[12.55,'4']])s+=line(-.35,a,18.35,a,'cad-grid')+circ(-.46,a,.27,'cad-grid-disc')+text(t,-.46,a+.08,'cad-grid-num');
for(const [a,b,c,d,label] of [[5.75,7.1,4.55,7.8,'GL-01'],[11.75,5.05,12.9,5.8,'PL-01'],[2,8.6,3.55,9.3,'D-01'],[15.2,5.25,16.7,4.8,'W-03']]){
s+=circ(a,b,.07,'cad-dim-dot')+line(a,b,c,d,'cad-leader')+text(label,c,d-.16,'cad-callout');}
return s;}
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
// Simple valid ASCII DXF R12, editable LINE / CIRCLE / TEXT entities on named layers.
// The more detailed multilevel R2013 DXF set is also provided separately as a download.
function dxf(){
const records=[];function push(type,layer,fields){records.push('0\n'+type+'\n8\n'+layer+'\n'+fields.map((v,i)=>v[0]+'\n'+v[1]).join('\n')+'\n');}
const ln=(a,b,c,d,l)=>push('LINE',l,[[10,a],[20,b],[30,0],[11,c],[21,d],[31,0]]);
const rec=(a,b,w,h,l)=>{ln(a,b,a+w,b,l);ln(a+w,b,a+w,b+h,l);ln(a+w,b+h,a,b+h,l);ln(a,b+h,a,b,l);};
for(const [a,b,c,d,t] of walls){if(Math.abs(b-d)<.001)rec(Math.min(a,c),b-t/2,Math.abs(a-c),t,'A-WALL');else rec(a-t/2,Math.min(b,d),t,Math.abs(b-d),'A-WALL');}
for(const [a,b,len,ori] of glass)for(const t of [-.05,.05]){if(ori==='h')ln(a,b+t,a+len,b+t,'A-GLAZING');else ln(a+t,b,a+t,b+len,'A-GLAZING');}
for(const [a,b,w,h] of furnishings)rec(a,b,w,h,'A-FURN');rec(6.25,5,5.5,4.25,'A-POOL');
for(const [a,b] of lights){push('CIRCLE','E-LIGHT',[[10,a],[20,b],[30,0],[40,.15]]);}
for(const [id,ar,en,a,b] of rooms)push('TEXT','A-LABEL',[[10,a],[20,b],[30,0],[40,.16],[1,id+' '+en]]);
let header='0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n';
return header+records.join('')+'0\nENDSEC\n0\nEOF\n';
}
window.REHAB_CAD={data:{rooms,walls,glass,door,lights},sheet,frame,elevation,section,dxf,config:H};
})();