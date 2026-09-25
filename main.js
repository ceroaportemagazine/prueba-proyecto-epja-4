/* ============================================
   CERO APORTE MAG — main.js
   Global interactive behaviours
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTimeline();
  initCounters();
  initProgressBars();
  initTabs();
  initFlipCards();
  initWordHighlight();
  initNavScroll();
});

/* ---- REVEAL ON SCROLL ---- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ---- TIMELINE ITEMS ---- */
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
}

/* ---- ANIMATED COUNTERS ---- */
function initCounters() {
  const nums = document.querySelectorAll('.stat-number[data-target]');
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1400;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.round(ease * target).toLocaleString('es-CL') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.3 });
  nums.forEach(el => obs.observe(el));
}

/* ---- PROGRESS BARS ---- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ---- TABS ---- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.parentElement ? tabGroup.parentElement.querySelectorAll('.tab-panel') : [];
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

/* ---- FLIP CARDS ---- */
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ---- WORD HIGHLIGHT / TOOLTIP ---- */
function initWordHighlight() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.style.cursor = 'help';
    el.style.borderBottom = '1px dashed var(--red)';
    const tip = document.createElement('div');
    tip.className = 'word-tooltip';
    tip.textContent = el.dataset.tooltip;
    Object.assign(tip.style, {
      position: 'absolute', background: 'var(--black)', color: 'var(--white)',
      fontSize: '0.78rem', fontFamily: 'var(--font-mono)', padding: '0.5rem 0.75rem',
      borderRadius: '3px', pointerEvents: 'none', opacity: '0', transition: 'opacity 0.2s',
      maxWidth: '220px', lineHeight: '1.4', zIndex: '200', whiteSpace: 'normal'
    });
    el.style.position = 'relative';
    el.appendChild(tip);
    el.addEventListener('mouseenter', () => { tip.style.opacity = '1'; });
    el.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
  });
}

/* ---- NAV SCROLL EFFECT ---- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(26,24,23,0.99)'
      : 'rgba(26,24,23,0.96)';
  }, { passive: true });
}
