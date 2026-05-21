'use client';
import BorderGlow from './BorderGlow';

export default function GlowCard({ children, className = '' }) {
  return (
    <BorderGlow
      backgroundColor="#111"
      borderRadius={12}
      glowColor="263 55 65"
      glowRadius={30}
      glowIntensity={0.9}
      edgeSensitivity={20}
      coneSpread={22}
      colors={['#8b5cf6', '#c084fc', '#818cf8']}
      fillOpacity={0.28}
      className={className}
    >
      {children}
    </BorderGlow>
  );
}
