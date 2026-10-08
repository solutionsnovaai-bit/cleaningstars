import { css } from './utils.js';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Generic replacement for the design tool's style-hover/style-active/style-focus directives:
// elements carry a data-hover/data-active/data-focus attribute holding raw CSS text,
// applied on the matching event and reverted on the opposite one.
function initInteractiveStyles(root) {
  const cleanups = [];
  function wire(attr, onEvt, offEvt) {
    root.querySelectorAll(`[${attr}]`).forEach((el) => {
      const styles = css(el.getAttribute(attr));
      const original = {};
      const apply = () => { Object.keys(styles).forEach((k) => { original[k] = el.style[k]; el.style[k] = styles[k]; }); };
      const revert = () => { Object.keys(styles).forEach((k) => { el.style[k] = original[k] || ''; }); };
      el.addEventListener(onEvt, apply);
      el.addEventListener(offEvt, revert);
      cleanups.push(() => { el.removeEventListener(onEvt, apply); el.removeEventListener(offEvt, revert); });
    });
  }
  wire('data-hover', 'mouseenter', 'mouseleave');
  wire('data-focus', 'focus', 'blur');
  wire('data-active', 'mousedown', 'mouseup');
  return () => cleanups.forEach((fn) => fn());
}

function runLoader(refs, props, cleanup) {
  const el = refs.loaderRef.current; if (!el) return;
  const show = props.showLoader !== false && !prefersReducedMotion();
  if (!show) { el.style.display = 'none'; return; }
  const mark = refs.loaderMarkRef.current, txt = refs.loaderTxtRef.current;
  requestAnimationFrame(() => { if (mark) mark.style.opacity = '1'; if (txt) txt.style.opacity = '1'; });
  const t1 = setTimeout(() => { el.style.opacity = '0'; el.style.visibility = 'hidden'; }, 1500);
  const t2 = setTimeout(() => { el.style.display = 'none'; }, 2400);
  cleanup.push(() => { clearTimeout(t1); clearTimeout(t2); });
}

function wireReveals(root, cleanup) {
  const els = root.querySelectorAll('[data-reveal],[data-flow-step]');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.setAttribute('data-shown', '1'));
    return;
  }
  const isMobile = window.innerWidth <= 640;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const d = parseInt(el.getAttribute('data-delay') || '0', 10);
      setTimeout(() => el.setAttribute('data-shown', '1'), isMobile ? Math.min(d, 120) : d);
      io.unobserve(el);
    });
  }, { threshold: isMobile ? 0.02 : 0.12, rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
  cleanup.push(() => io.disconnect());
}

function wireScroll(refs, state, cleanup) {
  const nav = refs.navRef.current, prog = refs.progressRef.current;
  const art = refs.heroBgRef.current, cta = refs.stickyCtaRef.current;
  const reduced = prefersReducedMotion();
  const navLogo = nav ? nav.querySelector('[data-nav-logo]') : null;
  const small = window.matchMedia('(max-width: 1020px)');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY || 0;
      const h = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (prog) prog.style.width = Math.min(100, (y / h) * 100) + '%';
      if (nav) {
        if (y > 60) {
          nav.style.background = 'rgba(248,246,240,.82)';
          nav.style.backdropFilter = 'blur(14px)';
          nav.style.webkitBackdropFilter = 'blur(14px)';
          nav.style.boxShadow = '0 1px 0 rgba(17,21,18,.08)';
          nav.style.paddingTop = '12px';
          nav.style.paddingBottom = '12px';
        } else {
          nav.style.background = 'transparent';
          nav.style.backdropFilter = 'none';
          nav.style.webkitBackdropFilter = 'none';
          nav.style.boxShadow = 'none';
          nav.style.paddingTop = '18px';
          nav.style.paddingBottom = '18px';
        }
      }
      if (navLogo) {
        const hide = small.matches && y <= 60;
        navLogo.style.opacity = hide ? '0' : '1';
        navLogo.style.pointerEvents = hide ? 'none' : 'auto';
      }
      if (art && !reduced && y < window.innerHeight * 1.2) {
        art.style.transform = 'translate3d(0,' + (y * 0.05).toFixed(2) + 'px,0) scale(1.04)';
      }
      if (cta && !state.ctaDismissed) {
        const on = y > window.innerHeight * 0.9;
        cta.style.opacity = on ? '1' : '0';
        cta.style.transform = on ? 'translateY(0)' : 'translateY(120%)';
        cta.style.pointerEvents = on ? 'auto' : 'none';
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  cleanup.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); });
}

