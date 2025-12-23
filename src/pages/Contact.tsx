import { useState } from 'react';
import { usePersonality } from '@/contexts/PersonalityContext';
import PageHeader from '@/components/PageHeader';
import knowledge from '@/data/knowledge.json';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { personality } = usePersonality();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: knowledge.profile.email,
      href: "#"
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Walid',
      href: knowledge.profile.linkedin
    },

    
    {
      icon: Github,
      label: 'GitHub',
      value: '@walid',
      href: knowledge.profile.github
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(
      personality === 'serious' 
        ? 'Message envoyé avec succès' 
        : 'Message reçu ! Je vous réponds vite 🚀',
      {
        description: personality === 'serious'
          ? 'Je vous répondrai dans les plus brefs délais.'
          : 'En attendant, explorez mon portfolio !'
      }
    );
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <PageHeader 
          title="Contact" 
          subtitle={personality === 'serious' 
            ? "N'hésitez pas à me contacter pour discuter de vos projets"
            : "Envie de papoter ? Je suis tout ouïe !"
          }
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Links */}
          <div className="space-y-4 animate-fade-in">
            <h2 className={`
              text-xl font-bold mb-6
              ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
            `}>
              {personality === 'serious' ? 'Coordonnées' : 'Retrouvez-moi'}
            </h2>

            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-4 p-4 glass rounded-xl transition-all duration-300
                  hover:scale-[1.02]
                  ${personality === 'serious' ? 'hover:glow-serious' : 'hover:glow-playful'}
                `}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${personality === 'serious' ? 'bg-serious/10 text-serious' : 'bg-playful/10 text-playful'}
                `}>
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{link.label}</p>
                  <p className="font-medium">{link.value}</p>
                </div>
              </a>
            ))}

            <div className={`
              p-6 rounded-2xl mt-8
              ${personality === 'serious' 
                ? 'bg-serious/5 border border-serious/20' 
                : 'bg-playful/5 border border-playful/20'
              }
            `}>
              <p className="text-sm text-muted-foreground">
                {personality === 'serious'
                  ? "Je réponds généralement sous 24-48h. Pour les demandes urgentes, privilégiez l'email."
                  : "Je suis plutôt réactif ! Sauf si je suis en plein debug... là, patience 😅"}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <h2 className={`
              text-xl font-bold mb-6
              ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
            `}>
              {personality === 'serious' ? 'Envoyer un message' : 'Écrivez-moi'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {personality === 'serious' ? 'Nom complet' : 'Votre nom'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={personality === 'serious' ? 'Jean Dupont' : 'Comment vous appelez-vous ?'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="jean@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder={personality === 'serious' 
                    ? "Décrivez votre projet ou votre demande..." 
                    : "Racontez-moi tout !"}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium
                  transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                  ${personality === 'serious'
                    ? 'bg-serious text-serious-foreground hover:bg-serious/90'
                    : 'bg-playful text-playful-foreground hover:bg-playful/90'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {personality === 'serious' ? 'Envoi en cours...' : 'Ça part...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {personality === 'serious' ? 'Envoyer le message' : 'Envoyer !'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
