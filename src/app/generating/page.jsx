'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';

export default function GeneratingPage() {
  const router = useRouter();
  const steps = ['扫描宇宙坐标...', '读取MBTI维度...', '匹配星宿参数...', '重组陨石碎片...', '生成人格轨迹...', '编写宇宙档案...', '铸造唯一生命编号...', '完成！'];
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => {
        if (i >= steps.length - 1) { clearInterval(t); setTimeout(() => router.push('/result'), 800); return i; }
        return i + 1;
      });
      setProgress(p => Math.min(p + 13, 100));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <div className="relative w-44 h-44 mb-12 flex items-center justify-center">
          <div className="orbit w-full h-full" style={{ animation: 'spin 3.5s linear infinite' }} />
          <div className="orbit absolute" style={{ width: '70%', height: '70%', animation: 'spin 2.2s linear infinite reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <MeteorOrb size={80} level={0} glow={true} animate={true} />
          </div>
        </div>
        <div className="text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-white/82 mb-6 tracking-tight">陨石铸造中</h2>
          <div className="space-y-2 mb-8 text-left">
            {steps.map((s, i) => (
              <div key={i} className={`text-sm transition-all duration-500 flex items-center gap-2 ${i <= idx ? 'text-white/65' : 'text-white/15'} ${i === idx ? '!text-white/90 font-medium' : ''}`}>
                <span className="w-4 text-xs">{i < idx ? '✓' : i === idx ? '⟐' : '·'}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="h-px progress-track">
            <div style={{ height: 1, width: `${progress}%`, background: 'rgba(255,255,255,0.5)' }} />
          </div>
          <p className="mt-3 text-xs text-white/25">{progress}%</p>
        </div>
      </div>
    </PageWrapper>
  );
}
