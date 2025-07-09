
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const ClickToCall = () => {
  const location = useLocation();

  // Hide click-to-call on admin panel
  if (location.pathname === '/admin') {
    return null;
  }

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Button
        onClick={handleCall}
        className="h-14 w-14 rounded-full bg-brand-blue hover:bg-brand-blue/90 shadow-lg"
        size="icon"
      >
        <Phone className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default ClickToCall;
