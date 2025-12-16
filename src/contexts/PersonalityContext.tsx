import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Personality = 'serious' | 'playful';

interface PersonalityContextType {
  personality: Personality;
  setPersonality: (p: Personality) => void;
  togglePersonality: () => void;
}

const PersonalityContext = createContext<PersonalityContextType | undefined>(undefined);

export const PersonalityProvider = ({ children }: { children: ReactNode }) => {
  const [personality, setPersonality] = useState<Personality>('serious');

  const togglePersonality = () => {
    setPersonality(prev => prev === 'serious' ? 'playful' : 'serious');
  };

  return (
    <PersonalityContext.Provider value={{ personality, setPersonality, togglePersonality }}>
      {children}
    </PersonalityContext.Provider>
  );
};

export const usePersonality = () => {
  const context = useContext(PersonalityContext);
  if (!context) {
    throw new Error('usePersonality must be used within a PersonalityProvider');
  }
  return context;
};
