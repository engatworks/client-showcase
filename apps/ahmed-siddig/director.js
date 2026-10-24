/* AHMED SIDDIG — THE SIGNAL / CINEMATIC DIRECTOR
   Everything is local: no analytics, cookie banners, external API, or dependency.
   Electrical arcs and diagrams are illustrative; Ohm's-law bench is a real ideal-DC calculation.
*/
const mm = matchMedia('(prefers-reduced-motion: reduce)');
let motionAllowed = !mm.matches;
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
const lerp = (a,b,t)=>a+(b-a)*t;
const scrollMeter = $('#scroll-meter-fill');

// 00 / A short art-directed circuit initialization, not a network-loading indicator.
const boot = $('#boot-overlay');
const bootPercent = $('#boot-percent');
if (boot) {
  if (!motionAllowed) boot.remove();
  else {
    const started = performance.now();
    const timer = setInterval(()=>{
      const x=clamp((performance.now()-started)/1150,0,1);
      bootPercent.textContent=`${String(Math.floor(x*100)).padStart(3,'0')}%`;
      if(x>=1)clearInterval(timer);
    },40);
    setTimeout(()=>boot.remove(),2600);
  }
}

// 01 / Three-scene prologue. The narrative affects model viewing mode and camera.
const hero=$('#hero-sequence');
const stageStory={
  0:{mode:'physical',label:'01 / MEET THE ENGINEER',title:'POWER IS<br>PERSONAL.',desc:''},
  1:{mode:'exploded',label:'02 / SYSTEM ANATOMY',title:'NOT MAGIC.<br>JUST SYSTEMS.',desc:'From busbars to breakers, every component belongs to a larger sequence. Take the system apart and look closer.'},
  2:{mode:'schematic',label:'03 / THE INVISIBLE LOGIC',title:'EVERY LINE<br>HAS A REASON.',desc:'Behind the enclosure is the logic: protection, control and connections. See the conceptual route behind the hardware.'}
};
const modeButtons=$$('.mode');
let userOwnsModel=false;
for (const b of modeButtons) b.addEventListener('click',e=>{if(e.isTrusted)userOwnsModel=true});
let act=-1;
function directHero(){
  if(!hero)return;
  const denominator=Math.max(1,hero.offsetHeight-window.innerHeight);
  const t=clamp(-hero.getBoundingClientRect().top/denominator,0,1);
  const next=t<.30?0:t<.67?1:2;
  if(next!==act){
    act=next;hero.dataset.act=String(act);
    const step=stageStory[act];
    $('#act-title').innerHTML=step.title;
    $('#act-description').textContent=step.desc;
    $('.act-count').textContent=step.label;
    $$('.act-bar').forEach((bar,i)=>bar.classList.toggle('active',i===act));
    if(!userOwnsModel){
      const b=modeButtons.find(x=>x.dataset.mode===step.mode);
      if(b && !b.classList.contains('active')) b.click();
    }
  }
}
let scrollRaf=0;
function onScroll(){
  if(scrollRaf)return;
  scrollRaf=requestAnimationFrame(()=>{
    directHero();
    document.querySelector('.site-header')?.classList.toggle('scrolled',scrollY>30);
    const denominator=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    if(scrollMeter)scrollMeter.style.transform=`scaleY(${scrollY/denominator})`;
    scrollRaf=0;
  });
}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll,{passive:true});
onScroll();

// 02 / Pointer-attracting details. Does not interfere with touch, keyboard or input.
const pointer=$('#cursor-orbit');
if(pointer && matchMedia('(pointer:fine)').matches && motionAllowed){
  let xx=-150,yy=-150,cx=-150,cy=-150;
  window.addEventListener('pointermove',e=>{xx=e.clientX;yy=e.clientY},{passive:true});
  $$('a, button, input[type="range"]').forEach(el=>{
    el.addEventListener('mouseenter',()=>pointer.classList.add('hovered'));
    el.addEventListener('mouseleave',()=>pointer.classList.remove('hovered'));
  });
  function pointerFrame(){
    cx=lerp(cx,xx,.17);cy=lerp(cy,yy,.17);
    pointer.style.transform=`translate3d(${cx-pointer.offsetWidth/2}px,${cy-pointer.offsetHeight/2}px,0)`;
    if(!document.hidden)requestAnimationFrame(pointerFrame);
    else setTimeout(()=>requestAnimationFrame(pointerFrame),200);
  }
  requestAnimationFrame(pointerFrame);
}

