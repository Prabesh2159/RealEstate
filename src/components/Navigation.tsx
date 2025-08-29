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

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    setIsMenuOpen(false);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

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
    <>
      <header className="relative z-50">
        <nav className="bg-white shadow-md sticky top-0 w-full h-20 box-border overflow-hidden z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full">
              <div className="flex items-center gap-8 flex-shrink-0 h-full">
                {/* Logo with smooth animations and heartbeat */}
                <Link 
                  to="/" 
                  className="flex items-center gap-2 py-2 flex-shrink-0 group transition-all duration-300 ease-in-out hover:scale-105 transform"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src="/images/reeeaallll.png"
                      alt="Real Estate Crafters Logo"
                      className="h-10 sm:h-16 md:h-20 lg:h-20 w-auto object-contain transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3 transform animate-pulse"
                      style={{ 
                        maxWidth: "150px",
                        padding: "3px",
                        animation: "heartbeat 2s ease-in-out infinite"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <div className="flex flex-col justify-center transition-all duration-300 ease-in-out group-hover:translate-x-1">
                    <p className="text-sm sm:text-lg md:text-xl font-bold text-[#006d4e] truncate transition-all duration-300 ease-in-out group-hover:text-[#005a3f] group-hover:scale-105 transform">
                      Real Estate Crafters
                    </p>
                    <p className="text-[10px] sm:text-sm md:text-base text-brand truncate transition-all duration-300 ease-in-out group-hover:text-gray-600">
                      International Private Limited
                    </p>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center gap-4 lg:gap-6 xl:gap-8 flex-grow">
                  <div className="flex items-center gap-4 lg:gap-6 xl:gap-8 flex-grow">
                    {navLinks.map(({ name, path, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className={`relative flex items-center gap-1.5 px-2 py-1.5 text-sm lg:text-base xl:text-lg font-medium transition duration-200 rounded-md hover:scale-105 whitespace-nowrap ${
                          isActive(path)
                            ? "text-[#006d4e] font-semibold"
                            : "text-gray-600 hover:text-[#006d4e] hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {name}
                        {isActive(path) && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006d4e] rounded-full" />
                        )}
                      </Link>
                    ))}
                  </div>

                 <Button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 bg-[#006d4e] text-white text-xs px-2 py-2 h-9 hover:bg-[#006d4e] active:bg-[#006d4e] focus:bg-[#006d4e] focus:outline-none focus:ring-0 active:outline-none border-none shadow-none truncate w-24"
                  >
                  <Languages className="h-3 w-3" />
                  <span className="truncate">{language === "en" ? "EN-नेपा" : "नेपा-EN"}</span>
                </Button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden relative z-50">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle Menu"
                  className="text-gray-600 hover:text-[#006d4e] p-2 transition hover:scale-110"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-t pt-4 pb-6 z-40 shadow-lg animate-fade-in">
            <div className="flex flex-col gap-3 px-4">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 py-2 text-sm font-medium rounded-md transition duration-200 ${
                    isActive(path)
                      ? "text-[#006d4e] bg-green-50 font-semibold"
                      : "text-gray-700 hover:text-[#006d4e] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              ))}
              <Button
                onClick={toggleLanguage}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-[#006d4e] text-white text-xs py-2 px-3 h-9 hover:scale-105 active:bg-[#006d4e] focus:bg-[#006d4e] focus:outline-none focus:ring-0 active:outline-none truncate"
              >
                <Languages className="h-3 w-3" />
                <span className="truncate">{language === "en" ? "EN-नेपा" : "नेपा-EN"}</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Add custom heartbeat animation styles */}
      <style >{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.05);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;