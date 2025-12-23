import { Link } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import PageHeader from '@/components/PageHeader';
import knowledge from '@/data/knowledge.json';
import { Bot, Download, Heart, Lightbulb, Target } from 'lucide-react';

const About = () => {
  const { personality } = usePersonality();

  const highlights = [
    {
      icon: Target,
      title: personality === 'serious' ? 'Objectifs clairs' : 'Je vise haut',
      description: personality === 'serious'
        ? "Créer des solutions web performantes et évolutives"
        : "Transformer le café en lignes de code magiques"
    },
    {
      icon: Lightbulb,
      title: personality === 'serious' ? 'Innovation continue' : 'Toujours curieux',
      description: personality === 'serious'
        ? "Veille technologique et apprentissage permanent"
        : "Je lis les docs pour le plaisir (vraiment !)"
    },
    {
      icon: Heart,
      title: personality === 'serious' ? 'Passion du code' : 'Code is love',
      description: personality === 'serious'
        ? "Engagement envers la qualité et les bonnes pratiques"
        : "Chaque ligne est écrite avec amour"
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <PageHeader
          title="À propos"
          subtitle={personality === 'serious'
            ? "Parcours, vision et valeurs professionnelles"
            : "Qui se cache derrière ces lignes de code ?"
          }
        />

        {/* Bio Section */}
        <section className="glass rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className={`
              w-32 h-38 rounded-2xl flex items-center justify-center text-6xl
              ${personality === 'serious' ? 'bg-serious/10' : 'bg-playful/10'}
            `}>
              <img
                src="/walid.webp"
                alt="pdp"
                loading='lazy'
                className='rounded-2xl'
              />

            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{knowledge.profile.name}</h2>
              <p className={`
                text-lg font-medium mb-4
                ${personality === 'serious' ? 'text-serious' : 'text-playful'}
              `}>
                {knowledge.profile.title}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {knowledge.bio[personality]}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-3 gap-4 mb-8">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`
                glass p-6 rounded-2xl text-center animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`
                w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center
                ${personality === 'serious' ? 'bg-serious/10 text-serious' : 'bg-playful/10 text-playful'}
              `}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Values */}
        <section className="mb-8">
          <h2 className={`
            text-2xl font-bold mb-6
            ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
          `}>
            {personality === 'serious' ? 'Valeurs professionnelles' : 'Ce qui me fait vibrer'}
          </h2>
          <div className="space-y-4">
            {knowledge.values.map((value, index) => (
              <div
                key={value.name}
                className="glass p-6 rounded-2xl animate-slide-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <h3 className={`
                  font-semibold mb-2
                  ${personality === 'serious' ? 'text-serious' : 'text-playful'}
                `}>
                  {value.name}
                </h3>
                <p className="text-muted-foreground">
                  {value[personality]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className={`
            inline-flex items-center gap-4 p-6 rounded-2xl glass
            ${personality === 'serious' ? 'glow-serious' : 'glow-playful'}
          `}>
            <Link
              to="/assistant"
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                ${personality === 'serious'
                  ? 'bg-serious text-serious-foreground hover:bg-serious/90'
                  : 'bg-playful text-playful-foreground hover:bg-playful/90'
                }
              `}
            >
              <Bot className="w-4 h-4" />
              Demander à l'IA
            </Link>
            <span className="text-muted-foreground text-sm">ou</span>
            <a
              href="Walid_Ben_Hariz___Étudiant_en_Informatique_de_Gestion___Business_Intelligence (3).pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Download className="w-4 h-4" />
              Télécharger CV
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
