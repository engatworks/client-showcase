/* THE SIGNAL / three-phase lab — ideal balanced, sinusoidal three-phase load.
   Technical basis: P=√3 V_LL I_L PF; S=P/PF; Q=P tan(acos(PF)).
   All readings are computed idealized examples, never measured power-system data. */
(() => {
  const section=document.querySelector('#three-phase');
  if(!section) return;
  const $=s=>section.querySelector(s);
  const voltage=$('#ac-voltage'), load=$('#ac-load'), pf=$('#ac-pf'), scope=$('#ac-scope');
  const viewButtons=[...section.querySelectorAll('[data-ac-view]')];
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let view='waveform', phase=0, lastTime=0, active=true;
  const ns='http://www.w3.org/2000/svg';
  const svgEl=(tag,attrs)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el};
  const fmt=(v,n=2)=>Number(v).toFixed(n);
  const physics=()=>{
    const v=Number(voltage.value), p=Number(load.value)*1000, f=Number(pf.value)/100;
    const apparent=p/f, reactive=Math.sqrt(Math.max(0,apparent*apparent-p*p));
    return {v,p,f,current:p/(Math.sqrt(3)*v*f),apparent,reactive,angle:Math.acos(f)};
  };
  const colors=['#c4ffe1','#7de0ce','#7daebf'];
  let dynamic=[];
  function label(x,y,text,fill='#a6cdbd',size=12){const el=svgEl('text',{x,y,fill,'font-size':size,'font-family':'monospace','font-weight':'600'});el.textContent=text;return el}
  function build(){
    scope.replaceChildren(); dynamic=[];
    if(view==='waveform'){
      for(let x=40;x<=860;x+=82)scope.append(svgEl('line',{x1:x,y1:40,x2:x,y2:416,class:'ac-grid-line'}));
      for(let y=60;y<=410;y+=50)scope.append(svgEl('line',{x1:36,y1:y,x2:865,y2:y,class:'ac-grid-line'}));
      scope.append(svgEl('line',{x1:36,y1:236,x2:866,y2:236,class:'ac-axis'}));
      const titles=['L1 / 0°','L2 / -120°','L3 / +120°','I₁ / LAGGING'];
      for(let i=0;i<4;i++){
        const p=svgEl('path',{class:'ac-wave '+(i===3?'ac-trace-current':'ac-trace-'+['a','b','c'][i]),d:''});
        const dot=svgEl('circle',{r:i===3?3.5:4,fill:i===3?'#e6b985':colors[i],class:'ac-wave-dot'});
        dynamic.push({p,dot,i});scope.append(p,dot);
        const y=76+i*22;const t=label(46,y,titles[i],i===3?'#e6b985':colors[i],12);scope.append(t);
      }
      scope.append(label(736,445,'TIME → 50 Hz', '#7da59c',11));
    }else{
      for(let radius=58;radius<=175;radius+=58)scope.append(svgEl('circle',{cx:455,cy:233,r:radius,fill:'none',stroke:'#426c65','stroke-width':1,'stroke-dasharray':'4 8'}));
      scope.append(svgEl('line',{x1:250,y1:233,x2:665,y2:233,class:'ac-axis'}),svgEl('line',{x1:455,y1:30,x2:455,y2:438,class:'ac-axis'}));
      for(let i=0;i<4;i++){
        const g=svgEl('g',{}),line=svgEl('line',{x1:455,y1:233,x2:455,y2:233,stroke:i===3?'#e6b985':colors[i],class:'ac-phasor-line'}), tip=svgEl('circle',{r:7,fill:i===3?'#e6b985':colors[i]});
        const text=label(455,233,i===3?'I₁':`L${i+1}`,i===3?'#e6b985':colors[i],14);g.append(line,tip,text);scope.append(g);dynamic.push({line,tip,text,i});
      }
      scope.append(label(42,64,'BALANCED THREE-PHASE / PHASOR STUDY','#9ec9b7',12));
      scope.append(label(42,450,'LINE CURRENT SHOWN RELATIVE TO L1 VOLTAGE','#79a69a',11));
    }
  }
  function update(){
    const q=physics();
    $('#ac-voltage-display').textContent=`${q.v} V`;
    $('#ac-load-display').textContent=`${fmt(q.p/1000,1)} kW`;
    $('#ac-pf-display').textContent=fmt(q.f,2);
    $('#ac-current').innerHTML=`${fmt(q.current,2)}<small>A</small>`;
    $('#ac-apparent').innerHTML=`${fmt(q.apparent/1000,2)}<small>kVA</small>`;
    $('#ac-reactive').innerHTML=`${fmt(q.reactive/1000,2)}<small>kVAr</small>`;
    $('#ac-angle').innerHTML=`${fmt(q.angle*180/Math.PI,1)}<small>°</small>`;
    $('#ac-stage-caption').textContent=`${q.v} V LINE–LINE / ${fmt(q.p/1000,1)} kW / PF ${fmt(q.f,2)}`;
    $('#ac-theory').textContent=`For a balanced three-phase load: I = P / (√3 × VLL × PF). At ${q.v} V, ${fmt(q.p/1000,1)} kW and ${fmt(q.f,2)} PF, calculated line current is ${fmt(q.current,2)} A.`;
    draw();
  }
  function draw(){
    const q=physics();
    if(view==='waveform'){
      dynamic.forEach(({p,dot,i})=>{
        const shift=i===0?0:i===1?-2*Math.PI/3:i===2?2*Math.PI/3:-q.angle;
        const amplitude=i===3?Math.min(136,Math.max(22,q.current*5)):132;
        let d='';for(let j=0;j<=230;j++){
          const x=38+j*3.6;
          const y=236-Math.sin(j/230*4*Math.PI+shift+phase)*amplitude;
          d+=`${j===0?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
        }
        p.setAttribute('d',d);
        const xx=700, n=(xx-38)/3.6;
        dot.setAttribute('cx',xx);dot.setAttribute('cy',(236-Math.sin(n/230*4*Math.PI+shift+phase)*amplitude).toFixed(2));
      });
    }else{
      dynamic.forEach(({line,tip,text,i})=>{
        const shift=i===0?0:i===1?-2*Math.PI/3:i===2?2*Math.PI/3:-q.angle;
        const a=phase+shift, r=i===3?Math.min(168,Math.max(66,q.current*7)):169;
        const x=455+Math.cos(a)*r,y=233-Math.sin(a)*r;
        line.setAttribute('x2',x);line.setAttribute('y2',y);tip.setAttribute('cx',x);tip.setAttribute('cy',y);
        text.setAttribute('x',x+10);text.setAttribute('y',y-10);
      });
    }
  }
  for(const input of [voltage,load,pf])input.addEventListener('input',update);
  viewButtons.forEach(btn=>btn.addEventListener('click',()=>{view=btn.dataset.acView;viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));$('#ac-view-name').textContent=view==='waveform'?'OSCILLOSCOPE / 001':'PHASOR FIELD / 002';build();update()}));
  const intersection=new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??false},{threshold:.03});intersection.observe(section);
  function frame(now){requestAnimationFrame(frame);if(reduced||document.hidden||!active||document.body.classList.contains('power-disabled'))return;const dt=lastTime?Math.min(.055,(now-lastTime)/1000):.016;lastTime=now;phase=(phase+dt*1.1)%(Math.PI*2);draw()}
  build();update();if(!reduced)requestAnimationFrame(frame);
})();