function wireRotator(refs, cleanup) {
  const els = [refs.rotatorRef.current, refs.rotatorRefSm.current].filter(Boolean);
  if (!els.length || prefersReducedMotion()) return;
  const words = ['guests', 'life', 'work', 'check-in', "what's next"];
  let i = 0;
  const id = setInterval(() => {
    i = (i + 1) % words.length;
    els.forEach((el) => {
      el.style.transition = 'transform .45s cubic-bezier(.65,0,.35,1), opacity .45s';
      el.style.transform = 'translateY(-110%)';
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = words[i];
        el.style.transition = 'none';
        el.style.transform = 'translateY(110%)';
        requestAnimationFrame(() => {
          el.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1), opacity .55s';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      }, 460);
    });
  }, 2600);
  cleanup.push(() => clearInterval(id));
}

function wireServices(root, refs, cleanup) {
  const panels = root.querySelectorAll('[data-svc-panel]');
  const medias = root.querySelectorAll('[data-svc-media]');
  const lines = root.querySelectorAll('[data-svc-line]');
  const labels = ['Airbnb turnovers', 'Airbnb setups & styling', 'Residential cleaning', 'Hotel cleaning'];
  const labelEl = refs.svcLabelRef.current, numEl = refs.svcNumRef.current;
  let current = -1;
  function activate(i) {
    if (i === current) return;
    current = i;
    medias.forEach((m) => {
      const on = parseInt(m.getAttribute('data-svc-media'), 10) === i;
      m.style.opacity = on ? '1' : '0';
      m.style.zIndex = on ? '2' : '1';
      const main = m.querySelector('[data-svc-main]');
      if (main) main.style.transform = on ? 'scale(1.09)' : 'scale(1.02)';
    });
    lines.forEach((l) => {
      const on = parseInt(l.getAttribute('data-svc-line'), 10) === i;
      l.style.width = on ? '84px' : '0px';
    });
    if (labelEl) labelEl.textContent = labels[i];
    if (numEl) numEl.textContent = '0' + (i + 1);
  }
  if (!('IntersectionObserver' in window)) { activate(0); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) activate(parseInt(e.target.getAttribute('data-svc-panel'), 10)); });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
  panels.forEach((p) => io.observe(p));
  activate(0);
  cleanup.push(() => io.disconnect());
}

function wireMagnetic(root, cleanup) {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
  const els = root.querySelectorAll('[data-magnetic]');
  els.forEach((el) => {
    function move(e) {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
      el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
    }
    function leave() { el.style.transform = 'translate3d(0,0,0)'; }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    cleanup.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
  });
}

