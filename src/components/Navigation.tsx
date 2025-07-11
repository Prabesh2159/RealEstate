
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  DollarSign,
  Building2,
  Grid,
  PhoneCall,
  Globe,
  Languages,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        navigate("/login");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const navLinks = [
    { name: t("nav.home"), path: "/", icon: Home },
    { name: t("nav.buy"), path: "/buy", icon: ShoppingCart },
    { name: t("nav.sell"), path: "/sell", icon: DollarSign },
    { name: t("nav.rent"), path: "/rent", icon: Building2 },
    { name: t("nav.Projects"), path: "/projects", icon: Grid },
    { name: t("nav.others"), path: "/others", icon: Globe },
    { name: t("nav.contact"), path: "/contact", icon: PhoneCall },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Adjusted positioning */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/images/realstate-removebg-preview.png"
              alt="Real Estate Crafters Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-tight">
              <p className="text-lg font-bold text-[#006d4e]">
                Real Estate Crafters
              </p>
              <p className="text-xs text-brand">
                International Private Limited
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links and Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition duration-150 rounded-md ${
                  isActive(path)
                    ? "text-brand-green bg-green-50 border-b-2 border-brand-green"
                    : "text-gray-600 hover:text-brand-green hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            ))}
            
            {/* Language Toggle Button - Made smaller */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors h-8 px-2 text-xs"
            >
              <Languages className="h-3 w-3" />
              <span className="font-medium">
                {language === 'en' ? 'EN-नेपा' : 'नेपा-EN'}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Toggle and Language Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle - Made smaller */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-colors h-7 px-1.5 text-xs"
            >
              <Languages className="h-3 w-3" />
              <span className="text-xs font-medium">
                {language === 'en' ? 'EN-नेपा' : 'नेपा-EN'}
              </span>
            </Button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-brand-green transition p-1"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 border-t pt-4 pb-6">
            <div className="flex flex-col gap-3">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition duration-150 rounded-md ${
                    isActive(path)
                      ? "text-brand-green bg-green-50"
                      : "text-gray-600 hover:text-brand-green hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
