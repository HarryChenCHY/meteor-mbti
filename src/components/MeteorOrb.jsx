'use client';
export default function MeteorOrb({ size = 160, glow = true, animate = true, rarity, level }) {
  const lvl = level !== undefined ? level : (rarity === '传说' ? 4 : rarity === '稀有' ? 2 : 0);

  const sphereDefs = [
    // 0: Void Crimson — dark mysterious with crimson-violet aurora
    {
      base: `radial-gradient(circle at 30% 25%, rgba(255,200,220,0.32) 0%, rgba(255,120,160,0.10) 14%, transparent 26%),
            radial-gradient(ellipse 68% 52% at 36% 32%, rgba(200,50,120,0.38) 0%, transparent 65%),
            radial-gradient(circle at 65% 68%, rgba(140,30,80,0.30) 0%, transparent 42%),
            radial-gradient(circle at 50% 50%, rgba(100,20,180,0.18) 0%, transparent 70%),
            radial-gradient(circle, #2a0818 0%, #160410 55%, #06020a 100%)`,
      boxShadow: `0 0 ${size * .65}px rgba(200,40,100,0.42), 0 0 ${size * .3}px rgba(120,20,180,0.25), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(200,40,100,0.42) 0%, rgba(120,20,180,0.20) 45%, transparent 68%)`,
      ring: { color: 'rgba(220,60,120,0.32)', glow: 'rgba(220,60,120,0.65)', dur: '20s', r: 1.22, dots: [{ a: Math.PI * 0.7, s: 5, c: 'rgba(255,90,140,0.95)', g: 'rgba(220,55,110,0.82)' }] },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(200,50,120,0.18) 15%, transparent 30%, rgba(120,20,180,0.12) 58%, transparent 75%, rgba(200,50,120,0.10) 90%, transparent 100%)`,
    },
    // 1: Star Core — vivid ice blue
    {
      base: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45) 0%, rgba(180,235,255,0.16) 14%, transparent 26%),
            radial-gradient(ellipse 65% 55% at 36% 33%, rgba(55,195,255,0.55) 0%, transparent 68%),
            radial-gradient(circle at 68% 72%, rgba(15,145,240,0.42) 0%, transparent 42%),
            radial-gradient(circle at 45% 42%, rgba(100,220,255,0.22) 0%, transparent 55%),
            radial-gradient(circle, #081828 0%, #040e1c 58%, #020508 100%)`,
      boxShadow: `0 0 ${size * .68}px rgba(40,185,255,0.52), 0 0 ${size * .3}px rgba(80,210,255,0.28), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(40,185,255,0.52) 0%, rgba(80,210,255,0.22) 42%, transparent 68%)`,
      ring: { color: 'rgba(55,205,255,0.38)', glow: 'rgba(55,205,255,0.72)', dur: '16s', r: 1.22, dots: [
        { a: 0, s: 6, c: 'rgba(110,230,255,0.97)', g: 'rgba(55,205,255,0.88)' },
        { a: Math.PI * 1.3, s: 4, c: 'rgba(80,215,255,0.88)', g: 'rgba(45,190,255,0.72)' },
      ]},
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(55,205,255,0.18) 12%, transparent 26%, rgba(15,145,240,0.12) 55%, transparent 72%)`,
    },
    // 2: Nebula — vivid purple-pink
    {
      base: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.42) 0%, rgba(255,180,255,0.14) 15%, transparent 28%),
            radial-gradient(ellipse 65% 58% at 40% 35%, rgba(225,85,255,0.58) 0%, transparent 65%),
            radial-gradient(circle at 62% 66%, rgba(145,35,230,0.48) 0%, transparent 42%),
            radial-gradient(circle at 50% 45%, rgba(200,80,255,0.22) 0%, transparent 60%),
            radial-gradient(circle, #1e0630 0%, #100418 58%, #040110 100%)`,
      boxShadow: `0 0 ${size * .72}px rgba(190,55,255,0.55), 0 0 ${size * .32}px rgba(240,100,255,0.28), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(190,55,255,0.55) 0%, rgba(240,100,255,0.22) 42%, transparent 68%)`,
      ring: {
        color: 'rgba(210,75,255,0.42)', glow: 'rgba(210,75,255,0.75)', dur: '13s', r: 1.24,
        dots: [
          { a: 0, s: 6.5, c: 'rgba(240,110,255,0.97)', g: 'rgba(210,80,255,0.85)' },
          { a: Math.PI, s: 5, c: 'rgba(180,70,235,0.92)', g: 'rgba(160,50,220,0.78)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(225,85,255,0.22) 14%, transparent 28%, rgba(145,35,230,0.16) 54%, transparent 70%, rgba(210,80,255,0.14) 88%, transparent 100%)`,
    },
    // 3: Star — blazing amber solar
    {
      base: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.72) 0%, rgba(255,235,130,0.34) 14%, transparent 30%),
            radial-gradient(ellipse 68% 58% at 38% 33%, rgba(255,188,38,0.68) 0%, transparent 68%),
            radial-gradient(circle at 65% 68%, rgba(255,108,12,0.55) 0%, transparent 44%),
            radial-gradient(circle at 48% 40%, rgba(255,215,60,0.28) 0%, transparent 55%),
            radial-gradient(circle, #241202 0%, #160800 58%, #060200 100%)`,
      boxShadow: `0 0 ${size * .78}px rgba(255,165,22,0.62), 0 0 ${size * .38}px rgba(255,120,10,0.38), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(255,165,22,0.62) 0%, rgba(255,120,10,0.28) 42%, transparent 68%)`,
      ring: {
        color: 'rgba(255,185,38,0.45)', glow: 'rgba(255,185,38,0.80)', dur: '9s', r: 1.26,
        dots: [
          { a: 0, s: 7, c: 'rgba(255,215,65,0.98)', g: 'rgba(255,195,45,0.90)' },
          { a: Math.PI * .5, s: 5, c: 'rgba(255,175,35,0.92)', g: 'rgba(255,150,25,0.80)' },
          { a: Math.PI, s: 6, c: 'rgba(255,150,22,0.92)', g: 'rgba(255,125,15,0.78)' },
          { a: Math.PI * 1.5, s: 5, c: 'rgba(255,195,48,0.90)', g: 'rgba(255,170,35,0.78)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(255,210,50,0.22) 12%, transparent 25%, rgba(255,108,12,0.14) 50%, transparent 65%)`,
    },
    // 4: Supernova — transcendent
    {
      base: `radial-gradient(circle at 28% 21%, rgba(255,255,255,0.95) 0%, rgba(215,248,255,0.55) 14%, transparent 32%),
            radial-gradient(ellipse 70% 60% at 44% 40%, rgba(168,228,255,0.65) 0%, transparent 65%),
            radial-gradient(circle at 62% 62%, rgba(198,98,255,0.58) 0%, transparent 46%),
            radial-gradient(circle at 30% 60%, rgba(100,180,255,0.28) 0%, transparent 50%),
            radial-gradient(circle, #060a14 0%, #03060c 58%, #020308 100%)`,
      boxShadow: `0 0 ${size * .88}px rgba(178,228,255,0.65), 0 0 ${size * .48}px rgba(208,98,255,0.48), inset 0 -${Math.round(size * .06)}px ${Math.round(size * .12)}px rgba(0,0,0,.7)`,
      glowGrad: `radial-gradient(circle, rgba(178,228,255,0.62) 0%, rgba(208,98,255,0.32) 45%, transparent 68%)`,
      ring: {
        color: 'rgba(188,228,255,0.42)', glow: 'rgba(188,228,255,0.82)', dur: '8s', r: 1.28,
        dots: [
          { a: 0, s: 7, c: 'rgba(215,248,255,0.98)', g: 'rgba(188,228,255,0.92)' },
          { a: Math.PI, s: 6, c: 'rgba(195,215,255,0.95)', g: 'rgba(175,198,255,0.82)' },
        ]
      },
      ring2: {
        color: 'rgba(210,98,255,0.32)', glow: 'rgba(210,98,255,0.68)', dur: '13s reverse', r: .88,
        dots: [
          { a: Math.PI * .5, s: 5.5, c: 'rgba(230,155,255,0.95)', g: 'rgba(210,105,255,0.85)' },
          { a: Math.PI * 1.5, s: 5, c: 'rgba(160,205,255,0.90)', g: 'rgba(140,185,255,0.78)' },
        ]
      },
      swirl: `conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.20) 8%, transparent 18%, rgba(200,248,255,0.15) 40%, transparent 52%, rgba(210,98,255,0.10) 72%, transparent 85%)`,
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
