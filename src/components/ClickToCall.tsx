import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom"; // useNavigate is no longer needed if directly calling

const ClickToCall = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Hide click-to-call on admin panel
  if (location.pathname === '/admin') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    // Directly initiate a phone call using the tel: URI scheme
    window.location.href = 'tel:+9779707362231';
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Button
        onClick={handleCall}
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isScrolled
            ? 'bg-[#006d4e] hover:bg-[#CFCB11]' // Color when scrolled: background #006d4e, hover #CFCB11
            : 'bg-[#CFCB11] hover:bg-brand-green/90' // Initial color: background #CFCB11, hover brand-green/90
        }`}
        size="icon"
      >
        <Phone className="h-6 w-6 text-white animate-pulse" />
      </Button>
    </div>
  );
};

export default ClickToCall;