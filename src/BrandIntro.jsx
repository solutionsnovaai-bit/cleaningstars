import { forwardRef, useId } from 'react';
import logo from './logo-parts.json';

// Every layer comes from the original logo. No substitute lettering or redrawn mark.
const BrandIntro = forwardRef(function BrandIntro(_, ref) {
  const id = useId().replace(/:/g, '');
  const part = (name, attrs = {}) => <image {...logo.parts[name]} href={`/assets/motion/${name}.webp`} {...attrs} />;
  return (
    <div ref={ref} className="cs-intro" role="dialog" aria-modal="true" aria-label="Welcome to Cleaning Stars" tabIndex={-1}>
      <div className="cs-intro__halo" aria-hidden="true" />
      <div className="cs-intro__orbit" aria-hidden="true"><i /><i /></div>
      <svg className="cs-intro__comet" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path pathLength="1" d="M-150 880C250 900 180 180 720 420S1130 800 1550 20" /><path pathLength="1" d="M-150 830C290 820 180 100 720 420S1130 850 1550 70" /></svg>
      <div className="cs-intro__paper" aria-hidden="true" />
      <div className="cs-intro__top" aria-hidden="true"><span>Considered care.</span><span>Exceptional spaces.</span></div>
      <div className="cs-intro__stage" aria-hidden="true">
        <svg viewBox="0 0 1195 915" fill="none" className="cs-intro__logo">
          <defs>
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
          {Array.from({ length: 9 }, (_, i) => <g key={i} data-intro-star={i} className="cs-intro__star">{part(`star-${i}`)}</g>)}
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
