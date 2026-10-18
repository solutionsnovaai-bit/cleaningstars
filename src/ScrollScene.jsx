const star = 'M100 0C110 73 127 90 200 100C127 110 110 127 100 200C90 127 73 110 0 100C73 90 90 73 100 0Z';

export default function ScrollScene({ variant = 'care' }) {
  return <div className={`cs-scene cs-scene--${variant}`} aria-hidden="true">
    <svg className="cs-scene__ribbon" viewBox="0 0 1400 600" preserveAspectRatio="none"><path pathLength="1" d="M-100 480C180 160 570 680 850 310S1260 40 1500 170" /></svg>
    <div className="cs-scene__orbit"><i /><i /></div>
    {[0,1,2].map(i => <div key={i} className={`cs-scene__float cs-scene__float--${i}`}><svg viewBox="0 0 200 200"><path d={star} /></svg></div>)}
  </div>;
}
