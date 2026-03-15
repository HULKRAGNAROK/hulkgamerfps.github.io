const cur = document.getElementById('cur'), cur2 = document.getElementById('cur2');
document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
    setTimeout(() => { cur2.style.left = e.clientX + 'px'; cur2.style.top = e.clientY + 'px'; }, 80);
});
document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(2.5)'; });
    a.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

/* PARTICLES */
const canvas = document.getElementById('bgc'), ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize(); window.addEventListener('resize', resize);
function mkPt() { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + .3, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, a: Math.random() * .5 + .1, p: Math.random() * Math.PI * 2 }; }
for (let i = 0; i < 130; i++)pts.push(mkPt());
let mx = -999, my = -999;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function draw() {
    ctx.clearRect(0, 0, W, H);
    const gA = ctx.createRadialGradient(W * .15, H * .15, 0, W * .15, H * .15, 360);
    gA.addColorStop(0, 'rgba(0,255,136,.055)'); gA.addColorStop(1, 'transparent');
    ctx.fillStyle = gA; ctx.fillRect(0, 0, W, H);
    const gB = ctx.createRadialGradient(W * .85, H * .85, 0, W * .85, H * .85, 280);
    gB.addColorStop(0, 'rgba(0,180,70,.04)'); gB.addColorStop(1, 'transparent');
    ctx.fillStyle = gB; ctx.fillRect(0, 0, W, H);
    pts.forEach((p, i) => {
        p.p += .018;
        const alpha = p.a * (.55 + .45 * Math.sin(p.p));
        const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) { p.vx += dx / dist * .07; p.vy += dy / dist * .07; }
        p.vx *= .99; p.vy *= .99; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
            const p2 = pts[j], ddx = p.x - p2.x, ddy = p.y - p2.y, d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < 95) { ctx.beginPath(); ctx.strokeStyle = 'rgba(0,255,136,' + (0.09 * (1 - d / 95)) + ')'; ctx.lineWidth = .4; ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,255,136,' + alpha + ')'; ctx.fill();
    });
    requestAnimationFrame(draw);
}
draw();

/* COUNTERS */
function animCount(el, target) {
    let n = 0; const step = Math.ceil(target / 55);
    const fmt = v => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v + '';
    const iv = setInterval(() => { n = Math.min(n + step, target); el.textContent = fmt(n); if (n >= target) clearInterval(iv); }, 22);
}
setTimeout(() => {
    animCount(document.getElementById('twitch-count'), 415);
    animCount(document.getElementById('yt-count'), 25);
    animCount(document.getElementById('ig-count'), 2100);
}, 700);