// 03 / Whole-site charge. One continuous, scroll-linked conductor routed through
// real DOM anchor positions; branches spark when a project enters view.
const canvas=document.createElement('canvas');
canvas.id='signal-artery';canvas.setAttribute('aria-hidden','true');document.body.appendChild(canvas);
const ctx=canvas.getContext('2d',{alpha:true});
const nodes=[
  {selector:'.hero-visual',x:.72,y:.58},
  {selector:'.interlude-one h2',x:.74,y:.70},
  {selector:'.featured-project .feature-visual',x:.42,y:.44},
  {selector:'.work-card:first-child',x:.82,y:.38},
  {selector:'.lab-display',x:.47,y:.54},
  {selector:'.sim-viewport',x:.56,y:.49},
  {selector:'.ac-stage',x:.66,y:.48},
  {selector:'.experience-section h2',x:.57,y:.47},
  {selector:'.about-aside',x:.39,y:.30},
  {selector:'.contact-center',x:.68,y:.45}
];
let flight=[],totalLength=0, lastPageY=-9999,lastWidth=0,lastHeight=0, lastGeometry=0;
function collectAnchors(){
  return nodes.map(n=>{
    const el=$(n.selector);
    if(!el)return null;
    const r=el.getBoundingClientRect();
    return {x:r.left+r.width*n.x,y:r.top+r.height*n.y+scrollY};
  }).filter(Boolean);
}
function bendCurve(a,b,t){
  // A physical cable: smooth bends, with a controlled horizontal meander.
  const span=b.y-a.y;
  const cx1=a.x+(b.x-a.x)*.06;
  const cx2=b.x-(b.x-a.x)*.06;
  const y1=a.y+span*.43;
  const y2=b.y-span*.43;
  const s=1-t;
  return {x:s*s*s*a.x+3*s*s*t*cx1+3*s*t*t*cx2+t*t*t*b.x,
          y:s*s*s*a.y+3*s*s*t*y1+3*s*t*t*y2+t*t*t*b.y};
}
function geometry(){
  const p=collectAnchors();
  const next=[];let accum=0;
  for(let i=0;i<p.length-1;i++){
    const a=p[i],b=p[i+1];
    const n=clamp(Math.ceil(Math.abs(b.y-a.y)/12),20,210);
    for(let s=0;s<=n;s++){
      const q=bendCurve(a,b,s/n);
      if(next.length){const last=next[next.length-1];accum+=Math.hypot(q.x-last.x,q.y-last.y)}
      next.push({...q,d:accum});
    }
  }
  flight=next;totalLength=accum;
}
function canvasResize(){
  if(!ctx)return;
  const w=innerWidth,h=innerHeight,d=Math.min(devicePixelRatio||1,1.35);
  const W=Math.round(w*d),H=Math.round(h*d);
  if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H;canvas.style.width=w+'px';canvas.style.height=h+'px'}
  ctx.setTransform(d,0,0,d,0,0);
}
function pointAt(distance){
  if(!flight.length)return null;
  let lo=0,hi=flight.length-1;
  while(lo<hi){const mid=(lo+hi)>>1;if(flight[mid].d<distance)lo=mid+1;else hi=mid}
  const curr=flight[lo],prev=flight[Math.max(0,lo-1)];
  const f=clamp((distance-prev.d)/Math.max(.001,curr.d-prev.d),0,1);
  return {x:lerp(prev.x,curr.x,f),y:lerp(prev.y,curr.y,f)};
}
function drawSpark(x,y,r,alpha){
  const gradient=ctx.createRadialGradient(x,y,0,x,y,r*8);
  gradient.addColorStop(0,`rgba(247,255,244,${alpha})`);
  gradient.addColorStop(.13,`rgba(158,253,226,${alpha*.70})`);
  gradient.addColorStop(1,'rgba(91,216,206,0)');
  ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(x,y,r*8,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=`rgba(238,255,248,${alpha})`;ctx.beginPath();ctx.arc(x,y,Math.max(1,r*.37),0,Math.PI*2);ctx.fill();
}
function strokeBranch(origin,target,t,alpha){
  const dx=target.x-origin.x,dy=target.y-origin.y;
  const dist=Math.hypot(dx,dy),len=Math.max(6,Math.round(dist/13));
  const norm={x:-dy/Math.max(1,dist),y:dx/Math.max(1,dist)};
  ctx.beginPath();ctx.moveTo(origin.x,origin.y);
  for(let j=1;j<len;j++){
    const z=j/len;
    const jitter=Math.sin(j*53.78+Math.floor(t*22)*6.29)*Math.sin(Math.PI*z)*Math.min(9,dist*.03);
    ctx.lineTo(lerp(origin.x,target.x,z)+norm.x*jitter,lerp(origin.y,target.y,z)+norm.y*jitter);
  }
  ctx.lineTo(target.x,target.y);
  ctx.shadowColor='#98ffe7';ctx.shadowBlur=11;ctx.lineWidth=1.1;ctx.strokeStyle=`rgba(200,255,231,${alpha})`;ctx.stroke();ctx.shadowBlur=0;
}
let lastElectricFrame=0;
let lastImpact=null;
document.addEventListener('pointerdown', event=>{
  if(motionAllowed && !document.body.classList.contains('power-disabled')) {
    lastImpact={x:event.clientX,y:event.clientY,time:performance.now()};
  }
}, {passive:true,capture:true});
function renderCurrent(now){
  if(!ctx || !motionAllowed){return}
  requestAnimationFrame(renderCurrent);
  if(document.hidden || now-lastElectricFrame<(innerWidth<700?52:33))return;
  lastElectricFrame=now;
  const w=innerWidth,h=innerHeight;
  canvasResize();ctx.clearRect(0,0,w,h);
  if(document.body.classList.contains('power-disabled'))return;
  if(now-lastGeometry>230||Math.abs(scrollY-lastPageY)>28||w!==lastWidth||h!==lastHeight){
    geometry();lastGeometry=now;lastPageY=scrollY;lastWidth=w;lastHeight=h;
  }
  if(!flight.length)return;
  const visible=flight.filter((p,i)=>i%2===0&&p.y>scrollY-60&&p.y<scrollY+h+60);
  if(visible.length>1){
    ctx.save();ctx.lineWidth=w<700?.55:1;ctx.strokeStyle='rgba(102,219,204,.18)';ctx.beginPath();
    visible.forEach((p,i)=>i?ctx.lineTo(p.x,p.y-scrollY):ctx.moveTo(p.x,p.y-scrollY));ctx.stroke();ctx.restore();
  }
  // Propagating packets of energy, timed by arclength, not viewport pixel y.
  for(let k=0;k<5;k++){
    const center=((now*.09 +k*totalLength/5)%Math.max(1,totalLength));
    let last=null;ctx.beginPath();
    for(let i=0;i<32;i++){
      const d=center-170+i*6; if(d<0||d>totalLength)continue;
      const p=pointAt(d);if(!p)continue;
      const y=p.y-scrollY;
      if(y<-60||y>h+60){last=null;continue}
      if(!last)ctx.moveTo(p.x,y);else ctx.lineTo(p.x,y);
      last=p;
    }
    ctx.save();ctx.strokeStyle='rgba(162,255,231,.54)';ctx.shadowColor='#7ef5df';ctx.shadowBlur=12;ctx.lineWidth=2;ctx.stroke();ctx.restore();
    const head=pointAt(center);
    if(head&&head.y-scrollY>-25&&head.y-scrollY<h+25)drawSpark(head.x,head.y-scrollY,w<700?1.6:3,.87);
  }
  // A clicked control briefly receives a charge from the nearest routed conductor.
  if(lastImpact && now-lastImpact.time<340 && w>650){
    const intensity=Math.pow(1-(now-lastImpact.time)/340,1.7);
    let closest=null,score=Infinity;
    for(let i=0;i<flight.length;i+=4){
      const p=flight[i],y=p.y-scrollY;
      if(y<0||y>h)continue;
      const d=Math.hypot(p.x-lastImpact.x,y-lastImpact.y);
      if(d<score){score=d;closest={x:p.x,y}}
    }
    if(closest&&score<620){
      strokeBranch(closest,{x:lastImpact.x,y:lastImpact.y},now*.001,intensity*.85);
      drawSpark(lastImpact.x,lastImpact.y,2.9,intensity);
    }
  }
  // On section crossings, a restrained arc leaps toward the nearest conductor.
  if(w>800){
    for(let i=2;i<nodes.length-1;i++){
      const el=$(nodes[i].selector);if(!el)continue;
      const r=el.getBoundingClientRect();
      if(r.top>h||r.bottom<0)continue;
      const anchor=flight.filter(p=>Math.abs(p.y-(r.top+scrollY+r.height*.5))<80);
      const origin=anchor[Math.floor(anchor.length/2)];if(!origin)continue;
      const pulse=Math.pow(Math.max(0,Math.sin(now*.0013+i*1.93)),17);
      if(pulse>.55){
        const target={x:r.left+r.width*(i%2?.20:.81),y:r.top+r.height*.52};
        strokeBranch({x:origin.x,y:origin.y-scrollY},target,now*.001,pulse*.45);
        drawSpark(target.x,target.y,1.3,pulse*.7);
      }
    }
  }
}
if(ctx && motionAllowed)requestAnimationFrame(renderCurrent);

// 04 / An ideal DC one-loop experiment. The values genuinely obey I=V/R, P=VI.
const voltage=$('#voltage'),resistance=$('#resistance');
const currentOut=$('#current-output'),powerOut=$('#power-output');
const orb=$('#sim-charge-orb'),route=$('#sim-circuit-path');
const scope=$('#waveform-canvas'),scopeCtx=scope?.getContext('2d');
let simCurrent=1,orbitDistance=0,simLast=performance.now();
const simPresets={low:{v:5,r:90},nominal:{v:24,r:24},high:{v:48,r:4}};
function calc(){
  if(!voltage||!resistance)return;
  const V=Number(voltage.value),R=Number(resistance.value);
  const I=V/R,P=V*I;simCurrent=I;
  $('#voltage-value').innerHTML=`${V} <small>V</small>`;
  $('#resistance-value').innerHTML=`${R} <small>Ω</small>`;
  currentOut.innerHTML=`${I.toFixed(I<10?2:1)}<small> A</small>`;
  powerOut.innerHTML=`${P.toFixed(P<100?1:0)}<small> W</small>`;
  $('#sim-voltage-caption').textContent=`V = ${V} V`;
  $('#sim-resistance-caption').textContent=`R = ${R} Ω`;
  $('#sim-flow-label').textContent=I<.2?'LOW FLOW':I>6?'HIGH FLOW':'STEADY DC';
  $$('.sim-presets button').forEach(b=>b.classList.toggle('active',false));
}
for(const range of [voltage,resistance])range?.addEventListener('input',calc);
for(const btn of $$('.sim-presets button'))btn.addEventListener('click',()=>{
  const data=simPresets[btn.dataset.preset];
  voltage.value=data.v;resistance.value=data.r;calc();btn.classList.add('active');
});
function simulatorFrame(now){
  requestAnimationFrame(simulatorFrame);
  if(document.hidden || !scopeCtx || !orb || !route)return;
  const dt=Math.min((now-simLast)/1000,.1);simLast=now;
  const r=$('#sim-viewport')?.getBoundingClientRect();
  if(!r||r.bottom<0||r.top>innerHeight)return;
  if(motionAllowed){
    orbitDistance=(orbitDistance+(24+Math.sqrt(simCurrent)*32)*dt)%route.getTotalLength();
    const p=route.getPointAtLength(orbitDistance);
    orb.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
  }
  const d=Math.min(devicePixelRatio||1,1.5),rect=scope.getBoundingClientRect();
  if(scope.width!==Math.round(rect.width*d)||scope.height!==Math.round(rect.height*d)){
    scope.width=Math.round(rect.width*d);scope.height=Math.round(rect.height*d);
  }
  scopeCtx.setTransform(d,0,0,d,0,0);
  const w=rect.width,h=rect.height;
  scopeCtx.clearRect(0,0,w,h);
  scopeCtx.strokeStyle='rgba(118,192,171,.2)';scopeCtx.lineWidth=.7;
  for(let i=0;i<5;i++){const y=(i+1)*h/6;scopeCtx.beginPath();scopeCtx.moveTo(0,y);scopeCtx.lineTo(w,y);scopeCtx.stroke()}
  const level=clamp(simCurrent/12,0,1);
  const y=h*.87-level*h*.64;
  scopeCtx.strokeStyle='#abfbe1';scopeCtx.lineWidth=2;scopeCtx.shadowBlur=12;scopeCtx.shadowColor='#68edd4';
  scopeCtx.beginPath();scopeCtx.moveTo(0,y);scopeCtx.lineTo(w,y);scopeCtx.stroke();scopeCtx.shadowBlur=0;
  const phase=(now*.055*(.35+Math.sqrt(simCurrent)*.17))%Math.max(1,w);
  for(let i=0;i<5;i++){
    const x=(phase+i*w/5)%Math.max(1,w);
    scopeCtx.fillStyle='rgba(228,255,237,.95)';scopeCtx.fillRect(x-1.5,y-2,3,4);
  }
}
if(voltage && resistance){calc();requestAnimationFrame(simulatorFrame)}

// 05 / Reveal the additional experiential chapters and preserve accessibility.
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})
  },{threshold:.08});
  $$('.interlude h2,.sim-title-row,.sim-interface').forEach(e=>{e.classList.add('reveal');observer.observe(e)})
}