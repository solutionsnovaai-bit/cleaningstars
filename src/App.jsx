import { useRef, useEffect } from 'react';
import { css } from './utils.js';
import { initSite } from './behaviors.js';

export default function App({ accentPink = '#E90063', loopSpeed = 64, showLoader = true, sparkleHover = true } = {}) {
  const rootRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderMarkRef = useRef(null);
  const loaderTxtRef = useRef(null);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const heroBgRef = useRef(null);
  const rotatorRef = useRef(null);
  const rotatorRefSm = useRef(null);
  const svcLabelRef = useRef(null);
  const svcNumRef = useRef(null);
  const styleImgRef = useRef(null);
  const formMsgRef = useRef(null);
  const stickyCtaRef = useRef(null);
  const sparkleTextRef = useRef(null);
  const whatsRef = useRef(null);
  const loopARef = useRef(null);
  const loopBRef = useRef(null);
  const stateRef = useRef({ ctaDismissed: false });

  const props = { accentPink, loopSpeed, showLoader, sparkleHover };
  const year = new Date().getFullYear();

  const gal = [
    { src: 'assets/gallery/g1.jpeg', alt: 'Bedroom prepared for the next guest arrival', tag: 'Airbnb', sub: 'Turnover' },
    { src: 'assets/gallery/g6.jpeg', alt: 'Styled bedroom with velvet headboard and layered textiles', tag: 'Styling', sub: 'Presentation' },
    { src: 'assets/gallery/g4.jpeg', alt: 'Bedroom with fresh linen and folded towels', tag: 'Residential', sub: 'Property care' },
    { src: 'assets/gallery/g7.jpeg', alt: 'Guest bedroom prepared with lamps and artwork', tag: 'Guest ready', sub: 'Final details' },
    { src: 'assets/gallery/g2.jpeg', alt: 'Bed made with towels stacked for arrival', tag: 'Linen', sub: 'Prepared' },
    { src: 'assets/gallery/g5.jpeg', alt: 'Bedroom corner styled with cushions and plant', tag: 'Homes', sub: 'Detail' },
    { src: 'assets/gallery/g1.jpeg', alt: 'Bedroom styled with towels rolled on the bed', tag: 'Short stay', sub: 'Reset' }
  ];
  const galB = gal.slice(3).concat(gal.slice(0, 3));
  const wrap = (list) => list.concat(list);
  const loopA = wrap(gal);
  const loopB = wrap(galB);

  const groupA = [
    { t: 'Airbnb turnovers', d: 'Complete between-guest cleaning to ensure the property is fresh, spotless and ready for the next check-in. Bedrooms, bathrooms, kitchens, living areas, linen changes and finishing details are prepared for a strong guest arrival.' },
    { t: 'Airbnb setups & styling', d: 'Help transform a property into an inviting, guest-ready space from the very beginning — cleaning, preparation, décor, styling and presentation tailored to the property’s location, character and target guests. This can include colour schemes, furnishings, decorative details, amenities and overall presentation.' },
    { t: 'Hotel cleaning', d: 'Reliable cleaning and room preparation for hotels and short-stay accommodation. Includes guest rooms, bathrooms and communal areas with a focus on consistency and presentation.' },
    { t: 'Linen & laundry services', d: 'Laundry support for short-stay accommodation including washing, drying, folding and preparing linen for incoming guests.' },
    { t: 'Holiday-let support', d: 'Cleaning and property support for Airbnb and other short-stay accommodation. Support may include turnovers, linen, restocking, property checks and guest-ready preparation.' },
    { t: 'Property preparation', d: 'Preparing properties for guests, viewings, new tenants or sale. Can involve cleaning, organisation, presentation and final details.' }
  ];
  const groupB = [
    { t: 'Residential cleaning', d: 'Regular or one-off cleaning for homes and apartments, tailored to individual needs. From everyday maintenance to more detailed cleaning, the goal is to keep the home fresh, comfortable and beautifully maintained.' },
    { t: 'Regular cleaning', d: 'Scheduled cleaning designed to keep homes, rentals or businesses consistently clean and maintained. Frequency can be tailored to each property.' },
    { t: 'Deep cleaning', d: 'An intensive clean for properties and areas requiring extra attention. Goes beyond routine maintenance to tackle built-up dirt, neglected areas and hard-to-reach spaces.' },
    { t: 'One-off cleaning', d: 'A thorough clean whenever required without committing to a recurring schedule. Suitable for homes, rentals, businesses, special occasions or simply giving a property a fresh start.' },
    { t: 'Oven & appliance cleaning', d: 'Detailed cleaning for ovens and other household appliances requiring extra attention. Can be offered alongside regular, deep or end-of-tenancy cleaning.' },
    { t: 'Window cleaning', d: 'Professional cleaning for windows and glass surfaces designed to brighten and refresh the property and provide a polished final finish.' }
  ];
  const groupC = [
    { t: 'End of tenancy cleaning', d: 'A thorough clean designed to leave a property looking its best at the end of a tenancy, focusing on kitchens, bathrooms, bedrooms, living areas and commonly overlooked details.' },
    { t: 'After builders cleaning', d: 'Building and renovation work can leave dust, debris and fine particles throughout a property. Detailed after-builders cleaning removes construction residue and prepares the space for use.' },
    { t: 'Property preparation', d: 'Preparing properties for guests, viewings, new tenants or sale. Can involve cleaning, organisation, presentation and final details.' }
  ];
  const groupD = [
    { t: 'Commercial cleaning', d: 'Professional cleaning for offices, workplaces, shops and other commercial spaces. Designed to help maintain clean, hygienic and welcoming environments for employees, customers and visitors.' },
    { t: 'Post-event cleaning', d: 'Cleaning and resetting after an event — rubbish, spills, used areas and general mess — so the space can return to normal condition.' },
    { t: 'Last-minute & emergency cleaning', d: 'Where availability allows, Cleaning Stars will do its best to accommodate short-notice cleaning requests when a property unexpectedly needs to be prepared quickly.' }
  ];
  const faqs = [
    { q: 'What types of properties do you clean?', a: 'Homes and apartments, Airbnb and holiday lets, hotels and short-stay accommodation, offices, shops and other commercial spaces, and properties in transition such as end-of-tenancy or post-renovation.' },
    { q: 'Do you provide Airbnb turnover cleaning?', a: 'Yes. Complete between-guest cleaning covering bedrooms, bathrooms, kitchens, living areas, linen changes and the finishing details that prepare the property for the next check-in.' },
    { q: 'Can you help prepare and style a new holiday let?', a: 'Yes. As well as cleaning and preparation, we can help with décor, styling and presentation tailored to the property’s location, character and target guests — colour schemes, furnishings, decorative details, amenities and overall presentation.' },
    { q: 'Do you offer regular and one-off residential cleaning?', a: 'Both. Regular cleaning can be scheduled at a frequency tailored to the property, and one-off cleans are available whenever a space needs a thorough reset.' },
    { q: 'Do you provide end-of-tenancy cleaning?', a: 'Yes — a thorough clean designed to leave a property looking its best at the end of a tenancy, focusing on kitchens, bathrooms, bedrooms, living areas and commonly overlooked details.' },
    { q: 'Can you clean after building or renovation work?', a: 'Yes. After-builders cleaning removes dust, debris and construction residue throughout the property and prepares the space for use.' },
    { q: 'Do you provide linen and laundry support?', a: 'Yes, for short-stay accommodation — washing, drying, folding and preparing linen for incoming guests.' },
    { q: 'Can you help prepare a property for guests or viewings?', a: 'Yes. Property preparation covers guests, viewings, new tenants or sale, and can involve cleaning, organisation, presentation and final details.' },
    { q: 'Do you offer last-minute cleaning?', a: 'Where availability allows, we will do our best to accommodate short-notice requests when a property unexpectedly needs to be prepared quickly.' }
  ];

  useEffect(() => {
    const refs = {
      rootRef, loaderRef, loaderMarkRef, loaderTxtRef, progressRef, navRef, menuRef,
      heroBgRef, rotatorRef, rotatorRefSm, svcLabelRef, svcNumRef, styleImgRef,
      formMsgRef, stickyCtaRef, sparkleTextRef, whatsRef, loopARef, loopBRef
    };
    return initSite(rootRef.current, refs, props, stateRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeMenuNow() {
    const m = menuRef.current; if (!m) return;
    m.style.opacity = '0'; m.style.visibility = 'hidden'; m.style.transform = 'translateY(-2%)';
  }

  function onNavClick(e) {
    const href = e.currentTarget.getAttribute('href') || '';
    if (href.charAt(0) !== '#') return;
    e.preventDefault();
    closeMenuNow();
    const id = href.slice(1);
    const target = id === 'top' ? null : document.getElementById(id);
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = target ? (target.getBoundingClientRect().top + window.scrollY - 70) : 0;
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }

  function openMenu() {
    const m = menuRef.current; if (!m) return;
    m.style.opacity = '1'; m.style.visibility = 'visible'; m.style.transform = 'translateY(0)';
  }

  function closeMenu() { closeMenuNow(); }

  function toggleItem(e) {
    const btn = e.currentTarget;
    const body = btn.parentElement.querySelector('[data-body]');
    const icon = btn.lastElementChild;
    if (!body) return;
    const open = body.style.maxHeight && body.style.maxHeight !== '0px';
    if (open) {
      body.style.maxHeight = '0px';
      if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
      body.style.maxHeight = body.scrollHeight + 'px';
      if (icon) icon.style.transform = 'rotate(45deg)';
    }
  }

  function pickTag(e) {
    const src = e.currentTarget.getAttribute('data-tag');
    const img = styleImgRef.current;
    if (!img || !src) return;
    img.style.opacity = '0';
    img.style.transform = 'scale(1.03)';
    setTimeout(() => {
      img.src = src;
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 260);
    const sibs = e.currentTarget.parentElement.children;
    for (let i = 0; i < sibs.length; i++) {
      sibs[i].style.borderColor = 'rgba(17,21,18,.18)';
      sibs[i].style.color = '#111512';
    }
    e.currentTarget.style.borderColor = accentPink || '#E90063';
    e.currentTarget.style.color = accentPink || '#E90063';
  }

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const msg = formMsgRef.current;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    let ok = true;
    [name, email].forEach((f) => {
      if (!f) return;
      const valid = f.value.trim().length > 0 && (f.type !== 'email' || /.+@.+\..+/.test(f.value));
      f.style.borderBottomColor = valid ? 'rgba(248,246,240,.28)' : '#FF3C88';
      if (!valid) ok = false;
    });
    if (!msg) return;
    if (!ok) {
      msg.textContent = 'Please add your name and a valid email address.';
      msg.style.opacity = '1';
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; btn.textContent = 'Sending…'; }
    msg.textContent = '';
    setTimeout(() => {
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.textContent = 'Request my quote →'; }
      form.reset();
      msg.textContent = 'Thanks — your enquiry has been received.';
      msg.style.opacity = '1';
    }, 700);
  }

  function dismissCta() {
    stateRef.current.ctaDismissed = true;
    const c = stickyCtaRef.current;
    if (c) { c.style.opacity = '0'; c.style.transform = 'translateY(120%)'; c.style.pointerEvents = 'none'; }
  }

  return (
<div ref={rootRef} style={css(`--forest:#0F7A3D;--forest-deep:#0B5C2E;--forest-mid:#12873F;--leaf:#0F7A3D;--leaf-deep:#0B5C2E;--pink:#E90063;--pink-lt:#FF3C88;--ivory:#F8F6F0;--paper:#F4F1EA;--cream:#EEE9DF;--ink:#111512;--muted:#696E69;--gold:#CBA55C;background:var(--ivory);color:var(--ink);position:relative;width:100%;overflow-x:clip`)}>

  <a href="#main" style={css(`position:absolute;left:-9999px;top:0;z-index:10000;background:var(--forest);color:#fff;padding:14px 20px;font-size:13px;letter-spacing:.16em;text-transform:uppercase`)} data-focus="left:12px;top:12px">Skip to content</a>

  {/* LOADER */}
  <div ref={loaderRef} style={css(`position:fixed;inset:0;z-index:9999;background:var(--ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;transition:opacity .8s cubic-bezier(.16,1,.3,1),visibility .8s`)}>
    <img src="assets/brand/logo-primary.png" alt="" style={css(`width:min(260px,52vw);height:auto;opacity:0;transition:opacity .8s ease .1s`)} ref={loaderMarkRef} />
    <div style={css(`width:min(240px,46vw);height:1px;background:rgba(10,61,28,.14);position:relative;overflow:hidden`)}>
      <div style={css(`position:absolute;inset:0;background:var(--pink);transform-origin:left;animation:csSweep 1.1s cubic-bezier(.65,0,.35,1) forwards .15s`)}></div>
    </div>
    <div style={css(`display:flex;gap:14px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:var(--muted);opacity:0;transition:opacity .7s ease .45s`)} ref={loaderTxtRef}>
      <span>London</span><span style={css(`color:var(--pink)`)}>✦</span><span>Property Care</span>
    </div>
  </div>

  {/* SCROLL PROGRESS */}
  <div style={css(`position:fixed;top:0;left:0;right:0;height:2px;z-index:900;background:transparent;pointer-events:none`)}>
    <div ref={progressRef} style={css(`height:100%;width:0%;background:linear-gradient(90deg,var(--forest-mid),var(--pink));transform-origin:left`)}></div>
  </div>

  {/* NAV */}
  <header ref={navRef} style={css(`position:fixed;top:0;left:0;right:0;z-index:800;padding:16px clamp(16px,4vw,48px);display:grid;grid-template-columns:auto 1fr auto;align-items:center;column-gap:clamp(16px,3vw,48px);transition:background .5s cubic-bezier(.16,1,.3,1),backdrop-filter .5s,box-shadow .5s,padding .5s`)}>
    <a href="#top" onClick={onNavClick} style={css(`display:flex;align-items:center;transition:transform .4s cubic-bezier(.16,1,.3,1)`)} data-hover="transform:translateY(-2px)">
      <img src="assets/brand/logo-primary.png" alt="Cleaning Stars — we make it sparkle" style={css(`height:clamp(34px,3.4vw,46px);width:auto;display:block`)} />
    </a>
    <nav data-r="navlinks" aria-label="Primary" style={css(`display:flex;align-items:center;justify-content:center;gap:clamp(12px,1.9vw,30px)`)}>
      <a href="#services" onClick={onNavClick} style={css(`font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:500;color:var(--ink);padding:8px 0;white-space:nowrap;transition:color .35s`)} data-hover="color:#E90063">Services</a>
      <a href="#holiday" onClick={onNavClick} style={css(`font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:500;color:var(--ink);padding:8px 0;white-space:nowrap;transition:color .35s`)} data-hover="color:#E90063">Airbnb &amp; Holiday Lets</a>
      <a href="#directory" onClick={onNavClick} style={css(`font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:500;color:var(--ink);padding:8px 0;white-space:nowrap;transition:color .35s`)} data-hover="color:#E90063">Residential</a>
      <a href="#types" onClick={onNavClick} style={css(`font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:500;color:var(--ink);padding:8px 0;white-space:nowrap;transition:color .35s`)} data-hover="color:#E90063">Commercial</a>
      <a href="#standard" onClick={onNavClick} style={css(`font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;font-weight:500;color:var(--ink);padding:8px 0;white-space:nowrap;transition:color .35s`)} data-hover="color:#E90063">Why Us</a>
    </nav>
    <div style={css(`display:flex;align-items:center;justify-content:flex-end;gap:12px`)}>
      <a data-r="navcta" href="#contact" onClick={onNavClick} data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:10px;background:var(--forest);color:#fff;padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;white-space:nowrap;min-height:44px;transition:background .4s,color .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#E90063;color:#fff">Request a quote <span style={css(`display:inline-block`)}>↗</span></a>
      <button data-r="burger" type="button" aria-label="Open menu" onClick={openMenu} style={css(`display:none;align-items:center;gap:10px;background:var(--forest);color:#fff;border:0;padding:13px 18px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;cursor:pointer`)}>Menu</button>
    </div>
  </header>

  {/* MOBILE MENU */}
  <div ref={menuRef} style={css(`position:fixed;inset:0;z-index:850;background:var(--forest-deep);color:var(--ivory);padding:24px clamp(20px,6vw,48px) 40px;display:flex;flex-direction:column;justify-content:space-between;opacity:0;visibility:hidden;transform:translateY(-2%);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1),visibility .6s`)}>
    <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
      <span style={css(`font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Cleaning Stars</span>
      <button type="button" aria-label="Close menu" onClick={closeMenu} style={css(`background:transparent;border:1px solid rgba(248,246,240,.28);color:var(--ivory);border-radius:999px;padding:12px 18px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;min-height:44px;cursor:pointer`)}>Close</button>
    </div>
    <nav aria-label="Mobile" style={css(`display:flex;flex-direction:column;gap:2px;padding:32px 0`)}>
      <a href="#services" onClick={onNavClick} style={css(`display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid rgba(248,246,240,.12);color:var(--ivory)`)}><span style={css(`font-size:10px;letter-spacing:.2em;color:var(--pink-lt)`)}>01</span><span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(34px,10vw,58px);line-height:1.05`)}>Services</span></a>
      <a href="#holiday" onClick={onNavClick} style={css(`display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid rgba(248,246,240,.12);color:var(--ivory)`)}><span style={css(`font-size:10px;letter-spacing:.2em;color:var(--pink-lt)`)}>02</span><span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(34px,10vw,58px);line-height:1.05`)}>Holiday Lets</span></a>
      <a href="#directory" onClick={onNavClick} style={css(`display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid rgba(248,246,240,.12);color:var(--ivory)`)}><span style={css(`font-size:10px;letter-spacing:.2em;color:var(--pink-lt)`)}>03</span><span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(34px,10vw,58px);line-height:1.05`)}>Residential</span></a>
      <a href="#types" onClick={onNavClick} style={css(`display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid rgba(248,246,240,.12);color:var(--ivory)`)}><span style={css(`font-size:10px;letter-spacing:.2em;color:var(--pink-lt)`)}>04</span><span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(34px,10vw,58px);line-height:1.05`)}>Commercial</span></a>
      <a href="#contact" onClick={onNavClick} style={css(`display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid rgba(248,246,240,.12);color:var(--ivory)`)}><span style={css(`font-size:10px;letter-spacing:.2em;color:var(--pink-lt)`)}>05</span><span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(34px,10vw,58px);line-height:1.05`)}>Contact</span></a>
    </nav>
    <div style={css(`display:flex;flex-direction:column;gap:20px`)}>
      <a href="#contact" onClick={onNavClick} style={css(`display:inline-flex;align-items:center;justify-content:space-between;background:var(--pink);color:#fff;padding:20px 24px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600`)}>Request a quote <span>↗</span></a>
      <div style={css(`display:flex;justify-content:space-between;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}><span>London, UK</span><span>We make it sparkle</span></div>
    </div>
  </div>

  <main id="main">
  {/* HERO */}
  <section id="top" style={css(`position:relative;min-height:100svh;display:flex;flex-direction:column;background:var(--paper);overflow:hidden`)}>
    <img data-r="only-sm" src="assets/brand/logo-flock.jpeg" alt="Cleaning Stars — we make it sparkle" style={css(`width:100%;aspect-ratio:1562/1007;height:auto;object-fit:cover;display:block`)} />
    <div data-r="hide-sm" style={css(`position:absolute;inset:0`)}>
    <img ref={heroBgRef} data-r="hide-sm" src="assets/hero/hero-desktop.png" alt="Cleaning Stars — we make it sparkle" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right center;display:block;will-change:transform`)} />
    <div data-r="hide-sm" aria-hidden="true" style={css(`position:absolute;inset:0;background:linear-gradient(90deg,rgba(248,246,240,.82) 0%,rgba(248,246,240,.55) 28%,rgba(248,246,240,0) 50%);pointer-events:none`)}></div>
    </div>
    <div style={css(`position:relative;flex:1;display:flex;align-items:flex-end;width:100%;max-width:1560px;margin:0 auto;padding:clamp(40px,10vh,190px) clamp(20px,5vw,72px) clamp(40px,6vh,72px)`)} data-r="hero-outer">
    <div style={css(`width:100%;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:center;gap:clamp(24px,4vw,56px)`)} data-r="hero">
      <div>
        <div data-reveal="1" style={css(`display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);opacity:0;transform:translateY(18px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)`)}>
          <span>Professional cleaning &amp; property services</span>
          <span style={css(`width:26px;height:1px;background:var(--pink)`)}></span>
          <span>London, UK</span>
        </div>
        <h1 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(3.1rem,8.2vw,8.4rem);line-height:.9;letter-spacing:-.025em;margin:clamp(20px,3vw,34px) 0 0;text-wrap:balance`)}>
          <span data-reveal="1" data-delay="60" style={css(`display:block;overflow:hidden`)}><span data-mask="1" style={css(`display:block;opacity:0;transform:translateY(102%);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.05s cubic-bezier(.16,1,.3,1);color:var(--pink)`)}>Beautifully</span></span>
          <span data-reveal="1" data-delay="150" style={css(`display:block;overflow:hidden`)}><span data-mask="1" style={css(`display:block;opacity:0;transform:translateY(102%);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.05s cubic-bezier(.16,1,.3,1)`)}>prepared. <em style={css(`font-style:italic;color:#0F7A3D`)}>Properly</em></span></span>
          <span data-reveal="1" data-delay="240" style={css(`display:block;overflow:hidden`)}><span data-mask="1" style={css(`display:block;opacity:0;transform:translateY(102%);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.05s cubic-bezier(.16,1,.3,1)`)}>cared for.</span></span>
        </h1>
        <p data-reveal="1" data-delay="360" style={css(`max-width:46ch;margin:clamp(22px,2.6vw,32px) 0 0;font-size:clamp(15px,1.15vw,18px);line-height:1.62;color:#3A423C;opacity:0;transform:translateY(18px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)`)}>
          From holiday rentals and hotels to homes and commercial properties, Cleaning Stars provides reliable, professional cleaning and property services tailored to each space.
        </p>
        <div data-reveal="1" data-delay="460" style={css(`display:flex;flex-wrap:wrap;gap:14px;margin-top:clamp(26px,3vw,38px);opacity:0;transform:translateY(18px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)`)}>
          <a href="#contact" onClick={onNavClick} data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:14px;background:var(--pink);color:#fff;padding:19px 30px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:background .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#082E19;color:#fff">Request a quote <span>↗</span></a>
          <a href="#services" onClick={onNavClick} style={css(`display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(17,21,18,.2);color:var(--ink);padding:19px 28px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:border-color .4s,color .4s`)} data-hover="border-color:#082E19;color:#082E19">Explore services ↓</a>
        </div>
        <div data-reveal="1" data-delay="560" style={css(`margin-top:clamp(34px,4.5vw,58px);display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);border-top:1px solid rgba(17,21,18,.1);padding-top:18px;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1)`)}>
          <span>Airbnb</span><span style={css(`color:var(--pink)`)}>•</span><span>Homes</span><span style={css(`color:var(--pink)`)}>•</span><span>Hotels</span><span style={css(`color:var(--pink)`)}>•</span><span>Commercial</span><span style={css(`color:var(--pink)`)}>•</span><span>Holiday lets</span>
        </div>
      </div>

      <div data-r="hide-sm" style={css(`position:relative;display:flex;align-items:flex-end;justify-content:flex-end;min-height:min(40vh,420px)`)}>
        <div style={css(`position:absolute;right:0;bottom:6px;background:rgba(255,255,255,.6);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.75);border-radius:18px;padding:15px 20px;box-shadow:0 20px 50px rgba(6,31,18,.1)`)}>
          <div style={css(`font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--pink);font-weight:600`)}>London, UK</div>
          <div style={css(`margin-top:7px;font-size:12.5px;letter-spacing:.06em;color:#3A423C`)}>Cleaning • Turnovers • Property prep</div>
        </div>
      </div>
      <div data-r="only-sm" style={css(`position:relative;background:var(--forest);color:var(--ivory);border-radius:18px;padding:24px 22px;overflow:hidden;margin-top:8px`)}>
        <span aria-hidden="true" style={css(`position:absolute;right:-10px;top:-18px;font-size:64px;color:rgba(255,60,136,.28);font-family:'Instrument Serif',serif`)}>✦</span>
        <div style={css(`font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--pink-lt);font-weight:600`)}>London, UK</div>
        <div style={css(`margin-top:8px;font-size:13.5px;letter-spacing:.04em;color:rgba(248,246,240,.85)`)}>Cleaning • Turnovers • Property prep</div>
        <div style={css(`margin-top:16px;padding-top:16px;border-top:1px solid rgba(248,246,240,.18);display:flex;align-items:baseline;gap:10px;font-family:'Instrument Serif',serif;font-size:20px`)}>
          <span style={css(`font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Made ready for</span>
          <span style={css(`display:inline-block;overflow:hidden;height:1.25em`)}><span ref={rotatorRefSm} style={css(`display:block;color:var(--pink-lt);font-style:italic`)}>guests</span></span>
        </div>
      </div>
    </div>
    </div>

    <div data-r="hide-sm" style={css(`position:absolute;left:clamp(20px,5vw,72px);bottom:clamp(16px,3vh,30px);display:flex;align-items:baseline;gap:12px;font-family:'Instrument Serif',serif;font-size:clamp(17px,2vw,26px);color:#3A423C`)}>
      <span style={css(`font-family:'Manrope',sans-serif;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted)`)}>Made ready for</span>
      <span style={css(`display:inline-block;overflow:hidden;height:1.25em`)}><span ref={rotatorRef} style={css(`display:block;color:var(--pink);font-style:italic`)}>guests</span></span>
    </div>
  </section>

  {/* BRAND STRIP */}
  <section aria-hidden="true" style={css(`background:var(--forest);color:var(--ivory);padding:clamp(16px,2vw,24px) 0;overflow:hidden`)}>
    <div data-r="loopstrip" ref={stripRef} style={css(`display:flex;width:max-content;animation:csLoopL 42s linear infinite;will-change:transform`)}>
      <div style={css(`display:flex;align-items:center;gap:clamp(24px,3vw,48px);padding-right:clamp(24px,3vw,48px);font-family:'Instrument Serif',serif;font-size:clamp(22px,3.2vw,44px);letter-spacing:-.01em;white-space:nowrap`)}>
        <span>Airbnb turnovers</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Residential</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Hotel cleaning</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Property preparation</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Commercial</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Holiday lets</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span>
      </div>
      <div style={css(`display:flex;align-items:center;gap:clamp(24px,3vw,48px);padding-right:clamp(24px,3vw,48px);font-family:'Instrument Serif',serif;font-size:clamp(22px,3.2vw,44px);letter-spacing:-.01em;white-space:nowrap`)}>
        <span>Airbnb turnovers</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Residential</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Hotel cleaning</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Property preparation</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Commercial</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span><span>Holiday lets</span><span style={css(`color:var(--pink-lt);font-size:.6em`)}>✦</span>
      </div>
    </div>
  </section>

  {/* POSITIONING */}
  <section style={css(`position:relative;background:var(--paper);padding:clamp(80px,11vw,170px) clamp(20px,5vw,72px);overflow:hidden;background-image:radial-gradient(rgba(233,0,99,.2) 2px,transparent 2px),radial-gradient(rgba(8,46,25,.14) 2px,transparent 2px);background-size:30px 30px;background-position:0 0,15px 15px`)}>
    <div ref={sparkleRef} aria-hidden="true" style={css(`position:absolute;right:-4%;top:14%;width:min(340px,40vw);height:min(340px,40vw);opacity:.07;animation:csFloat 11s ease-in-out infinite;pointer-events:none;background:conic-gradient(from 45deg,transparent 0 8%,var(--pink) 12%,transparent 20% 33%,var(--pink) 37%,transparent 45% 58%,var(--pink) 62%,transparent 70% 83%,var(--pink) 87%,transparent 95%);mask-image:radial-gradient(circle,#000 62%,transparent 70%);-webkit-mask-image:radial-gradient(circle,#000 62%,transparent 70%)`)}></div>
    <div style={css(`max-width:1440px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.78fr);gap:clamp(32px,6vw,90px);align-items:end`)} data-r="two">
      <div>
        <div data-reveal="1" style={css(`font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--pink);font-weight:600;opacity:0;transform:translateY(16px);transition:all .9s cubic-bezier(.16,1,.3,1)`)}>More than cleaning</div>
        <h2 data-reveal="1" data-delay="90" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.6rem,6.4vw,6.4rem);line-height:.95;letter-spacing:-.025em;margin:26px 0 0;opacity:0;transform:translateY(26px);transition:all 1s cubic-bezier(.16,1,.3,1)`)}>
          Every property has<br />a next moment.<br /><em style={css(`font-style:italic;color:var(--pink)`)}>Make sure it's ready for it.</em>
        </h2>
      </div>
      <div>
        <p data-reveal="1" data-delay="180" style={css(`font-size:clamp(15px,1.1vw,17.5px);line-height:1.7;color:#3A423C;max-width:44ch;margin:0;opacity:0;transform:translateY(22px);transition:all .95s cubic-bezier(.16,1,.3,1)`)}>
          From guest changeovers and home cleaning to commercial spaces, hotel preparation and complete property setup, Cleaning Stars helps keep spaces beautifully maintained, professionally presented and ready for whoever walks through the door next.
        </p>
        <div style={css(`display:flex;flex-wrap:wrap;gap:12px 30px;margin-top:clamp(34px,5vw,60px);font-family:'Instrument Serif',serif;font-size:clamp(20px,2.6vw,34px);color:var(--forest-mid)`)}>
          <span data-reveal="1" data-delay="240" style={css(`opacity:0;transform:translateY(14px);transition:all .7s cubic-bezier(.16,1,.3,1)`)}>Clean.</span>
          <span data-reveal="1" data-delay="340" style={css(`opacity:0;transform:translateY(14px);transition:all .7s cubic-bezier(.16,1,.3,1)`)}>Prepare.</span>
          <span data-reveal="1" data-delay="440" style={css(`opacity:0;transform:translateY(14px);transition:all .7s cubic-bezier(.16,1,.3,1)`)}>Style.</span>
          <span data-reveal="1" data-delay="540" style={css(`opacity:0;transform:translateY(14px);transition:all .7s cubic-bezier(.16,1,.3,1)`)}>Reset.</span>
          <span data-reveal="1" data-delay="640" style={css(`opacity:0;transform:translateY(14px);transition:all .7s cubic-bezier(.16,1,.3,1);color:var(--pink)`)}>Sparkle.</span>
        </div>
      </div>
    </div>
  </section>

  {/* SIGNATURE SERVICES (sticky) */}
  <section id="services" style={css(`background:var(--ivory);padding:clamp(70px,9vw,130px) clamp(20px,5vw,72px) clamp(60px,8vw,120px)`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <div style={css(`display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px;border-bottom:1px solid rgba(17,21,18,.12);padding-bottom:26px`)}>
        <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.2rem,5vw,4.6rem);line-height:.98;letter-spacing:-.02em;margin:0;opacity:0;transform:translateY(20px);transition:all .9s cubic-bezier(.16,1,.3,1)`)}>Signature services</h2>
        <span style={css(`font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted)`)}>Six ways we prepare a space</span>
      </div>

      <div data-r="svcgrid" style={css(`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.02fr);gap:clamp(24px,5vw,80px);margin-top:clamp(30px,4vw,60px);align-items:start`)}>
        <div>
          <div data-svc-panel="0" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0;border-bottom:1px solid rgba(17,21,18,.08)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>01</span><span data-svc-line="0" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>Airbnb turnovers</h3>
            <img data-r="only-sm" src="assets/gallery/g1.jpeg" alt="Bedroom prepared for the next guest arrival" loading="lazy" style={css(`width:100%;height:56vw;max-height:420px;object-fit:cover;border-radius:4px;margin:22px 0 0`)} />
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>Complete between-guest cleaning to ensure your property is fresh, spotless and ready for the next check-in.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>We take care of bedrooms, bathrooms, kitchens, living areas, linen changes and the finishing touches that create a strong first impression for every guest.</p>
          </div>
          <div data-svc-panel="1" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0;border-bottom:1px solid rgba(17,21,18,.08)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>02</span><span data-svc-line="1" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>Airbnb setups &amp; styling</h3>
            <img data-r="only-sm" src="assets/gallery/g6.jpeg" alt="Styled bedroom with layered textiles and artwork" loading="lazy" style={css(`width:100%;height:56vw;max-height:420px;object-fit:cover;border-radius:4px;margin:22px 0 0`)} />
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>We help transform a property into an inviting, guest-ready space from the very beginning.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>As well as cleaning and preparing the property, we can help with décor, styling and presentation tailored to its location, character and target guests — from colour schemes and furnishings to amenities and final presentation.</p>
          </div>
          <div data-svc-panel="2" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0;border-bottom:1px solid rgba(17,21,18,.08)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>03</span><span data-svc-line="2" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>Residential cleaning</h3>
            <img data-r="only-sm" src="assets/gallery/g4.jpeg" alt="Calm bedroom in a London home" loading="lazy" style={css(`width:100%;height:56vw;max-height:420px;object-fit:cover;border-radius:4px;margin:22px 0 0`)} />
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>Regular or one-off cleaning for homes and apartments, tailored to individual requirements.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>From everyday maintenance to more detailed cleaning, the goal is to keep the home fresh, comfortable and beautifully maintained.</p>
          </div>
          <div data-svc-panel="3" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0;border-bottom:1px solid rgba(17,21,18,.08)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>04</span><span data-svc-line="3" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>Commercial cleaning</h3>
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>Professional cleaning for offices, workplaces, shops and other commercial spaces.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>Designed to help maintain clean, hygienic and welcoming environments for employees, customers and visitors.</p>
          </div>
          <div data-svc-panel="4" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0;border-bottom:1px solid rgba(17,21,18,.08)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>05</span><span data-svc-line="4" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>Hotel cleaning</h3>
            <img data-r="only-sm" src="assets/gallery/g1.jpeg" alt="Guest room prepared with rolled towels on the bed" loading="lazy" style={css(`width:100%;height:56vw;max-height:420px;object-fit:cover;border-radius:4px;margin:22px 0 0`)} />
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>Reliable cleaning and room preparation for hotels and short-stay accommodation.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>Includes guest rooms, bathrooms and communal areas, with a focus on consistency and presentation.</p>
          </div>
          <div data-svc-panel="5" style={css(`min-height:min(74vh,640px);display:flex;flex-direction:column;justify-content:center;padding:40px 0`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}><span style={css(`font-size:11px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>06</span><span data-svc-line="5" style={css(`height:1px;width:0;background:var(--pink);transition:width .8s cubic-bezier(.16,1,.3,1)`)}></span></div>
            <h3 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,3.8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:18px 0 0`)}>After builders cleaning</h3>
            <p style={css(`max-width:44ch;margin:20px 0 0;font-size:16px;line-height:1.66;color:#3A423C`)}>Building and renovation work can leave dust, debris and fine particles throughout a property.</p>
            <p style={css(`max-width:44ch;margin:14px 0 0;font-size:15px;line-height:1.66;color:var(--muted)`)}>Detailed after-builders cleaning removes construction residue and prepares the space for use.</p>
          </div>
        </div>

        <div data-r="hide-sm" style={css(`position:sticky;top:14vh;height:72vh;overflow:hidden;background:var(--forest-deep);border-radius:2px`)}>
          <div data-svc-media="0" style={css(`position:absolute;inset:0;opacity:1;transition:opacity .9s cubic-bezier(.16,1,.3,1)`)}>
            <img data-svc-main="1" src="assets/gallery/g1.jpeg" alt="Bedroom prepared for the next guest arrival" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform 6s cubic-bezier(.22,.61,.36,1)`)} />
            <figure style={css(`position:absolute;left:22px;bottom:76px;width:31%;margin:0;aspect-ratio:3/4;overflow:hidden;box-shadow:0 18px 44px rgba(6,31,18,.34);border:5px solid var(--ivory)`)}>
              <img src="assets/gallery/g2.jpeg" alt="Fresh linen and folded towels set out for arrival" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block`)} />
            </figure>
          </div>
          <div data-svc-media="1" style={css(`position:absolute;inset:0;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1)`)}>
            <img data-svc-main="1" src="assets/gallery/g6.jpeg" alt="Styled bedroom with velvet headboard and layered textiles" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform 6s cubic-bezier(.22,.61,.36,1)`)} />
            <figure style={css(`position:absolute;left:22px;bottom:76px;width:31%;margin:0;aspect-ratio:3/4;overflow:hidden;box-shadow:0 18px 44px rgba(6,31,18,.34);border:5px solid var(--ivory)`)}>
              <img src="assets/gallery/g7.jpeg" alt="Bedside styling with lamps, flowers and objects" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block`)} />
            </figure>
          </div>
          <div data-svc-media="2" style={css(`position:absolute;inset:0;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1)`)}>
            <img data-svc-main="1" src="assets/gallery/g4.jpeg" alt="Calm bedroom in a London home" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform 6s cubic-bezier(.22,.61,.36,1)`)} />
            <figure style={css(`position:absolute;left:22px;bottom:76px;width:31%;margin:0;aspect-ratio:3/4;overflow:hidden;box-shadow:0 18px 44px rgba(6,31,18,.34);border:5px solid var(--ivory)`)}>
              <img src="assets/gallery/g5.jpeg" alt="Bedroom corner with fresh bedding and bedside plant" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block`)} />
            </figure>
          </div>
          <div data-svc-media="3" style={css(`position:absolute;inset:0;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1);background:var(--leaf);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(24px,3vw,44px);color:var(--ivory)`)}>
            <span style={css(`font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>Commercial</span>
            <div>
              <div style={css(`font-family:'Instrument Serif',serif;font-size:clamp(2rem,3.4vw,3.4rem);line-height:1.02;letter-spacing:-.02em`)}>Offices, workplaces,<br />shops and<br /><em style={css(`color:var(--pink-lt)`)}>everyday spaces.</em></div>
              <div style={css(`margin-top:22px;height:1px;width:110px;background:rgba(248,246,240,.3)`)}></div>
            </div>
          </div>
          <div data-svc-media="4" style={css(`position:absolute;inset:0;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1)`)}>
            <img data-svc-main="1" src="assets/gallery/g1.jpeg" alt="Guest room prepared with rolled towels on the bed" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.02);transition:transform 6s cubic-bezier(.22,.61,.36,1)`)} />
            <figure style={css(`position:absolute;left:22px;bottom:76px;width:31%;margin:0;aspect-ratio:3/4;overflow:hidden;box-shadow:0 18px 44px rgba(6,31,18,.34);border:5px solid var(--ivory)`)}>
              <img src="assets/gallery/g8.jpeg" alt="Room made up with towels and layered throws" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block`)} />
            </figure>
          </div>
          <div data-svc-media="5" style={css(`position:absolute;inset:0;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1);background:var(--leaf-deep);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(24px,3vw,44px);color:var(--ivory)`)}>
            <span style={css(`font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>After builders</span>
            <div>
              <div style={css(`font-family:'Instrument Serif',serif;font-size:clamp(2rem,3.4vw,3.4rem);line-height:1.02;letter-spacing:-.02em`)}>Dust out.<br /><em style={css(`color:var(--pink-lt)`)}>Finished space in.</em></div>
              <div style={css(`margin-top:22px;height:1px;width:110px;background:rgba(248,246,240,.3)`)}></div>
            </div>
          </div>
          <div style={css(`position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;align-items:flex-end;padding:20px 22px;color:#fff;font-size:11px;letter-spacing:.24em;text-transform:uppercase;background:linear-gradient(0deg,rgba(6,31,18,.55),transparent);pointer-events:none`)}>
            <span ref={svcLabelRef}>Airbnb turnovers</span>
            <span><span ref={svcNumRef}>01</span> / 06</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* PHOTOGRAPHY */}
  <section style={css(`background:var(--cream);padding:clamp(70px,9vw,130px) 0;overflow:hidden`)}>
    <div style={css(`max-width:1440px;margin:0 auto;padding:0 clamp(20px,5vw,72px);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px`)}>
      <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.4rem,5.6vw,5.4rem);line-height:.95;letter-spacing:-.025em;margin:0;opacity:0;transform:translateY(22px);transition:all .95s cubic-bezier(.16,1,.3,1)`)}>Real spaces.<br /><em style={css(`font-style:italic;color:var(--pink)`)}>Real details.</em></h2>
      <p style={css(`max-width:34ch;margin:0;font-size:15px;line-height:1.65;color:#3A423C`)}>Properties prepared by Cleaning Stars — linen, presentation and the finishing touches guests notice first.</p>
    </div>

    <div data-cursor="Drag" style={css(`margin-top:clamp(34px,4vw,60px);overflow:hidden`)}>
      <div data-r="loop" ref={loopARef} style={css(`display:flex;gap:16px;width:max-content;height:clamp(280px,34vw,460px);animation:csLoopL 64s linear infinite;will-change:transform`)}>
        {loopA.map((item, $index) => (
          <figure key={$index} style={css(`flex:0 0 auto;height:100%;margin:0;position:relative;border-radius:3px;overflow:hidden;background:#ddd`)}>
            <img src={item.src} alt={item.alt} loading="lazy" style={css(`height:100%;width:auto;display:block;object-fit:cover`)} />
            <figcaption style={css(`position:absolute;left:12px;bottom:12px;color:#fff;font-size:10px;letter-spacing:.22em;text-transform:uppercase;text-shadow:0 2px 12px rgba(0,0,0,.5)`)}>{item.tag}<br /><span style={css(`opacity:.75`)}>{item.sub}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
    <div data-cursor="Drag" style={css(`margin-top:16px;overflow:hidden`)}>
      <div data-r="loop" ref={loopBRef} style={css(`display:flex;gap:16px;width:max-content;height:clamp(180px,22vw,300px);animation:csLoopR 78s linear infinite;will-change:transform`)}>
        {loopB.map((item, $index) => (
          <figure key={$index} style={css(`flex:0 0 auto;height:100%;margin:0;position:relative;border-radius:3px;overflow:hidden;background:#ddd`)}>
            <img src={item.src} alt={item.alt} loading="lazy" style={css(`height:100%;width:auto;display:block;object-fit:cover`)} />
          </figure>
        ))}
      </div>
    </div>
  </section>

  {/* HOLIDAY LETS */}
  <section id="holiday" style={css(`background:var(--forest);color:var(--ivory);padding:clamp(80px,11vw,170px) clamp(20px,5vw,72px);position:relative;overflow:hidden`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <div style={css(`font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Airbnb &amp; holiday lets</div>
      <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.8rem,8vw,8rem);line-height:.9;letter-spacing:-.03em;margin:26px 0 0;opacity:0;transform:translateY(28px);transition:all 1s cubic-bezier(.16,1,.3,1)`)}>
        Check-out.<br /><em style={css(`font-style:italic;color:var(--pink-lt)`)}>Reset.</em><br />Check-in.
      </h2>
      <div style={css(`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:clamp(28px,5vw,80px);margin-top:clamp(40px,5vw,70px);align-items:end`)} data-r="two">
        <p style={css(`font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,3vw,2.6rem);line-height:1.12;margin:0;letter-spacing:-.01em`)}>Every turnover is a first impression.</p>
        <p style={css(`margin:0;font-size:16px;line-height:1.68;color:rgba(248,246,240,.75);max-width:46ch`)}>From the final check-out to the next arrival, we can help prepare short-stay properties through cleaning, linen, presentation, restocking and guest-ready finishing touches.</p>
      </div>

      <div data-r="flow" style={css(`position:relative;display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-top:clamp(50px,7vw,100px);padding-top:34px`)}>
        <div data-r="flowline" aria-hidden="true" style={css(`position:absolute;top:34px;left:0;right:0;height:1px;background:rgba(248,246,240,.18)`)}></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1)`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:var(--pink)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>01</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Check-out</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .08s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:rgba(248,246,240,.45)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>02</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Cleaning</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .16s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:rgba(248,246,240,.45)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>03</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Laundry</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .24s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:rgba(248,246,240,.45)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>04</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Restocking</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .32s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:rgba(248,246,240,.45)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>05</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Property check</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .4s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:rgba(248,246,240,.45)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:rgba(248,246,240,.45)`)}>06</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600`)}>Styling</div></div>
        <div data-flow-step="1" style={css(`position:relative;flex:1;opacity:0;transform:translateY(16px);transition:all .8s cubic-bezier(.16,1,.3,1) .48s`)}><span style={css(`position:absolute;top:-38px;left:0;width:7px;height:7px;border-radius:50%;background:var(--pink)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink-lt)`)}>07</div><div style={css(`margin-top:8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--pink-lt)`)}>Guest ready</div></div>
      </div>

      <a href="#contact" onClick={onNavClick} data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:14px;margin-top:clamp(44px,6vw,80px);background:var(--pink);color:#fff;padding:20px 30px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:background .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#F8F6F0;color:#082E19">Discuss your property →</a>
    </div>
  </section>

  {/* STYLING */}
  <section style={css(`background:var(--ivory);padding:clamp(80px,11vw,160px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1440px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(30px,5vw,80px);align-items:center`)} data-r="two">
      <div>
        <div style={css(`font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--pink);font-weight:600`)}>Setups &amp; styling</div>
        <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.4rem,5.6vw,5.2rem);line-height:.95;letter-spacing:-.025em;margin:24px 0 0;opacity:0;transform:translateY(24px);transition:all .95s cubic-bezier(.16,1,.3,1)`)}>Not just clean.<br /><em style={css(`font-style:italic;color:var(--pink)`)}>Ready to be chosen.</em></h2>
        <p style={css(`max-width:46ch;margin:26px 0 0;font-size:16px;line-height:1.68;color:#3A423C`)}>The way a holiday property feels can influence the entire guest experience. Cleaning Stars can help hosts prepare and style spaces around the type of stay they want to create — from cosy family escapes to modern city apartments and romantic short stays.</p>
        <div style={css(`display:flex;flex-wrap:wrap;gap:10px;margin-top:34px`)}>
          <button type="button" data-tag="assets/gallery/g6.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Colour</button>
          <button type="button" data-tag="assets/gallery/g4.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Textiles</button>
          <button type="button" data-tag="assets/gallery/g2.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Amenities</button>
          <button type="button" data-tag="assets/gallery/g7.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Layout</button>
          <button type="button" data-tag="assets/gallery/g5.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Details</button>
          <button type="button" data-tag="assets/gallery/g1.jpeg" onClick={pickTag} style={css(`background:transparent;border:1px solid rgba(17,21,18,.18);color:var(--ink);padding:13px 20px;border-radius:999px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;min-height:44px;transition:all .35s`)} data-hover="border-color:#E90063;color:#E90063">Presentation</button>
        </div>
        <p style={css(`margin:22px 0 0;font-size:12.5px;line-height:1.6;color:var(--muted);max-width:44ch`)}>Setup, styling and property presentation support — not an interior-design accreditation.</p>
      </div>
      <div style={css(`position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--cream);border-radius:3px`)}>
        <img ref={styleImgRef} src="assets/gallery/g6.jpeg" alt="Styled short-stay bedroom" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;display:block;transition:opacity .5s ease,transform 1.2s cubic-bezier(.16,1,.3,1)`)} />
      </div>
    </div>
  </section>

  {/* PROPERTY TYPES */}
  <section id="types" style={css(`background:var(--paper);padding:clamp(70px,9vw,140px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.2rem,5vw,4.6rem);line-height:.98;letter-spacing:-.02em;margin:0 0 clamp(28px,4vw,52px);opacity:0;transform:translateY(20px);transition:all .9s cubic-bezier(.16,1,.3,1)`)}>Spaces we prepare</h2>
      <div style={css(`display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px`)}>
        <a href="#contact" onClick={onNavClick} data-cursor="View" style={css(`position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:var(--forest-deep);color:#fff`)}>
          <img src="assets/gallery/g1.jpeg" alt="Holiday let bedroom" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.16,1,.3,1);opacity:.86`)} data-hover="transform:scale(1.04)" />
          <span style={css(`position:absolute;left:20px;bottom:20px;right:20px;display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1;text-shadow:0 2px 20px rgba(0,0,0,.4)`)}>Holiday lets <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
        <a href="#contact" onClick={onNavClick} data-cursor="View" style={css(`position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:var(--forest-deep);color:#fff`)}>
          <img src="assets/gallery/g4.jpeg" alt="Home bedroom" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.16,1,.3,1);opacity:.86`)} data-hover="transform:scale(1.04)" />
          <span style={css(`position:absolute;left:20px;bottom:20px;right:20px;display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1;text-shadow:0 2px 20px rgba(0,0,0,.4)`)}>Homes <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
        <a href="#contact" onClick={onNavClick} data-cursor="View" style={css(`position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:var(--forest-deep);color:#fff`)}>
          <img src="assets/gallery/g2.jpeg" alt="Hotel room prepared with fresh towels" loading="lazy" style={css(`width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.16,1,.3,1);opacity:.86`)} data-hover="transform:scale(1.04)" />
          <span style={css(`position:absolute;left:20px;bottom:20px;right:20px;display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1;text-shadow:0 2px 20px rgba(0,0,0,.4)`)}>Hotels <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
        <a href="#contact" onClick={onNavClick} style={css(`position:relative;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:4/5;padding:22px;background:var(--forest);color:var(--ivory);transition:background .5s`)} data-hover="background:#0A3D1C">
          <span style={css(`font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>04</span>
          <span style={css(`display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1`)}>Workplaces <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
        <a href="#contact" onClick={onNavClick} style={css(`position:relative;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:4/5;padding:22px;background:var(--forest-deep);color:var(--ivory);transition:background .5s`)} data-hover="background:#0A3D1C">
          <span style={css(`font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>05</span>
          <span style={css(`display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1`)}>Retail <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
        <a href="#contact" onClick={onNavClick} style={css(`position:relative;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:4/5;padding:22px;background:var(--pink);color:#fff;transition:background .5s`)} data-hover="background:#082E19">
          <span style={css(`font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(255,255,255,.65)`)}>06</span>
          <span style={css(`display:flex;justify-content:space-between;align-items:flex-end;font-family:'Instrument Serif',serif;font-size:clamp(1.5rem,2.4vw,2.3rem);line-height:1`)}>Renovated properties <span style={css(`font-family:'Manrope',sans-serif;font-size:14px`)}>↗</span></span>
        </a>
      </div>
    </div>
  </section>

  {/* STANDARD */}
  <section id="standard" style={css(`background:var(--ivory);padding:clamp(80px,11vw,160px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.4rem,6vw,5.6rem);line-height:.94;letter-spacing:-.025em;margin:0;max-width:16ch;opacity:0;transform:translateY(24px);transition:all .95s cubic-bezier(.16,1,.3,1)`)}>The details <em style={css(`font-style:italic;color:var(--pink)`)}>people notice.</em></h2>
      <div style={css(`display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(24px,3vw,44px);margin-top:clamp(44px,6vw,80px)`)}>
        <div data-reveal="1" style={css(`position:relative;padding-top:44px;border-top:1px solid rgba(17,21,18,.14);opacity:0;transform:translateY(22px);transition:all .85s cubic-bezier(.16,1,.3,1)`)}>
          <span style={css(`position:absolute;top:12px;left:-4px;font-family:'Instrument Serif',serif;font-size:clamp(4rem,7vw,6.5rem);line-height:1;color:rgba(8,46,25,.07);z-index:0`)}>01</span>
          <div style={css(`position:relative;z-index:1`)}><h3 style={css(`font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin:0 0 12px`)}>Presentation</h3><p style={css(`margin:0;font-size:15px;line-height:1.66;color:#3A423C`)}>Clean is only part of the experience. The way a property is presented matters too.</p></div>
        </div>
        <div data-reveal="1" data-delay="100" style={css(`position:relative;padding-top:44px;border-top:1px solid rgba(17,21,18,.14);opacity:0;transform:translateY(22px);transition:all .85s cubic-bezier(.16,1,.3,1)`)}>
          <span style={css(`position:absolute;top:12px;left:-4px;font-family:'Instrument Serif',serif;font-size:clamp(4rem,7vw,6.5rem);line-height:1;color:rgba(8,46,25,.07);z-index:0`)}>02</span>
          <div style={css(`position:relative;z-index:1`)}><h3 style={css(`font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin:0 0 12px`)}>Consistency</h3><p style={css(`margin:0;font-size:15px;line-height:1.66;color:#3A423C`)}>A considered approach to cleaning, preparation and property care.</p></div>
        </div>
        <div data-reveal="1" data-delay="200" style={css(`position:relative;padding-top:44px;border-top:1px solid rgba(17,21,18,.14);opacity:0;transform:translateY(22px);transition:all .85s cubic-bezier(.16,1,.3,1)`)}>
          <span style={css(`position:absolute;top:12px;left:-4px;font-family:'Instrument Serif',serif;font-size:clamp(4rem,7vw,6.5rem);line-height:1;color:rgba(8,46,25,.07);z-index:0`)}>03</span>
          <div style={css(`position:relative;z-index:1`)}><h3 style={css(`font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin:0 0 12px`)}>Flexibility</h3><p style={css(`margin:0;font-size:15px;line-height:1.66;color:#3A423C`)}>Services can be adapted around the property and its requirements.</p></div>
        </div>
        <div data-reveal="1" data-delay="300" style={css(`position:relative;padding-top:44px;border-top:1px solid rgba(17,21,18,.14);opacity:0;transform:translateY(22px);transition:all .85s cubic-bezier(.16,1,.3,1)`)}>
          <span style={css(`position:absolute;top:12px;left:-4px;font-family:'Instrument Serif',serif;font-size:clamp(4rem,7vw,6.5rem);line-height:1;color:rgba(233,0,99,.1);z-index:0`)}>04</span>
          <div style={css(`position:relative;z-index:1`)}><h3 style={css(`font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin:0 0 12px`)}>Final details</h3><p style={css(`margin:0;font-size:15px;line-height:1.66;color:#3A423C`)}>From linen and surfaces to those last visual touches before arrival.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/* PROCESS */}
  <section style={css(`background:var(--paper);padding:clamp(70px,9vw,140px) clamp(20px,5vw,72px);background-image:radial-gradient(rgba(233,0,99,.2) 2px,transparent 2px),radial-gradient(rgba(8,46,25,.14) 2px,transparent 2px);background-size:30px 30px;background-position:0 0,15px 15px`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <div style={css(`display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px`)}>
        <h2 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,4.4vw,3.8rem);line-height:1;letter-spacing:-.02em;margin:0`)}>How it works</h2>
        <span style={css(`font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted)`)}>Four steps</span>
      </div>
      <div data-r="processgrid" style={css(`display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,2.4vw,36px);margin-top:clamp(40px,5vw,70px);position:relative`)}>
        <div style={css(`position:relative;padding-top:30px;border-top:1px solid rgba(17,21,18,.16)`)}><span style={css(`position:absolute;top:-4px;left:0;width:7px;height:7px;border-radius:50%;background:var(--pink);transform:translateY(-50%)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:var(--muted)`)}>01</div><h3 style={css(`font-size:14px;letter-spacing:.14em;text-transform:uppercase;margin:12px 0 10px`)}>Tell us about the space</h3><p style={css(`margin:0;font-size:15px;line-height:1.62;color:#3A423C`)}>Property type, location, requirements and timing.</p></div>
        <div style={css(`position:relative;padding-top:30px;border-top:1px solid rgba(17,21,18,.16)`)}><span style={css(`position:absolute;top:-4px;left:0;width:7px;height:7px;border-radius:50%;background:var(--forest-mid);transform:translateY(-50%)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:var(--muted)`)}>02</div><h3 style={css(`font-size:14px;letter-spacing:.14em;text-transform:uppercase;margin:12px 0 10px`)}>We shape the service</h3><p style={css(`margin:0;font-size:15px;line-height:1.62;color:#3A423C`)}>Cleaning, preparation and optional property-support requirements are discussed.</p></div>
        <div style={css(`position:relative;padding-top:30px;border-top:1px solid rgba(17,21,18,.16)`)}><span style={css(`position:absolute;top:-4px;left:0;width:7px;height:7px;border-radius:50%;background:var(--forest-mid);transform:translateY(-50%)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:var(--muted)`)}>03</div><h3 style={css(`font-size:14px;letter-spacing:.14em;text-transform:uppercase;margin:12px 0 10px`)}>The space is prepared</h3><p style={css(`margin:0;font-size:15px;line-height:1.62;color:#3A423C`)}>The required cleaning and property tasks are carried out.</p></div>
        <div style={css(`position:relative;padding-top:30px;border-top:1px solid rgba(17,21,18,.16)`)}><span style={css(`position:absolute;top:-4px;left:0;width:7px;height:7px;border-radius:50%;background:var(--pink);transform:translateY(-50%)`)}></span><div style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink)`)}>04</div><h3 style={css(`font-size:14px;letter-spacing:.14em;text-transform:uppercase;margin:12px 0 10px`)}>Ready for what's next</h3><p style={css(`margin:0;font-size:15px;line-height:1.62;color:#3A423C`)}>Guest arrival, viewing, tenant, working day, event or simply home.</p></div>
      </div>
    </div>
  </section>

  {/* DIRECTORY */}
  <section id="directory" style={css(`background:var(--ivory);padding:clamp(80px,11vw,160px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1440px;margin:0 auto`)}>
      <div style={css(`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:clamp(24px,4vw,60px);align-items:end`)} data-r="two">
        <h2 data-reveal="1" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.4rem,6vw,5.6rem);line-height:.94;letter-spacing:-.025em;margin:0;opacity:0;transform:translateY(24px);transition:all .95s cubic-bezier(.16,1,.3,1)`)}>One team.<br /><em style={css(`font-style:italic`)}>Every final detail.</em></h2>
        <p style={css(`margin:0;font-size:16px;line-height:1.68;color:#3A423C;max-width:44ch`)}>Cleaning and property support tailored to homes, rentals, hospitality spaces and commercial environments across London.</p>
      </div>

      <div style={css(`margin-top:clamp(44px,6vw,80px);display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(28px,3.4vw,56px)`)}>
        <div>
          <div style={css(`display:flex;align-items:baseline;gap:12px;margin-bottom:14px`)}><span style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>Group 01</span><span style={css(`font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)`)}>Short-stay &amp; hospitality</span></div>
          {groupA.map((s, $index) => (
            <div key={$index} style={css(`border-top:1px solid rgba(17,21,18,.12)`)}>
              <button type="button" onClick={toggleItem} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;background:transparent;border:0;padding:18px 0;text-align:left;cursor:pointer;min-height:44px;color:var(--ink);transition:color .35s`)} data-hover="color:#E90063">
                <span style={css(`font-size:16px;font-weight:500;letter-spacing:-.01em`)}>{s.t}</span>
                <span style={css(`font-size:13px;color:var(--pink);transition:transform .4s cubic-bezier(.16,1,.3,1)`)}>+</span>
              </button>
              <div data-body="1" style={css(`max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.16,1,.3,1)`)}><p style={css(`margin:0 0 20px;font-size:14.5px;line-height:1.66;color:#3A423C;max-width:48ch`)}>{s.d}</p></div>
            </div>
          ))}
        </div>
        <div>
          <div style={css(`display:flex;align-items:baseline;gap:12px;margin-bottom:14px`)}><span style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>Group 02</span><span style={css(`font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)`)}>Home &amp; residential</span></div>
          {groupB.map((s, $index) => (
            <div key={$index} style={css(`border-top:1px solid rgba(17,21,18,.12)`)}>
              <button type="button" onClick={toggleItem} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;background:transparent;border:0;padding:18px 0;text-align:left;cursor:pointer;min-height:44px;color:var(--ink);transition:color .35s`)} data-hover="color:#E90063">
                <span style={css(`font-size:16px;font-weight:500;letter-spacing:-.01em`)}>{s.t}</span>
                <span style={css(`font-size:13px;color:var(--pink);transition:transform .4s cubic-bezier(.16,1,.3,1)`)}>+</span>
              </button>
              <div data-body="1" style={css(`max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.16,1,.3,1)`)}><p style={css(`margin:0 0 20px;font-size:14.5px;line-height:1.66;color:#3A423C;max-width:48ch`)}>{s.d}</p></div>
            </div>
          ))}
        </div>
        <div>
          <div style={css(`display:flex;align-items:baseline;gap:12px;margin-bottom:14px`)}><span style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>Group 03</span><span style={css(`font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)`)}>Property transitions</span></div>
          {groupC.map((s, $index) => (
            <div key={$index} style={css(`border-top:1px solid rgba(17,21,18,.12)`)}>
              <button type="button" onClick={toggleItem} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;background:transparent;border:0;padding:18px 0;text-align:left;cursor:pointer;min-height:44px;color:var(--ink);transition:color .35s`)} data-hover="color:#E90063">
                <span style={css(`font-size:16px;font-weight:500;letter-spacing:-.01em`)}>{s.t}</span>
                <span style={css(`font-size:13px;color:var(--pink);transition:transform .4s cubic-bezier(.16,1,.3,1)`)}>+</span>
              </button>
              <div data-body="1" style={css(`max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.16,1,.3,1)`)}><p style={css(`margin:0 0 20px;font-size:14.5px;line-height:1.66;color:#3A423C;max-width:48ch`)}>{s.d}</p></div>
            </div>
          ))}
          <div style={css(`display:flex;align-items:baseline;gap:12px;margin:34px 0 14px`)}><span style={css(`font-size:10px;letter-spacing:.24em;color:var(--pink);font-weight:600`)}>Group 04</span><span style={css(`font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)`)}>Business &amp; occasions</span></div>
          {groupD.map((s, $index) => (
            <div key={$index} style={css(`border-top:1px solid rgba(17,21,18,.12)`)}>
              <button type="button" onClick={toggleItem} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;background:transparent;border:0;padding:18px 0;text-align:left;cursor:pointer;min-height:44px;color:var(--ink);transition:color .35s`)} data-hover="color:#E90063">
                <span style={css(`font-size:16px;font-weight:500;letter-spacing:-.01em`)}>{s.t}</span>
                <span style={css(`font-size:13px;color:var(--pink);transition:transform .4s cubic-bezier(.16,1,.3,1)`)}>+</span>
              </button>
              <div data-body="1" style={css(`max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.16,1,.3,1)`)}><p style={css(`margin:0 0 20px;font-size:14.5px;line-height:1.66;color:#3A423C;max-width:48ch`)}>{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

  {/* FAQ */}
  <section style={css(`background:var(--cream);padding:clamp(70px,9vw,140px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1080px;margin:0 auto`)}>
      <h2 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2rem,4.4vw,3.8rem);line-height:1;letter-spacing:-.02em;margin:0 0 clamp(28px,4vw,48px)`)}>Questions, answered</h2>
      {faqs.map((f, $index) => (
        <div key={$index} style={css(`border-top:1px solid rgba(17,21,18,.14)`)}>
          <button type="button" onClick={toggleItem} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:18px;background:transparent;border:0;padding:22px 0;text-align:left;cursor:pointer;min-height:44px;color:var(--ink);transition:color .35s`)} data-hover="color:#E90063">
            <span style={css(`font-family:'Instrument Serif',serif;font-size:clamp(19px,2vw,26px);line-height:1.2;letter-spacing:-.01em`)}>{f.q}</span>
            <span style={css(`font-size:15px;color:var(--pink);transition:transform .4s cubic-bezier(.16,1,.3,1)`)}>+</span>
          </button>
          <div data-body="1" style={css(`max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.16,1,.3,1)`)}><p style={css(`margin:0 0 24px;font-size:15.5px;line-height:1.7;color:#3A423C;max-width:64ch`)}>{f.a}</p></div>
        </div>
      ))}
    </div>
  </section>

  {/* FINAL CTA */}
  <section style={css(`position:relative;background:var(--ivory);padding:clamp(80px,11vw,170px) clamp(20px,5vw,72px);text-align:center`)}>
    <div style={css(`max-width:1100px;margin:0 auto`)}>
      <img data-reveal="1" src="assets/brand/logo-premium.png" alt="Cleaning Stars" style={css(`width:min(520px,84vw);height:auto;margin:0 auto;display:block;opacity:0;transform:translateY(20px) scale(.97);transition:all 1.1s cubic-bezier(.16,1,.3,1)`)} />
      <h2 data-reveal="1" data-delay="120" style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.6rem,7.4vw,7rem);line-height:.92;letter-spacing:-.03em;margin:clamp(28px,4vw,48px) 0 0;opacity:0;transform:translateY(26px);transition:all 1s cubic-bezier(.16,1,.3,1)`)}>Let's get your<br /><em style={css(`font-style:italic;color:var(--pink)`)}>space ready.</em></h2>
      <p style={css(`max-width:48ch;margin:24px auto 0;font-size:16px;line-height:1.68;color:#3A423C`)}>Tell us what the property needs and we'll help you find the right Cleaning Stars service.</p>
      <div style={css(`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:36px`)}>
        <a href="#contact" onClick={onNavClick} data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:14px;background:var(--forest);color:#fff;padding:20px 32px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:background .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#E90063;color:#fff">Request a quote →</a>
        <a href="#services" onClick={onNavClick} style={css(`display:inline-flex;align-items:center;gap:12px;border:1px solid rgba(17,21,18,.2);color:var(--ink);padding:20px 30px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:border-color .4s`)} data-hover="border-color:#082E19">Explore services</a>
      </div>
      <div style={css(`margin-top:34px;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted)`)}>London, United Kingdom</div>
    </div>
  </section>

  {/* CONTACT */}
  <section id="contact" style={css(`background:var(--forest);color:var(--ivory);padding:clamp(80px,11vw,160px) clamp(20px,5vw,72px)`)}>
    <div style={css(`max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1fr);gap:clamp(30px,5vw,80px)`)} data-r="two">
      <div>
        <div style={css(`font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>Request a quote</div>
        <h2 style={css(`font-family:'Instrument Serif',serif;font-weight:400;font-size:clamp(2.2rem,5vw,4.4rem);line-height:.96;letter-spacing:-.025em;margin:22px 0 0`)}>Tell us about<br /><em style={css(`font-style:italic;color:var(--pink-lt)`)}>the property.</em></h2>
        <p style={css(`margin:24px 0 0;font-size:15.5px;line-height:1.7;color:rgba(248,246,240,.72);max-width:38ch`)}>Share the essentials — property type, area and what needs preparing — and we'll come back with the right service.</p>
        <a href="https://wa.me/447512846152?text=Hello%20Cleaning%20Stars%2C%20I%27d%20like%20a%20quote%20for%20my%20property%20in%20London." target="_blank" rel="noopener" data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:12px;margin-top:30px;border:1px solid rgba(248,246,240,.3);color:var(--ivory);padding:16px 24px;border-radius:999px;font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;transition:background .4s,color .4s,border-color .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#F8F6F0;color:#082E19;border-color:#F8F6F0">WhatsApp +44 7512 846152</a>
        <div style={css(`margin-top:36px;display:flex;flex-direction:column;gap:8px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(248,246,240,.5)`)}>
          <span>London, United Kingdom</span>
          <span>Cleaning • Turnovers • Property prep</span>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate={true} style={css(`display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px`)}>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Name
          <input name="name" type="text" required={true} autoComplete="name" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;transition:border-color .35s`)} data-focus="border-color:#FF3C88" />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Email
          <input name="email" type="email" required={true} autoComplete="email" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;transition:border-color .35s`)} data-focus="border-color:#FF3C88" />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Phone
          <input name="phone" type="tel" autoComplete="tel" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;transition:border-color .35s`)} data-focus="border-color:#FF3C88" />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Property type
          <select name="propertyType" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none`)}>
            <option style={css(`color:#111512`)}>Airbnb / Holiday let</option>
            <option style={css(`color:#111512`)}>Residential</option>
            <option style={css(`color:#111512`)}>Hotel</option>
            <option style={css(`color:#111512`)}>Commercial</option>
            <option style={css(`color:#111512`)}>End of tenancy</option>
            <option style={css(`color:#111512`)}>After builders</option>
            <option style={css(`color:#111512`)}>Other</option>
          </select>
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Service required
          <input name="service" type="text" placeholder="e.g. turnover cleaning" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;transition:border-color .35s`)} data-focus="border-color:#FF3C88" />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Preferred date
          <input name="date" type="date" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;color-scheme:dark`)} />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55)`)}>Postcode / area
          <input name="postcode" type="text" autoComplete="postal-code" style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;min-height:44px;outline:none;transition:border-color .35s`)} data-focus="border-color:#FF3C88" />
        </label>
        <label style={css(`display:flex;flex-direction:column;gap:8px;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(248,246,240,.55);grid-column:1/-1`)}>Message
          <textarea name="message" rows={3} style={css(`background:transparent;border:0;border-bottom:1px solid rgba(248,246,240,.28);color:var(--ivory);padding:12px 0;font-size:16px;letter-spacing:0;text-transform:none;outline:none;resize:vertical;transition:border-color .35s`)} data-focus="border-color:#FF3C88"></textarea>
        </label>
        <div style={css(`grid-column:1/-1;display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:8px`)}>
          <button type="submit" data-magnetic="1" style={css(`display:inline-flex;align-items:center;gap:12px;background:var(--pink);color:#fff;border:0;padding:20px 30px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:44px;cursor:pointer;transition:background .4s,transform .3s cubic-bezier(.16,1,.3,1)`)} data-hover="background:#F8F6F0;color:#082E19">Request my quote →</button>
          <span ref={formMsgRef} role="status" style={css(`font-size:13px;letter-spacing:.04em;color:var(--pink-lt);opacity:0;transition:opacity .5s`)}></span>
        </div>
      </form>
    </div>
  </section>

  {/* FOOTER */}
  <footer style={css(`background:#E7E1D3;color:var(--forest);padding:clamp(60px,7vw,110px) clamp(20px,5vw,72px) 30px;position:relative;overflow:hidden`)}>
    <div style={css(`max-width:1440px;margin:0 auto;position:relative;z-index:1`)}>
      <div style={css(`display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:36px`)}>
        <div>
          <img src="assets/brand/logo-flock.jpeg" alt="Cleaning Stars" style={css(`width:min(260px,60vw);height:auto;display:block;border-radius:3px`)} />
          <div style={css(`margin-top:20px;font-size:13px;line-height:1.7;color:rgba(8,46,25,.65)`)}>Professional cleaning &amp; property services<br />London, UK</div>
        </div>
        <nav aria-label="Footer" style={css(`display:flex;flex-direction:column;gap:12px;font-size:12px;letter-spacing:.16em;text-transform:uppercase`)}>
          <a href="#services" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Services</a>
          <a href="#holiday" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Airbnb &amp; holiday lets</a>
          <a href="#directory" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Residential</a>
          <a href="#types" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Commercial</a>
          <a href="#directory" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Property preparation</a>
          <a href="#contact" onClick={onNavClick} style={css(`color:rgba(8,46,25,.8)`)} data-hover="color:#E90063">Contact</a>
        </nav>
        <div style={css(`display:flex;flex-direction:column;justify-content:space-between;gap:24px`)}>
          <div ref={sparkleTextRef} style={css(`font-family:'Instrument Serif',serif;font-size:clamp(28px,4vw,52px);line-height:1;letter-spacing:-.02em;position:relative;display:inline-block;cursor:default`)}>We make it sparkle</div>
          <a href="#top" onClick={onNavClick} style={css(`align-self:flex-start;display:inline-flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(8,46,25,.7);border-bottom:1px solid rgba(8,46,25,.28);padding-bottom:6px`)} data-hover="color:#E90063">Back to top ↑</a>
        </div>
      </div>
      <div style={css(`margin-top:clamp(40px,6vw,80px);padding-top:22px;border-top:1px solid rgba(8,46,25,.14);display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(8,46,25,.45)`)}>
        <span>© {year} Cleaning Stars</span>
        <span style={css(`display:flex;gap:22px`)}><a href="#top" onClick={onNavClick} style={css(`color:rgba(8,46,25,.45)`)} data-hover="color:#E90063">Privacy</a><a href="#top" onClick={onNavClick} style={css(`color:rgba(8,46,25,.45)`)} data-hover="color:#E90063">Terms</a></span>
      </div>
    </div>
    <div aria-hidden="true" style={css(`position:absolute;left:0;right:0;bottom:-4%;font-family:'Instrument Serif',serif;font-size:clamp(80px,20vw,300px);line-height:.78;letter-spacing:-.04em;color:rgba(8,46,25,.06);text-align:center;pointer-events:none;white-space:nowrap`)}>Cleaning Stars</div>
  </footer>
  </main>

  {/* WHATSAPP FLOAT */}
  <a ref={whatsRef} href="https://wa.me/447512846152?text=Hello%20Cleaning%20Stars%2C%20I%27d%20like%20a%20quote%20for%20my%20property%20in%20London." target="_blank" rel="noopener" aria-label="Message Cleaning Stars on WhatsApp" data-cursor="Chat" style={css(`position:fixed;right:clamp(14px,2.4vw,32px);bottom:clamp(88px,11vh,120px);z-index:750;width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--leaf);color:#fff;border:2.5px solid var(--pink);box-shadow:0 16px 40px rgba(6,31,18,.3),0 0 0 4px rgba(233,0,99,.14);opacity:0;transform:translate3d(0,26px,0);transition:opacity .6s cubic-bezier(.16,1,.3,1),background .4s,transform .3s cubic-bezier(.16,1,.3,1);will-change:transform`)} data-hover="transform:translate3d(0,-3px,0)">
    <svg viewBox="0 0 32 32" width="27" height="27" aria-hidden="true" fill="currentColor"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.1 1 1.1-4-.3-.4A10.5 10.5 0 1 1 16 26.6z"></path><path d="M22 19c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.3-.7.1-.4-.2-1.5-.6-2.8-1.7-1-.9-1.7-2-1.9-2.4-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.4-.6.1-.2.1-.4 0-.6l-1-2.5c-.3-.6-.5-.5-.8-.5h-.7c-.2 0-.6.1-.9.5s-1.2 1.2-1.2 2.9 1.3 3.3 1.4 3.6c.2.2 2.5 3.9 6 5.3 2.4.9 2.9.8 3.4.7.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"></path></svg>
  </a>

  {/* STICKY MOBILE CTA */}
  <div ref={stickyCtaRef} data-r="only-sm" style={css(`position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:700;display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(120%);transition:opacity .5s,transform .5s cubic-bezier(.16,1,.3,1);pointer-events:none`)}>
    <a href="#contact" onClick={onNavClick} style={css(`flex:1;display:inline-flex;align-items:center;justify-content:center;background:var(--pink);color:#fff;padding:17px 20px;border-radius:999px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;min-height:48px;box-shadow:0 14px 34px rgba(6,31,18,.25)`)}>Request a quote</a>
    <button type="button" aria-label="Dismiss" onClick={dismissCta} style={css(`width:48px;height:48px;border-radius:50%;border:0;background:rgba(8,46,25,.9);color:#fff;font-size:16px;cursor:pointer`)}>×</button>
  </div>
</div>
  );
}
