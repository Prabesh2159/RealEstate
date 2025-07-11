import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      companyName: "Real Estate Crafters",
      tagline: "Premium Property Solutions",
      copyright: "© 2024 Real Estate Crafters. All rights reserved.",
      contact: "Contact Us",
      phone: "+977-970-7362231",
      email: "realestatecrafters1@gmail.com",
      address: "Dhanusha, Janakpur, Nepal",
      quickLinks: "Quick Links",
      buy: "Buy", // Added English translation for "Buy"
      sell: "Sell", // Added English translation for "Sell"
      rent: "Rent", // Added English translation for "Rent"
      other: "Other", // Added English translation for "Other"
      services: "Services",
      propertyManagement: "Property Management",
      homeInspection: "Home Inspection",
      repairServices: "Repair Services",
      realEstateInvestment: "Real Estate Investment"
    },
    np: {
      companyName: "रियल एस्टेट क्राफ्टर्स",
      tagline: "प्रिमियम सम्पत्ति समाधान",
      copyright: "© २०२४ रियल एस्टेट क्राफ्टर्स। सबै अधिकार सुरक्षित।",
      contact: "सम्पर्क गर्नुहोस्",
      phone: "+९७७-९७०-७३६२२३१",
      email: "realestatecrafters1@gmail.com",
      address: "धनुषा, जनकपुर, नेपाल",
      quickLinks: "द्रुत लिङ्कहरू",
      buy: "खरिद गर्नुहोस्", // Nepali translation for "Buy"
      sell: "बेच्नुहोस्", // Nepali translation for "Sell"
      rent: "भाडामा", // Nepali translation for "Rent"
      other: "अन्य", // Nepali translation for "Other"
      services: "सेवाहरू",
      propertyManagement: "सम्पत्ति व्यवस्थापन",
      homeInspection: "घर निरीक्षण",
      repairServices: "मर्मत सेवाहरू",
      realEstateInvestment: "घरजग्गा लगानी"
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-[#006d4e] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">{t.companyName}</h3>
            <p className="text-green-100 text-lg leading-relaxed">{t.tagline}</p>
            <div className="flex items-center mt-6">
              <img
                src="/images/realstate-removebg-preview.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">{t.quickLinks}</h4>
            <ul className="space-y-3 text-green-100">
              <li><a href="/buy" className="hover:text-white smooth-transition text-lg">{t.buy}</a></li>
              <li><a href="/sell" className="hover:text-white smooth-transition text-lg">{t.sell}</a></li>
              <li><a href="/rent" className="hover:text-white smooth-transition text-lg">{t.rent}</a></li>
              <li><a href="/others" className="hover:text-white smooth-transition text-lg">{t.other}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">{t.services}</h4>
            <ul className="space-y-3 text-green-100">
              <li className="text-lg">{t.propertyManagement}</li>
              <li className="text-lg">{t.homeInspection}</li>
              <li className="text-lg">{t.repairServices}</li>
              <li className="text-lg">{t.realEstateInvestment}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-xl text-white">{t.contact}</h4>
            <div className="text-green-100 space-y-2">
              <p className="text-lg">{t.phone}</p>
              <p className="text-lg">{t.email}</p>
              <p className="text-lg">{t.address}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-green-400 text-center text-green-100">
          <p className="text-lg">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;