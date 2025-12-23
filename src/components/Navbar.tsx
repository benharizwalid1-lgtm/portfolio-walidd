import { Link, useLocation } from 'react-router-dom';
import { usePersonality } from '@/contexts/PersonalityContext';
import PersonalityToggle from './PersonalityToggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/assistant', label: 'Assistant IA' },
  { path: '/about', label: 'À propos' },
  { path: '/projects', label: 'Projets' },
  { path: '/skills', label: 'Compétences' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const location = useLocation();
  const { personality } = usePersonality();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className={`
              text-xl font-bold transition-colors duration-500
              ${personality === 'serious' ? 'text-gradient-serious' : 'text-gradient-playful'}
            `}
          >
            Ben.Hariz.Elwalid
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-all duration-300
                  ${location.pathname === link.path 
                    ? personality === 'serious' 
                      ? 'text-serious' 
                      : 'text-playful'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <PersonalityToggle />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block py-2 text-sm font-medium transition-colors
                  ${location.pathname === link.path 
                    ? personality === 'serious' ? 'text-serious' : 'text-playful'
                    : 'text-muted-foreground'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
