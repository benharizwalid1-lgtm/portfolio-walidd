import { usePersonality } from '@/contexts/PersonalityContext';
import { Brain, Sparkles } from 'lucide-react';

const PersonalityToggle = () => {
  const { personality, togglePersonality } = usePersonality();

  return (
    <button
      onClick={togglePersonality}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-500 ease-out
        ${personality === 'serious' 
          ? 'bg-serious/10 border border-serious/30 text-serious glow-serious' 
          : 'bg-playful/10 border border-playful/30 text-playful glow-playful'
        }
        hover:scale-105
      `}
    >
      <span className={`
        absolute inset-0 rounded-full opacity-20 blur-xl transition-colors duration-500
        ${personality === 'serious' ? 'bg-serious' : 'bg-playful'}
      `} />
      
      {personality === 'serious' ? (
        <>
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">Serious</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Playful</span>
        </>
      )}
    </button>
  );
};

export default PersonalityToggle;
