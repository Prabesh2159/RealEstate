
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  // Keyboard shortcut for admin login
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate('/login');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.buy'), path: "/buy" },
    { name: t('nav.sell'), path: "/sell" },
    { name: t('nav.rent'), path: "/rent" },
    { name: t('nav.others'), path: "/others" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/7258bb42-1fa4-40c2-9b13-7f5d1195fb18.png" 
              alt="Real Estate Crafters Logo" 
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-brand-green font-bold text-lg leading-tight">Real Estate Crafters</span>
              <span className="text-brand-blue text-xs font-medium leading-tight">International Private Limited</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-600 hover:text-brand-green font-medium transition-colors duration-200 ${
                  isActive(link.path) ? "text-brand-green border-b-2 border-brand-green" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Toggle Only */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-3 py-2 h-10 min-w-[60px]"
              title={language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
            >
              <span className="text-sm font-medium">
                {language === 'en' ? 'En-Np' : 'Np-En'}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-brand-green"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-gray-600 hover:text-brand-green font-medium transition-colors duration-200 ${
                    isActive(link.path) ? "text-brand-green" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'En-Np' : 'Np-En'}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
