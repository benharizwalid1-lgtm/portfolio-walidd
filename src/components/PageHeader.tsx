import { usePersonality } from '@/contexts/PersonalityContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  const { personality } = usePersonality();

  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className={`
        text-4xl md:text-5xl font-bold mb-4
        ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
      `}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
