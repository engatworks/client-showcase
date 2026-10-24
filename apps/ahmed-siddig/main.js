// AHMED SIDDIG / THE SIGNAL
// Dependency-free, WebGL 2.0 interactive engineering study.
// The conceptual model is illustrative, not a certified electrical design.

const canvas = document.getElementById('hero-canvas');
const visual = document.querySelector('.hero-visual');
const fallback = document.getElementById('webgl-fallback');
const modes = Array.from(document.querySelectorAll('.mode'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentMode = 'physical';
let currentEnabled = !reduceMotion;
const powerToggle = document.getElementById('power-toggle');
const heroArcCanvas = document.getElementById('electric-arcs');
const heroArcCtx = heroArcCanvas.getContext('2d');
const siteCurrentCanvas = document.getElementById('site-current');
const siteCurrentCtx = siteCurrentCanvas.getContext('2d');
const progressFill = document.getElementById('scroll-meter-fill');
if (reduceMotion) {powerToggle.setAttribute('aria-pressed', 'false'); powerToggle.disabled=true; powerToggle.title='Electric animation disabled by reduced-motion preference'; document.body.classList.add('power-disabled'); powerToggle.classList.add('off'); powerToggle.querySelector('.power-toggle-text').textContent='CIRCUIT STILL';}
powerToggle.addEventListener('click', () => {
  currentEnabled = !currentEnabled;
  powerToggle.setAttribute('aria-pressed', String(currentEnabled));
  powerToggle.querySelector('.power-toggle-text').textContent = currentEnabled ? 'CIRCUIT LIVE' : 'CIRCUIT OFF';
  powerToggle.classList.toggle('off', !currentEnabled);
  document.body.classList.toggle('power-disabled', !currentEnabled);
});


modes.forEach(button => button.addEventListener('click', () => {
  currentMode = button.dataset.mode;
  for (const mode of modes) {
    const selected = mode === button;
    mode.classList.toggle('active', selected);
    mode.setAttribute('aria-pressed', String(selected));
  }
  visual.classList.toggle('is-schematic', currentMode === 'schematic');
  visual.classList.toggle('is-exploded', currentMode === 'exploded');
}));

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('copy-email').addEventListener('click', async function () {
  const email = 'engahmedsiddig21@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    this.textContent = 'EMAIL COPIED ✓';
  } catch (_error) {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    this.textContent = ok ? 'EMAIL COPIED ✓' : email;
  }
  window.setTimeout(() => { this.innerHTML = 'COPY EMAIL <span>↗</span>'; }, 2500);
});

const inView = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    inView.unobserve(entry.target);
  }
}, { threshold: 0.09 });
for (const el of document.querySelectorAll('.section-head,.featured-project,.work-card,.timeline-row,.about-main,.about-aside,.contact-center')) {
  el.classList.add('reveal'); inView.observe(el);
}

canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();
  fallback.hidden=false;
  visual.querySelector('.power-status').lastChild.textContent=' VISUAL FALLBACK';
});
canvas.addEventListener('webglcontextrestored',()=>window.location.reload());
const gl = canvas.getContext('webgl2' , { antialias: true, alpha: true, depth: true, powerPreference: 'high-performance' });
if (!gl) {
  fallback.hidden = false;
  visual.querySelector('.visual-bottom').firstElementChild.textContent = '2D STUDY / WEBGL 2 REQUIRED FOR LIVE 3D';
  visual.querySelector('.power-status').lastChild.textContent = ' VISUAL FALLBACK';
} else {
  init3D(gl);
}

