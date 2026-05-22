'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { QUIZ_TOPICS } from './quiz-data';

const QuizProgressContext = createContext(null);
const STORAGE_KEY = 'meteor_quiz_progress';

function defaultProgress() {
  const topics = {};
  QUIZ_TOPICS.forEach(t => {
    topics[t.id] = { easy: 'unlocked', medium: 'locked', hard: 'locked' };
  });
  return {
    topics,
    unlockedSkins: [],
    stats: { totalAnswered: 0, totalCorrect: 0, topicBest: {} },
  };
}

export function QuizProgressProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = defaultProgress();
        if (parsed.topics) {
          Object.keys(merged.topics).forEach(k => {
            if (parsed.topics[k]) merged.topics[k] = { ...merged.topics[k], ...parsed.topics[k] };
          });
        }
        merged.unlockedSkins = Array.isArray(parsed.unlockedSkins) ? parsed.unlockedSkins : [];
        merged.stats = { ...merged.stats, ...(parsed.stats || {}) };
        setProgress(merged);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress, hydrated]);

  const recordSession = ({ topicId, difficulty, correctCount, total }) => {
    const passed = correctCount >= 9;
    let newSkin = null;
    setProgress(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const tp = next.topics[topicId];
      if (!tp) return prev;
      const bestKey = `${topicId}-${difficulty}`;
      next.stats.totalAnswered += total;
      next.stats.totalCorrect += correctCount;
      if (!next.stats.topicBest[bestKey] || correctCount > next.stats.topicBest[bestKey]) {
        next.stats.topicBest[bestKey] = correctCount;
      }
      if (passed) {
        if (tp[difficulty] !== 'passed') tp[difficulty] = 'passed';
        if (difficulty === 'easy' && tp.medium === 'locked') tp.medium = 'unlocked';
        if (difficulty === 'medium' && tp.hard === 'locked') tp.hard = 'unlocked';
        if (difficulty === 'hard') {
          const topic = QUIZ_TOPICS.find(t => t.id === topicId);
          if (topic && !next.unlockedSkins.includes(topic.skin)) {
            next.unlockedSkins.push(topic.skin);
            newSkin = topic.skin;
          }
        }
      }
      return next;
    });
    return { passed, newSkin };
  };

  const resetProgress = () => setProgress(defaultProgress());

  return (
    <QuizProgressContext.Provider value={{ progress, recordSession, resetProgress, hydrated }}>
      {children}
    </QuizProgressContext.Provider>
  );
}

export function useQuizProgress() {
  const ctx = useContext(QuizProgressContext);
  if (!ctx) throw new Error('useQuizProgress must be used within QuizProgressProvider');
  return ctx;
}
