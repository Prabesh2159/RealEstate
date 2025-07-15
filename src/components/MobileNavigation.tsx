
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
  Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  // Close menu when navigating or on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    setIsMenuOpen(false);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  // Handle keyboard shortcut for login
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
    { name: t("nav.about"), path: "/about", icon: Info },
    { name: t("nav.contact"), path: "/contact", icon: PhoneCall },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo Section - Optimized for mobile */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 py-1 sm:py-2">
            <img
              src="/images/realstate-removebg-preview.png"
              alt="Real Estate Crafters Logo"
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain"
            />
            <div className="leading-tight flex flex-col justify-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#006d4e] whitespace-nowrap">
                Real Estate Crafters
              </p>
              <p className="text-xs sm:text-sm md:text-base text-brand whitespace-nowrap">
                International Private Limited
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links - Hidden on mobile/tablet */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center gap-1.5 px-2 py-1.5 text-sm lg:text-base font-medium transition-all duration-200 rounded-md hover:scale-105 transform ${
                  isActive(path)
                    ? "text-[#006d4e] font-semibold"
                    : "text-gray-600 hover:text-[#006d4e] hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                {name}
                {isActive(path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006d4e] rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Desktop Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-[#006d4e] bg-[#006d4e] text-white h-8 px-2 text-xs lg:h-9 lg:px-3 lg:text-sm hover:scale-105 transform hover:bg-opacity-90"
            >
              <Languages className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="font-medium">
                {language === 'en' ? 'EN-नेपा' : 'नेपा-EN'}
              </span>
            </Button>
          </div>

          {/* Mobile/Tablet Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-[#006d4e] bg-[#006d4e] text-white h-8 px-2 text-xs hover:bg-opacity-90"
            >
              <Languages className="h-3 w-3" />
              <span className="font-medium text-xs">
                {language === 'en' ? 'EN' : 'नेपा'}
              </span>
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-600 hover:text-[#006d4e] transition-all duration-200 p-1 hover:scale-110 transform"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 border-t pt-4 pb-6 animate-fade-in origin-top">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 text-base font-medium transition-all duration-200 rounded-md hover:scale-105 transform ${
                    isActive(path)
                      ? "text-[#006d4e] bg-green-50 font-semibold"
                      : "text-gray-700 hover:text-[#006d4e] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
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

export default MobileNavigation;
