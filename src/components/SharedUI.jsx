export function SectionTitle({ title, sub, eyebrow }) {
  return (
    <div className="text-center mb-10 md:mb-14 px-1">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/92 tracking-tight leading-tight" style={{ letterSpacing: '-.025em' }}>{title}</h2>
      {sub && <p className="mt-3 text-white/38 text-sm max-w-lg mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

export function InfoCard({ label, value, icon }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-white/35 mb-1.5 tracking-wide">{icon} {label}</div>
      <div className="font-medium text-white/85 text-sm">{value}</div>
    </div>
  );
}

export function EnergyBar({ value, max = 100, label = '星星能量' }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-white/40">{label}</span>
        <span className="text-white/70 font-medium">{value}</span>
      </div>
      <div className="h-1.5 progress-track rounded-full">
        <div className="energy-bar h-full rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
    </div>
  );
}
