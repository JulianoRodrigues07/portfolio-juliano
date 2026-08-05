// Efeito de scroll para o navbar
window.addEventListener('scroll', function() {
	const header = document.getElementById('nav');
	if (window.scrollY > 0) {
		header.style.width = '70%';
		header.style.marginLeft = '15%';
    header.style.transition = 'width 0.3s, margin 0.3s';
    header.style.borderRadius = '24px';
	} else {
		header.style.width = '100%';
		header.style.marginLeft = '0';
	}
});

// ── Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').replace('#','');
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 80) + 'ms';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Nav on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 20 ? 'rgba(7,9,15,0.95)' : 'rgba(7,9,15,0.7)';
});

// ── STARFIELD
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, CX, CY, stars = [];
  const STAR_COUNT = 220;
  let speed = 4;
  let mouseX = 0, mouseY = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    CX = W / 2;
    CY = H / 2;
  }

  function createStar() {
    return {
      x: (Math.random() - 0.5) * W * 2,
      y: (Math.random() - 0.5) * H * 2,
      z: Math.random() * W,
      pz: 0
    };
  }

  function init() {
    stars = Array.from({ length: STAR_COUNT }, createStar);
    stars.forEach(s => s.z = Math.random() * W);
  }

  function animate() {
    ctx.fillStyle = 'rgba(7,9,15,0.25)';
    ctx.fillRect(0, 0, W, H);

    // subtle mouse parallax on center point
    const cx = CX + mouseX * 0.03;
    const cy = CY + mouseY * 0.03;

    stars.forEach((s, i) => {
      s.pz = s.z;
      s.z -= speed;

      if (s.z <= 0) {
        stars[i] = createStar();
        stars[i].z = W;
        stars[i].pz = W;
        return;
      }

      const sx  = (s.x / s.z)  * W + cx;
      const sy  = (s.y / s.z)  * H + cy;
      const spx = (s.x / s.pz) * W + cx;
      const spy = (s.y / s.pz) * H + cy;

      const progress = 1 - s.z / W;
      const size     = Math.max(0.3, progress * 2.8);
      const alpha    = Math.min(1, progress * 1.4);

      // draw streak for fast/close stars, dot for far ones
      if (progress > 0.15) {
        ctx.beginPath();
        ctx.moveTo(spx, spy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(56,189,248,${alpha * 0.85})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();
      }

      // bright dot at tip
      ctx.beginPath();
      ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
      // occasional white/purple stars for variety
      const hue = (i % 7 === 0) ? '255,255,255' : (i % 5 === 0) ? '123,97,255' : '56,189,248';
      ctx.fillStyle = `rgba(${hue},${alpha})`;
      ctx.fill();
    });

    // warp glow at center
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.18);
    grd.addColorStop(0, 'rgba(56,189,248,0.04)');
    grd.addColorStop(1, 'rgba(56,189,248,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(animate);
  }

  // mouse parallax
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left - CX;
    mouseY = e.clientY - rect.top  - CY;
    speed = 6; // speed up on hover
  });
  hero.addEventListener('mouseleave', () => {
    mouseX = 0; mouseY = 0;
    speed = 4;
  });

  window.addEventListener('resize', () => { resize(); });
  resize();
  init();
  animate();
})();
function copiarEmail(btn) {
  const email = "julianorr20@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const icon = btn.querySelector("i");
    icon.classList.remove("bi-clipboard");
    icon.classList.add("bi-clipboard-check-fill");
    btn.classList.add("copied");

    setTimeout(() => {
      icon.classList.remove("bi-clipboard-check-fill");
      icon.classList.add("bi-clipboard");
      btn.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    alert("Não foi possível copiar o email. Copie manualmente: " + email);
  });
}