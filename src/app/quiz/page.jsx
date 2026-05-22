'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { useQuizProgress } from '@/lib/quiz-progress';
import { QUIZ_TOPICS, DIFFICULTIES, QUIZ_QUESTIONS } from '@/lib/quiz-data';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';
import GlowCard from '@/components/GlowCard';

const SESSION_SIZE = 12;
const PASS_SCORE = 9;

function pickQuestions(topicId, difficulty) {
  const pool = QUIZ_QUESTIONS.filter(q => q.topic === topicId && q.difficulty === difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(SESSION_SIZE, shuffled.length));
}

export default function QuizPage() {
  const router = useRouter();
  const { addEnergy } = useEnergy();
  const { progress, recordSession, hydrated } = useQuizProgress();

  const [view, setView] = useState('topic'); // topic | difficulty | session | result
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeDifficulty, setActiveDifficulty] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [resultMeta, setResultMeta] = useState(null);

  const startSession = (topicId, difficulty) => {
    const qs = pickQuestions(topicId, difficulty);
    if (qs.length === 0) return;
    setSessionQuestions(qs);
    setActiveTopic(topicId);
    setActiveDifficulty(difficulty);
    setQi(0); setChosen(null); setCorrect(0); setStreak(0); setMaxStreak(0);
    setView('session');
  };

  const finishSession = (finalCorrect) => {
    const result = recordSession({
      topicId: activeTopic,
      difficulty: activeDifficulty,
      correctCount: finalCorrect,
      total: sessionQuestions.length,
    });
    let bonus = 0;
    if (result.passed) bonus += 50;
    if (result.newSkin) bonus += 100;
    if (bonus > 0) addEnergy(bonus);
    setCorrect(finalCorrect);
    setResultMeta({ ...result, bonus });
    setView('result');
  };

  const answer = (i) => {
    if (chosen !== null) return;
    const q = sessionQuestions[qi];
    const isCorrect = i === q.ans;
    setChosen(i);
    const newCorrect = correct + (isCorrect ? 1 : 0);
    let newStreak = streak;
    if (isCorrect) {
      newStreak = streak + 1;
      setCorrect(newCorrect);
      setStreak(newStreak);
      setMaxStreak(s => Math.max(s, newStreak));
      let energyGained = 20;
      if (newStreak > 0 && newStreak % 3 === 0) energyGained += 10;
      addEnergy(energyGained);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setChosen(null);
      const next = qi + 1;
      if (next >= sessionQuestions.length) finishSession(newCorrect);
      else setQi(next);
    }, 1600);
  };

  if (!hydrated) {
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-5 py-16 text-center text-white/40">载入进度中…</div>
      </PageWrapper>
    );
  }

  if (view === 'session') {
    const q = sessionQuestions[qi];
    const topicMeta = QUIZ_TOPICS.find(t => t.id === activeTopic);
    const diffMeta = DIFFICULTIES.find(d => d.key === activeDifficulty);
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-5 py-16">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <span className="eyebrow">{topicMeta?.icon} {topicMeta?.name} · {diffMeta?.name}</span>
              <h2 className="text-2xl font-semibold text-white/92 tracking-tight">第 {qi + 1} / {sessionQuestions.length} 题</h2>
            </div>
            <div className="text-right shrink-0 pt-1">
              <div className="text-xs text-white/28">答对</div>
              <div className="text-2xl font-bold text-white/82">{correct}</div>
              {streak >= 2 && <div className="text-xs text-white/45 mt-0.5">🔥 连续 {streak}</div>}
            </div>
          </div>

          <GlowCard className="p-7">
            <div className="flex items-center gap-3 mb-5">
              <MeteorOrb size={34} level={0} glow={false} animate={false} />
              <span className="text-xs text-white/28">答对 +20⚡ · 连击三题额外 +10⚡</span>
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
                return <button key={i} onClick={() => answer(i)} className={cls}>{o}</button>;
              })}
            </div>
            {chosen !== null && (
              <div className="mt-5 pt-4 border-t border-white/08">
                <div className={`text-sm font-medium mb-2 ${chosen === q.ans ? 'text-white/80' : 'text-white/45'}`}>
                  {chosen === q.ans ? '✨ 正确!' : '💫 答错了'}
                </div>
                {q.explanation && <p className="text-xs text-white/40 leading-relaxed">{q.explanation}</p>}
              </div>
            )}
          </GlowCard>

          <div className="mt-5 flex justify-center gap-1.5">
            {sessionQuestions.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i < qi ? 'bg-white/55' : i === qi ? 'bg-white/88' : 'bg-white/12'}`} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setView('topic')} className="text-xs text-white/30 hover:text-white/60 underline underline-offset-4">
              放弃本轮,返回主题选择
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (view === 'result') {
    const topicMeta = QUIZ_TOPICS.find(t => t.id === activeTopic);
    const diffMeta = DIFFICULTIES.find(d => d.key === activeDifficulty);
    const passed = resultMeta?.passed;
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-5 py-16 text-center">
          <div className="flex justify-center mb-6">
            <MeteorOrb size={110} level={Math.min(Math.floor(correct / 3), 4)} glow={passed} animate={passed} />
          </div>
          <span className="eyebrow">{topicMeta?.icon} {topicMeta?.name} · {diffMeta?.name}</span>
          <h2 className="text-2xl font-bold text-white/92 mb-3 tracking-tight">
            {passed ? '🎉 通关成功!' : '差一点就过啦'}
          </h2>
          <p className="text-white/55 mb-2">
            答对 <span className="text-2xl font-bold text-white/88">{correct}</span> / {sessionQuestions.length} 题
          </p>
          <p className="text-xs text-white/30 mb-8">
            通关需要 {PASS_SCORE} 题正确 · 最长连击 {maxStreak}
          </p>

          {resultMeta?.bonus > 0 && (
            <div className="mb-6 p-4 rounded-xl bg-white/04 border border-white/10">
              <p className="text-xs text-white/40 mb-1">本轮奖励</p>
              <p className="text-xl font-bold text-white/85">+{resultMeta.bonus}⚡ 星星能量</p>
            </div>
          )}

          {resultMeta?.newSkin && topicMeta && (
            <div className="mb-6 p-5 rounded-xl border-2" style={{ borderColor: topicMeta.skinColor + '66', background: topicMeta.skinColor + '11' }}>
              <p className="text-xs text-white/50 mb-2 tracking-wide">🎁 解锁专属皮肤</p>
              <p className="text-lg font-bold mb-1" style={{ color: topicMeta.skinColor }}>{topicMeta.skinName}</p>
              <p className="text-xs text-white/40">通关 {topicMeta.name} 高级的专属奖励</p>
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => startSession(activeTopic, activeDifficulty)} className="btn-primary">再挑战一次 🔄</button>
            <button onClick={() => setView('difficulty')} className="btn-outline">换难度</button>
            <button onClick={() => setView('topic')} className="btn-outline">返回主题</button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (view === 'difficulty' && activeTopic) {
    const topicMeta = QUIZ_TOPICS.find(t => t.id === activeTopic);
    const tp = progress.topics[activeTopic];
    return (
      <PageWrapper>
        <div className="max-w-2xl mx-auto px-5 py-16">
          <button onClick={() => setView('topic')} className="text-xs text-white/35 hover:text-white/70 mb-6">← 返回主题</button>
          <SectionTitle eyebrow={`${topicMeta.icon} ${topicMeta.name}`} title="选择难度" sub="依次通关每个难度,高级通关解锁专属陨石皮肤" />

          <div className="space-y-4">
            {DIFFICULTIES.map(d => {
              const status = tp[d.key];
              const locked = status === 'locked';
              const passed = status === 'passed';
              const bestKey = `${activeTopic}-${d.key}`;
              const best = progress.stats.topicBest[bestKey];
              return (
                <GlowCard key={d.key} className={`p-5 ${locked ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-lg font-semibold text-white/90">{d.name}</h3>
                        {passed && <span className="tag text-[10px] py-0.5 px-2 !border-white/25 !bg-white/06 !text-white/65">✓ 已通关</span>}
                        {locked && <span className="tag text-[10px] py-0.5 px-2 !border-white/15 !text-white/40">🔒 锁定</span>}
                      </div>
                      <p className="text-xs text-white/40">
                        {locked
                          ? (d.key === 'medium' ? '通关初级解锁' : '通关中级解锁')
                          : `每轮抽 ${d.total} 题 · 答对 ${d.pass} 题通关${best != null ? ` · 历史最佳 ${best}/${d.total}` : ''}`}
                      </p>
                    </div>
                    <button
                      disabled={locked}
                      onClick={() => startSession(activeTopic, d.key)}
                      className={locked ? 'btn-outline opacity-40 cursor-not-allowed' : 'btn-primary'}
                      style={{ padding: '10px 20px', fontSize: '13px' }}
                    >
                      {locked ? '锁定' : passed ? '再挑战' : '开始'}
                    </button>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Topic view (default)
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="天文知识闯关" title="选择主题挑战" sub="6 大主题 × 3 个难度,通关高级解锁专属陨石皮肤" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUIZ_TOPICS.map(t => {
            const tp = progress.topics[t.id];
            const passedCount = ['easy', 'medium', 'hard'].filter(k => tp[k] === 'passed').length;
            const skinUnlocked = progress.unlockedSkins.includes(t.skin);
            return (
              <button key={t.id} onClick={() => { setActiveTopic(t.id); setView('difficulty'); }} className="text-left">
                <GlowCard className="p-5 h-full hover:!border-white/25 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{t.icon}</span>
                    {skinUnlocked && (
                      <span className="text-[10px] tag py-0.5 px-2" style={{ borderColor: t.skinColor + '66', color: t.skinColor }}>
                        ✨ {t.skinName}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white/88 mb-1.5">{t.name}</h3>
                  <p className="text-xs text-white/40 mb-3">通关进度 {passedCount} / 3</p>
                  <div className="flex gap-1.5">
                    {['easy', 'medium', 'hard'].map(k => (
                      <div key={k} className="flex-1 h-1 rounded-full" style={{ background: tp[k] === 'passed' ? '#fff9' : tp[k] === 'unlocked' ? '#fff3' : '#fff1' }} />
                    ))}
                  </div>
                </GlowCard>
              </button>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
