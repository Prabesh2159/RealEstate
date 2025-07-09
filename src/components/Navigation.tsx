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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/realstate-removebg-preview.png"
              alt="Real Estate Crafters Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="leading-tight">
              <p className="text-xl font-bold text-brand-green">
                Real Estate Crafters
              </p>
              <p className="text-sm text-brand-blue">
                International Private Limited
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-2 py-1 text-sm font-medium transition duration-150 ${
                  isActive(path)
                    ? "text-brand-green border-b-2 border-brand-green"
                    : "text-gray-600 hover:text-brand-green"
                }`}
              >
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-brand-green transition"
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
          <div className="md:hidden mt-2 border-t pt-4 pb-6">
            <div className="flex flex-col gap-4">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-2 py-1 text-sm font-medium transition duration-150 ${
                    isActive(path)
                      ? "text-brand-green"
                      : "text-gray-600 hover:text-brand-green"
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

export default Navigation;
