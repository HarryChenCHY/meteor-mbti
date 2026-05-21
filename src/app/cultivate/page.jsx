'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { STAGES, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function CultivatePage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const stage = getStage(energy);
  const progress = getStageProgress(energy);
  const skills = [
    { name: '星语感应', lv: 2, max: 5 },
    { name: '梦境编织', lv: 1, max: 5 },
    { name: '星尘护盾', lv: 1, max: 5 },
    { name: '时空漫步', lv: 0, max: 5 },
  ];
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="陨石培育舱" title="用星星能量喂养你的陨石" />
        <div className="grid md:grid-cols-[1fr_280px] gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <div className="orbit w-full h-full opacity-20" style={{ animation: 'spin 22s linear infinite' }} />
              <div className="orbit absolute" style={{ width: '75%', height: '75%', opacity: .12, animation: 'spin 14s linear infinite reverse' }} />
              <div className="orbit absolute" style={{ width: '52%', height: '52%', opacity: .08, animation: 'spin 9s linear infinite' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <MeteorOrb size={130} level={stage} glow={true} animate={true} />
              </div>
            </div>
            <p className="text-base font-semibold text-white/82 tracking-tight">{STAGES[stage]}</p>
            <p className="text-xs text-white/30 mt-1">阶段 {stage + 1}/{STAGES.length}</p>
            <div className="w-full max-w-md mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/35">阶段进度</span>
                <span className="text-white/60 font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 progress-track rounded-full">
                <div className="energy-bar h-full rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-white/25 mt-2 text-center">总星星能量：{energy}</p>
            </div>
            <div className="flex gap-3 mt-8">
              {STAGES.map((s, i) => (
                <div key={i} className={`text-center transition-all ${i <= stage ? 'opacity-100' : 'opacity-20'}`}>
                  <div className="flex justify-center mb-1">
                    <MeteorOrb size={32} level={i} glow={i === stage} animate={false} />
                  </div>
                  <p className="text-[9px] text-white/35 w-12 text-center leading-tight">{s.replace('形态', '')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/65 mb-3">⚡ 积累能量</h3>
              <div className="space-y-2">
                <button onClick={() => router.push('/quiz')} className="btn-primary w-full justify-center text-xs" style={{ padding: '11px' }}>
                  📝 去答题获取能量 +20/题
                </button>
                <p className="text-[10px] text-white/25 text-center pt-1">答题是积累星星能量的唯一方式</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/45 mb-3">🌿 技能树</h3>
              {skills.map(s => (
                <div key={s.name} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/55">{s.name}</span>
                    <span className="text-white/35">Lv.{s.lv}/{s.max}</span>
                  </div>
                  <div className="h-1 bg-white/06 rounded-full overflow-hidden">
                    <div className="h-full bg-white/35 rounded-full" style={{ width: `${(s.lv / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/38 mb-2">✨ 稀有度</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`text-base ${i <= stage + 1 ? 'text-white/75' : 'text-white/10'}`}>★</span>
                ))}
              </div>
            </div>
            <button onClick={() => router.push('/shop')} className="btn-outline w-full text-xs" style={{ padding: '11px' }}>
              🎁 用能量兑换奖品
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