function wireSparkle(refs, props, cleanup) {
  const el = refs.sparkleTextRef.current;
  if (!el || props.sparkleHover === false || prefersReducedMotion()) return;
  function enter() {
    if (el.querySelector('[data-spark]')) return;
    const s = document.createElement('span');
    s.setAttribute('data-spark', '1');
    s.textContent = '✦';
    s.style.cssText = 'position:absolute;left:-6%;top:12%;color:' + (props.accentPink || '#FF3C88') + ';font-size:.5em;pointer-events:none;opacity:0';
    el.appendChild(s);
    const anim = s.animate([
      { transform: 'translate(0,0) rotate(0deg) scale(.6)', opacity: 0 },
      { transform: 'translate(50%,-18%) rotate(90deg) scale(1)', opacity: 1, offset: 0.25 },
      { transform: 'translate(190%,10%) rotate(220deg) scale(1)', opacity: 1, offset: 0.75 },
      { transform: 'translate(240%,0) rotate(320deg) scale(.5)', opacity: 0 }
    ], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' });
    el.style.transition = 'color .4s';
    el.style.color = '#FF3C88';
    anim.onfinish = () => { s.remove(); el.style.color = ''; };
  }
  el.addEventListener('mouseenter', enter);
  cleanup.push(() => el.removeEventListener('mouseenter', enter));
}

function wireLoopSpeed(refs, props) {
  const isMobile = window.innerWidth <= 640;
  const s = (props.loopSpeed || 64) * (isMobile ? 0.4 : 1);
  if (refs.loopARef.current) refs.loopARef.current.style.animationDuration = s + 's';
  if (refs.loopBRef.current) refs.loopBRef.current.style.animationDuration = Math.round(s * 1.22) + 's';
}

function wireLoops(root, cleanup) {
  const loops = root.querySelectorAll('[data-r="loop"],[data-r="loopstrip"]');
  function load(loop) {
    loop.querySelectorAll('img[data-src]').forEach((img) => {
      const show = () => { img.style.opacity = '1'; };
      img.addEventListener('load', show, { once: true });
      img.addEventListener('error', show, { once: true });
      const set = img.getAttribute('data-srcset');
      if (set) img.srcset = set;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
    });
  }
  if (!('IntersectionObserver' in window)) { loops.forEach(load); return; }
  const near = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      load(e.target.firstElementChild);
      near.unobserve(e.target);
    });
  }, { rootMargin: '150% 0px 150% 0px' });
  const visible = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.firstElementChild.setAttribute('data-off', e.isIntersecting ? '0' : '1'));
  }, { rootMargin: '10% 0px 10% 0px' });
  loops.forEach((loop) => {
    const box = loop.parentElement;
    if (loop.querySelector('img[data-src]')) near.observe(box);
    visible.observe(box);
  });
  cleanup.push(() => { near.disconnect(); visible.disconnect(); });
}

// Before / after carousel: native horizontal scroll with snap, arrow buttons, a progress bar
// and click-and-drag for mouse users.
function wireBeforeAfter(root, refs, cleanup) {
  const track = refs.baTrackRef.current; if (!track) return;
  const bar = refs.baBarRef.current;
  const prev = root.querySelector('[data-ba-nav="prev"]');
  const next = root.querySelector('[data-ba-nav="next"]');
  const cards = track.querySelectorAll('[data-ba-card]');
  const smooth = prefersReducedMotion() ? 'auto' : 'smooth';
  function step() {
    if (cards.length < 2) return track.clientWidth;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }
  let ticking = false;
  function update() {
    ticking = false;
    const max = track.scrollWidth - track.clientWidth;
    const x = track.scrollLeft;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, (x + track.clientWidth) / track.scrollWidth) : 1).toFixed(4) + ')';
    if (prev) { prev.disabled = x <= 2; prev.style.opacity = x <= 2 ? '.35' : '1'; }
    if (next) { next.disabled = x >= max - 2; next.style.opacity = x >= max - 2 ? '.35' : '1'; }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  const goPrev = () => track.scrollBy({ left: -step(), behavior: smooth });
  const goNext = () => track.scrollBy({ left: step(), behavior: smooth });

  let dragging = false, moved = false, startX = 0, startLeft = 0, snapTimer = null;
  function down(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
  }
  function move(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 4) {
      moved = true;
      clearTimeout(snapTimer);
      track.style.scrollSnapType = 'none';
      track.style.cursor = 'grabbing';
    }
    if (moved) track.scrollLeft = startLeft - dx;
  }
  function up() {
    if (!dragging) return;
    dragging = false;
    if (!moved) return;
    track.style.cursor = 'grab';
    const s = step() || 1;
    const max = track.scrollWidth - track.clientWidth;
    const delta = track.scrollLeft - startLeft;
    const pos = track.scrollLeft / s;
    // a clear flick moves on to the next card in that direction; a small nudge settles on the nearest
    const index = Math.abs(delta) > 50 ? (delta > 0 ? Math.ceil(pos) : Math.floor(pos)) : Math.round(pos);
    const target = Math.max(0, Math.min(max, index * s));
    track.scrollTo({ left: target, behavior: smooth });
    snapTimer = setTimeout(() => { track.style.scrollSnapType = 'x mandatory'; }, 600);
  }
  track.addEventListener('scroll', onScroll, { passive: true });
  track.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('resize', onScroll, { passive: true });
  if (prev) prev.addEventListener('click', goPrev);
  if (next) next.addEventListener('click', goNext);
  update();
  cleanup.push(() => {
    clearTimeout(snapTimer);
    track.removeEventListener('scroll', onScroll);
    track.removeEventListener('pointerdown', down);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('resize', onScroll);
    if (prev) prev.removeEventListener('click', goPrev);
    if (next) next.removeEventListener('click', goNext);
  });
}

