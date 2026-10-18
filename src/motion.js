const OUT = 'cubic-bezier(.22,1,.36,1)';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = value => Math.max(0, Math.min(1, value));

/** Adds masks inside existing headings without changing their type, size or line layout. */
export function prepareEditorialMotion(root, refs, cleanup) {
  if (reducedMotion()) return;
  const restorations = [];
  root.querySelectorAll('main h2, [data-svc-panel] h3').forEach(heading => {
    const label = heading.getAttribute('aria-label');
    heading.setAttribute('aria-label', heading.textContent.replace(/\s+/g, ' ').trim());
    heading.classList.add('cs-heading');
    const hadReveal = heading.hasAttribute('data-reveal');
    heading.setAttribute('data-reveal', '1');
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    let index = 0;
    textNodes.forEach(node => {
      if (!node.textContent.trim()) return;
      const replacements = [];
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).filter(Boolean).forEach(token => {
        let item;
        if (/^\s+$/.test(token)) item = document.createTextNode(token);
        else {
          item = document.createElement('span');
          item.className = 'cs-word';
          item.setAttribute('aria-hidden', 'true');
          item.style.setProperty('--word-delay', `${Math.min(index++, 12) * 38}ms`);
          const inner = document.createElement('span');
          inner.textContent = token;
          item.appendChild(inner);
        }
        replacements.push(item);
        fragment.appendChild(item);
      });
      node.replaceWith(fragment);
      restorations.push(() => { replacements[0]?.replaceWith(node); replacements.slice(1).forEach(item => item.remove()); });
    });
    restorations.push(() => {
      heading.classList.remove('cs-heading');
      if (!hadReveal) { heading.removeAttribute('data-reveal'); heading.removeAttribute('data-shown'); }
      if (label === null) heading.removeAttribute('aria-label'); else heading.setAttribute('aria-label', label);
    });
  });
  const media = [refs.styleImgRef.current?.parentElement, ...root.querySelectorAll('#types [data-cursor], [data-svc-panel] > img')].filter(Boolean);
  media.forEach((element, i) => {
    element.classList.add('cs-media');
    element.setAttribute('data-reveal', '1');
    element.style.setProperty('--media-delay', `${i % 3 * 85}ms`);
  });
  const steps = root.querySelectorAll('[data-r="processgrid"] > div');
  steps.forEach((element, i) => {
    element.classList.add('cs-process-step');
    element.setAttribute('data-reveal', '1');
    element.setAttribute('data-delay', String(i * 100));
  });
  const flow = root.querySelector('[data-r="flow"]');
  flow?.classList.add('cs-flow');
  cleanup.push(() => {
    restorations.forEach(fn => fn());
    media.forEach(el => { el.classList.remove('cs-media'); el.removeAttribute('data-reveal'); el.removeAttribute('data-shown'); el.style.removeProperty('--media-delay'); });
    steps.forEach(el => { el.classList.remove('cs-process-step'); el.removeAttribute('data-reveal'); el.removeAttribute('data-shown'); el.removeAttribute('data-delay'); });
    flow?.classList.remove('cs-flow');
  });
}

export function wireEditorialReveals(root, cleanup) {
  const elements = [...root.querySelectorAll('[data-reveal],[data-flow-step]')];
  const timers = new Set();
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.dataset.shown = '1');
    return;
  }
  const small = window.innerWidth <= 640;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const delay = Number(target.dataset.delay || 0);
      const timer = setTimeout(() => { target.dataset.shown = '1'; timers.delete(timer); }, small ? Math.min(delay, 180) : delay);
      timers.add(timer);
      observer.unobserve(target);
    });
  }, { threshold: .06, rootMargin: '0px 0px -5% 0px' });
  elements.forEach(el => observer.observe(el));
  cleanup.push(() => { observer.disconnect(); timers.forEach(clearTimeout); });
}

