// Scroll indicator and original CSS-based educational signal animation.
const fill=document.querySelector('.page-trace span');
let raf=0;
function update(){
  if(raf)return;
  raf=requestAnimationFrame(()=>{
    const available=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    fill.style.transform=`scaleY(${Math.min(1,Math.max(0,scrollY/available))})`;
    raf=0;
  });
}
window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();