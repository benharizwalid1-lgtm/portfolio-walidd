import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import PageHeader from '@/components/PageHeader';
import knowledge from '@/data/knowledge.json';
import { Bot, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const { personality } = usePersonality();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  // Only display the 2 projects from knowledge.json (id: 1 and id: 2)
  const projects = knowledge.projects.filter((project) =>
    project.id === 1 || project.id === 2
  );

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <PageHeader
          title="Projets"
          subtitle={personality === 'serious'
            ? "Réalisations techniques et professionnelles"
            : "Mes créations, mes aventures numériques"
          }
        />

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                glass rounded-2xl overflow-hidden animate-slide-up
                transition-all duration-500
                ${expandedProject === project.id
                  ? personality === 'serious' ? 'glow-serious' : 'glow-playful'
                  : ''
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`
                        text-xl font-bold
                        ${personality === 'serious' ? 'text-serious' : 'text-playful'}
                      `}>
                        {project.title}
                      </h3>
                      {expandedProject === project.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {project[personality]}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`
                        px-3 py-1 text-xs rounded-full
                        ${personality === 'serious'
                          ? 'bg-serious/10 text-serious'
                          : 'bg-playful/10 text-playful'
                        }
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedProject === project.id && (
                <div className="px-6 pb-6 border-t border-border pt-6 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
                        Contexte
                      </h4>
                      <p className="text-foreground">{project.context}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
                        Objectif
                      </h4>
                      <p className="text-foreground">{project.objective}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
                        Mon rôle
                      </h4>
                      <p className="text-foreground">{project.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/assistant?q=${encodeURIComponent(`Parle-moi du projet ${project.title}`)}`}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${personality === 'serious'
                          ? 'bg-serious text-serious-foreground hover:bg-serious/90'
                          : 'bg-playful text-playful-foreground hover:bg-playful/90'
                        }
                      `}
                    >
                      <Bot className="w-4 h-4" />
                      Demander à l'IA
                    </Link>
                    {/* Check for link availability in a cleaner way if possible, but inline is fine for this */}
                    <a
                      href={(project as any).app_link || (project as any).portfolio_link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors ${!((project as any).app_link || (project as any).portfolio_link) ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Voir le projet
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Projects;
