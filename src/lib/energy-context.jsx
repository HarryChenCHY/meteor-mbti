'use client';
import { createContext, useContext, useState } from 'react';

const EnergyContext = createContext(null);

export function EnergyProvider({ children }) {
  const [energy, setEnergy] = useState(62);
  const addEnergy = (n) => setEnergy(e => e + n);
  const spendEnergy = (n) => setEnergy(e => Math.max(e - n, 0));
  return (
    <EnergyContext.Provider value={{ energy, addEnergy, spendEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error('useEnergy must be used within EnergyProvider');
  return ctx;
}
