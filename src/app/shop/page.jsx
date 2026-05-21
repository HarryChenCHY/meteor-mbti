'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { SHOP_ITEMS, CAT_COLORS, STAGE_SKINS, STAGES, getStage, getStageProgress, STAGE_THRESHOLDS } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';
import GlowCard from '@/components/GlowCard';

export default function ShopPage() {
  const router = useRouter();
  const { energy, spendEnergy } = useEnergy();
  const [cat, setCat] = useState('全部');
  const [modal, setModal] = useState(null);
  const [redeemed, setRedeemed] = useState({});
  const [toast, setToast] = useState('');
  const cats = ['全部', '周边', '特权', '限定'];
  const filtered = cat === '全部' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.cat === cat);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const confirm = (item) => {
    spendEnergy(item.cost);
    setRedeemed(r => ({ ...r, [item.id]: true }));
    setModal(null);
    showToast(`✨ 兑换成功！${item.name} 已加入你的星际邮包`);
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="积分商城" title="用星星能量兑换专属奖励" />

        <GlowCard className="p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/30 mb-1.5 tracking-wide">当前星星能量</div>
            <div className="text-3xl font-bold text-white/88 tracking-tight">⚡ {energy}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/25 mb-2">答题赚取更多能量</div>
            <button onClick={() => router.push('/quiz')} className="btn-outline text-xs" style={{ padding: '8px 16px' }}>📝 去答题</button>
          </div>
        </GlowCard>

        <GlowCard className="p-5 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sm text-white/72">✨ 陨石皮肤图鉴</h3>
              <p className="text-[10px] text-white/28 mt-0.5">星星能量越多，形态越华丽绚烂</p>
            </div>
            <button onClick={() => router.push('/skins')} className="btn-outline text-xs" style={{ padding: '7px 14px' }}>查看详情 →</button>
          </div>
          <div className="flex items-end justify-center gap-5 py-1">
            {STAGE_SKINS.map((skin, i) => {
              const unlocked = energy >= skin.threshold;
              const isCurrent = getStage(energy) === i;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`transition-all duration-300 ${!unlocked ? 'opacity-18 grayscale' : ''}`}
                    style={{ transform: isCurrent ? 'scale(1.32)' : 'scale(1)', transformOrigin: 'bottom center' }}>
                    <MeteorOrb size={36} level={i} glow={unlocked} animate={false} />
                  </div>
                  <p className={`text-[9px] text-center leading-tight ${isCurrent ? 'text-white/75 font-medium' : 'text-white/22'}`}>
                    {skin.name.replace('形态', '')}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[10px] text-white/25 mt-3">
            当前：<span className="text-white/60">{STAGES[getStage(energy)]}</span>
            {getStage(energy) < 4
              ? <span>　·　距下一阶段还需 <span className="text-white/65 font-semibold">⚡ {STAGE_THRESHOLDS[getStage(energy) + 1] - energy}</span></span>
              : <span className="text-white/50 ml-1">· 已达最高形态 🌟</span>
            }
          </p>
        </GlowCard>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`pill-tab ${cat === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {filtered.map(item => {
            const canAfford = energy >= item.cost;
            const isRedeemed = redeemed[item.id];
            return (
              <div key={item.id} className={`transition-all ${isRedeemed ? 'opacity-55' : ''}`}>
                <GlowCard className="p-4 flex flex-col h-full">
                <div className="text-3xl text-center mb-3">{item.icon}</div>
                <h3 className="font-medium text-sm text-white/82 mb-1 text-center">{item.name}</h3>
                <p className="text-xs text-white/32 mb-3 text-center leading-relaxed flex-1">{item.desc}</p>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`tag text-[10px] py-0.5 px-2 ${CAT_COLORS[item.cat] || ''}`}>{item.cat}</span>
                  <span className="text-[10px] text-white/22">余 {item.left}</span>
                </div>
                <div className="text-center font-semibold mb-3">
                  <span className={canAfford && !isRedeemed ? 'text-white/72' : 'text-white/22'}>⚡ {item.cost}</span>
                </div>
                <button
                  disabled={isRedeemed || !canAfford}
                  onClick={() => !isRedeemed && canAfford && setModal(item)}
                  className={`w-full text-xs py-2 rounded-lg font-medium transition-all ${
                    isRedeemed ? 'border border-white/22 text-white/38' :
                    canAfford ? 'btn-primary justify-center' : 'border border-white/08 text-white/22 cursor-not-allowed'
                  }`}>
                  {isRedeemed ? '✓ 已兑换' : canAfford ? '立即兑换' : '能量不足'}
                </button>
                </GlowCard>
              </div>
            );
          })}
        </div>

        <GlowCard className="mt-8 p-5">
          <h3 className="text-sm font-medium text-white/38 mb-2.5">⚡ 如何获取星星能量？</h3>
          <div className="flex items-start gap-2 text-xs text-white/30">
            <span>📝</span>
            <span>参与<button onClick={() => router.push('/quiz')} className="text-white/55 underline underline-offset-2 mx-1 hover:text-white/75 transition-colors">天文知识答题</button>，每题答对 +20 星星能量。答题是积累能量的唯一途径。</span>
          </div>
        </GlowCard>

        {modal && (
          <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setModal(null)}>
            <div className="card p-7 max-w-sm w-full page-enter" onClick={e => e.stopPropagation()}>
              <div className="text-4xl text-center mb-4">{modal.icon}</div>
              <h3 className="text-lg font-semibold text-white/88 text-center mb-1">{modal.name}</h3>
              <p className="text-xs text-white/35 text-center mb-6">{modal.desc}</p>
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between items-center card p-3.5">
                  <span className="text-sm text-white/38">所需能量</span>
                  <span className="text-lg font-bold text-white/82">⚡ {modal.cost}</span>
                </div>
                <div className="flex justify-between items-center card p-3.5">
                  <span className="text-sm text-white/38">兑换后余额</span>
                  <span className="text-lg font-bold text-white/65">⚡ {energy - modal.cost}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 btn-outline text-sm">取消</button>
                <button onClick={() => confirm(modal)} className="flex-1 btn-primary justify-center text-sm">确认兑换</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] card px-5 py-3 text-sm text-white/75 whitespace-nowrap page-enter"
            style={{ borderColor: 'rgba(255,255,255,0.18)', background: '#1a1a1a' }}>
            {toast}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
