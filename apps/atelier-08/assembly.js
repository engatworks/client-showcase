/**
 * REHAB HAIDER — FROM DRAWING TO DWELLING
 * A scroll-directed architectural assembly, same footprint driving 2D and 3D.
 * Built with Three.js r180, MIT license: https://threejs.org/
 * Procedural render, NOT a photograph of a built project or an approved BIM/DWG model.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
const section = $('#assembly');
const canvasHost = $('#assemblyCanvas');
const status = $('#assemblyStatus');
const pointer = $('#assemblyProgress');
const stageLabel = $('#assemblyNumber');
const blueprint = $('#assemblyBlueprint');
const renderSave = $('#assemblySave');
const stagePanels = $$('.assembly-copy [data-build-step]');
const stepButtons = $$('[data-assembly-jump]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer:coarse)').matches;
if (!section || !canvasHost) throw new Error('Architectural assembly container is unavailable.');

const H = Object.freeze({
  width: 18,
  depth: 14,
  sideWing: 5.75,
  courtyardWidth: 6.5,
  courtLength: 8.35,
  rearWingDepth: 4.2,
  floorHeight: 3.7,
  roofThickness: .34,
  upperFloorHeight: 3.1
});
const positions = [-9, -3.25, 3.25, 9];
const roofZ = -4.9;
const stageStarts = [0, .08, .21, .34, .49, .65, .81];
const stageDurations = [.11, .14, .15, .17, .16, .16, .17];
const stageNames = ['الموقع', 'المخطط والأساسات', 'الهيكل', 'الواجهات والزجاج', 'السقف والتظليل', 'التشطيبات', 'الصورة الكاملة'];

function clamp(v,min=0,max=1){return Math.max(min,Math.min(max,v));}
function smooth(v){const x=clamp(v);return x*x*(3-2*x);}
function blend(from,to,t){return from+(to-from)*t;}
const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#dddbcd',50,105);
const camera = new THREE.PerspectiveCamera(38,1,.1,150);
camera.position.set(26,27,31);
camera.lookAt(0,1.8,0);
const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
renderer.setClearColor('#e3e1d6',0);
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, coarse?1.3:1.7));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.shadowMap.enabled = !coarse;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('aria-label','نموذج ثلاثي الأبعاد أصلي لمنزل معاصر يتجمّع على مراحل، مبني على المخطط نفسه');
renderer.domElement.setAttribute('role','img');
canvasHost.appendChild(renderer.domElement);
const ambient = new THREE.HemisphereLight(0xeaf3ec,0x928b77,2.6); scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffefd5,3.5);
sun.position.set(14,27,12);sun.castShadow=!coarse;
sun.shadow.mapSize.set(coarse?512:2048,coarse?512:2048);
sun.shadow.camera.left=-26;sun.shadow.camera.right=26;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;
sun.shadow.normalBias=.028;scene.add(sun);
const fill=new THREE.DirectionalLight(0xc6d7d5,.65);fill.position.set(-16,10,-10);scene.add(fill);

const groundMat=new THREE.MeshStandardMaterial({color:'#bab9a8',roughness:1});
const concrete=new THREE.MeshStandardMaterial({color:'#999b8b',roughness:.92});
const glass=new THREE.MeshPhysicalMaterial({color:'#bed4ca',transparent:true,opacity:.52,roughness:.12,metalness:.18,depthWrite:false,side:THREE.DoubleSide});
const iron=new THREE.MeshStandardMaterial({color:'#252e2a',roughness:.5,metalness:.5});
const black=new THREE.MeshStandardMaterial({color:'#191f1b',metalness:.38,roughness:.62});
const bronze=new THREE.MeshStandardMaterial({color:'#947b5d',metalness:.34,roughness:.54});
const white=new THREE.MeshStandardMaterial({color:'#d9d5c8',roughness:.91});
const plaster=new THREE.MeshStandardMaterial({color:'#e8e3d7',roughness:.86});
const wood=new THREE.MeshStandardMaterial({color:'#897460',roughness:.84});
const water=new THREE.MeshPhysicalMaterial({color:'#527d83',roughness:.12,metalness:.3,transparent:true,opacity:.82});
const soil=new THREE.MeshStandardMaterial({color:'#646a57',roughness:1});
const plant=new THREE.MeshStandardMaterial({color:'#425740',roughness:1});
const plantLight=new THREE.MeshStandardMaterial({color:'#677c58',roughness:1});
const nightGlow=new THREE.MeshStandardMaterial({color:'#f5ddaa',emissive:'#cf9956',emissiveIntensity:.4,roughness:.6});
const slabMat=new THREE.MeshStandardMaterial({color:'#c4beb0',roughness:1});
const lineMat=new THREE.LineBasicMaterial({color:'#8e967f',transparent:true,opacity:.65});
const stages=Array.from({length:7},()=>new THREE.Group());
stages.forEach(group=>scene.add(group));
const offsets=[0,0,7.4,10.2,12.7,10.7,7.8];
const blueprintLines=new THREE.Group();scene.add(blueprintLines);

// Procedural PBR-friendly limestone: stable, material-scale noise rather than cartoon flat colors.
function grainTexture(color1,color2){
 const c=document.createElement('canvas');c.width=256;c.height=256;
 const x=c.getContext('2d');
 x.fillStyle=color1;x.fillRect(0,0,256,256);
 let seed=13;const rand=()=>((seed=(seed*16807)%2147483647)-1)/2147483646;
 for(let i=0;i<5200;i++){const xx=rand()*256,yy=rand()*256;
  x.fillStyle=rand()>.5?'rgba(255,255,255,.045)':'rgba(46,40,33,.046)';
  x.fillRect(xx,yy,rand()*2+.3,rand()*2+.3);}
 for(let i=0;i<21;i++){x.strokeStyle='rgba(42,41,34,.028)';x.beginPath();const y=rand()*256;x.moveTo(0,y);x.lineTo(256,y+rand()*9);x.stroke();}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2);t.anisotropy=2;return t;
}
const limestone=new THREE.MeshStandardMaterial({map:grainTexture('#d7cfbf','#d1c5af'),color:'#ede9dd',roughness:.91});
const tiled=new THREE.MeshStandardMaterial({map:grainTexture('#aca99a','#a7a08d'),color:'#d7d3c7',roughness:.94});
const trowelled=new THREE.MeshStandardMaterial({map:grainTexture('#b6b9b0','#b0b7ad'),color:'#c3c7bd',roughness:.95});
function cuboid(parent,material,w,h,d,x,y,z,opts={}){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
 mesh.position.set(x,y,z);
 mesh.castShadow=opts.cast!==false;
 mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function plane(parent,material,w,d,x,y,z){
 const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),material);
 m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;parent.add(m);return m;
}
function rod(parent,material,a,b,r=.035){
 const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b);
 const delta=end.clone().sub(start);
 const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),6),material);
 m.position.copy(start.add(end).multiplyScalar(.5));
 m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
 m.castShadow=false;parent.add(m);return m;
}
function line(points,parent=blueprintLines,material=lineMat){
 const geo=new THREE.BufferGeometry().setFromPoints(points.map(x=>new THREE.Vector3(...x)));
 const l=new THREE.Line(geo,material);parent.add(l);return l;
}
function outline(x1,z1,x2,z2,y,mat=lineMat){
 line([[x1,y,z1],[x2,y,z1],[x2,y,z2],[x1,y,z2],[x1,y,z1]],blueprintLines,mat);
}
outline(-9,-7,9,7,.12);
outline(-9,-7,9,-2.8,.13);
outline(-9,-2.8,-3.25,5.5,.14);
outline(3.25,-2.8,9,5.5,.14);
outline(-3.25,-2.8,3.25,5.5,.14);
for(let i=-12;i<=12;i+=1){line([[i,.09,-9],[i,.09,9]]);line([[-12,.09,i], [12,.09,i]]);}
for(const xx of positions){line([[xx,.18,-7],[xx,.18,5.5]],blueprintLines,new THREE.LineDashedMaterial({color:'#9b9b86',dashSize:.2,gapSize:.25}));}
// 00 - terrain, architectural site, setbacks
cuboid(stages[0],groundMat,33,.3,29,0,-.48,0,{cast:false});
plane(stages[0],tiled,33,29,0,-.318,0);
for(let i=0;i<8;i++){
 cuboid(stages[0],concrete,.07,.028,29,-15.6+i*4.45,-.29,0,{cast:false});
}
for(let i=0;i<6;i++)cuboid(stages[0],concrete,33,.028,.07,0,-.29,-13.1+i*5,{cast:false});
const groundGarden= new THREE.MeshStandardMaterial({color:'#74816a',roughness:1});
plane(stages[0],groundGarden,13,7.2,-.15,-.296,10.2);
plane(stages[0],groundGarden,11,3.7,-10.6,-.294,-.4);
plane(stages[0],groundGarden,9,4,11,-.294,-.5);

// 01 - actual U-shaped footprint slabs, courtyard, entrance slabs.
cuboid(stages[1],slabMat,18,.44,4.2,0,.02,-4.9);
cuboid(stages[1],slabMat,5.75,.44,8.4,-6.125,.02,1.3);
cuboid(stages[1],slabMat,5.75,.44,8.4,6.125,.02,1.3);
cuboid(stages[1],concrete,6.5,.24,8.4,0,-.07,1.3);
cuboid(stages[1],tiled,6.2,.07,7.9,0,.084,1.35);
for(let i=0;i<8;i++)cuboid(stages[1],limestone,1.55,.08,.44,0,.07,6.4+i*.9);
cuboid(stages[1],iron,20,.18,.4,0,-.15,7.4);
cuboid(stages[1],limestone,1.2,.06,6.5,0,.12,2.8);
for(let i=-1;i<=1;i++)cuboid(stages[1],bronze,.035,.02,7.9,i*2.1,.145,1.3,{cast:false});
// 02 - vertical structural concrete, columns and beams.
for(const x of [-8.7,-3.3,3.3,8.7]){
 for(const z of [-6.7,-2.8,5.15]){
  if((Math.abs(x)===3.3&&z===-6.7))continue;
  cuboid(stages[2],limestone,.35,3.63,.35,x,1.85,z);
 }
}
for(const z of [-6.78,-2.8])cuboid(stages[2],concrete,18,.25,.25,0,3.58,z);
for(const x of [-8.7,-3.3,3.3,8.7])cuboid(stages[2],concrete,.26,.25,8.3,x,3.58,1.13);
for(const z of [-1.85,.45,2.75,4.75])cuboid(stages[2],concrete,5.7,.17,.16,-6.12,3.49,z);
// 03 - exterior/inner walls and glazed doors.
cuboid(stages[3],limestone,18,3.15,.43,0,1.82,-6.82);
cuboid(stages[3],limestone,.43,3.15,13.25,-8.8,1.82,-.12);
cuboid(stages[3],limestone,.43,3.15,13.25,8.8,1.82,-.12);
for(const side of [-1,1]){
 const x=side*3.28;
 // court glazing: transparent glass running continuously along inner U wings.
 cuboid(stages[3],glass,.065,2.82,7.9,x,1.73,1.25,{cast:false});
 for(const z of [-2.55,-.65,1.25,3.15,5.15])cuboid(stages[3],iron,.09,3,.09,x,1.74,z);
 cuboid(stages[3],iron,.1,.13,8.15,x,3.18,1.2);
 cuboid(stages[3],black,.52,3.25,1.95,side*6.45,1.79,-2.93);
 // pane bands on front wing exterior
 cuboid(stages[3],glass,3.85,2.72,.08,side*6.15,1.7,5.48,{cast:false});
 for(let j=0;j<3;j++)cuboid(stages[3],iron,.065,2.72,.12,side*(4.85+j*1.3),1.7,5.55);
 }
 // Rear courtyard glazing
cuboid(stages[3],glass,6.45,2.65,.075,0,1.72,-2.87,{cast:false});
for(const x of [-3.17,-1.06,1.05,3.17])cuboid(stages[3],iron,.065,2.7,.11,x,1.72,-2.78);
cuboid(stages[3],iron,6.45,.11,.08,0,3.2,-2.78);
// Outer facade thin horizontal band and tactile stone panels
for(const x of [-8.87,8.87]){
 for(const z of [-5.8,-4.6,3.4,4.6])cuboid(stages[3],bronze,.12,2.25,.09,x,1.85,z);
}
for(let i=0;i<6;i++){
 const x=-7.9+i*1.32;
 cuboid(stages[3],limestone,.83,2.62,.22,x,1.79,-6.5);
}
// 04 - roofing planes, cantilever and shade structures
cuboid(stages[4],limestone,18.3,.38,4.65,0,3.87,-4.95);
cuboid(stages[4],limestone,5.98,.38,8.95,-6.12,3.87,1.0);
cuboid(stages[4],limestone,5.98,.38,8.95,6.12,3.87,1.0);
cuboid(stages[4],black,18.45,.12,.12,0,4.1,-7.02);
cuboid(stages[4],black,.14,.12,12.8,-9.05,4.1,-.25);
cuboid(stages[4],black,.14,.12,12.8,9.05,4.1,-.25);
// partial upper-level volume at rear side, long limestone gallery
cuboid(stages[4],plaster,10.6,2.6,3.6,-3.6,5.5,-4.92);
cuboid(stages[4],iron,10.9,.26,3.8,-3.55,6.95,-4.95);
cuboid(stages[4],glass,8.4,1.62,.09,-3.55,5.7,-2.99,{cast:false});
for(let i=0;i<6;i++)cuboid(stages[4],iron,.065,1.85,.14,-7.45+i*1.55,5.63,-2.93);
cuboid(stages[4],black,8.8,.1,.13,-3.55,4.68,-2.9);
 // pergola structure on inner open courtyard crossing over sitting area
for(const z of [-1.2,.5,2.2,3.9]){
 cuboid(stages[4],bronze,6.2,.11,.19,0,4.2,z);
}
for(const x of [-3.2,3.2])cuboid(stages[4],iron,.13,.22,6.6,x,4.05,1.3);
// 05 - fins, timber louvers, water feature and courtyard elements
for(const side of [-1,1]) {
 const x=side*8.91;
 for(let i=0;i<26;i++) {
   const z=-2.35+i*.29;
   cuboid(stages[5],wood,.14,3.02,.095,x,1.68,z,{cast:!coarse});
 }
}
for(let i=0;i<11;i++)cuboid(stages[5],wood,.16,.13,3.8,-5.8+i*.95,4.16,-1.5);
cuboid(stages[5],iron,3.7,.12,2.45,0,.11,2.25);
cuboid(stages[5],water,3.45,.025,2.14,0,.181,2.3,{cast:false});
cuboid(stages[5],limestone,1.0,.43,2.0,-2.1,.27,4.0);
cuboid(stages[5],wood,1.2,.13,.8,1.65,.33,4.0);
// Interior built in furniture, visible behind glass
for(const x of [-5.2,5.2]){
 cuboid(stages[5],plaster,2.3,.46,.72,x,.62,1.9);
 cuboid(stages[5],wood,.65,.38,.72,x-1,.61,2.2);
 cuboid(stages[5],wood,.9,.26,.85,x,.49,3.15);
 cuboid(stages[5],iron,1.2,.09,.7,x,.51,1.1);
 cuboid(stages[5],nightGlow,.11,2.1,.1,x+1.65,1.52,4.45,{cast:false});
}
// 06 - landscape, fine site furniture, planting beds
for(const x of [-11.8,11.8]){
 for(const z of [-7.5,-3.9,2.5,6.5]){
  cuboid(stages[6],soil,1.45,.12,1.55,x,-.19,z,{cast:false});
  for(let i=0;i<5;i++){
    const dx=(i%3-1)*.29,dz=(Math.floor(i/3)-.5)*.4;
    const bush=new THREE.Mesh(new THREE.IcosahedronGeometry(.3+(i%3)*.09,1),i%2===0?plant:plantLight);
    bush.position.set(x+dx,.22+(i%3)*.13,z+dz);
    bush.castShadow=!coarse;stages[6].add(bush);
  }
 }
}
for(const z of [8.0,10.0,12.0])for(const x of [-7.4,7.4]){
 const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,2),plant);
 shrub.position.set(x,.55,z);shrub.scale.set(1.05,.75,1.12);stages[6].add(shrub);
}
for(const z of [-.5,2.5,5.6]) {
 const lamp=cuboid(stages[6],black,.07,.76,.07,-10.5,.25,z,{cast:false});
 cuboid(stages[6],nightGlow,.19,.11,.19,-10.5,.68,z,{cast:false});
}
for(const xx of [-12.4,12.4])cuboid(stages[6],concrete,.1,.48,19,xx,-.04,0,{cast:false});
// Environment free-standing sun/shadow hints and refined scale
const groundGrid=new THREE.GridHelper(30,30,'#929e8b','#cad0c1');groundGrid.position.y=-.307;groundGrid.material.opacity=.13;groundGrid.material.transparent=true;scene.add(groundGrid);

function resize(){
 const {width,height}=canvasHost.getBoundingClientRect();
 if(!width||!height)return;
 renderer.setSize(width,height,false);
 camera.aspect=width/height;camera.fov=width<650?46:38;camera.updateProjectionMatrix();
 render();
}
let progress=0,desiredProgress=0,frame=0,animating=false,visible=false;
function revealStage(i,t){
 const a=i===0?1:smooth((t-stageStarts[i])/stageDurations[i]);
 stages[i].visible=a>.01;
 stages[i].position.set(0,offsets[i]*(1-a),0);
 stages[i].scale.setScalar(i===1?.9+.1*a:1);
 return a;
}
function render(){
 renderer.render(scene,camera);
}
function update(t){
 const v=clamp(t);
 for(let i=0;i<stages.length;i++)revealStage(i,v);
 // Plan gets exactly the same U dimensions as the 3D foundation.
 blueprint.style.opacity=String(clamp(1-v*4.4));
 blueprintLines.visible=v<.26;
 groundGrid.visible=v<.21;
 const move=smooth(clamp((v-.14)/.82));
 const mobile=canvasHost.clientWidth<650;
 camera.position.set(blend(mobile?29:27,mobile?30:20,move),blend(mobile?29:30,mobile?20:12.5,move),blend(mobile?30:33,mobile?37:24,move));
 camera.lookAt(0,blend(.5,2.15,move),0);
 sun.intensity=blend(3.7,2.8,clamp((v-.75)*4));
 ambient.intensity=blend(2.55,1.9,clamp((v-.75)*4));
 const active=stageStarts.reduce((a,val,i)=>v>=val?a=i:a,0);
 stagePanels.forEach((n,i)=>n.classList.toggle('current',i===active));
 stepButtons.forEach((n,i)=>{n.classList.toggle('active',i===active);n.setAttribute('aria-current',i===active?'step':'false');});
 stageLabel.textContent='0'+(active+1)+' / 07';
 pointer.style.transform='scaleX('+Math.max(.012,v)+')';
 if(status)status.textContent=stageNames[active]+' — '+Math.round(v*100)+'%';
 render();
}
function fromScroll(){
 const box=section.getBoundingClientRect();
 const total=Math.max(1,section.offsetHeight-innerHeight);
 return clamp(-box.top/total);
}
function onScroll(){
 desiredProgress=fromScroll();
 if(reduced){update(desiredProgress);return;}
 if(!animating){animating=true;requestAnimationFrame(tick);}
}
function tick(){
 progress=blend(progress,desiredProgress,.15);
 if(Math.abs(progress-desiredProgress)<.0003){progress=desiredProgress;animating=false;}
 update(progress);
 if(animating)requestAnimationFrame(tick);
}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',resize,{passive:true});
new ResizeObserver(resize).observe(canvasHost);
// Seven navigation buttons jump to architecture stages; they're not an artificial scroll hijack.
stepButtons.forEach((b,i)=>b.addEventListener('click',()=>{
 const destination=section.getBoundingClientRect().top+scrollY+stageStarts[i]*(section.offsetHeight-innerHeight);
 scrollTo({top:destination,behavior:reduced?'auto':'smooth'});
}));
renderSave?.addEventListener('click',()=>{
 render();
 renderer.domElement.toBlob(blob=>{
   if(!blob)return;
   const url=URL.createObjectURL(blob);
   const a=document.createElement('a');
   a.href=url;a.download='rehab-haider-courtyard-architecture-concept.png';
   a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 },'image/png',.95);
});
// The house footprint below is sourced from H and positions, not a decorative hand-drawn diagram.
if(blueprint){
 const px=x=>50+(x+9)*(300/18),pz=z=>34+(z+7)*(240/14);
 const rect=(x,z,w,d)=>'<rect x="'+px(x).toFixed(2)+'" y="'+pz(z).toFixed(2)+'" width="'+(w*300/18).toFixed(2)+'" height="'+(d*240/14).toFixed(2)+'"/>';
 const plan='<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="مخطط الدور الأرضي لنفس تكوين المنزل الذي يجري تجميعه">'+
 '<g fill="none" stroke="#c7d1c2" stroke-width="2.2">'+
 rect(-9,-7,18,H.rearWingDepth)+
 rect(-9,-2.8,H.sideWing,8.35)+
 rect(3.25,-2.8,H.sideWing,8.35)+
 rect(-3.25,-2.8,H.courtyardWidth,8.35)+
 '</g><g fill="none" stroke="#b6c5b4" stroke-width=".75" stroke-dasharray="5 4">'+
 '<path d="M50 34V275M350 34V275M50 34H350M50 275H350"/>'+
 '</g><path d="M50 289H350M42 34V274" stroke="#d6b886" stroke-width="1"/>'+
 '<g fill="#d6b886" font-size="8" font-family="Arial,sans-serif"><text x="200" y="305" text-anchor="middle">18,000 mm — CONCEPT SCALE</text><text x="26" y="165" transform="rotate(-90 26 165)" text-anchor="middle">14,000 mm</text><text x="360" y="38">N ↑</text></g>'+
 '<text x="200" y="190" text-anchor="middle" fill="#d5decf" font-family="Arial,sans-serif" font-size="10">COURTYARD</text></svg>';
 blueprint.innerHTML=plan;
}
resize();
// The prominent project hero image is rendered from exactly this 3D scene.
// The original architectural stock photo remains only as a fallback if WebGL fails.
try{
 update(1);
 renderer.setClearColor('#d9dacc',1);
 render();
 const output=renderer.domElement.toDataURL('image/png');
 const hero=document.querySelector('#heroImage');
 if(hero&&output.startsWith('data:image/png')){
   hero.src=output;
   hero.alt='رندر معماري توضيحي لبيت الفناء؛ ملتقط من النموذج ثلاثي الأبعاد نفسه، وليس صورة لمبنى منفّذ';
   const foot=document.querySelector('.hero-foot span:last-child');
   if(foot)foot.textContent='3D VISUALIZATION / SAME MODEL / NOT BUILT';
 }
 renderer.setClearColor('#e3e1d6',0);
}catch(e){console.warn('Project preview render unavailable; reference image retained.',e);}
update(fromScroll());
$('#assemblyLoader')?.remove();
window.__rehabAssembly={geometry:H,stages:stageNames.length,setProgress:update};
