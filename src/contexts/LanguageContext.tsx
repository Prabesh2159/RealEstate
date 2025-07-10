import Projects from '@/pages/Projects';
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
      Projects: "Projects",
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
      hero: {
        title: "Professional Home Services",
        subtitle: "Transform your space with our expert renovation and painting services.",
      },
      services: {
        title: "Our Services",
        subtitle: "Professional home improvement services tailored to your needs.",
        houseRenovation: "House Renovation",
        houseRenovationDesc: "Complete home transformation with modern design and quality craftsmanship.",
        interiorPainting: "Interior Painting",
        interiorPaintingDesc: "Professional interior painting services to refresh your living spaces.",
        exteriorPainting: "Exterior Painting",
        exteriorPaintingDesc: "Weather-resistant exterior painting to protect and beautify your home.",
        kitchenRenovation: "Kitchen Renovation",
        kitchenRenovationDesc: "Modern kitchen designs with premium materials and appliances.",
        bathroomRenovation: "Bathroom Renovation",
        bathroomRenovationDesc: "Luxurious bathroom upgrades with contemporary fixtures and finishes.",
        flooring: "Flooring Services",
        flooringDesc: "Professional flooring installation including hardwood, tile, and carpet.",
      },
      form: {
        title: "Request Service Quote",
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        address: "Property Address",
        serviceType: "Service Type",
        urgency: "Project Urgency",
        preferredDate: "Preferred Start Date",
        description: "Project Description",
        upload: "Upload Images",
        uploadDesc: "Upload images of your space to help us better understand your project",
        uploadFormat: "Supported formats: JPG, PNG, PDF (Max 5MB each)",
        chooseImages: "Choose Images",
        submit: "Submit Request",
      },
      toast: {
        title: "Service Request Submitted!",
        description: "We'll contact you within 24 hours to discuss your project.",
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
      home: "गृह",
      buy: "किन्नुहोस्",
      sell: "बेच्नुहोस्",
      rent: "भाडामा",
      others: "अन्य",
      contact: "सम्पर्क",
      Projects: "परियोजनाहरू",
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
      hero: {
        title: "व्यावसायिक घर सेवाहरू",
        subtitle: "हाम्रो विशेषज्ञ नवीकरण र पेन्टिङ सेवाहरूको साथ आफ्नो स्थान परिवर्तन गर्नुहोस्।",
      },
      services: {
        title: "हाम्रा सेवाहरू",
        subtitle: "तपाईंको आवश्यकता अनुसार व्यावसायिक घर सुधार सेवाहरू।",
        houseRenovation: "घर नवीकरण",
        houseRenovationDesc: "आधुनिक डिजाइन र गुणस्तरीय शिल्पकलाको साथ पूर्ण घर परिवर्तन।",
        interiorPainting: "भित्री पेन्टिङ",
        interiorPaintingDesc: "तपाईंको बसोबासको ठाउँहरू ताजा पार्न व्यावसायिक भित्री पेन्टिङ सेवाहरू।",
        exteriorPainting: "बाहिरी पेन्टिङ",
        exteriorPaintingDesc: "तपाईंको घरलाई सुरक्षित र सुन्दर बनाउन मौसम प्रतिरोधी बाहिरी पेन्टिङ।",
        kitchenRenovation: "भान्साकोठा नवीकरण",
        kitchenRenovationDesc: "प्रिमियम सामग्री र उपकरणहरूको साथ आधुनिक भान्साकोठा डिजाइन।",
        bathroomRenovation: "बाथरूम नवीकरण",
        bathroomRenovationDesc: "समकालीन फिक्स्चर र फिनिसिङको साथ विलासी बाथरूम अपग्रेड।",
        flooring: "फ्लोरिङ सेवाहरू",
        flooringDesc: "हार्डवुड, टाइल र कार्पेट सहित व्यावसायिक फ्लोरिङ स्थापना।",
      },
      form: {
        title: "सेवा कोट अनुरोध गर्नुहोस्",
        name: "पूरा नाम",
        phone: "फोन नम्बर",
        email: "इमेल ठेगाना",
        address: "सम्पत्ति ठेगाना",
        serviceType: "सेवा प्रकार",
        urgency: "परियोजना तत्काल",
        preferredDate: "मनपर्ने सुरुवात मिति",
        description: "परियोजना विवरण",
        upload: "छविहरू अपलोड गर्नुहोस्",
        uploadDesc: "तपाईंको परियोजनालाई राम्रोसँग बुझ्न मद्दत गर्न तपाईंको स्थानका छविहरू अपलोड गर्नुहोस्",
        uploadFormat: "समर्थित ढाँचाहरू: JPG, PNG, PDF (प्रत्येक अधिकतम 5MB)",
        chooseImages: "छविहरू छनौट गर्नुहोस्",
        submit: "अनुरोध पेश गर्नुहोस्",
      },
      toast: {
        title: "सेवा अनुरोध पेश गरियो!",
        description: "हामी तपाईंको परियोजनाको बारेमा छलफल गर्न 24 घण्टा भित्र तपाईंलाई सम्पर्क गर्नेछौं।",
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
