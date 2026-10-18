const EASE = 'cubic-bezier(.22,1,.36,1)';
const KEY = 'cleaning-stars-intro-v2';

/** Finite native timeline. Cleanup restores focus, scroll and inert state even in StrictMode. */
export function runBrandIntro(root, refs, props, onReady) {
  const el = refs.loaderRef.current;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [], timers = [], inert = [];
  let disposed = false, leaving = false, ready = false, locked = false;
  const oldOverflow = document.documentElement.style.overflow;
  const oldFocus = document.activeElement;
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* Storage is optional. */ }
  const forced = new URLSearchParams(window.location.search).get('intro') === '1';
  const skip = !el || props.showLoader === false || reduced.matches || (!forced && (location.hash || window.scrollY > 40));
  const schedule = (fn, delay) => { const id = setTimeout(() => { if (!disposed) fn(); }, delay); timers.push(id); };
  const animate = (target, frames, duration, delay = 0, easing = EASE) => {
    if (!target?.animate) return null;
    const animation = target.animate(frames, { duration, delay, easing, fill: 'both' });
    animations.push(animation);
    return animation;
  };
  function release() {
    if (!locked) return;
    locked = false;
    document.documentElement.style.overflow = oldOverflow;
    inert.forEach(([node, value]) => { node.inert = value; });
    if (el.contains(document.activeElement)) {
      if (oldFocus && oldFocus !== document.body && oldFocus.isConnected) oldFocus.focus({ preventScroll: true });
      else root.querySelector('#main')?.focus({ preventScroll: true });
    }
  }
  function reveal() {
    if (ready || disposed) return;
    ready = true;
    root.dataset.intro = 'complete';
    release();
    onReady();
  }
  function finish(immediate = false) {
    if (leaving || disposed) return;
    leaving = true;
    try { sessionStorage.setItem(KEY, '1'); } catch { /* Storage is optional. */ }
    reveal();
    el.style.pointerEvents = 'none';
    if (immediate || reduced.matches) { el.hidden = true; return; }
    animate(el, [
      { clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)', opacity: 1 },
      { clipPath: 'polygon(0 0,100% 0,100% 0,0 15%)', opacity: 1, offset: .85 },
      { clipPath: 'polygon(0 0,100% 0,100% 0,0 0)', opacity: 0 }
    ], 920);
    animate(el.querySelector('.cs-intro__stage'), [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-85px) scale(.94)' }], 850);
    schedule(() => { el.hidden = true; animations.forEach(a => a.cancel()); }, 940);
  }
  const skipIntro = () => finish(true);
  const keydown = e => {
    if (e.key === 'Escape') { e.preventDefault(); skipIntro(); }
    // The intro has one interactive control; keep Tab inside while the page is inert.
    if (e.key === 'Tab' && !leaving) { e.preventDefault(); el.querySelector('[data-intro-skip]').focus(); }
  };
  function destroy() {
    disposed = true;
    timers.forEach(clearTimeout);
    animations.forEach(a => a.cancel());
    release();
    el?.querySelector('[data-intro-skip]')?.removeEventListener('click', skipIntro);
    document.removeEventListener('keydown', keydown);
    reduced.removeEventListener('change', skipIntro);
    window.removeEventListener('pagehide', skipIntro);
    delete root.dataset.intro;
  }
  if (skip || !el.animate) {
    if (el) el.hidden = true;
    reveal();
    return destroy;
  }
  el.hidden = false;
  el.style.pointerEvents = '';
  root.dataset.intro = 'playing';
  locked = true;
  document.documentElement.style.overflow = 'hidden';
  Array.from(root.children).filter(node => node !== el).forEach(node => { inert.push([node, node.inert]); node.inert = true; });
  el.focus({ preventScroll: true });
  el.querySelector('[data-intro-skip]').addEventListener('click', skipIntro);
  document.addEventListener('keydown', keydown);
  reduced.addEventListener('change', skipIntro);
  window.addEventListener('pagehide', skipIntro);
  // Never leave a visitor behind a loading screen, including failed image decoding.
  schedule(() => finish(true), 5400);

  if (seen && !forced) {
    el.querySelector('.cs-intro__bottom').style.color = '#42634c';
    animate(el.querySelector('.cs-intro__paper'), [{ clipPath: 'circle(150% at 65% 38%)' }], 1);
    animate(el.querySelector('[data-intro-master]'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], 500);
    schedule(() => finish(), 650);
    return destroy;
  }

  animate(el.querySelector('.cs-intro__halo'), [{ opacity: 0, transform: 'scale(.55)' }, { opacity: .85, offset: .4 }, { opacity: 0, transform: 'scale(1.6)' }], 1600);
  animate(el.querySelector('.cs-intro__orbit'), [{ opacity: 0, transform: 'scale(.55) rotate(-32deg)' }, { opacity: .6, offset: .28 }, { opacity: 0, transform: 'scale(1.4) rotate(20deg)' }], 1450);
  animate(el.querySelector('.cs-intro__paper'), [{ clipPath: 'circle(0% at 65% 38%)' }, { clipPath: 'circle(150% at 65% 38%)' }], 1400, 600, 'cubic-bezier(.65,0,.2,1)');
  animate(el.querySelector('.cs-intro__top'), [{ opacity: 0 }, { opacity: .55, offset: .3 }, { opacity: 0 }], 1700);
  animate(el.querySelector('.cs-intro__bottom'), [{ color: '#d9e1d7' }, { color: '#42634c' }], 600, 1250);
  animate(el.querySelector('.cs-intro__rule i'), [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 3250, 0, 'linear');

  const main = el.querySelector('[data-intro-star="0"]');
  animate(main, [
    { opacity: 0, transform: 'translate(-345px,270px) rotate(-38deg) scale(3.8)' },
    { opacity: 1, transform: 'translate(-345px,270px) rotate(-18deg) scale(3.25)', offset: .24 },
    { opacity: 1, transform: 'translate(0,0) rotate(0deg) scale(1)' }
  ], 1700, 70, 'cubic-bezier(.5,0,.15,1)');
  el.querySelectorAll('[data-intro-star]').forEach((star, i) => {
    if (!i) return;
    const direction = i % 2 ? -1 : 1;
    animate(star, [{ opacity: 0, transform: `translate(${direction * (75 + i * 9)}px,${65 - i * 18}px) rotate(${direction * 55}deg) scale(.15)` }, { opacity: 1, transform: 'translate(0,0) rotate(0deg) scale(1)' }], 1000, 1150 + i * 65);
  });
  [['cleaning', 960, 1550], ['stars', 1430, 1200], ['swoosh', 2150, 780]].forEach(([name, delay, duration]) => {
    animate(el.querySelector(`[data-draw="${name}"]`), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], duration, delay, 'cubic-bezier(.35,.05,.3,1)');
  });
  animate(el.querySelector('[data-intro-dot]'), [{ opacity: 0, transform: 'translateY(-18px)' }, { opacity: 1, transform: 'translateY(0)' }], 500, 1920);
  animate(el.querySelector('[data-intro-tagline]'), [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], 650, 2580);
  animate(el.querySelector('[data-intro-master]'), [{ opacity: 0 }, { opacity: 1 }], 200, 2910);
  animate(el.querySelector('[data-intro-shine]'), [{ opacity: 0, transform: 'translateX(0) skewX(-20deg)' }, { opacity: .75, offset: .25 }, { opacity: 0, transform: 'translateX(1850px) skewX(-20deg)' }], 850, 2850);
  schedule(() => finish(), 3450);
  return destroy;
}