function init3D(gl) {
  const vertexSrc = `#version 300 es
    precision highp float;
    layout(location=0) in vec3 aPosition;
    layout(location=1) in vec3 aNormal;
    layout(location=2) in vec3 aColor;
    layout(location=3) in vec3 aExplode;
    uniform mat4 uProjection;
    uniform float uYaw;
    uniform float uPitch;
    uniform float uExplode;
    uniform float uDistance;
    out vec3 vNormal;
    out vec3 vColor;
    out vec3 vPosition;
    void main(){
      vec3 p = aPosition + aExplode * uExplode;
      float cy=cos(uYaw),sy=sin(uYaw),cx=cos(uPitch),sx=sin(uPitch);
      mat3 ry=mat3(cy,0.,-sy, 0.,1.,0., sy,0.,cy);
      mat3 rx=mat3(1.,0.,0., 0.,cx,sx, 0.,-sx,cx);
      mat3 rot=rx*ry;
      p=rot*p;
      vNormal=normalize(rot*aNormal);
      vColor=aColor;
      vPosition=p;
      gl_Position=uProjection*vec4(p.x,p.y,p.z-uDistance,1.);
    }`;
  const fragmentSrc = `#version 300 es
    precision highp float;
    in vec3 vNormal;
    in vec3 vColor;
    in vec3 vPosition;
    out vec4 outColor;
    void main(){
      vec3 n=normalize(vNormal);
      vec3 light1=normalize(vec3(-.48,.72,1.));
      vec3 light2=normalize(vec3(.84,-.2,.55));
      float diffuse=max(dot(n,light1),0.)*.68+max(dot(n,light2),0.)*.24;
      float fill=max(dot(n,vec3(0.,0.,1.)),0.)*.11;
      float rim=pow(1.0-max(dot(n,normalize(vec3(0.,0.,1.))),0.),2.5)*.15;
      vec3 c=vColor*(.38+diffuse+fill)+rim*vec3(.42,.8,.65);
      float spec=pow(max(dot(reflect(-light1,n),vec3(0.,0.,1.)),0.),30.)*.25;
      c+=spec*vec3(.72,.91,.78);
      c=pow(max(c,vec3(0.)),vec3(.93));
      outColor=vec4(c,1.);
    }`;
  function compile(type, src) {
    const sh = gl.createShader(type); gl.shaderSource(sh,src);gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  }
  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER, vertexSrc));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER, fragmentSrc));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch(err){
    console.error('WebGL shader compilation:',err); fallback.hidden=false;return;
  }

  const data = [];
  const C = {
    plate:[.083,.131,.134], frame:[.31,.40,.38], frameEdge:[.43,.58,.53],
    rail:[.44,.54,.52], steel:[.59,.67,.64], steelLight:[.75,.81,.76],
    breaker:[.76,.82,.77], white:[.86,.91,.85], terminal:[.16,.23,.21],
    display:[.09,.17,.15], copper:[.74,.43,.23], gold:[.91,.68,.35],
    cyan:[.22,.84,.69], aqua:[.35,.68,.61], wire:[.29,.43,.35],
    accent:[.73,.91,.56], charcoal:[.16,.24,.23], switch:[.28,.33,.29]
  };
  function putVertex(pos,norm,color,explode){data.push(...pos,...norm,...color,...explode)}
  function quad(a,b,c,d,n,color,explode){putVertex(a,n,color,explode);putVertex(b,n,color,explode);putVertex(c,n,color,explode);putVertex(a,n,color,explode);putVertex(c,n,color,explode);putVertex(d,n,color,explode)}
  function box(x,y,z,w,h,d,color=C.steel,ex=[0,0,0]){
    let X=x-w/2,Y=y-h/2,Z=z-d/2,x2=x+w/2,y2=y+h/2,z2=z+d/2;
    quad([X,Y,z2],[x2,Y,z2],[x2,y2,z2],[X,y2,z2],[0,0,1],color,ex);
    quad([x2,Y,Z],[X,Y,Z],[X,y2,Z],[x2,y2,Z],[0,0,-1],color,ex);
    quad([X,y2,z2],[x2,y2,z2],[x2,y2,Z],[X,y2,Z],[0,1,0],color,ex);
    quad([X,Y,Z],[x2,Y,Z],[x2,Y,z2],[X,Y,z2],[0,-1,0],color,ex);
    quad([x2,Y,z2],[x2,Y,Z],[x2,y2,Z],[x2,y2,z2],[1,0,0],color,ex);
    quad([X,Y,Z],[X,Y,z2],[X,y2,z2],[X,y2,Z],[-1,0,0],color,ex);
  }
  // Cable and metal strips, in the cabinet's XY plane.
  function strip(a,b,width,color,z=.53,ex=[0,0,0]){
    const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1;
    const ox=(-dy/len)*width*.5,oy=(dx/len)*width*.5;
    quad([a[0]+ox,a[1]+oy,z],[a[0]-ox,a[1]-oy,z],[b[0]-ox,b[1]-oy,z],[b[0]+ox,b[1]+oy,z],[0,0,1],color,ex);
    quad([a[0]-ox,a[1]-oy,z-.04],[a[0]+ox,a[1]+oy,z-.04],[b[0]+ox,b[1]+oy,z-.04],[b[0]-ox,b[1]-oy,z-.04],[0,0,-1],color,ex);
  }
  function screw(x,y,z,color=C.steelLight){
    box(x,y,z,.07,.07,.025,color);
    box(x,y,z+.02,.044,.008,.008,C.display);
  }
  // Backplane and stainless-steel cabinet frame.
  box(0,0,-.21,3.65,4.45,.18,C.plate);
  box(-1.78,0,.03,.105,4.53,.27,C.frame);
  box(1.78,0,.03,.105,4.53,.27,C.frame);
  box(0,2.23,.03,3.65,.11,.27,C.frame);
  box(0,-2.23,.03,3.65,.11,.27,C.frame);
  for(let i=0;i<4;i++){
    let y=1.71-i*1.08;
    box(0,y,.10,3.19,.10,.25,C.rail);
    box(0,y+.09,.16,3.17,.018,.18,C.steelLight);
  }
  // Slotted mounting plate and fixing points.
  for(let col=0;col<17;col++)for(let row=0;row<18;row++){
    let x=-1.54+col*.193,y=-1.99+row*.235;
    box(x,y,-.102,.042,.021,.006,C.charcoal);
  }
  for(let x of [-1.64,1.64])for(let y of [-2.07,2.07,0])screw(x,y,.23);

  // Three miniature molded-case breaker modules (stylized / conceptual).
  [-1.04,0,1.04].forEach((x,i)=>{
    const ex=[(i-1)*.48,.38,.23];
    box(x,1.28,.36,.84,.87,.48,C.breaker,ex);
    box(x,1.29,.621,.7,.69,.028,C.white,ex);
    box(x,1.5,.652,.56,.056,.017,C.gold,ex);
    box(x,1.3,.658,.25,.38,.035,C.charcoal,ex);
    box(x,1.35,.688,.13,.23,.06,C.switch,ex);
    box(x,1.08,.659,.49,.038,.016,C.rail,ex);
    box(x,1.00,.67,.41,.019,.013,C.cyan,ex);
    for(let t of [-.22,0,.22]){
      box(x+t,1.76,.36,.14,.12,.15,C.terminal,ex);
      screw(x+t,1.765,.46,C.steelLight);
      box(x+t,.80,.36,.14,.14,.15,C.terminal,ex);
      screw(x+t,.80,.46,C.steelLight);
    }
  });
  // Distribution bus bars.
  for(let j=0;j<3;j++){
    const y=1.88+j*.13;
    box(0,y,.13,3.04,.065,.07,j===0?C.copper:j===1?C.gold:C.copper,[0,.52+j*.13,-.18]);
  }
  // Two contactors: contact blocks, coil label, terminal blocks.
  [-.72,.72].forEach((x,i)=>{
    const ex=[(i===0?-1:1)*.6,0,.42];
    box(x,.08,.34,1.07,.90,.51,C.charcoal,ex);
    box(x,.17,.612,.89,.56,.033,C.steel,ex);
    box(x,.2,.647,.54,.29,.014,C.steelLight,ex);
    box(x,.16,.665,.39,.11,.008,C.display,ex);
    box(x,-.15,.632,.71,.13,.035,C.white,ex);
    box(x+.3,.21,.678,.08,.17,.027,C.gold,ex);
    for(const off of [-.31,0,.31]){
      box(x+off,.57,.36,.22,.12,.19,C.terminal,ex);
      screw(x+off,.58,.48);
      box(x+off,-.41,.37,.22,.13,.19,C.terminal,ex);
      screw(x+off,-.4,.48);
    }
  });
  // Central auxiliary wiring and cable duct channel strips.
  box(-1.48,-.1,.30,.16,2.74,.22,C.frameEdge,[ -.22,0,.16]);
  box(1.48,-.1,.30,.16,2.74,.22,C.frameEdge,[ .22,0,.16]);
  for(let i=0;i<21;i++){
    const y=-1.34+i*.13;
    box(-1.48,y,.44,.15,.028,.015,C.charcoal);
    box(1.48,y,.44,.15,.028,.015,C.charcoal);
  }
  const cabling=[
    [[-1.02,.81],[-1.02,.64]],[[-1.02,.64],[-.72,.64]],
    [[0,.81],[.1,.68]],[[.1,.68],[.62,.68]],
    [[1.04,.81],[1.04,.58]],[[1.04,.58],[.73,.58]],
    [[-.72,-.46],[-.72,-.68]],[[.72,-.46],[.72,-.66]],
    [[-1.10,-.7],[-1.1,-1.05]],[[1.08,-.7],[1.08,-1.05]]
  ];
  cabling.forEach(([a,b],i)=>strip(a,b,.057,i%3===0?C.gold:i%3===1?C.cyan:C.wire,.57,[0,-.1,.1]));
  // DIN terminal blocks and smaller control relays.
  [-1.13,-.38,.38,1.13].forEach((x,i)=>{
    const ex=[(i-1.5)*.3,-.4,.3];
    box(x,-1.28,.39,.61,.66,.36,C.terminal,ex);
    box(x,-1.24,.594,.48,.37,.025,C.steel,ex);
    box(x,-1.17,.622,.31,.12,.015,C.display,ex);
    box(x,-1.45,.616,.28,.055,.015,i===2?C.aqua:C.gold,ex);
    box(x,-.93,.40,.34,.13,.11,C.charcoal,ex);
    box(x,-1.63,.40,.34,.13,.11,C.charcoal,ex);
    screw(x,-.91,.48);screw(x,-1.61,.48);
  });
  // Base power-cable gland locations and safety-colored inspection features.
  for(let i=0;i<5;i++){
    const x=-1.30+i*.65;
    box(x,-1.94,.34,.38,.16,.21,C.frame,[(i-2)*.2,-.15,.08]);
    box(x,-1.94,.458,.20,.08,.04,i%2?C.copper:C.charcoal);
  }
  box(0,-2.08,.22,1.22,.032,.12,C.gold);
  box(-1.55,2.08,.25,.26,.14,.04,C.gold);
  box(1.57,2.08,.25,.17,.17,.04,C.cyan);

  const raw = new Float32Array(data);
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,raw,gl.STATIC_DRAW);
  const stride=12*4;
  for(let i=0;i<4;i++){
    gl.enableVertexAttribArray(i);
    gl.vertexAttribPointer(i,3,gl.FLOAT,false,stride,i*3*4);
  }
  gl.bindVertexArray(null);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
  const uProj=gl.getUniformLocation(program,'uProjection');
  const uYaw=gl.getUniformLocation(program,'uYaw');
  const uPitch=gl.getUniformLocation(program,'uPitch');
  const uExp=gl.getUniformLocation(program,'uExplode');
  const uDist=gl.getUniformLocation(program,'uDistance');

  let yaw=-.40,pitch=-.19,targetYaw=-.40,targetPitch=-.19,explosion=0;
  let dragging=false,lastX=0,lastY=0,moved=false;
  canvas.addEventListener('pointerdown',e=>{dragging=true;moved=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const dx=e.clientX-lastX,dy=e.clientY-lastY;
    if(Math.abs(dx)+Math.abs(dy)>0)moved=true;
    targetYaw=Math.max(-1.25,Math.min(1.25,targetYaw+dx*.008));
    targetPitch=Math.max(-.65,Math.min(.65,targetPitch+dy*.007));
    lastX=e.clientX;lastY=e.clientY;
  });
  canvas.addEventListener('pointerup',()=>{dragging=false});
  canvas.addEventListener('pointercancel',()=>{dragging=false});

  function perspective(fov,aspect,near,far){
    const f=1/Math.tan(fov/2),nf=1/(near-far);
    return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,2*far*near*nf,0]);
  }
  let projection,pixelRatio=1,viewW=0,viewH=0;
  function resize(){
    const r=canvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,1.45);
    const width=Math.max(1,Math.round(r.width*dpr)),height=Math.max(1,Math.round(r.height*dpr));
    if(width!==canvas.width||height!==canvas.height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height)}
    projection=perspective(41*Math.PI/180,width/height,.1,100);
    viewW=r.width;viewH=r.height;pixelRatio=dpr;
  }
  window.addEventListener('resize',resize,{passive:true});
  resize();
  let last=performance.now();
  let heroVisible=true;
  new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;},{rootMargin:'150px'}).observe(visual);
  function frame(now){
    if(!heroVisible || document.hidden){last=now;requestAnimationFrame(frame);return;}
    const dt=Math.min((now-last)/1000,.06);last=now;
    resize();
    // Scroll-directed camera choreography. Direct pointer control always takes precedence.
    if(!dragging&&!reduceMotion){
      const act=Number(document.querySelector('.hero')?.dataset.act||0);
      const intendedYaw=act===0?-.40:act===1?-.11:.37;
      const intendedPitch=act===0?-.19:act===1?-.13:-.06;
      targetYaw+=(intendedYaw-targetYaw)*Math.min(1,dt*.7);
      targetPitch+=(intendedPitch-targetPitch)*Math.min(1,dt*.7);
      targetYaw+=Math.sin(now*.00035)*dt*.02;
    }
    yaw+=(targetYaw-yaw)*Math.min(1,dt*6);
    pitch+=(targetPitch-pitch)*Math.min(1,dt*6);
    explosion+=((currentMode==='exploded'?1:0)-explosion)*Math.min(1,dt*4.5);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniformMatrix4fv(uProj,false,projection);
    gl.uniform1f(uYaw,yaw);
    gl.uniform1f(uPitch,pitch);
    gl.uniform1f(uExp,explosion);
    gl.uniform1f(uDist,viewW<510?8.8:8.1);
    gl.drawArrays(gl.TRIANGLES,0,raw.length/12);
    renderHeroArcs(now, yaw, pitch, explosion, viewW, viewH);
    gl.bindVertexArray(null);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}


