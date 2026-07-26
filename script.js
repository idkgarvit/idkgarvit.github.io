// ─── MATRIX RAIN ───
(function(){
const mc = document.getElementById('matrix-canvas');
if(!mc)return;
const mctx = mc.getContext('2d');
let mW, mH;
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&^%$#@!';
const fontSize = 10;
let columns, drops;
function mResize(){mW=mc.width=window.innerWidth;mH=mc.height=window.innerHeight;columns=Math.floor(mW/fontSize);drops=Array(columns).fill(1)}
window.addEventListener('resize',mResize);mResize();
function mDraw(){
  mctx.fillStyle='rgba(8,11,16,.05)';
  mctx.fillRect(0,0,mW,mH);
  mctx.font=fontSize+'px monospace';
  for(let i=0;i<drops.length;i++){
    const text=chars[Math.floor(Math.random()*chars.length)];
    mctx.fillStyle=`rgba(0,212,255,${0.3+Math.random()*0.5})`;
    mctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>mH&&Math.random()>.975) drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(mDraw);
}
mDraw();
})();

// ─── ANIME PARTICLES ───
(function(){
const pc=document.getElementById('particles-canvas');
if(!pc)return;
const pctx=pc.getContext('2d');
let pW,pH,prtcls=[];
function pResize(){pW=pc.width=window.innerWidth;pH=pc.height=window.innerHeight}
window.addEventListener('resize',pResize);pResize();
const COLORS=['rgba(220,38,38,','rgba(168,85,247,','rgba(0,212,255,','rgba(255,95,87,'];
for(let i=0;i<60;i++){prtcls.push({
  x:Math.random()*pW,y:Math.random()*pH,r:Math.random()*2+1,
  dx:(Math.random()-0.5)*.4,dy:(Math.random()-0.5)*.4-0.2,
  c:COLORS[Math.floor(Math.random()*COLORS.length)]+(Math.random()*.4+.1)+')',
  l:Math.random()*.6+.2,f:Math.random()*200
})}
function pDraw(){
  pctx.clearRect(0,0,pW,pH);
  prtcls.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;p.l=Math.max(.1,Math.min(.8,p.l+(Math.random()-.5)*.02));
    if(p.x<0||p.x>pW)p.dx*=-1;
    if(p.y<0||p.y>pH){p.y=pH+5;p.dy=(Math.random()-.5)*.4-0.2}
    pctx.beginPath();pctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    const c=p.c.replace(/[\d.]+\)$/,p.l.toFixed(2)+')');
    pctx.fillStyle=c;pctx.fill();
  });
  requestAnimationFrame(pDraw);
}
pDraw();
})();

// ─── SKILLS DATA ───
const skills = [
  {icon:'🛡️',name:'SOC & Incident Response',cat:'soc',lv:'ADVANCED',pct:85,tags:['SIEM','Log Analysis','Wireshark','NIST IR','MITRE ATT&CK','Threat Intel'],desc:'Trained in SOC operations — log analysis, incident response, threat detection.'},
  {icon:'🌐',name:'Web Security',cat:'web',lv:'ADVANCED',pct:88,tags:['SQLi','XSS','SSRF','CSRF','XXE','SSTI','OAuth','JWT','GraphQL','Prototype Pollution'],desc:'240+ PortSwigger labs completed. Full-spectrum web application testing.'},
  {icon:'🔗',name:'Internal Pentesting',cat:'pentest',lv:'INTERMEDIATE',pct:65,tags:['AD','BloodHound','Kerberos','CrackMapExec','Impacket','Pivoting','Nmap'],desc:'Active Directory enumeration, Kerberos attacks, lateral movement.'},
  {icon:'☁️',name:'Cloud & API Security',cat:'cloud',lv:'INTERMEDIATE',pct:60,tags:['S3','SSRF→IMDS','CORS','JWT','BOLA','GraphQL'],desc:'Cloud infrastructure testing — S3 misconfigs, SSRF to IMDS, API auth flaws.'},
  {icon:'📶',name:'Wireless / Ghost',cat:'wireless',lv:'INTERMEDIATE',pct:55,tags:['WPA','PMKID','Evil Portal','Bluetooth','Aircrack-ng','mdk4'],desc:'Ghost Suite on rooted Android. WPA cracking, Evil Portal, beacon flooding.'},
  {icon:'📱',name:'Mobile / Android',cat:'mobile',lv:'INTERMEDIATE',pct:50,tags:['ADB','Jadx','APK','Burp','Root','Kali Chroot'],desc:'APK decompilation, cert pinning bypass, mobile API interception.'},
  {icon:'🐍',name:'Tool Building',cat:'tooling',lv:'INTERMEDIATE',pct:55,tags:['Python','Bash','Recon','Automation','Parsing'],desc:'Custom tooling for recon, exploitation, and automation.'}
];