/** A single, sleeping scroll loop for the editorial art direction; native scrolling remains intact. */
export function wireScrollMotion(root, refs, cleanup) {
  if (reducedMotion() || !('IntersectionObserver' in window)) return;
  const desktop = window.matchMedia('(min-width: 1021px)');
  const targets = [];
  const add = (el, kind) => { if (el) targets.push({ el, kind, top: 0, height: 0, progress: -1 }); };
  add(root.querySelector('#top'), 'hero');
  add(root.querySelector('#holiday'), 'holiday');
  add(root.querySelector('[data-r="flow"]'), 'flow');
  root.querySelectorAll('[data-cursor="View"]').forEach(el => add(el, 'photo'));
  add(refs.styleImgRef.current?.parentElement, 'photo');
  const active = new Set();
  let frame = 0, measureFrame = 0, stopped = false;
  function measure() {
    measureFrame = 0;
    targets.forEach(item => { const box = item.el.getBoundingClientRect(); item.top = box.top + window.scrollY; item.height = box.height; });
    update();
  }
  function paint() {
    frame = 0;
    if (stopped || document.hidden) return;
    const y = window.scrollY, height = window.innerHeight;
    active.forEach(item => {
      const p = clamp((y + height - item.top) / (height + item.height));
      if (Math.abs(item.progress - p) < .0005) return;
      item.progress = p;
      if (item.kind === 'hero') {
        const travel = Math.min(y, height) * (desktop.matches ? .075 : .025);
        root.style.setProperty('--hero-drift', `${travel.toFixed(1)}px`);
      } else if (item.kind === 'photo') {
        item.el.style.setProperty('--photo-drift', `${((p - .5) * (desktop.matches ? 48 : 16)).toFixed(1)}px`);
      } else if (item.kind === 'holiday') {
        item.el.style.setProperty('--star-turn', `${(-18 + p * 55).toFixed(2)}deg`);
        item.el.style.setProperty('--star-rise', `${((p - .5) * 95).toFixed(1)}px`);
      } else {
        const flow = clamp((y + height * .82 - item.top) / Math.max(1, desktop.matches ? height * .4 : item.height * .9));
        item.el.style.setProperty('--flow-progress', flow.toFixed(3));
        item.el.querySelectorAll('[data-flow-step]').forEach((step, i) => { step.dataset.lit = flow >= i / 7 ? '1' : '0'; });
      }
    });
  }
  function update() { if (!frame && !stopped) frame = requestAnimationFrame(paint); }
  function resize() { if (!measureFrame && !stopped) measureFrame = requestAnimationFrame(measure); }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const item = targets.find(target => target.el === entry.target);
      if (entry.isIntersecting) { item.progress = -1; active.add(item); } else active.delete(item);
    });
    update();
  }, { rootMargin: '15% 0px' });
  targets.forEach(item => observer.observe(item.el));
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  ro?.observe(root);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', update);
  document.fonts?.ready.then(() => { if (!stopped) resize(); });
  measure();
  cleanup.push(() => {
    stopped = true;
    observer.disconnect(); ro?.disconnect();
    cancelAnimationFrame(frame); cancelAnimationFrame(measureFrame);
    window.removeEventListener('scroll', update); window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', update);
  });
}

export function enterHero(root, refs, cleanup) {
  if (reducedMotion() || !Element.prototype.animate) return;
  const animations = [];
  const image = window.innerWidth > 1020 ? refs.heroBgRef.current : root.querySelector('#top [data-r="only-sm"] img');
  if (image) animations.push(image.animate([{ scale: '1.12' }, { scale: '1' }], { duration: 2100, easing: OUT }));
  const nav = refs.navRef.current;
  if (nav) animations.push(nav.animate([{ opacity: 0, translate: '0 -16px' }, { opacity: 1, translate: '0 0' }], { duration: 950, delay: 180, fill: 'both', easing: OUT }));
  cleanup.push(() => animations.forEach(animation => animation.cancel()));
}
