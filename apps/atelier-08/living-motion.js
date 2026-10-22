/* Rehab Haider / Living motion: native text animation, scene crossfade,
   scroll-aware reveals, and drawing layers derived from the existing DXF geometry.
   Arabic is animated by WORD, never fragmented into unjoined letters. */
(() => {
  'use strict';
  const $=(q,root=document)=>root.querySelector(q);
  const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
  const hero=$('[data-cinema]');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const lowMotion=()=>reduce.matches;
  const arabic=document.documentElement.lang==='ar';
  if (!hero) return;

  // Actual concept drawing: original wall, room, glazing and level geometry
  // is shared with the downloadable R12 DXF, not an ornamental square sketch.
  const cad=window.REHAB_CAD;
  const drawing=$('[data-cad-build]');
  if (drawing && cad && typeof cad.sheet==='function') {
    for(const [kind,svg] of [
      ['plan',cad.sheet(6)],['elevation',cad.elevation()],['section',cad.section()]
    ]) {
      const paper=$('[data-cad-paper="'+kind+'"]',drawing);
      if(!paper)continue;
      const mount=$('.cad-paper-inner',paper);
      mount.innerHTML=svg;
      mount.classList.remove('cad-paper--empty');
      if(kind==='plan'&&!lowMotion()){
        $$('[data-drawing-layer]',mount).forEach((layer,i)=>layer.style.setProperty('--layer',String(i)));
        paper.dataset.cadReady='true';
      }
    }
    const plan=$('[data-cad-paper="plan"]',drawing);
    if(plan){
      if(lowMotion()||!('IntersectionObserver' in window))plan.classList.add('is-drawn');
      else new IntersectionObserver((entries,obs)=>{
        if(!entries[0].isIntersecting)return;
        plan.classList.add('is-drawn');
        obs.disconnect();
      },{threshold:.14}).observe(plan);
    }
  }

  const scenes=$$('.cinema-scene',hero);
  let scene=0,visible=true,frame=0;
  const currentImage=()=>$('.cinema-scene.is-active img',hero);
  const count=$('[data-cinema-count]',hero);
  function showScene(i){
    scene=i;
    scenes.forEach((item,j)=>{
      const active=j===i;
      item.classList.toggle('is-active',active);
      if(active)item.removeAttribute('inert');else item.setAttribute('inert','');
    });
    const img=currentImage();
    if(img){
      img.loading='eager';
      const src=img.currentSrc||img.src;
      hero.style.setProperty('--text-photo','url("'+src.replaceAll('"','%22')+'")');
    }
    if(count)count.textContent=String(i+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');
  }
  showScene(0);
  const progress=$('[data-scene-progress]',hero);
  let sceneStart=performance.now(),sceneDuration=9000;
  function updateVisuals(now){
    frame=0;
    if(!hero.isConnected||lowMotion()||document.hidden||!visible)return;
    if(now-sceneStart>=sceneDuration&&scenes.length>1){
      showScene((scene+1)%scenes.length);
      sceneStart=now;
    }
    if(progress)progress.style.setProperty('--scene-progress',String(Math.min(1,(now-sceneStart)/sceneDuration)));
    frame=requestAnimationFrame(updateVisuals);
  }
  function startLoop(){
    if(frame||lowMotion()||document.hidden||!visible)return;
    sceneStart=performance.now();
    frame=requestAnimationFrame(updateVisuals);
  }
  function stopLoop(){
    if(frame)cancelAnimationFrame(frame);
    frame=0;
  }
  startLoop();

  // After the intended font is ready, drop the two complete name lines into place.
  // The image-filled second line must retain a single connected text glyph run.
  if(!lowMotion()&&typeof Element.prototype.animate==='function'){
    Promise.race([document.fonts?.ready||Promise.resolve(),new Promise(resolve=>setTimeout(resolve,1600))]).then(()=>{
      $$('.cinema-word',hero).forEach((word,i)=>word.animate([
        {transform:'translate3d(0,-.85em,0) rotate(-3deg)',opacity:.12},
        {transform:'translate3d(0,.065em,0) rotate(.6deg)',opacity:1,offset:.73},
        {transform:'translate3d(0,0,0) rotate(0)',opacity:1}
      ],{duration:1150,delay:120+i*220,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
    });
  }

  // Typed detail: Arabic advances a complete word at a time to preserve shaping;
  // English advances grapheme clusters, not UTF-16 code units.
  const typed=$('[data-typed]',hero);
  if(typed){
    const phrases=(typed.dataset.phrases||typed.textContent).split('|').map(x=>x.trim()).filter(Boolean);
    const first=phrases[0]||'';
    typed.textContent=first;
    const segmenter=typeof Intl.Segmenter==='function'
      ? new Intl.Segmenter(arabic?'ar':'en',{granularity:'grapheme'}):null;
    const units=s=>arabic?s.split(/\s+/):segmenter?Array.from(segmenter.segment(s),x=>x.segment):Array.from(s);
    let phraseIndex=0,timer=0;
    function typeNext(){
      if(lowMotion()||document.hidden||!visible){typed.textContent=first;timer=setTimeout(typeNext,1500);return;}
      phraseIndex=(phraseIndex+1)%phrases.length;
      const sequence=units(phrases[phraseIndex]);
      typed.textContent='';
      let i=0;
      function step(){
        if(lowMotion()||document.hidden||!visible){typed.textContent=phrases[phraseIndex];return;}
        typed.textContent=arabic?sequence.slice(0,i+1).join(' '):sequence.slice(0,i+1).join('');
        i++;
        if(i<sequence.length)timer=setTimeout(step,arabic?240:65);
        else timer=setTimeout(typeNext,2800);
      }
      timer=setTimeout(step,300);
    }
    if(!lowMotion()&&phrases.length>1)timer=setTimeout(typeNext,3000);
    reduce.addEventListener?.('change',()=>{
      clearTimeout(timer);
      typed.textContent=first;
      if(!lowMotion()&&phrases.length>1)timer=setTimeout(typeNext,3000);
    });
  }

  // Word-level reveals keep nested italic/Arabic emphasis intact and real DOM text
  // accessible via an unchanged aria-label on the heading.
  function prepareWords(el){
    const label=el.textContent.trim().replace(/\s+/g,' ');
    el.setAttribute('aria-label',label);
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const original=[];
    while(walker.nextNode()) original.push(walker.currentNode);
    let idx=0;
    for(const node of original){
      const pieces=node.textContent.split(/(\s+)/);
      const frag=document.createDocumentFragment();
      for(const p of pieces){
        if(!p)continue;
        if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(p));continue;}
        const span=document.createElement('span');
        span.className='kinetic-word';span.setAttribute('aria-hidden','true');
        span.style.setProperty('--word-order',String(Math.min(idx++,16)));
        span.textContent=p;frag.appendChild(span);
      }
      node.replaceWith(frag);
    }
    el.classList.add('kinetic-heading');
  }
  if(!lowMotion()&&'IntersectionObserver' in window){
    const headings=$$('.manifesto-statement,.section-intro h2,.cinema-interlude-phrase,.cad-proof-title');
    headings.forEach(prepareWords);
    const observer=new IntersectionObserver((entries,obs)=>{
      for(const e of entries){
        if(!e.isIntersecting)continue;
        e.target.classList.add('is-kinetic-visible','is-visible');
        obs.unobserve(e.target);
      }
    },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
    headings.forEach(el=>observer.observe(el));
    const cards=$$('.work-card');
    cards.forEach(el=>observer.observe(el));
    document.body.classList.add('living-ready');
  }else{
    $$('.work-card,.cinema-interlude').forEach(el=>el.classList.add('is-visible'));
  }

  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      visible=entries[0]?.isIntersecting===true;
      if(visible)startLoop();else stopLoop();
    },{threshold:.02}).observe(hero);
    const interlude=$('.cinema-interlude');
    if(interlude)new IntersectionObserver((entries,observer)=>{
      if(entries[0].isIntersecting){interlude.classList.add('is-visible');observer.disconnect();}
    },{threshold:.12}).observe(interlude);
  }
  function onScroll(){
    const root=document.documentElement;
    root.style.setProperty('--page-progress',String(Math.max(0,Math.min(1,scrollY/Math.max(1,root.scrollHeight-innerHeight)))));
    if(visible&&!lowMotion())hero.style.setProperty('--scroll-shift',Math.min(85,Math.max(-85,Math.min(scrollY,hero.offsetHeight)*.1)).toFixed(1)+'px');
  }
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll,{passive:true});
  onScroll();
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)stopLoop();else startLoop();
  });
  reduce.addEventListener?.('change',()=>{
    if(lowMotion()){stopLoop();showScene(0);hero.style.setProperty('--scroll-shift','0px');}
    else startLoop();
  });
})();