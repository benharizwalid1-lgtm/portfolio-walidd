import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import { Send, Brain, Sparkles } from 'lucide-react';

interface AIInputProps {
  onSubmit?: (question: string) => void;
  placeholder?: string;
  showPersonalityToggle?: boolean;
}

const AIInput = ({ 
  onSubmit, 
  placeholder = "Posez une question sur Walid...",
  showPersonalityToggle = true 
}: AIInputProps) => {
  const [question, setQuestion] = useState('');
  const { personality, setPersonality } = usePersonality();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    if (onSubmit) {
      onSubmit(question);
    } else {
      navigate(`/assistant?q=${encodeURIComponent(question)}`);
    }
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {showPersonalityToggle && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setPersonality('serious')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
              ${personality === 'serious' 
                ? 'bg-serious/20 border-2 border-serious text-serious glow-serious' 
                : 'bg-secondary/50 border-2 border-transparent text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Brain className="w-5 h-5" />
            <span className="font-medium">Serious</span>
          </button>
          <button
            type="button"
            onClick={() => setPersonality('playful')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300
              ${personality === 'playful' 
                ? 'bg-playful/20 border-2 border-playful text-playful glow-playful' 
                : 'bg-secondary/50 border-2 border-transparent text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Playful</span>
          </button>
        </div>
      )}

      <div className={`
        relative flex items-center gap-2 p-2 rounded-2xl glass
        transition-all duration-500
        ${personality === 'serious' 
          ? 'focus-within:border-serious/50 focus-within:glow-serious' 
          : 'focus-within:border-playful/50 focus-within:glow-playful'
        }
      `}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={!question.trim()}
          className={`
            p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${personality === 'serious' 
              ? 'bg-serious text-serious-foreground hover:bg-serious/90' 
              : 'bg-playful text-playful-foreground hover:bg-playful/90'
            }
          `}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default AIInput;
