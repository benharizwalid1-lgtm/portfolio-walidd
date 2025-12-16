import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import PageHeader from '@/components/PageHeader';
import ChatMessage from '@/components/ChatMessage';
import AIInput from '@/components/AIInput';
import { getAIResponse, getSuggestedQuestions } from '@/lib/ai-responses';
import { Personality } from '@/contexts/PersonalityContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  personalityUsed?: Personality;
}

const Assistant = () => {
  const { personality } = usePersonality();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial question from URL
  useEffect(() => {
    const initialQuestion = searchParams.get('q');
    if (initialQuestion && messages.length === 0) {
      handleQuestion(initialQuestion);
    }
  }, [searchParams]);

  const handleQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = getAIResponse(question, personality);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      personalityUsed: personality,
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const suggestedQuestions = getSuggestedQuestions(personality);

  return (
    <main className="min-h-screen pt-24 pb-32 px-4">
      <div className="container mx-auto max-w-3xl">
        <PageHeader 
          title="Assistant IA" 
          subtitle={personality === 'serious' 
            ? "Posez vos questions pour découvrir le profil de Walid"
            : "Discutons ! Je suis là pour vous raconter l'histoire de Walid"
          }
        />

        {/* Chat Messages */}
        <div className="space-y-6 mb-8 min-h-[300px]">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">
                {personality === 'serious' 
                  ? "Commencez par poser une question sur le profil de Walid."
                  : "Allez, lancez-vous ! Demandez-moi n'importe quoi sur Walid."}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuestion(q)}
                    className={`
                      px-4 py-2 text-sm rounded-xl transition-all duration-300
                      ${personality === 'serious'
                        ? 'bg-serious/10 text-serious hover:bg-serious/20'
                        : 'bg-playful/10 text-playful hover:bg-playful/20'
                      }
                    `}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                personalityUsed={message.personalityUsed}
              />
            ))
          )}

          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className={`
                w-2 h-2 rounded-full animate-pulse
                ${personality === 'serious' ? 'bg-serious' : 'bg-playful'}
              `} />
              <span className="text-sm">
                {personality === 'serious' ? 'Analyse en cours...' : 'Je réfléchis...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <div className="container mx-auto max-w-3xl">
            <AIInput 
              onSubmit={handleQuestion} 
              showPersonalityToggle={false}
              placeholder={personality === 'serious' 
                ? "Posez votre question..." 
                : "Qu'est-ce que vous voulez savoir ?"}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Assistant;
