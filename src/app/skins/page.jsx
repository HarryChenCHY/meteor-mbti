'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { STAGE_SKINS, STAGES, STAGE_THRESHOLDS, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function SkinsPage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const currentStage = getStage(energy);
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="皮肤图鉴" title="陨石形态演化" sub="通过天文答题积累星星能量，解锁越来越华丽的陨石形态" />

        <div className="card p-5 mb-8 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/28 mb-1.5 tracking-wide">当前星星能量</div>
            <div className="text-2xl font-bold text-white/88 tracking-tight">⚡ {energy}</div>
            <div className="text-xs text-white/30 mt-1">当前形态：<span className="text-white/65 font-medium">{STAGES[currentStage]}</span></div>
          </div>
          <button onClick={() => router.push('/quiz')} className="btn-primary text-sm" style={{ padding: '10px 20px' }}>
            📝 去答题赚能量
          </button>
        </div>

        <div className="space-y-4">
          {STAGE_SKINS.map((skin, i) => {
            const isUnlocked = energy >= skin.threshold;
            const isCurrent = currentStage === i;
            const isNextUp = currentStage === i - 1;
            const neededEnergy = isUnlocked ? 0 : skin.threshold - energy;
            return (
              <div key={i} className={`card p-5 transition-all duration-300 ${isCurrent ? '!border-white/25' : ''} ${!isUnlocked ? 'opacity-45' : ''}`}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="shrink-0 relative flex items-center justify-center" style={{ minWidth: 120, minHeight: 120 }}>
                    <MeteorOrb size={96} level={i} glow={isUnlocked} animate={isUnlocked} />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl opacity-60">🔒</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ letterSpacing: '.02em' }}>
                        当前形态
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-white/88">{skin.name}</h3>
                      <span className={`tag text-[10px] py-0.5 px-2.5 ${skin.rarityColor}`}>{skin.rarity}</span>
                      {isCurrent && <span className="tag text-[10px] py-0.5 px-2 !border-white/25 !bg-white/06 !text-white/65">✓ 当前</span>}
                      {!isUnlocked && isNextUp && <span className="tag text-[10px] py-0.5 px-2 !border-white/15 !text-white/40">下一目标</span>}
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed mb-3">{skin.desc}</p>
                    <div className="flex items-center gap-4 justify-center md:justify-start text-xs flex-wrap">
                      <span className="text-white/28">解锁要求：{skin.threshold === 0 ? '初始解锁' : `⚡ ${skin.threshold}`}</span>
                      {isUnlocked
                        ? <span className="text-white/50 font-medium">✓ 已解锁</span>
                        : <span className="text-white/40 font-medium">还需 +{neededEnergy} 能量</span>
                      }
                    </div>
                  </div>

                  {!isUnlocked && isNextUp && (
                    <div className="shrink-0 w-36 text-center">
                      <div className="text-xs text-white/25 mb-1.5">解锁进度</div>
                      <div className="h-1.5 progress-track rounded-full">
                        <div className="energy-bar h-full rounded-full" style={{ width: `${getStageProgress(energy)}%` }} />
                      </div>
                      <p className="text-sm font-bold text-white/65 mt-1">{getStageProgress(energy)}%</p>
                      <p className="text-[10px] text-white/28 mt-0.5">再答 {Math.ceil(neededEnergy / 20)} 题</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {currentStage < 4 && (
          <div className="mt-8 text-center card p-8" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-3">📝</div>
            <p className="text-white/65 font-medium mb-1.5">答题是唯一积累星星能量的方式</p>
            <p className="text-xs text-white/28 mb-6">
              每道天文知识题答对 +20 星星能量<br />
              距下一阶段还需 ⚡ {STAGE_THRESHOLDS[currentStage + 1] - energy} 能量，约需再答 {Math.ceil((STAGE_THRESHOLDS[currentStage + 1] - energy) / 20)} 题
            </p>
            <button onClick={() => router.push('/quiz')} className="btn-primary" style={{ padding: '11px 28px' }}>
              🚀 立即去答题解锁新形态
            </button>
          </div>
        )}
        {currentStage >= 4 && (
          <div className="mt-8 text-center card p-8" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
            <div className="text-3xl mb-3">🌟</div>
            <p className="text-white/85 font-bold text-lg mb-1.5">已达传说级：超新星形态</p>
            <p className="text-xs text-white/30">你的陨石已进化至最高形态，在宇宙中熠熠生辉</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
