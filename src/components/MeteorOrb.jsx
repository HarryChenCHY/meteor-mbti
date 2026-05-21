export default function MeteorOrb({ size = 160, glow = true, animate = true, rarity, level }) {
  const lvl = level !== undefined ? level : (rarity === '传说' ? 4 : rarity === '稀有' ? 2 : 0);

  const sphereDefs = [
    // 0: Primordial dark stone
    {
      base: `radial-gradient(circle at 32% 27%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 12%, transparent 24%),
            radial-gradient(ellipse 70% 55% at 36% 32%, rgba(130,90,200,0.22) 0%, transparent 75%),
            radial-gradient(circle at 66% 70%, rgba(85,60,175,0.16) 0%, transparent 42%),
            radial-gradient(circle, #1e1428 0%, #100c1c 55%, #06040c 100%)`,
      boxShadow: `0 0 ${size * .45}px rgba(110,75,200,0.12), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(110,75,200,0.18) 0%, transparent 68%)`,
      ring: null,
    },
    // 1: Star Core — ice blue
    {
      base: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 14%, transparent 26%),
            radial-gradient(ellipse 65% 55% at 36% 33%, rgba(75,195,255,0.28) 0%, transparent 72%),
            radial-gradient(circle at 68% 72%, rgba(25,155,240,0.22) 0%, transparent 42%),
            radial-gradient(circle, #0c1c30 0%, #060f1e 58%, #020508 100%)`,
      boxShadow: `0 0 ${size * .5}px rgba(40,175,255,0.22), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(40,175,255,0.22) 0%, transparent 68%)`,
      ring: { color: 'rgba(55,195,255,0.2)', glow: 'rgba(55,195,255,0.5)', dur: '18s', r: 1.22, dots: [{ a: 0, s: 5, c: 'rgba(90,220,255,0.95)', g: 'rgba(55,195,255,0.8)' }] },
    },
    // 2: Nebula — purple-pink
    {
      base: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.2) 0%, rgba(255,200,255,0.06) 15%, transparent 28%),
            radial-gradient(ellipse 65% 58% at 40% 35%, rgba(215,95,255,0.3) 0%, transparent 70%),
            radial-gradient(circle at 62% 66%, rgba(135,45,220,0.28) 0%, transparent 42%),
            radial-gradient(circle, #1a0828 0%, #0e0516 58%, #040210 100%)`,
      boxShadow: `0 0 ${size * .55}px rgba(175,58,255,0.28), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(175,58,255,0.28) 0%, transparent 68%)`,
      ring: {
        color: 'rgba(195,75,255,0.22)', glow: 'rgba(195,75,255,0.55)', dur: '14s', r: 1.24,
        dots: [
          { a: 0, s: 5.5, c: 'rgba(225,105,255,0.95)', g: 'rgba(200,80,255,0.8)' },
          { a: Math.PI, s: 4, c: 'rgba(165,75,225,0.88)', g: 'rgba(150,55,210,0.7)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(215,95,255,0.16) 14%, transparent 28%, rgba(135,45,220,0.12) 54%, transparent 70%, rgba(200,80,255,0.1) 88%, transparent 100%)`,
    },
    // 3: Star — amber solar
    {
      base: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.5) 0%, rgba(255,225,110,0.22) 14%, transparent 30%),
            radial-gradient(ellipse 68% 58% at 38% 33%, rgba(255,178,48,0.44) 0%, transparent 70%),
            radial-gradient(circle at 65% 68%, rgba(255,98,18,0.36) 0%, transparent 44%),
            radial-gradient(circle, #201002 0%, #140800 58%, #060200 100%)`,
      boxShadow: `0 0 ${size * .62}px rgba(255,155,28,0.38), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(255,155,28,0.38) 0%, transparent 68%)`,
      ring: {
        color: 'rgba(255,175,45,0.28)', glow: 'rgba(255,175,45,0.6)', dur: '10s', r: 1.26,
        dots: [
          { a: 0, s: 6, c: 'rgba(255,205,65,0.97)', g: 'rgba(255,185,45,0.85)' },
          { a: Math.PI * .5, s: 4.5, c: 'rgba(255,165,40,0.9)', g: 'rgba(255,140,30,0.75)' },
          { a: Math.PI, s: 5, c: 'rgba(255,140,28,0.88)', g: 'rgba(255,120,22,0.72)' },
          { a: Math.PI * 1.5, s: 4, c: 'rgba(255,185,50,0.85)', g: 'rgba(255,160,38,0.7)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(255,200,50,0.14) 12%, transparent 25%, transparent)`,
    },
    // 4: Supernova
    {
      base: `radial-gradient(circle at 28% 21%, rgba(255,255,255,0.8) 0%, rgba(200,240,255,0.38) 14%, transparent 32%),
            radial-gradient(ellipse 70% 60% at 44% 40%, rgba(158,218,255,0.45) 0%, transparent 68%),
            radial-gradient(circle at 62% 62%, rgba(178,98,255,0.4) 0%, transparent 46%),
            radial-gradient(circle, #080c16 0%, #04060e 58%, #020308 100%)`,
      boxShadow: `0 0 ${size * .72}px rgba(178,218,255,0.45), 0 0 ${size * .35}px rgba(198,98,255,0.32), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(178,218,255,0.42) 0%, rgba(198,98,255,0.22) 45%, transparent 68%)`,
      ring: {
        color: 'rgba(178,218,255,0.28)', glow: 'rgba(178,218,255,0.65)', dur: '9s', r: 1.28,
        dots: [
          { a: 0, s: 6, c: 'rgba(205,240,255,0.97)', g: 'rgba(178,218,255,0.88)' },
          { a: Math.PI, s: 5, c: 'rgba(185,205,255,0.92)', g: 'rgba(165,188,255,0.78)' },
        ]
      },
      ring2: {
        color: 'rgba(200,98,255,0.2)', glow: 'rgba(200,98,255,0.5)', dur: '14s reverse', r: .88,
        dots: [
          { a: Math.PI * .5, s: 4.5, c: 'rgba(220,145,255,0.9)', g: 'rgba(200,98,255,0.78)' },
          { a: Math.PI * 1.5, s: 4, c: 'rgba(150,195,255,0.85)', g: 'rgba(130,175,255,0.72)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.14) 8%, transparent 18%, rgba(200,240,255,0.1) 40%, transparent 52%, transparent)`,
    },
  ];

  const def = sphereDefs[Math.min(lvl, 4)];
  const ringR = def.ring ? size * def.ring.r : 0;
  const ring2R = def.ring2 ? size * def.ring2.r : 0;
  const outerR = def.ring ? ringR : size * .5;
  const containerSize = outerR * 2;
  const offset = (containerSize - size) / 2;

  function OrbitRing({ rd, containerSz, sz }) {
    const rr = sz * rd.r;
    const ringSz = rr * 2;
    const ringOff = (containerSz - ringSz) / 2;
    const reverse = rd.dur.includes('reverse');
    const dur = rd.dur.replace(' reverse', '');
    return (
      <div style={{
        position: 'absolute', left: ringOff, top: ringOff, width: ringSz, height: ringSz,
        borderRadius: '50%', border: `1px solid ${rd.color}`, boxShadow: `0 0 10px ${rd.glow}`,
        animation: `spin ${dur} linear infinite${reverse ? ' reverse' : ''}`
      }}>
        {rd.dots.map((d, i) => {
          const x = rr + Math.cos(d.a) * rr - d.s / 2;
          const y = rr + Math.sin(d.a) * rr - d.s / 2;
          return <div key={i} style={{
            position: 'absolute', left: x, top: y, width: d.s, height: d.s,
            borderRadius: '50%', background: d.c, boxShadow: `0 0 ${d.s * 2}px ${d.g}`
          }} />;
        })}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: containerSize, height: containerSize, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      className={animate ? 'animate-float' : ''}>

      {glow && (
        <div style={{
          position: 'absolute', width: size * 2, height: size * 2, left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)', borderRadius: '50%', background: def.glowGrad,
          animation: 'pulseGlow 4s ease-in-out infinite', pointerEvents: 'none'
        }} />
      )}

      {def.ring && <OrbitRing rd={def.ring} containerSz={containerSize} sz={size} />}
      {def.ring2 && <OrbitRing rd={def.ring2} containerSz={containerSize} sz={size} />}

      {lvl >= 4 && [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const a = (i / 8) * Math.PI * 2;
        const pr = size * .72;
        return <div key={`p${i}`} style={{
          position: 'absolute',
          left: `calc(50% + ${Math.cos(a) * pr}px - 3px)`,
          top: `calc(50% + ${Math.sin(a) * pr}px - 3px)`,
          width: 5, height: 5, borderRadius: '50%',
          background: 'rgba(255,255,255,0.72)', filter: 'blur(1px)',
          animation: 'twinkle 2.5s ease-in-out infinite',
          animationDelay: `${i * .28}s`,
        }} />;
      })}

      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: size, height: size, borderRadius: '50%',
        background: def.base, boxShadow: def.boxShadow,
        overflow: 'hidden', flexShrink: 0,
      }}>
        {def.swirl && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: def.swirl,
            animation: `spin ${lvl >= 4 ? '5s' : lvl === 3 ? '7s' : '10s'} linear infinite`,
            mixBlendMode: lvl >= 4 ? 'overlay' : 'screen'
          }} />
        )}
        {lvl >= 4 && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `conic-gradient(from 90deg, transparent, rgba(200,240,255,0.1) 10%, transparent 20%, transparent)`,
            animation: 'spin 9s linear infinite reverse', mixBlendMode: 'screen'
          }} />
        )}
      </div>

      {lvl >= 4 && (
        <div style={{
          position: 'absolute', top: offset - 4, right: offset - 4,
          width: 24, height: 24, borderRadius: '50%',
          background: 'linear-gradient(135deg,rgba(255,255,255,0.9),rgba(200,240,255,0.8))',
          boxShadow: '0 0 14px rgba(200,240,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#000', zIndex: 10
        }}>★</div>
      )}
      {lvl === 3 && (
        <div style={{
          position: 'absolute', top: offset - 3, right: offset - 3,
          width: 21, height: 21, borderRadius: '50%',
          background: 'linear-gradient(135deg,rgba(255,200,60,0.95),rgba(255,140,20,0.9))',
          boxShadow: '0 0 12px rgba(255,170,30,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: '#000', zIndex: 10
        }}>◆</div>
      )}
      {lvl === 2 && (
        <div style={{
          position: 'absolute', top: offset - 2, right: offset - 2,
          width: 19, height: 19, borderRadius: '50%',
          background: 'linear-gradient(135deg,rgba(215,95,255,0.95),rgba(150,45,220,0.9))',
          boxShadow: '0 0 10px rgba(195,65,255,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 700, color: '#fff', zIndex: 10
        }}>✦</div>
      )}
    </div>
  );
}
