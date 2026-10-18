import { forwardRef, useId } from 'react';
import logo from './logo-parts.json';

// Original lettering is preserved. Vector stars keep the macro shot free of raster matte edges.
const HERO_STAR = 'M143 0C150 121 161 144 285 155C174 163 154 178 143 259C132 180 118 165 0 155C122 146 135 125 143 0Z';
const SMALL_STAR = 'M50 0C55 36 63 45 100 50C64 55 55 64 50 100C45 64 36 55 0 50C36 45 45 36 50 0Z';
const BrandIntro = forwardRef(function BrandIntro(_, ref) {
  const id = useId().replace(/:/g, '');
  const part = (name, attrs = {}) => <image {...logo.parts[name]} href={`/assets/motion/${name}.webp`} {...attrs} />;
  return (
    <div ref={ref} className="cs-intro" role="dialog" aria-modal="true" aria-label="Welcome to Cleaning Stars" tabIndex={-1}>
      <div className="cs-intro__halo" aria-hidden="true" />
      <div className="cs-intro__paper" aria-hidden="true" />
      <div className="cs-intro__top" aria-hidden="true"><span>Considered care.</span><span>Exceptional spaces.</span></div>
      <div className="cs-intro__stage" aria-hidden="true">
        <svg viewBox="0 0 1195 915" fill="none" className="cs-intro__logo">
          <defs>
            <radialGradient id={`${id}-rose`} cx="38%" cy="34%" r="78%"><stop offset="0" stopColor="#ff71ac" /><stop offset=".28" stopColor="#f52580" /><stop offset=".64" stopColor="#e90063" /><stop offset="1" stopColor="#ac0849" /></radialGradient>
            <radialGradient id={`${id}-leaf`} cx="36%" cy="32%" r="80%"><stop offset="0" stopColor="#56b969" /><stop offset=".42" stopColor="#0f893f" /><stop offset="1" stopColor="#075628" /></radialGradient>
            {['cleaning', 'stars', 'swoosh'].map(name => (
              <mask key={name} id={`${id}-${name}`} maskUnits="userSpaceOnUse" x="-20" y="0" width="1235" height="915">
                <path d={logo.paths[name]} data-draw={name} pathLength="1" stroke="white" strokeWidth={name === 'cleaning' ? 86 : 110} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset="1" />
              </mask>
            ))}
            <linearGradient id={`${id}-shine`}><stop offset="0" stopColor="white" stopOpacity="0" /><stop offset=".5" stopColor="white" stopOpacity=".7" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
            <mask id={`${id}-full`}><image href="/assets/motion/signature.webp" width="1195" height="915" /></mask>
          </defs>
          {['cleaning', 'stars', 'swoosh'].map(name => <g key={name} mask={`url(#${id}-${name})`}>{part(name)}</g>)}
          {part('dot', { 'data-intro-dot': '', opacity: 0 })}
          {Array.from({ length: 9 }, (_, i) => <g key={i} data-intro-star={i} className="cs-intro__star">
            <svg {...logo.parts[`star-${i}`]} viewBox={i === 0 ? '0 0 285 259' : '0 0 100 100'} overflow="visible" preserveAspectRatio="none">
              <path d={i === 0 ? HERO_STAR : SMALL_STAR} fill={`url(#${id}-${[1,2,3,7].includes(i) ? 'leaf' : 'rose'})`} />
            </svg>
          </g>)}
          <g data-intro-tagline="" opacity="0">{part('tagline')}</g>
          <image data-intro-master="" href="/assets/motion/signature.webp" width="1195" height="915" opacity="0" />
          <g mask={`url(#${id}-full)`}><rect data-intro-shine="" x="-450" y="0" width="280" height="1000" fill={`url(#${id}-shine)`} transform="skewX(-20)" opacity="0" /></g>
        </svg>
      </div>
      <div className="cs-intro__bottom"><span>London <i>✦</i> Property care</span><span className="cs-intro__rule"><i /></span><button type="button" data-intro-skip="">Skip intro <span>↗</span></button></div>
    </div>
  );
});

export default BrandIntro;
