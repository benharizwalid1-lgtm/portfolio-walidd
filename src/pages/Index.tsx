import { Link } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import AIInput from '@/components/AIInput';
import { ArrowRight, Bot, Briefcase, Code, User } from 'lucide-react';

const Index = () => {
  const { personality } = usePersonality();

  const features = [
    {
      icon: Bot,
      title: 'Assistant IA',
      description: personality === 'serious' 
        ? 'Découvrez mon profil via un assistant intelligent' 
        : 'Posez vos questions, je réponds !',
      link: '/assistant'
    },
    {
      icon: Briefcase,
      title: 'Projets',
      description: personality === 'serious'
        ? 'Mes réalisations techniques et professionnelles'
        : 'Mes créations, mes bébés numériques',
      link: '/projects'
    },
    {
      icon: Code,
      title: 'Compétences',
      description: personality === 'serious'
        ? 'Stack technique et expertise'
        : 'Mes super-pouvoirs de dev',
      link: '/skills'
    },
    {
      icon: User,
      title: 'À propos',
      description: personality === 'serious'
        ? 'Parcours et vision professionnelle'
        : 'Qui se cache derrière le code ?',
      link: '/about'
    }
  ];

  return (
    <main className="min-h-screen pt-20 pb-12 px-4">
      {/* Hero Section */}
      <section className="container mx-auto max-w-4xl pt-12 md:pt-20 pb-16">
        <div className="text-center space-y-6 animate-fade-in">
          <div className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            ${personality === 'serious' 
              ? 'bg-serious/10 text-serious border border-serious/20' 
              : 'bg-playful/10 text-playful border border-playful/20'
            }
          `}>
            <Bot className="w-4 h-4" />
            {personality === 'serious' 
              ? 'Portfolio Intelligent' 
              : 'Portfolio avec IA intégrée ✨'}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {personality === 'serious' ? (
              <>
                Développeur Web
                <br />
                <span className="text-gradient-serious">Orienté Solutions</span>
              </>
            ) : (
              <>
                Hello, moi c'est
                <br />
                <span className="text-gradient-playful">Walid</span> 👋
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {personality === 'serious' 
              ? "Découvrez mon profil professionnel à travers un assistant IA qui répond à vos questions avec précision et clarté."
              : "Un portfolio qui parle, qui répond, qui s'adapte à vous. Posez-moi une question et voyez ce qui se passe !"}
          </p>
        </div>

        {/* AI Input */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <AIInput />
        </div>

        {/* Suggested questions */}
        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-muted-foreground mb-3">Suggestions :</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              personality === 'serious' ? "Qui est Walid ?" : "C'est qui Walid ?",
              personality === 'serious' ? "Ses compétences" : "Ses super-pouvoirs",
              personality === 'serious' ? "Pourquoi l'embaucher ?" : "Pourquoi bosser avec lui ?",
            ].map((q) => (
              <Link
                key={q}
                to={`/assistant?q=${encodeURIComponent(q)}`}
                className={`
                  px-3 py-1.5 text-sm rounded-full transition-all duration-300
                  ${personality === 'serious'
                    ? 'bg-serious/10 text-serious/80 hover:bg-serious/20 hover:text-serious'
                    : 'bg-playful/10 text-playful/80 hover:bg-playful/20 hover:text-playful'
                  }
                `}
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto max-w-5xl py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.link}
              className={`
                group p-6 rounded-2xl glass transition-all duration-500
                hover:scale-[1.02]
                ${personality === 'serious' ? 'hover:glow-serious' : 'hover:glow-playful'}
              `}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-xl transition-colors duration-300
                  ${personality === 'serious' 
                    ? 'bg-serious/10 text-serious group-hover:bg-serious/20' 
                    : 'bg-playful/10 text-playful group-hover:bg-playful/20'
                  }
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    {feature.title}
                    <ArrowRight className={`
                      w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300
                      group-hover:opacity-100 group-hover:translate-x-0
                      ${personality === 'serious' ? 'text-serious' : 'text-playful'}
                    `} />
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-4xl py-12 text-center">
        <div className={`
          p-8 md:p-12 rounded-3xl glass
          ${personality === 'serious' ? 'glow-serious' : 'glow-playful'}
        `}>
          <h2 className={`
            text-2xl md:text-3xl font-bold mb-4
            ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
          `}>
            {personality === 'serious' 
              ? 'Prêt à collaborer ?' 
              : 'Envie de discuter ?'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {personality === 'serious'
              ? "N'hésitez pas à me contacter pour discuter de vos projets et opportunités."
              : "Je suis toujours partant pour de nouvelles aventures. Faisons connaissance !"}
          </p>
          <Link
            to="/contact"
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${personality === 'serious'
                ? 'bg-serious text-serious-foreground hover:bg-serious/90'
                : 'bg-playful text-playful-foreground hover:bg-playful/90'
              }
            `}
          >
            Me contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
