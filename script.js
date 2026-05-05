// ── CUSTOM CURSOR ──
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .exp-card, .sk-item, .award-row, .teach-card, .pub-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-big'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-big'));
});

// ── NAV: TRANSPARENT → SOLID ON SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── TYPEWRITER ──
const phrases = [
  'AI systems.',
  'RAG pipelines.',
  'CV models.',
  'LLM agents.',
  'things that scale.',
  'the future.',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = phrases[pi];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 85);
}
setTimeout(type, 900);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 75);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SKILL ICON TOOLTIPS ──
const tooltip = document.getElementById('sk-tooltip');

document.querySelectorAll('.sk-item[data-tip]').forEach(el => {
  el.addEventListener('mouseenter', e => {
    tooltip.textContent = el.dataset.tip;
    tooltip.style.opacity = '1';
  });
  el.addEventListener('mousemove', e => {
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top  = (e.clientY - 28) + 'px';
  });
  el.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
});

// ── EXPERIENCE CARD DRAG SCROLL ──
const scroller = document.querySelector('.exp-scroll-wrap');
if (scroller) {
  let isDown = false, startX, scrollLeft;
  scroller.addEventListener('mousedown', e => {
    isDown = true;
    scroller.style.cursor = 'grabbing';
    startX = e.pageX - scroller.offsetLeft;
    scrollLeft = scroller.scrollLeft;
  });
  scroller.addEventListener('mouseleave', () => { isDown = false; scroller.style.cursor = 'default'; });
  scroller.addEventListener('mouseup',    () => { isDown = false; scroller.style.cursor = 'default'; });
  scroller.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    scroller.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
}
