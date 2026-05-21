'use client';
import { useRouter } from 'next/navigation';
import { MOCK_RESULT } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { InfoCard } from '@/components/SharedUI';

export default function ResultPage() {
  const router = useRouter();
  const d = MOCK_RESULT;
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-[320px_1fr] gap-10">
          <div className="flex flex-col items-center">
            <div className="page-enter">
              <MeteorOrb size={220} level={2} glow={true} animate={true} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white/90 tracking-tight">{d.name}</h1>
            <p className="text-white/28 text-xs mt-2 tracking-widest font-light">{d.id}</p>
            <div className="flex gap-1 mt-4 flex-wrap justify-center">
              {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="mt-8 flex gap-3 flex-wrap justify-center w-full">
              <button onClick={() => router.push('/archive')} className="btn-primary text-sm">💾 存入宇宙档案</button>
              <button onClick={() => router.push('/cultivate')} className="btn-outline text-sm">🌱 开始培育陨石</button>
              <button onClick={() => router.push('/create')}
                className="text-xs text-white/25 hover:text-white/55 underline underline-offset-4 mt-2 w-full text-center transition-colors">
                重新铸造
              </button>
            </div>
          </div>

          <div className="space-y-3 fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              <InfoCard icon="🪐" label="星球代码" value={d.planetCode} />
              <InfoCard icon="🧬" label="MBTI映射" value={d.mbti} />
              <InfoCard icon="⭐" label="守护星宿" value={d.star} />
              <InfoCard icon="🌱" label="成长阶段" value={d.stage} />
              <InfoCard icon="♓" label="星座" value={d.sign} />
              <InfoCard icon="🛤" label="行动轨迹" value={d.trajectory.join(' ')} />
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">📖 性格描述</h3>
              <p className="text-white/55 text-sm leading-relaxed">{d.desc}</p>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">🔮 初始技能</h3>
              <div className="flex gap-1.5 flex-wrap">
                {d.skills.map(s => <span key={s} className="tag !text-white/60 !border-white/15">{s}</span>)}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">💫 羁绊说明</h3>
              <p className="text-white/50 text-sm leading-relaxed">{d.bindDesc}</p>
            </div>
            <div className="card p-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <h3 className="text-xs text-white/45 mb-2 tracking-wide">📡 今日宇宙播报</h3>
              <p className="text-white/55 text-sm leading-relaxed">{d.broadcast}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
