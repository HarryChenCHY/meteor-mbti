import { MORE_MENU } from '../constants';

export default function MoreMenuSheet({ open, onClose, onNavigate, current }) {
  if (!open) return null;
  return (
    <div className="md:hidden fixed inset-0 z-[55] flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative card border-t-0 rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[78vh] overflow-y-auto touch-pan"
        style={{ background: '#0e0e0e', borderColor: 'rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}>
        <div className="w-8 h-0.5 bg-white/15 rounded-full mx-auto mb-4" />
        <p className="text-center text-xs text-white/30 mb-3 tracking-widest uppercase">更多</p>
        <div className="grid grid-cols-3 gap-2">
          {MORE_MENU.map(m => (
            <button key={m.key} onClick={() => { onNavigate(m.key); onClose(); }}
              className={`btn-tap flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium min-h-[4.5rem] transition-all ${current === m.key ? 'border-white/25 bg-white/08 text-white' : 'border-white/07 bg-white/03 text-white/45'}`}>
              <span className="text-xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl border border-white/07 text-sm text-white/35">关闭</button>
      </div>
    </div>
  );
}
