const q=(s,root=document)=>root.querySelector(s), qa=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projects=[
  {name:"Solace House",category:"Residential",type:"Private residence",location:"Copenhagen, Denmark",year:"2026",photo:"photo-1600585154340-be6161a56a0c",description:"A study in stillness: expansive daylight, carefully balanced geometry, and natural materials that invite a slower way of living."},
  {name:"The Quiet Room",category:"Interiors",type:"Interior architecture",location:"London, United Kingdom",year:"2025",photo:"photo-1600210492486-724fe5c67fb0",description:"An intimate interior landscape where rhythm and soft tactility make the everyday feel extraordinary."},
  {name:"Villa Serein",category:"Residential",type:"Coastal residence",location:"Algarve, Portugal",year:"2025",photo:"photo-1600596542815-ffad4c1539a9",description:"A considered architectural response to the coastline, framing long views and the changing quality of coastal light."},
  {name:"The Material House",category:"Interiors",type:"Spatial renovation",location:"Stockholm, Sweden",year:"2024",photo:"photo-1600607687939-ce8a6c25118c",description:"Texture takes the leading role as oak, pale plaster and honest craftsmanship meet contemporary functionality."},
  {name:"Civic Light",category:"Cultural",type:"Community space",location:"Oslo, Norway",year:"2024",photo:"photo-1487958449943-2429e8be8625",description:"A proposed cultural landmark shaped around the principle that public architecture should feel open, generous and quietly welcoming."},
  {name:"Casa Forma",category:"Residential",type:"Contemporary home",location:"Barcelona, Spain",year:"2023",photo:"photo-1600566752355-35792bedcfea",description:"A composed dialogue between inside and outside, with materials chosen to become more beautiful over time."}
];
function img(p,w=1100){return 'https://images.unsplash.com/'+p+'?auto=format&fit=crop&w='+w+'&q=85'}
let filter='all',view='grid';
function renderProjects(){
  const items=projects.filter(p=>filter==='all'||p.category===filter);
  q('#projects').className='projects'+(view==='list'?' list':'');
  q('#projects').innerHTML=items.map(p=>{const i=projects.indexOf(p)+1;return '<article class="project"><button class="project-cover" type="button" data-project="'+(i-1)+'" aria-label="View '+p.name+' project"><img src="'+img(p.photo)+'" alt="Concept imagery for '+p.name+'" loading="lazy"><span class="project-hover"><span>EXPLORE PROJECT</span><span>↗</span></span></button><div class="project-meta"><div><p>'+p.category.toUpperCase()+' / '+p.location.toUpperCase()+'</p><h3>'+p.name+'</h3></div><span class="project-number">'+String(i).padStart(2,'0')+' / 06</span></div></article>'}).join('');
  qa('[data-project]').forEach(el=>el.addEventListener('click',()=>openProject(+el.dataset.project)));
}
qa('[data-filter]').forEach(el=>el.addEventListener('click',()=>{filter=el.dataset.filter;qa('[data-filter]').forEach(b=>{const a=b===el;b.classList.toggle('is-active',a);b.setAttribute('aria-pressed',String(a))});renderProjects()}));
qa('#gridView,#listView').forEach(el=>el.addEventListener('click',()=>{view=el.id==='gridView'?'grid':'list';qa('#gridView,#listView').forEach(b=>{let a=b===el;b.classList.toggle('is-active',a);b.setAttribute('aria-pressed',String(a))});renderProjects()}));
const projectDialog=q('#projectDialog');
function openProject(i){const p=projects[i];q('#projectDetail').innerHTML='<div class="detail-hero"><img src="'+img(p.photo,1800)+'" alt="Concept image for '+p.name+'"><h2>'+p.name+'</h2></div><div class="detail-body"><div class="detail-facts"><div>PROJECT / '+String(i+1).padStart(2,'0')+'</div><div>TYPE / '+p.type.toUpperCase()+'</div><div>LOCATION / '+p.location.toUpperCase()+'</div><div>YEAR / '+p.year+'</div><div>STATUS / FICTIONAL CONCEPT</div><a class="detail-back" href="#work" id="backToWork">← BACK TO THE COLLECTION</a></div><p>'+p.description+'</p></div>';projectDialog.showModal();document.body.classList.add('dialog-open');q('#backToWork').addEventListener('click',e=>{e.preventDefault();projectDialog.close()})}
q('#projectClose').addEventListener('click',()=>projectDialog.close());
projectDialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
projectDialog.addEventListener('click',e=>{if(e.target===projectDialog)projectDialog.close()});
const heroPhotos=['photo-1600585154340-be6161a56a0c','photo-1600566753190-17f0baa2a6c3','photo-1600585154340-be6161a56a0c'];
qa('[data-atm]').forEach(b=>b.addEventListener('click',()=>{const ix=+b.dataset.atm;q('#heroImage').style.backgroundImage='url("'+img(heroPhotos[ix],1800)+'")';qa('[data-atm]').forEach(x=>{const a=b===x;x.classList.toggle('is-active',a);x.setAttribute('aria-pressed',String(a))});q('.hero-rail span').textContent='0'+(ix+1)+' / 03'}));
const menuButton=q('#menuButton'),mobileNav=q('#mobileNav');
function setMenu(open){menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');mobileNav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);mobileNav.inert=!open}
menuButton.addEventListener('click',()=>setMenu(!mobileNav.classList.contains('open')));qa('#mobileNav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const contactDialog=q('#contactDialog');
q('#contactTrigger').addEventListener('click',()=>{contactDialog.showModal();document.body.classList.add('dialog-open')});
q('#contactClose').addEventListener('click',()=>contactDialog.close());
contactDialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
contactDialog.addEventListener('click',e=>{if(e.target===contactDialog)contactDialog.close()});
q('#contactForm').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);q('#briefText').textContent='Name: '+d.get('name')+'\nProject: '+d.get('type')+'\nVision: '+d.get('vision')+'\n\nThis brief was prepared in the ATELIER / 08 demo. No data was sent.';q('#briefOutput').hidden=false;q('#briefOutput').scrollIntoView({block:'nearest',behavior:reduceMotion?'auto':'smooth'})});
q('#copyBrief').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(q('#briefText').textContent);e.currentTarget.textContent='COPIED ✓'}catch{e.currentTarget.textContent='SELECT THE TEXT ABOVE TO COPY'}});
const clock=q('#clock');function setTime(){clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}setTime();setInterval(setTime,60000);
const progress=q('#progress');let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?scrollY/total*100:0)+'%';ticking=false})},{passive:true});
if(!reduceMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}})},{threshold:.08});qa('[data-reveal]').forEach(el=>observer.observe(el));}
const cursor=q('#cursor');if(matchMedia('(pointer:fine)').matches&&!reduceMotion){document.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},{passive:true});document.addEventListener('pointerover',e=>{cursor.classList.toggle('visible',!!e.target.closest('.project-cover'))});}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileNav.classList.contains('open'))setMenu(false)});
renderProjects();requestAnimationFrame(()=>q('.hero').classList.add('loaded'));