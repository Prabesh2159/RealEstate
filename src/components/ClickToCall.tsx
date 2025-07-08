
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ClickToCall = () => {
  const { t } = useLanguage();
  
  // Company owner's phone number
  const phoneNumber = "+977-9876543210";
  
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <Button
        onClick={handleCallClick}
        className="bg-brand-green hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse-glow group"
        title={t('common.callNow')}
      >
        <Phone className="h-7 w-7 group-hover:animate-phone-ring" />
      </Button>
      <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {t('common.callNow')}
      </div>
    </div>
  );
};

export default ClickToCall;
