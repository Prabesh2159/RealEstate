import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LanguageContextProps {
  language: 'en' | 'np';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: "Home",
      buy: "Buy",
      sell: "Sell", 
      rent: "Rent",
      others: "Others",
      contact: "Contact",
    },
    home: {
      hero: {
        title: "Find Your Dream Home",
        subtitle: "Explore a wide range of properties and real estate services.",
      },
      search: {
        location: "Enter Location",
        price: "Select Price Range",
        type: "Select Property Type",
        button: "Search",
      },
      featured: {
        title: "Featured Properties",
        subtitle: "Explore our handpicked selection of premium properties.",
      },
      action: {
        buy: {
          title: "Buy a Home",
          desc: "Find the perfect property to call your own.",
        },
        sell: {
          title: "Sell Your Property",
          desc: "Get the best value for your property with our expert services.",
        },
        rent: {
          title: "Rent a Property",
          desc: "Discover a variety of rental options in your desired location.",
        },
        others: {
          title: "Explore More",
          desc: "Discover a variety of other services and opportunities.",
        }
      },
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team for any inquiries.",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        button: "Send Message",
      },
      info: {
        address: "123 Real Estate St, City, State 12345",
        phone: "(555) 123-4567",
        email: "info@realestatecrafters.com",
      },
    },
    others: {
      title: "Other Services",
      subtitle: "Explore our additional services and opportunities.",
      services: {
        management: "Property Management",
        inspection: "Home Inspection",
        repair: "Repair Services",
        investment: "Real Estate Investment",
      },
    },
    common: {
      company: "Real Estate Crafters International Private Limited",
      tagline: "Your trusted partner in real estate solutions",
      featured: "Featured",
      beds: "Beds",
      baths: "Baths",
      callNow: "Call Now",
      phone: "Phone"
    },
  },
  np: {
    nav: {
      home: "घर",
      buy: "किन्नुहोस्",
      sell: "बेच्नुहोस्",
      rent: "भाडामा",
      others: "अन्य",
      contact: "सम्पर्क",
    },
    home: {
      hero: {
        title: "आफ्नो सपनाको घर खोज्नुहोस्",
        subtitle: "विभिन्न सम्पत्तिहरू र घर जग्गा सेवाहरू अन्वेषण गर्नुहोस्।",
      },
      search: {
        location: "स्थान प्रविष्ट गर्नुहोस्",
        price: "मूल्य दायरा चयन गर्नुहोस्",
        type: "सम्पत्ति प्रकार चयन गर्नुहोस्",
        button: "खोज्नुहोस्",
      },
      featured: {
        title: "विशेष गुणहरू",
        subtitle: "हाम्रो प्रीमियम गुणहरूको ह्यान्डपिक गरिएको चयन अन्वेषण गर्नुहोस्।",
      },
      action: {
        buy: {
          title: "घर किन्नुहोस्",
          desc: "आफ्नो लागि कल गर्नको लागि उत्तम सम्पत्ति खोज्नुहोस्।",
        },
        sell: {
          title: "आफ्नो सम्पत्ति बेच्नुहोस्",
          desc: "हाम्रो विशेषज्ञ सेवाहरूको साथ आफ्नो सम्पत्तिको लागि उत्तम मूल्य प्राप्त गर्नुहोस्।",
        },
        rent: {
          title: "सम्पत्ति भाडामा लिनुहोस्",
          desc: "तपाईंको इच्छित स्थानमा विभिन्न भाडा विकल्पहरू पत्ता लगाउनुहोस्।",
        },
        others: {
          title: "थप अन्वेषण गर्नुहोस्",
          desc: "विभिन्न अन्य सेवाहरू र अवसरहरू पत्ता लगाउनुहोस्।",
        }
      },
    },
    contact: {
      title: "हामीलाई सम्पर्क गर्नुहोस्",
      subtitle: "कुनै पनि जिज्ञासाको लागि हाम्रो टीमसँग सम्पर्कमा रहनुहोस्।",
      form: {
        name: "तपाईंको नाम",
        email: "तपाईंको इमेल",
        message: "तपाईंको सन्देश",
        button: "सन्देश पठाउनुहोस्",
      },
      info: {
        address: "123 रियल एस्टेट सेन्ट, शहर, राज्य 12345",
        phone: "(555) 123-4567",
        email: "info@realestatecrafters.com",
      },
    },
    others: {
      title: "अन्य सेवाहरू",
      subtitle: "हाम्रो अतिरिक्त सेवाहरू र अवसरहरू अन्वेषण गर्नुहोस्।",
      services: {
        management: "सम्पत्ति व्यवस्थापन",
        inspection: "घर निरीक्षण",
        repair: "मरम्मत सेवाहरू",
        investment: "रियल एस्टेट लगानी",
      },
    },
    common: {
      company: "रियल एस्टेट क्राफ्टर्स इन्टरनेशनल प्राइभेट लिमिटेड",
      tagline: "रियल एस्टेट समाधानमा तपाईंको विश्वसनीय साझेदार",
      featured: "विशेष",
      beds: "शैया",
      baths: "बाथरूम",
      callNow: "अहिले कल गर्नुहोस्",
      phone: "फोन"
    },
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'np'>(
    (localStorage.getItem('language') as 'en' | 'np') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'np' : 'en'));
  }, []);

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [language]);

  const value = { language, toggleLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
