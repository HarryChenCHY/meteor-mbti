import { useState, useEffect, useRef } from 'react';
import { getStage } from '../constants';
import MeteorOrb from '../components/MeteorOrb';
import PlanetSphere from '../components/PlanetSphere';
import PageWrapper from '../components/PageWrapper';
import { SectionTitle } from '../components/SharedUI';

export default function HomePage({ onNavigate, energy }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(hover:hover)').matches) return;
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - .5) * 2,
        y: (e.clientY / window.innerHeight - .5) * 2,
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const planets = [
    { size: 248, style: 'pearl', x: 2, y: 4, parallax: .018, floatClass: 'animate-float-slow', delay: '0s' },
    { size: 158, style: 'violet', x: 72, y: 1, parallax: -.025, floatClass: 'animate-float', delay: '.8s', ring: true },
    { size: 88, style: 'ghost', x: 87, y: 48, parallax: .03, floatClass: 'animate-float-fast', delay: '1.5s' },
    { size: 192, style: 'lavender', x: 78, y: 66, parallax: -.02, floatClass: 'animate-float-slow', delay: '2.1s', stars: true },
    { size: 68, style: 'ice', x: 1, y: 62, parallax: .025, floatClass: 'animate-float-fast', delay: '0.4s' },
    { size: 122, style: 'deep', x: 56, y: 80, parallax: -.018, floatClass: 'animate-float', delay: '1.2s' },
    { size: 52, style: 'ghost', x: 40, y: 3, parallax: .032, floatClass: 'animate-float-fast', delay: '2.8s' },
    { size: 148, style: 'pearl', x: 12, y: 76, parallax: -.022, floatClass: 'animate-float', delay: '1.8s' },
    { size: 78, style: 'rose', x: 92, y: 20, parallax: .022, floatClass: 'animate-float-fast', delay: '3.2s' },
  ];

  const exampleCards = [
    { name: '星陨·烈焰', mbti: 'ENTJ', sign: '狮子座', lvl: 3 },
    { name: '星陨·幽蓝', mbti: 'INFP', sign: '双鱼座', lvl: 1 },
    { name: '星陨·翠灵', mbti: 'ENFP', sign: '双子座', lvl: 2 },
    { name: '星陨·暗影', mbti: 'INTJ', sign: '天蝎座', lvl: 0 },
  ];

  return (
    <PageWrapper>
      {/* HERO */}
      <section ref={containerRef} className="relative min-h-[90dvh] flex flex-col items-center justify-center text-center px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="hero-aurora" style={{
            width: '75vw', maxWidth: 680, height: '55vw', maxHeight: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(100,52,205,0.13) 0%, rgba(80,32,188,0.07) 38%, transparent 72%)',
            filter: 'blur(58px)',
          }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.28),transparent)' }} />

        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
          {planets.map((p, i) => (
            <div key={i} className={`planet-float-wrap ${p.floatClass}`} style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              transform: `translate(${mousePos.x * p.parallax * 100}px, ${mousePos.y * p.parallax * 80}px)`,
              animationDelay: p.delay,
              transition: 'transform .12s ease-out',
              pointerEvents: 'auto',
            }}>
              <PlanetSphere size={p.size} style={p.style} ring={!!p.ring} stars={!!p.stars} />
            </div>
          ))}
        </div>

        <div className="light-streak-1" style={{ left: 0 }} />
        <div className="light-streak-2" style={{ left: 0 }} />
        <div className="light-streak-3" style={{ left: 0 }} />

        <div className="relative z-10 fade-in max-w-4xl mx-auto">
          <div className="mb-7 flex justify-center scale-90 sm:scale-100">
            <MeteorOrb size={110} level={getStage(energy)} glow={true} animate={true} />
          </div>
          <h1 className="hero-headline mx-auto px-2">星陨人格宇宙</h1>
          <p className="text-sm text-white/30 mt-3 tracking-[.22em] uppercase font-light">Meteor MBTI Universe</p>
          <p className="mt-6 text-base md:text-lg text-white/45 max-w-xl mx-auto leading-relaxed font-light">
            把你的性格、星座、记忆与宇宙信息<br />
            铸造成唯一的<span className="text-white/75 font-medium">陨石生命体</span>
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            <button onClick={() => onNavigate('create')} className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
              🌠 立即生成我的陨石
            </button>
            <button onClick={() => onNavigate('shop')} className="btn-outline" style={{ padding: '12px 24px', fontSize: '15px' }}>
              积分商城
            </button>
          </div>
        </div>
      </section>

      {/* EXAMPLE CARDS */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="已诞生的星陨" title="每颗都独一无二" sub="承载着主人的灵魂印记" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exampleCards.map((c, i) => (
            <div key={i} className="card p-5 text-center fade-in" style={{ animationDelay: `${i * .08}s` }}>
              <div className="flex justify-center mb-4" style={{ minHeight: 120, alignItems: 'center' }}>
                <MeteorOrb size={72} level={c.lvl} animate={true} />
              </div>
              <h3 className="font-medium text-white/85 text-sm">{c.name}</h3>
              <div className="mt-2 flex gap-1 justify-center flex-wrap">
                <span className="tag">{c.mbti}</span>
                <span className="tag">{c.sign}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-4xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="铸造逻辑" title="六维参数，AI 推演专属陨石" />
        <div className="flex flex-wrap justify-center items-center gap-2 text-center">
          {['MBTI', '星座', '血型', '年龄', '照片', 'AI推演'].map((t, i) => (
            <span key={i} className="contents">
              <div className="card px-5 py-3 text-sm font-medium text-white/65">{t}</div>
              {i < 5 && <span className="text-white/20 text-lg">+</span>}
            </span>
          ))}
          <span className="text-white/20 text-lg mx-2">=</span>
          <div className="card px-5 py-3 text-sm font-medium text-white/85" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>专属陨石人格</div>
        </div>
      </section>

      {/* GROWTH */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="成长系统" title="答题积累能量，解锁华丽形态" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📝', title: '天文答题', desc: '回答天文知识题，每题答对 +20 星星能量', action: '去答题', page: 'quiz' },
            { icon: '🌱', title: '陨石养成', desc: '持续喂养让陨石从胚芽进化到超新星形态', action: '去养成', page: 'cultivate' },
            { icon: '🎁', title: '积分兑换', desc: '用积累的星星能量兑换天文馆专属奖品', action: '去商城', page: 'shop' },
          ].map((item, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-medium text-white/82 mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-white/35 mb-5 leading-relaxed">{item.desc}</p>
              <button onClick={() => onNavigate(item.page)} className="btn-outline text-xs" style={{ padding: '8px 18px' }}>
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <SectionTitle eyebrow="永生机制" title="宇宙档案 · 永恒存在" />
        <div className="card p-10 text-white/40 text-sm leading-relaxed">
          每颗陨石人格一经铸造，即获得永久宇宙编号。它的成长记录、性格演化、星轨数据将被永久收录在星际档案馆中。即使星海变迁，你的陨石也将在这片数字宇宙中永恒闪耀。
        </div>
      </section>

      <footer className="border-t border-white/05 py-10 text-center text-white/20 text-xs">
        <p className="mb-1">🌠 星际档案馆 · Meteor MBTI Universe</p>
        <p>© 2026 星陨人格宇宙 — 你的灵魂，值得一颗星</p>
      </footer>
    </PageWrapper>
  );
}
