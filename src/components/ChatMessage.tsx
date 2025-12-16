import { usePersonality, Personality } from '@/contexts/PersonalityContext';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  personalityUsed?: Personality;
}

const ChatMessage = ({ role, content, personalityUsed }: ChatMessageProps) => {
  const { personality } = usePersonality();
  const displayPersonality = personalityUsed || personality;

  return (
    <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''} animate-slide-up`}>
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${role === 'user' 
          ? 'bg-secondary' 
          : displayPersonality === 'serious' 
            ? 'bg-serious/20 text-serious' 
            : 'bg-playful/20 text-playful'
        }
      `}>
        {role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className={`
        max-w-[80%] p-4 rounded-2xl
        ${role === 'user' 
          ? 'bg-secondary text-foreground' 
          : 'glass'
        }
      `}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
