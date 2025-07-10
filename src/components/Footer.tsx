
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      companyName: "Real Estate Crafters",
      tagline: "Premium Property Solutions",
      copyright: "© 2024 Real Estate Crafters. All rights reserved.",
      contact: "Contact Us",
      phone: "+977-1-4444444",
      email: "info@realestateNepal.com",
      address: "Kathmandu, Nepal"
    },
    np: {
      companyName: "रियल एस्टेट क्राफ्टर्स",
      tagline: "प्रिमियम सम्पत्ति समाधान",
      copyright: "© २०२४ रियल एस्टेट क्राफ्टर्स। सबै अधिकार सुरक्षित।",
      contact: "सम्पर्क गर्नुहोस्",
      phone: "+९७७-१-४४४४४४४",
      email: "info@realestateNepal.com",
      address: "काठमाडौं, नेपाल"
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-[#006d4e] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.companyName}</h3>
            <p className="text-gray-200">{t.tagline}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contact}</h4>
            <div className="space-y-2 text-gray-200">
              <p>{t.phone}</p>
              <p>{t.email}</p>
              <p>{t.address}</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-4">
              <img
                src="/images/realstate-removebg-preview.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p className="text-gray-200">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
