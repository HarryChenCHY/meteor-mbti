'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MBTI_LIST, SIGNS, BLOODS, STYLES, FORMS, RENDERS, PTYPES } from '@/lib/constants';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nickname: '', mbti: '', sign: '', blood: '', age: '', style: '', form: '', render: '', ptype: '' });
  const upd = (k, v) => setForm({ ...form, [k]: v });
  const titles = ['基础人格信息', '上传形象信息', '生成偏好选择', '确认铸造'];

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-5 py-16 md:py-20">
        <SectionTitle eyebrow={`STEP ${step}/4`} title="铸造你的陨石人格" sub={titles[step - 1]} />

        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 h-px rounded-full transition-all duration-500"
              style={{ background: step >= s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>

        <div className="card p-7 md:p-10 page-enter" key={step}>
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">昵称</label>
                <input value={form.nickname} onChange={e => upd('nickname', e.target.value)}
                  placeholder="输入你的宇宙代号" className="form-input" />
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">MBTI 类型</label>
                <select value={form.mbti} onChange={e => upd('mbti', e.target.value)} className="form-input">
                  <option value="">选择你的 MBTI</option>
                  {MBTI_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/38 mb-2 block tracking-wide">星座</label>
                  <select value={form.sign} onChange={e => upd('sign', e.target.value)} className="form-input">
                    <option value="">选择星座</option>
                    {SIGNS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/38 mb-2 block tracking-wide">血型</label>
                  <select value={form.blood} onChange={e => upd('blood', e.target.value)} className="form-input">
                    <option value="">选择血型</option>
                    {BLOODS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">年龄</label>
                <input type="number" value={form.age} onChange={e => upd('age', e.target.value)}
                  placeholder="输入年龄" className="form-input" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="border border-dashed border-white/12 rounded-xl p-10 text-center hover:border-white/22 transition-colors cursor-pointer">
                <div className="text-3xl mb-3">📷</div>
                <p className="text-white/45 text-sm">点击上传个人形象照片</p>
                <p className="text-white/22 text-xs mt-1">支持 JPG/PNG，建议正面清晰照</p>
              </div>
              <div className="border border-dashed border-white/08 rounded-xl p-7 text-center hover:border-white/15 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-white/32 text-sm">上传风格参考图（可选）</p>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">希望生成的风格</label>
                <div className="flex gap-2 flex-wrap">
                  {STYLES.map(s => (
                    <button key={s} onClick={() => upd('style', s)}
                      className={`tag cursor-pointer transition-all ${form.style === s ? '!border-white/35 !bg-white/08 !text-white/80' : ''}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">角色形态偏好</label>
                <div className="flex gap-3">
                  {FORMS.map(f => (
                    <button key={f} onClick={() => upd('form', f)}
                      className={`flex-1 card p-4 text-center text-sm cursor-pointer transition-all ${form.form === f ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">视觉风格偏好</label>
                <div className="flex gap-3">
                  {RENDERS.map(r => (
                    <button key={r} onClick={() => upd('render', r)}
                      className={`flex-1 card p-4 text-center text-sm cursor-pointer transition-all ${form.render === r ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">人格倾向</label>
                <div className="grid grid-cols-2 gap-3">
                  {PTYPES.map(p => (
                    <button key={p} onClick={() => upd('ptype', p)}
                      className={`card p-4 text-center text-sm cursor-pointer transition-all ${form.ptype === p ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-sm font-medium text-white/65 mb-4 tracking-wide">📋 铸造信息确认</h3>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                {[['昵称', form.nickname || '星尘旅人'], ['MBTI', form.mbti || 'INFP-调停者'], ['星座', form.sign || '双鱼座'], ['血型', form.blood || 'O型'], ['年龄', form.age || '22'], ['风格', form.style || '偏治愈'], ['形态', form.form || '宇宙精灵'], ['视觉', form.render || '卡通插画'], ['人格', form.ptype || '守护型']].map(([k, v], i) => (
                  <div key={i} className="card p-3">
                    <span className="text-white/30 text-xs tracking-wide">{k}</span>
                    <div className="font-medium text-white/75 mt-0.5 text-sm">{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/generating')} className="btn-primary w-full justify-center mt-4" style={{ padding: '14px', fontSize: '15px' }}>
                🌠 开始铸造我的陨石人格
              </button>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1
              ? <button onClick={() => setStep(step - 1)} className="text-white/30 hover:text-white/65 transition-colors text-sm">← 上一步</button>
              : <span />
            }
            {step < 4 && (
              <button onClick={() => setStep(step + 1)} className="btn-outline text-sm" style={{ padding: '8px 20px' }}>下一步 →</button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