// A visual explanation of energy transfer, not electrical test data.
// Effects are generated locally and deliberately never claim to simulate safe wiring.
let sparkBurst = 0;
let lastPageScroll = window.scrollY;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a,b,t) => a+(b-a)*t;
function sizeCanvas(canvas, ctx, w, h, maxDpr = 1.6) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const bw = Math.max(1,Math.round(w*dpr)),bh = Math.max(1,Math.round(h*dpr));
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;canvas.height = bh;
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return ctx;
}

function jitterLightning(ctx, a, b, magnitude, alpha, timeSeed=0) {
  if (!a || !b) return;
  const dx=b.x-a.x,dy=b.y-a.y;
  const len=Math.hypot(dx,dy), steps=clamp(Math.ceil(len/15),5,32);
  if(len<2)return;
  const nx=-dy/len,ny=dx/len;
  const points = [];
  for(let i=0;i<=steps;i++) {
    const t=i/steps;
    // Deterministic, time-quantized noise is jittery without cumulative drift.
    const noise=Math.sin(i*12.9898+timeSeed*28.71)*Math.cos(i*9.813+timeSeed*19.61);
    const off = Math.sin(Math.PI*t)*noise*magnitude;
    points.push({x:lerp(a.x,b.x,t)+nx*off,y:lerp(a.y,b.y,t)+ny*off});
  }
  ctx.lineCap='round';ctx.lineJoin='round';
  ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
  ctx.globalAlpha=alpha*.28;ctx.strokeStyle='#89ffdc';ctx.lineWidth=8;ctx.shadowColor='#7cffce';ctx.shadowBlur=24;ctx.stroke();
  ctx.globalAlpha=alpha;ctx.shadowBlur=12;ctx.lineWidth=1.55;ctx.strokeStyle='#e6fff0';ctx.stroke();
  ctx.shadowBlur=0;ctx.globalAlpha=1;
  return points;
}

