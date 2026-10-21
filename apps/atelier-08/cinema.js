/* Rehab Haider / Framed by Light — progressive, accessible cinema.
   Plain JavaScript; no scroll hijacking and no remote animation dependency. */
(() => {
  'use strict';
  const hero = document.querySelector('[data-cinema]');
  if (!hero) return;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = Array.from(hero.querySelectorAll('.cinema-scene'));
  const buttons = Array.from(hero.querySelectorAll('[data-scene-button]'));
  const pauseButton = hero.querySelector('[data-cinema-pause]');
  if (!scenes.length || scenes.length !== buttons.length || !pauseButton) return;
  const labelPause = pauseButton.getAttribute('aria-label');
  const labelPlay = document.documentElement.lang === 'ar' ? 'تشغيل تبديل الصور' : 'Play changing scenes';
  const DELAY = 8500;
  let index = 0;
  let timer = null;
  let userPaused = false;
  let hoverPaused = false;
  let focusPaused = false;

  function sceneAt(number, fromUser = false) {
    const next = ((number % scenes.length) + scenes.length) % scenes.length;
    index = next;
    scenes.forEach((node, i) => {
      const active = i === next;
      node.classList.toggle('is-active', active);
      if (active) node.removeAttribute('inert');
      else node.setAttribute('inert', '');
    });
    buttons.forEach((node, i) => {
      node.setAttribute('aria-pressed', i === next ? 'true' : 'false');
    });
    const image = scenes[next].querySelector('img');
    if (image) {
      image.loading = 'eager';
      const src = image.currentSrc || image.src;
      if (src) hero.style.setProperty('--text-photo', 'url("' + src.replaceAll('"', '%22') + '")');
    }
    if (fromUser) resetTimer();
  }

  function canPlay() {
    return !media.matches && !userPaused && !hoverPaused && !focusPaused && !document.hidden;
  }
  function syncMotion() {
    const play = canPlay();
    hero.dataset.paused = String(!play);
    window.clearTimeout(timer);
    timer = null;
    if (play) timer = window.setTimeout(() => {
      sceneAt(index + 1);
      syncMotion();
    }, DELAY);
    pauseButton.textContent = userPaused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-pressed', String(userPaused));
    const label = userPaused ? labelPlay : labelPause;
    pauseButton.setAttribute('aria-label', label);
    pauseButton.title = label;
  }
  function resetTimer() {
    window.clearTimeout(timer);
    if (canPlay()) timer = window.setTimeout(() => {
      sceneAt(index + 1);
      syncMotion();
    }, DELAY);
  }

  buttons.forEach((button, i) => button.addEventListener('click', () => sceneAt(i, true)));
  const group = hero.querySelector('.cinema-scenes-nav');
  group?.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = Math.max(0, buttons.indexOf(document.activeElement));
    const rtl = document.documentElement.dir === 'rtl';
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 :
      (current + (event.key === 'ArrowRight' ? (rtl ? -1 : 1) : (rtl ? 1 : -1)) + buttons.length) % buttons.length;
    buttons[next]?.focus();
    sceneAt(next, true);
  });
  pauseButton.addEventListener('click', () => {
    userPaused = !userPaused;
    syncMotion();
  });
  hero.addEventListener('mouseenter', () => {
    hoverPaused = true;
    syncMotion();
  });
  hero.addEventListener('mouseleave', () => {
    hoverPaused = false;
    syncMotion();
  });
  hero.addEventListener('focusin', () => {
    focusPaused = true;
    syncMotion();
  });
  hero.addEventListener('focusout', () => {
    window.requestAnimationFrame(() => {
      focusPaused = hero.contains(document.activeElement);
      syncMotion();
    });
  });
  document.addEventListener('visibilitychange', syncMotion);
  media.addEventListener?.('change', syncMotion);

  // Small, compositor-friendly pointer response on desktop only.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !media.matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      if (frame) return;
      const x = (event.clientX / window.innerWidth - .5) * -14;
      const y = (event.clientY / window.innerHeight - .5) * -10;
      frame = window.requestAnimationFrame(() => {
        hero.style.setProperty('--cinema-shift-x', x.toFixed(1) + 'px');
        hero.style.setProperty('--cinema-shift-y', y.toFixed(1) + 'px');
        frame = 0;
      });
    }, {passive: true});
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--cinema-shift-x', '0px');
      hero.style.setProperty('--cinema-shift-y', '0px');
    });
  }
  if ('IntersectionObserver' in window && !media.matches) {
    const targets = document.querySelectorAll('.cinema-interlude, .work-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold: .10, rootMargin: '0px 0px -20px 0px'});
    targets.forEach(el => observer.observe(el));
    document.body.classList.add('cinema-ready');
  } else {
    document.querySelectorAll('.cinema-interlude, .work-card').forEach(el => el.classList.add('is-visible'));
  }
  if (media.matches) pauseButton.hidden = true;
  sceneAt(0);
  syncMotion();
})();