import { useEffect, useRef } from 'react';

export default function StarsCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let stars = [], raf;

    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      init();
    }

    function init() {
      stars = [];
      for (let i = 0; i < 260; i++) {
        const big = Math.random() < 0.07;
        const purple = Math.random() < 0.22;
        const rnd = Math.random();
        stars.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          r: big ? (rnd * 0.7 + 0.9) : (rnd * 0.55 + 0.18),
          a: Math.random() * (big ? .82 : .62) + 0.12,
          maxA: big ? .94 : .72,
          da: Math.random() * 0.007 - 0.0035,
          speed: Math.random() * 0.1 + 0.018,
          purple, big,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > s.maxA || s.a < 0.06) s.da *= -1;
        s.y -= s.speed;
        if (s.y < -5) { s.y = c.height + 5; s.x = Math.random() * c.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.purple ? `rgba(200,165,255,${s.a})` : `rgba(255,255,255,${s.a})`;
        ctx.fill();
        if (s.big && s.a > 0.46) {
          const len = s.r * 4;
          ctx.strokeStyle = s.purple ? `rgba(200,165,255,${s.a * .3})` : `rgba(255,255,255,${s.a * .3})`;
          ctx.lineWidth = .4;
          ctx.beginPath(); ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len); ctx.stroke();
        }
      });
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
    />
  );
}