function glowNode(ctx,x,y,opacity=1,r=4){
  const g=ctx.createRadialGradient(x,y,0,x,y,r*8);
  g.addColorStop(0,`rgba(234,255,218,${opacity*.85})`);
  g.addColorStop(.1,`rgba(162,255,210,${opacity*.6})`);
  g.addColorStop(1,'rgba(130,255,195,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*8,0,2*Math.PI);ctx.fill();
  ctx.fillStyle=`rgba(240,255,234,${opacity})`;ctx.beginPath();ctx.arc(x,y,r*.5,0,2*Math.PI);ctx.fill();
}

// Exact same Euler order as the GLSL model's rx * ry matrix.
function renderHeroArcs(now, yaw, pitch, explosion, w, h) {
  if (!heroArcCtx || !w || !h) return;
  sizeCanvas(heroArcCanvas,heroArcCtx,w,h,1.5);
  heroArcCtx.clearRect(0,0,w,h);
  if (!currentEnabled || reduceMotion || currentMode==='schematic') return;
  const c=heroArcCtx;
  const cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch);
  const distance=w<510?8.8:8.1;
  const f=1/Math.tan(41*Math.PI/360);
  const project=([x,y,z],[ex,ey,ez]=[0,0,0])=>{
    x+=ex*explosion;y+=ey*explosion;z+=ez*explosion;
    const xx=cy*x+sy*z, zz=-sy*x+cy*z;
    const yy=cx*y-sx*zz,rz=sx*y+cx*zz;
    const depth=distance-rz;
    return {x:(.5+xx*f/(w/h)/depth*.5)*w,y:(.5-yy*f/depth*.5)*h};
  };
  const t=now*.001;
  const nodes = [
    project([-1.12,1.82,.78],[-.48,.38,.23]),
    project([-.73,.65,.75],[-.60,0,.42]),
    project([-.73,-.35,.72],[-.60,0,.42]),
    project([-.38,-.90,.72],[-.45,-.4,.3]),
    project([0,1.82,.78],[0,.38,.23]),
    project([.72,.65,.75],[.60,0,.42]),
    project([.72,-.35,.72],[.60,0,.42]),
    project([1.13,-.93,.72],[.45,-.4,.3]),
  ];
  const edges = [[0,1],[1,2],[2,3],[4,5],[5,6],[6,7]];
  c.save();
  for(let i=0;i<edges.length;i++) {
    const [a,b] = edges[i];
    const pulse = Math.pow(Math.max(0,Math.sin(t*2.1 - i*.67)),9);
    if(pulse < .07) continue;
    jitterLightning(c,nodes[a],nodes[b],2.4+6.4*explosion, (.22+pulse*.6)*(currentMode==='exploded'?1:.65),Math.floor(t*24+i*5));
    const pos=lerp(.1,.9,(Math.sin(t*1.4-i*.9)+1)*.5);
    glowNode(c,lerp(nodes[a].x,nodes[b].x,pos),lerp(nodes[a].y,nodes[b].y,pos),pulse*.9,2.6);
  }
  // A special larger discharge periodically bridges separated power rails.
  if(currentMode==='exploded' && explosion>.25) {
    const surge=Math.pow(Math.max(0,Math.sin(t*1.27)),14);
    if(surge>.08)jitterLightning(c,nodes[1],nodes[5],9+explosion*11,surge*.68,Math.floor(t*25));
  }
  c.restore();
}