function wireWhats(refs, cleanup) {
  const el = refs.whatsRef.current; if (!el) return;
  if (prefersReducedMotion()) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
  let lastY = window.scrollY || 0, vel = 0, off = 0, rot = 0, raf = null, shown = false, running = false;
  function wake() { if (!running) { running = true; raf = requestAnimationFrame(loop); } }
  function onScroll() {
    const y = window.scrollY || 0;
    vel += (y - lastY);
    lastY = y;
    const want = y > window.innerHeight * 0.55;
    if (want !== shown) {
      shown = want;
      el.style.opacity = want ? '1' : '0';
      el.style.pointerEvents = want ? 'auto' : 'none';
    }
    wake();
  }
  function loop() {
    vel *= 0.86;
    const target = Math.max(-34, Math.min(34, vel * 0.85));
    off += (target - off) * 0.14;
    rot += ((off * 0.5) - rot) * 0.12;
    const base = shown ? 0 : 26;
    if (Math.abs(vel) < 0.02 && Math.abs(off) < 0.02 && Math.abs(rot) < 0.02) {
      vel = 0; off = 0; rot = 0; running = false;
      el.style.transform = 'translate3d(0,' + base + 'px,0)';
      return;
    }
    const squash = 1 - Math.min(0.12, Math.abs(off) / 340);
    el.style.transform = 'translate3d(0,' + (base + off).toFixed(2) + 'px,0) rotate(' + rot.toFixed(2) + 'deg) scaleY(' + (1 / squash).toFixed(3) + ') scaleX(' + squash.toFixed(3) + ')';
    raf = requestAnimationFrame(loop);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  cleanup.push(() => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); });
}

function applyAccentColor(refs, props) {
  const r = refs.rootRef.current; if (!r) return;
  if (props.accentPink) r.style.setProperty('--pink', props.accentPink);
}

// Mounts all scroll/observer/animation behaviours for the page. Call once on mount, call the
// returned function on unmount.
export function initSite(root, refs, props, state) {
  if (!root) return () => {};
  const cleanup = [];
  applyAccentColor(refs, props);
  runLoader(refs, props, cleanup);
  wireReveals(root, cleanup);
  wireScroll(refs, state, cleanup);
  wireRotator(refs, cleanup);
  wireServices(root, refs, cleanup);
  wireMagnetic(root, cleanup);
  wireSparkle(refs, props, cleanup);
  wireLoopSpeed(refs, props);
  wireLoops(root, cleanup);
  wireBeforeAfter(root, refs, cleanup);
  wireWhats(refs, cleanup);
  const stopInteractive = initInteractiveStyles(root);
  cleanup.push(stopInteractive);
  return () => cleanup.forEach((fn) => { try { fn(); } catch (e) { /* noop */ } });
}
