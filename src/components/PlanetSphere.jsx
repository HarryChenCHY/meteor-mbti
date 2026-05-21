export default function PlanetSphere({ size, style = 'pearl', ring = false, stars = false, extraStyle = {} }) {
  const s = size;
  const defs = {
    pearl: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,1) 0%, rgba(238,232,255,0.68) 11%, transparent 26%),
          radial-gradient(ellipse 65% 55% at 38% 33%, rgba(198,190,240,0.52) 0%, transparent 62%),
          radial-gradient(circle at 68% 70%, rgba(88,68,152,0.28) 0%, transparent 42%),
          radial-gradient(circle, #cec8ec 0%, #6858a2 52%, #131020 100%)`,
      glow: `radial-gradient(circle, rgba(180,155,255,0.32) 0%, rgba(140,118,220,0.12) 44%, transparent 70%)`,
      shadow: `0 0 ${s * .55}px rgba(158,138,255,0.48), 0 0 ${s * .22}px rgba(198,188,255,0.36), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(188,162,255,0.32)', ringShadow: 'rgba(168,138,255,0.5)',
    },
    violet: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.96) 0%, rgba(224,172,255,0.42) 15%, transparent 30%),
          radial-gradient(ellipse 68% 58% at 40% 35%, rgba(158,72,248,0.74) 0%, transparent 60%),
          radial-gradient(circle at 68% 70%, rgba(80,16,178,0.54) 0%, transparent 42%),
          radial-gradient(circle, #9238e0 0%, #4812a8 52%, #0d0318 100%)`,
      glow: `radial-gradient(circle, rgba(162,58,255,0.5) 0%, rgba(118,38,222,0.22) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .72}px rgba(162,52,255,0.62), 0 0 ${s * .32}px rgba(202,98,255,0.44), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(192,128,255,0.35)', ringShadow: 'rgba(172,88,255,0.55)',
    },
    lavender: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.9) 0%, rgba(208,182,255,0.5) 17%, transparent 33%),
          radial-gradient(ellipse 65% 58% at 38% 33%, rgba(138,108,222,0.64) 0%, transparent 65%),
          radial-gradient(circle at 66% 68%, rgba(95,52,202,0.38) 0%, transparent 42%),
          radial-gradient(circle, #a888da 0%, #5c48bc 55%, #120828 100%)`,
      glow: `radial-gradient(circle, rgba(150,108,242,0.4) 0%, rgba(108,78,202,0.16) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .58}px rgba(138,95,248,0.5), 0 0 ${s * .25}px rgba(178,142,255,0.38), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(178,148,255,0.3)', ringShadow: 'rgba(158,118,255,0.48)',
    },
    ice: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.94) 0%, rgba(175,242,255,0.44) 15%, transparent 30%),
          radial-gradient(ellipse 68% 58% at 40% 35%, rgba(62,198,248,0.65) 0%, transparent 62%),
          radial-gradient(circle at 68% 70%, rgba(14,130,198,0.38) 0%, transparent 42%),
          radial-gradient(circle, #58b8e2 0%, #1868a8 55%, #030a1c 100%)`,
      glow: `radial-gradient(circle, rgba(38,178,248,0.42) 0%, rgba(18,132,202,0.16) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .52}px rgba(32,178,248,0.44), 0 0 ${s * .22}px rgba(108,218,255,0.34), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(128,218,255,0.28)', ringShadow: 'rgba(88,198,255,0.45)',
    },
    rose: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.92) 0%, rgba(255,195,228,0.44) 15%, transparent 30%),
          radial-gradient(ellipse 68% 58% at 40% 35%, rgba(222,98,178,0.64) 0%, transparent 62%),
          radial-gradient(circle at 68% 70%, rgba(162,38,122,0.38) 0%, transparent 42%),
          radial-gradient(circle, #ca6eaa 0%, #782858 55%, #14040e 100%)`,
      glow: `radial-gradient(circle, rgba(222,72,158,0.4) 0%, rgba(182,48,122,0.16) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .55}px rgba(222,72,158,0.46), 0 0 ${s * .22}px rgba(255,142,202,0.34), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(255,168,218,0.28)', ringShadow: 'rgba(235,128,195,0.45)',
    },
    deep: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.52) 0%, rgba(178,138,255,0.24) 18%, transparent 36%),
          radial-gradient(ellipse 65% 55% at 38% 33%, rgba(95,52,182,0.44) 0%, transparent 62%),
          radial-gradient(circle at 66% 68%, rgba(55,16,142,0.32) 0%, transparent 42%),
          radial-gradient(circle, #3c1558 0%, #180830 55%, #04010a 100%)`,
      glow: `radial-gradient(circle, rgba(98,38,202,0.38) 0%, rgba(68,22,162,0.14) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .6}px rgba(98,36,208,0.4), 0 0 ${s * .25}px rgba(138,58,242,0.3), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(148,88,255,0.25)', ringShadow: 'rgba(118,58,225,0.42)',
    },
    ghost: {
      bg: `radial-gradient(circle at 29% 24%, rgba(255,255,255,0.65) 0%, rgba(196,196,218,0.24) 18%, transparent 36%),
          radial-gradient(ellipse 65% 55% at 38% 33%, rgba(135,135,170,0.3) 0%, transparent 65%),
          radial-gradient(circle at 66% 68%, rgba(65,65,98,0.2) 0%, transparent 42%),
          radial-gradient(circle, #525265 0%, #262635 55%, #070709 100%)`,
      glow: `radial-gradient(circle, rgba(112,112,155,0.22) 0%, rgba(80,80,122,0.08) 42%, transparent 68%)`,
      shadow: `0 0 ${s * .34}px rgba(115,115,158,0.26), 0 ${s * .08}px ${s * .3}px rgba(0,0,0,0.88)`,
      ringColor: 'rgba(168,168,200,0.2)', ringShadow: 'rgba(148,148,185,0.35)',
    },
  };

  const def = defs[style] || defs.pearl;
  const starCount = stars ? 10 : 0;
  const starR = s * 1.55;

  return (
    <div style={{
      position: 'relative',
      width: s * (ring || stars ? 1.65 : 1),
      height: s * (ring || stars ? 1.65 : 1),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {/* Atmospheric glow aura */}
      <div style={{
        position: 'absolute', width: s * 2.4, height: s * 2.4,
        left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        borderRadius: '50%', background: def.glow,
        animation: 'pulseGlow 5s ease-in-out infinite', pointerEvents: 'none',
      }} />

      {/* Saturn-style ring */}
      {ring && (
        <div style={{
          position: 'absolute',
          width: s * 1.54, height: s * .44,
          left: '50%', top: '50%',
          transform: 'translate(-50%,-50%) rotateX(68deg)',
          borderRadius: '50%',
          border: `${Math.max(2, s * .036)}px solid ${def.ringColor}`,
          boxShadow: `0 0 ${s * .14}px ${def.ringShadow}, inset 0 0 ${s * .08}px ${def.ringShadow}`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Orbiting star particles */}
      {starCount > 0 && (
        <div style={{
          position: 'absolute', width: starR * 2, height: starR * 2,
          left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          borderRadius: '50%', border: '1px solid rgba(198,168,255,0.08)',
          animation: 'spin 30s linear infinite', pointerEvents: 'none',
        }}>
          {Array.from({ length: starCount }).map((_, i) => {
            const a = (i / starCount) * Math.PI * 2;
            const sz = i % 3 === 0 ? 4 : 2.5;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `calc(50% + ${Math.cos(a) * starR}px - ${sz / 2}px)`,
                top: `calc(50% + ${Math.sin(a) * starR}px - ${sz / 2}px)`,
                width: sz, height: sz, borderRadius: '50%',
                background: 'rgba(212,188,255,0.88)',
                boxShadow: `0 0 ${sz * 2.5}px rgba(192,162,255,0.72)`,
                animation: `twinkle ${2.2 + i * .38}s ease-in-out infinite`,
                animationDelay: `${i * .22}s`,
              }} />
            );
          })}
        </div>
      )}

      {/* Core sphere */}
      <div style={{
        width: s, height: s, borderRadius: '50%',
        background: def.bg,
        boxShadow: def.shadow,
        flexShrink: 0, ...extraStyle,
      }} />
    </div>
  );
}
