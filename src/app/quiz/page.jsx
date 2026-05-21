'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { MOCK_QUIZ } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function QuizPage() {
  const router = useRouter();
  const { addEnergy } = useEnergy();
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = MOCK_QUIZ[qi];

  const answer = (i) => {
    setChosen(i);
    if (i === q.ans) { setScore(s => s + 20); setStreak(s => s + 1); addEnergy(20); }
    else { setStreak(0); }
    setTimeout(() => {
      setChosen(null);
      const next = qi + 1;
      if (next >= MOCK_QUIZ.length) { setFinished(true); }
      else { setQi(next); }
    }, 1200);
  };

  if (finished) return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-5 py-16 text-center">
        <div className="flex justify-center mb-6">
          <MeteorOrb size={110} level={Math.min(Math.floor(score / 200), 4)} glow={true} animate={true} />
        </div>
        <h2 className="text-2xl font-bold text-white/88 mb-2 tracking-tight">答题完成！</h2>
        <p className="text-white/40 mb-2">本轮获得 <span className="text-xl font-bold text-white/82">{score}</span> 星星能量</p>
        <p className="text-xs text-white/22 mb-10">能量已同步到你的陨石成长值</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => { setQi(0); setScore(0); setStreak(0); setFinished(false); }} className="btn-primary">再来一轮 🔄</button>
          <button onClick={() => router.push('/shop')} className="btn-outline">去兑换奖品 🎁</button>
          <button onClick={() => router.push('/cultivate')}
            className="text-xs text-white/25 hover:text-white/55 underline underline-offset-4 transition-colors">
            查看陨石成长
          </button>
        </div>
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-5 py-16">
        <div className="flex items-start justify-between mb-8 gap-4">
          <SectionTitle eyebrow={`第 ${qi + 1} 题 / 共 ${MOCK_QUIZ.length} 题`} title="天文知识挑战" />
          <div className="text-right shrink-0 pt-1">
            <div className="text-xs text-white/28">本轮得分</div>
            <div className="text-2xl font-bold text-white/82">{score}</div>
            {streak >= 2 && <div className="text-xs text-white/45 mt-0.5">🔥 连续 {streak}</div>}
          </div>
        </div>

        <div className="card p-7">
          <div className="flex items-center gap-3 mb-5">
            <MeteorOrb size={34} level={0} glow={false} animate={false} />
            <span className="text-xs text-white/28">正在喂养：星陨·织梦者 · 答对 +20 ⚡</span>
          </div>
          <h3 className="text-lg font-semibold text-white/88 mb-6 leading-snug">{q.q}</h3>
          <div className="space-y-2.5">
            {q.opts.map((o, i) => {
              let cls = 'card p-4 cursor-pointer text-sm transition-all w-full text-left ';
              if (chosen !== null) {
                if (i === q.ans) cls += '!border-white/45 !bg-white/06 text-white/90';
                else if (i === chosen) cls += '!border-white/15 !bg-white/03 text-white/25';
                else cls += 'opacity-30';
              } else cls += 'hover:!border-white/22 text-white/65 hover:text-white/85';
              return <button key={i} onClick={() => chosen === null && answer(i)} className={cls}>{o}</button>;
            })}
          </div>
          {chosen !== null && (
            <div className={`mt-4 text-sm text-center font-medium ${chosen === q.ans ? 'text-white/75' : 'text-white/40'}`}>
              {chosen === q.ans ? '✨ 正确！+20 星星能量' : '💫 加油，下次一定！'}
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {MOCK_QUIZ.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i < qi ? 'bg-white/55' : i === qi ? 'bg-white/88' : 'bg-white/12'}`} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
