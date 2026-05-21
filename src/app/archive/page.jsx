'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { MOCK_ARCHIVE, STAGES, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function ArchivePage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const a = MOCK_ARCHIVE;
  const stage = getStage(energy);
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="宇宙档案" title="你的专属星际身份证" />
        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-4">
            <div className="card p-7 text-center">
              <div className="text-5xl mb-3">{a.avatar}</div>
              <h3 className="font-semibold text-white/82">{a.nickname}</h3>
              <p className="text-white/30 text-xs mt-1">宇宙旅人</p>
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/35">星星能量</span>
                  <span className="text-white/65 font-medium">{energy}</span>
                </div>
                <div className="h-1.5 progress-track rounded-full">
                  <div className="energy-bar h-full rounded-full" style={{ width: `${Math.min(getStageProgress(energy), 100)}%` }} />
                </div>
                <p className="text-xs text-white/28 mt-1.5">{STAGES[stage]} · 阶段 {stage + 1}/5</p>
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="flex justify-center"><MeteorOrb size={90} level={stage} glow={true} animate={true} /></div>
              <p className="font-medium text-white/72 mt-3 text-sm">{a.meteorName}</p>
              <p className="text-xs text-white/30 mt-0.5">{STAGES[stage]}</p>
            </div>
            <button onClick={() => router.push('/quiz')} className="btn-primary w-full justify-center text-sm">📝 去答题赚取能量 →</button>
            <button onClick={() => router.push('/shop')} className="btn-outline w-full text-sm">🎁 前往积分商城 →</button>
          </div>

          <div className="space-y-3">
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-3 tracking-wide">🔮 技能列表</h3>
              <div className="space-y-3">
                {a.skills.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/65 w-20 shrink-0">{s.name}</span>
                    <div className="flex-1 h-1 bg-white/06 rounded-full overflow-hidden">
                      <div className="h-full bg-white/45 rounded-full" style={{ width: `${s.lv * 30}%` }} />
                    </div>
                    <span className="text-xs text-white/38 w-10 text-right">Lv.{s.lv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-3 tracking-wide">📅 成长时间线</h3>
              <div className="space-y-3 border-l border-white/08 pl-4">
                {a.timeline.map((t, i) => (
                  <div key={i}>
                    <span className="text-xs text-white/30">{t.date}</span>
                    <p className="text-sm text-white/55 mt-0.5">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <h3 className="text-xs text-white/38 mb-2 tracking-wide">🔭 最近占卜播报</h3>
              <p className="text-sm text-white/50">{a.recentDivine}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