const sg = document.getElementById('skills-g');
if(sg){
skills.forEach((s,i)=>{
  const c = document.createElement('div');
  c.className = 's-card r';
  if(i<3) c.classList.add(`r${i+1}`);
  c.setAttribute('data-c',s.cat);
  c.innerHTML = `
    <div class="sc-glow"></div>
    <div class="sc-top">
      <span class="sc-icon">${s.icon}</span>
      <span class="sc-lv">${s.lv}</span>
    </div>
    <h4>${s.name}</h4>
    <div class="sc-desc">${s.desc}</div>
    <div class="sc-bar-wrap"><div class="sc-bar" data-pct="${s.pct}"></div></div>
    <div class="sc-bar-label"><span>proficiency</span><span>${s.pct}%</span></div>
    <div class="sc-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div>
  `;
  sg.appendChild(c);
});
}

// ─── SCROLL SKILL BARS ───
const barObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){const bar=e.target;bar.style.width=bar.dataset.pct+'%';barObs.unobserve(bar)}});
},{threshold:.3});
document.querySelectorAll('.sc-bar').forEach(el=>barObs.observe(el));

// ─── SCROLL PROGRESS ───
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const p=document.getElementById('progress');
  if(p)p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

// ─── NAV HIDE ───
let ls=0;
window.addEventListener('scroll',()=>{
  const c=window.scrollY;
  const n=document.getElementById('nav');
  if(n)n.classList.toggle('hidden',c>ls&&c>80);
  ls=c;
},{passive:true});

// ─── REVEAL ───
const revObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');revObs.unobserve(e.target)}});
},{threshold:.06});
document.querySelectorAll('.r, .stat-c, .p-card, .r-card, .s-card, .tl-item').forEach(el=>revObs.observe(el));

// ─── 3D SCROLL DEPTH EFFECT ───
// "stays on one screen and when scroll everything moves"
// Each section gets a 3D transform (rotateX + translateZ) based on its position
// relative to the viewport, creating the illusion of moving through 3D space
(function(){
const sections = document.querySelectorAll('.section, .hero');
const body = document.body;
let ticking3d = false;

function update3D(){
  const vh = window.innerHeight;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const vpCenter = vh / 2;
    // Distance from viewport center (-1 to 1 range)
    const dist = (center - vpCenter) / vh;
    // Map to subtle 3D transforms
    const rotX = dist * -2.5;    // max ±2.5° rotation
    const zDepth = Math.abs(dist) * -40; // max -40px Z
    
    // Only apply when section is visible or nearby
    if (rect.bottom > -vh && rect.top < vh * 2) {
      section.style.transform = `rotateX(${rotX}deg) translateZ(${zDepth}px)`;
      section.style.opacity = 1 - Math.min(Math.abs(dist), 1) * 0.15;
    }
  });
  ticking3d = false;
}

window.addEventListener('scroll', ()=>{
  if(!ticking3d){requestAnimationFrame(update3D);ticking3d=true}
},{passive:true});
// Initial call
update3D();
})();

// ─── COUNT UP ───
const cuObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,t=parseInt(el.dataset.t),s=Math.max(1,Math.ceil(t/30));
      let c=0;const iv=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(iv)}el.textContent=c},35);
      cuObs.unobserve(el);
    }
  });
},{threshold:.5});
document.querySelectorAll('.cu').forEach(el=>cuObs.observe(el));

// ─── TILT ───
document.querySelectorAll('.p-card').forEach(c=>{
  if(c.classList.contains('place')) return;
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    const x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.setProperty('--rx',((y-r.height/2)/r.height*2)*-8+'deg');
    c.style.setProperty('--ry',((x-r.width/2)/r.width*2)*8+'deg');
    c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
  });
  c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
});

// ─── NAV SCROLL ───
document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  });
});

console.log('%c🪐 Orbit','font-size:28px;font-weight:800');
console.log('%cSOC · Web Security · Pentesting','font-size:14px;color:#00d4ff');
console.log('%c"The One Piece is real"','font-size:12px;color:#a855f7');
console.log('%c「この世界は残酷だ、そしてとても美しい」','font-size:11px;color:#666');
