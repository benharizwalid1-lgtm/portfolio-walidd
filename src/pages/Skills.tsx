import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import PageHeader from '@/components/PageHeader';
import knowledge from '@/data/knowledge.json';
import { Bot, ChevronRight } from 'lucide-react';

const Skills = () => {
  const { personality } = usePersonality();
  const [selectedSkill, setSelectedSkill] = useState<typeof knowledge.skills[0] | null>(null);

  const categories = [...new Set(knowledge.skills.map(s => s.category))];

  // Helper function to get image path from skill object
  const getSkillImage = (skill: typeof knowledge.skills[0]): string => {
    // Use the image property from knowledge.json, with fallback
    return skill.image || '/skills/js.webp';
  };

  // Skill Detail Component
  const SkillDetail = ({ skill, isMobile = false }: { skill: typeof knowledge.skills[0] | null; isMobile?: boolean }) => (
    <div className={`
      glass rounded-2xl p-6 transition-all duration-500
      ${skill 
        ? personality === 'serious' ? 'glow-serious' : 'glow-playful'
        : ''
      }
      ${isMobile ? 'mt-3' : ''}
    `}>
      {skill ? (
        <div className="animate-fade-in">
          <div className={`
            w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-4
            ${personality === 'serious' ? 'bg-serious/10' : 'bg-playful/10'}
          `}>
            <img 
              src={getSkillImage(skill)} 
              alt={skill.name} 
              loading='lazy' 
              className='w-full h-full contain-object rounded-xl' 
            />
          </div>
          <h3 className={`
            text-xl font-bold mb-2
            ${personality === 'serious' ? 'text-serious' : 'text-playful'}
          `}>
            {skill.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {skill.category} • Niveau {skill.level}%
          </p>
          <p className="text-foreground mb-6">
            {skill[personality]}
          </p>
          <Link
            to={`/assistant?q=${encodeURIComponent(`Parle-moi de ta compétence en ${skill.name}`)}`}
            className={`
              flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium transition-all
              ${personality === 'serious'
                ? 'bg-serious text-serious-foreground hover:bg-serious/90'
                : 'bg-playful text-playful-foreground hover:bg-playful/90'
              }
            `}
          >
            <Bot className="w-4 h-4" />
            En savoir plus
          </Link>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className={`
            w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-2xl mb-4
            ${personality === 'serious' ? 'bg-serious/10' : 'bg-playful/10'}
          `}>
            <img 
              src="/click.webp"
              alt="click" 
              loading='lazy'
              className='rounded-xl'
            />
          </div>
          <p className="text-muted-foreground">
            {personality === 'serious' 
              ? "Sélectionnez une compétence pour voir les détails"
              : "Cliquez sur une compétence pour découvrir son histoire"}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <PageHeader 
          title="Compétences" 
          subtitle={personality === 'serious' 
            ? "Stack technique et niveaux d'expertise"
            : "Mes super-pouvoirs de développeur"
          }
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills List */}
          <div className="lg:col-span-2 space-y-8">
            {categories.map((category) => (
              <div key={category} className="animate-fade-in">
                <h2 className={`
                  text-lg font-semibold mb-4
                  ${personality === 'serious' ? 'text-serious' : 'text-playful'}
                `}>
                  {category}
                </h2>
                <div className="space-y-3">
                  {knowledge.skills
                    .filter(s => s.category === category)
                    .map((skill) => (
                      <div key={skill.name}>
                        <button
                          onClick={() => setSelectedSkill(skill)}
                          className={`
                            w-full glass p-4 rounded-xl text-left transition-all duration-300
                            hover:scale-[1.02]
                            ${selectedSkill?.name === skill.name 
                              ? personality === 'serious' 
                                ? 'border-serious/50 glow-serious' 
                                : 'border-playful/50 glow-playful'
                              : ''
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <ChevronRight className={`
                              w-4 h-4 transition-transform
                              ${selectedSkill?.name === skill.name ? 'rotate-90' : ''}
                              ${personality === 'serious' ? 'text-serious' : 'text-playful'}
                            `} />
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`
                                h-full rounded-full transition-all duration-700
                                ${personality === 'serious' 
                                  ? 'bg-gradient-to-r from-serious to-serious-glow' 
                                  : 'bg-gradient-to-r from-playful to-playful-glow'
                                }
                              `}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </button>
                        {/* Mobile: Show detail directly under selected skill */}
                        {selectedSkill?.name === skill.name && (
                          <div className="lg:hidden">
                            <SkillDetail skill={selectedSkill} isMobile={true} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Skill Detail Sidebar */}
          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <SkillDetail skill={selectedSkill} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Skills;