function renderSiteCurrent(now) {
  if (!siteCurrentCtx) return;
  const w=window.innerWidth,h=window.innerHeight;
  sizeCanvas(siteCurrentCanvas,siteCurrentCtx,w,h,Math.min(window.devicePixelRatio||1,1.4));
  const ctx=siteCurrentCtx;
  ctx.clearRect(0,0,w,h);
  const progress=clamp(window.scrollY/Math.max(1,document.documentElement.scrollHeight-h),0,1);
  progressFill.style.transform=`scaleY(${progress})`;
  if(!currentEnabled || reduceMotion || w<700) return;
  const anchorX=w-38;
  const t=now*.001;
  const scrollOffset=window.scrollY*.0003;
  const points=[];
  const steps=Math.max(20,Math.floor(h/26));
  for(let i=0;i<=steps;i++) {
    const y=(i/steps)*h;
    const x=anchorX + Math.sin(y*.008+scrollOffset)*5.5 + Math.sin(y*.019-t*.27)*1.4;
    points.push({x,y});
  }
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
  ctx.strokeStyle='rgba(129,202,162,.19)';ctx.lineWidth=1;ctx.stroke();
  // Energy front: bright pulse follows a common fixed conductor from section to section.
  for(let j=0;j<3;j++){
    const center=((t*.11+j/3+progress*.22)%1)*h;
    const span=60;
    for(let i=1;i<points.length;i++){
      const p=points[i-1],q=points[i],a=1-Math.abs((p.y+q.y)*.5-center)/span;
      if(a<=0)continue;
      ctx.strokeStyle=`rgba(198,255,178,${a*.83})`;ctx.shadowColor='#9cfbd4';ctx.shadowBlur=10*a;
      ctx.lineWidth=.6+a*2;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
    }
    const near=points[Math.round(center/h*steps)];if(near)glowNode(ctx,near.x,center,.8,2.5);
  }
  const headings = document.querySelectorAll('.section-head h2, .contact-section h2');
  headings.forEach((element,index)=>{
    const r=element.getBoundingClientRect();
    const y=clamp(r.top+r.height*.36,10,h-10);
    if(r.bottom<0||r.top>h)return;
    const x=clamp(r.right+30,w*.52,anchorX-12);
    const intensity=Math.max(0,1-Math.abs(y-h*.50)/(h*.85));
    ctx.strokeStyle=`rgba(151,229,193,${.14*intensity})`;
    ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(anchorX,y-22);
    ctx.bezierCurveTo(anchorX-55,y-4,x+60,y-30,x,y);ctx.stroke();
    const burst=Math.pow(Math.max(0,Math.sin(t*.9 + index*1.7 + progress*12)),16);
    if(burst>.6) {
      jitterLightning(ctx,{x:anchorX,y:y-22},{x,y},5,burst*.25,Math.floor(t*14));
      glowNode(ctx,anchorX,y-22,burst*.6,1.3);
    }
  });
  ctx.restore();
}
if(false && siteCurrentCtx){
  let lastDraw=0;
  function animateCurrent(now){
    if(now-lastDraw>28 && !document.hidden && window.innerWidth>=700 && !reduceMotion) {renderSiteCurrent(now); lastDraw=now;}
    else if(window.innerWidth<700 || reduceMotion) {
      progressFill.style.transform=`scaleY(${clamp(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight),0,1)})`;
    }
    requestAnimationFrame(animateCurrent);
  }
  requestAnimationFrame(animateCurrent);
}


