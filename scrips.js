(function(){
var r=document.documentElement,btn=document.getElementById('tgl');
try{var s=localStorage.getItem('theme');if(s)r.setAttribute('data-theme',s)}catch(e){}
var toast=document.createElement('div');toast.setAttribute('role','status');toast.style.cssText='position:fixed;left:50%;bottom:calc(1.5rem + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:.7rem 1.2rem;border-radius:.6rem;font-weight:600;z-index:20;display:none;max-width:90vw;text-align:center;overflow-wrap:anywhere';document.body.appendChild(toast);
function say(s){toast.textContent=s;toast.style.display='block';setTimeout(function(){toast.style.display='none'},3500)}
document.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.addEventListener('click',function(){var m=a.getAttribute('href').slice(7);try{navigator.clipboard.writeText(m).then(function(){say('Email address copied: '+m)},function(){say('Email: '+m)})}catch(e){say('Email: '+m)}})});
document.querySelectorAll('.pdfdl').forEach(function(a){a.addEventListener('click',function(e){
if(!(window.claude&&window.claude.use))return;
e.preventDefault();
window.claude.use('downloads').then(function(d){
if(!d||!window.PDF_B64){say('PDF download is not available in this view.');return}
var b=atob(window.PDF_B64),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);
return d.save({filename:'Azrul_Aswat_Portfolio.pdf',data:new Blob([u],{type:'application/pdf'})});
}).catch(function(err){if(!err||err.code!=='declined')say('Could not save the PDF.')})})});
btn.addEventListener('click',function(){
var dark=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
var n=dark?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}draw(performance.now())});
var c=document.getElementById('wave'),x=c.getContext('2d'),W,H,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function v(n){return getComputedStyle(r).getPropertyValue(n).trim()}
function size(){var d=Math.min(devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);draw(performance.now())}
function Y(m){return H-18-(m-4)/16*(H-46)}
function sig(px,t){var m=12+5.2*Math.sin(px*.011-t*.0016)+2.2*Math.sin(px*.037-t*.0031);return Math.max(4.4,Math.min(19.6,m))}
function draw(t){
if(!W)return;x.clearRect(0,0,W,H);x.font='600 12px IBM Plex Sans,system-ui,sans-serif';x.textBaseline='middle';
var line=v('--line'),mut=v('--muted'),acc=v('--accent'),gold=v('--gold');
[4,12,20].forEach(function(m){x.strokeStyle=line;x.lineWidth=1;x.beginPath();x.moveTo(48,Y(m));x.lineTo(W,Y(m));x.stroke();x.fillStyle=mut;x.fillText(m+' mA',10,Y(m))});
x.strokeStyle=acc;x.lineWidth=3;x.lineJoin='round';x.beginPath();
for(var px=48;px<=W;px+=3){var y=Y(sig(px,t));px===48?x.moveTo(px,y):x.lineTo(px,y)}x.stroke();
var dx=Math.max(120,W*.8),dy=Y(sig(dx,t)),val=sig(dx,t).toFixed(1)+' mA';
x.fillStyle=gold;x.beginPath();x.arc(dx,dy,6,0,7);x.fill();
x.fillStyle=v('--ink');x.fillText(val,Math.min(dx+12,W-70),Math.max(14,dy-16))}
function loop(t){draw(t);requestAnimationFrame(loop)}
addEventListener('resize',size);size();if(!reduce)requestAnimationFrame(loop);
})();