// A domain explorer for technical storytelling. Its diagrams are illustrative.
const domainContent = {
  power: { title:'A system is only as good as its protection.',
    description:'From drawings and distribution architecture to protective devices and the equipment carrying power. My industrial exposure included supervised reviews of MV/LV systems and hands-on control-panel assembly.',
    label:'01 — DISTRIBUTION', caption:'POWER / DISTRIBUTION PATH' },
  controls: { title:'Turn a drawing into a working sequence.',
    description:'Relays, contactors, breakers and auxiliary wiring create interlocks and controlled switching. I helped assemble and wire real panels and assisted with supervised testing at Biricik.',
    label:'02 — CONTROL LOGIC', caption:'CONTROL / DEVICES / FEEDBACK' },
  embedded: { title:'Capture, condition, calculate, communicate.',
    description:'My university heart-monitoring prototype combined a MAX30102 optical sensor, ESP32 processing, digital filtering, solar power management and wireless data transmission.',
    label:'03 — EMBEDDED SIGNAL', caption:'SENSING / PROCESSING / OUTPUT' }
};
const lab = document.querySelector('.lab-section');
for(const btn of document.querySelectorAll('.lab-domain')){
  btn.addEventListener('click',()=>{
    for(const b of document.querySelectorAll('.lab-domain')){
      b.classList.toggle('selected',b===btn);
      b.setAttribute('aria-pressed',String(b===btn));
    }
    const d=domainContent[btn.dataset.domain];
    lab.dataset.activeDomain=btn.dataset.domain;
    document.getElementById('lab-title').textContent=d.title;
    document.getElementById('lab-description').textContent=d.description;
    document.getElementById('lab-indicator').textContent=d.label;
    document.getElementById('lab-caption').textContent=d.caption;
  });
}
document.getElementById('lab-power').addEventListener('click', function(){
  const isOff=lab.classList.toggle('is-off');
  this.setAttribute('aria-pressed',String(!isOff));
  document.getElementById('lab-power-label').textContent=isOff?'SIGNAL PATH / DISCONNECTED':'SIGNAL PATH / ENERGIZED';
  // The glowing path and nodes are visually de-energized without changing page flow.
});