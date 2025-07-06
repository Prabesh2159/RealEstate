
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'np';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.buy': 'Buy',
    'nav.sell': 'Sell',
    'nav.rent': 'Rent',
    'nav.repairing': 'Repairing',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Home Page
    'home.hero.title': 'Find Your Dream Home',
    'home.hero.subtitle': 'Discover the perfect property with our comprehensive real estate platform',
    'home.search.location': 'Location',
    'home.search.price': 'Price Range',
    'home.search.type': 'Property Type',
    'home.search.button': 'Search',
    'home.featured.title': 'Featured Properties',
    'home.featured.subtitle': 'Discover our hand-picked selection of premium properties',
    'home.action.buy.title': 'Buy a Home',
    'home.action.buy.desc': 'Find your perfect home from thousands of listings',
    'home.action.sell.title': 'Sell a Home',
    'home.action.sell.desc': 'List your property and connect with buyers',
    'home.action.rent.title': 'Rent a Home',
    'home.action.rent.desc': 'Discover rental properties in your area',
    
    // Common
    'common.beds': 'beds',
    'common.baths': 'baths',
    'common.featured': 'Featured',
    'common.company': 'Real Estate Crafters',
    'common.tagline': 'Your trusted partner in real estate and home services.',
  },
  np: {
    // Navigation
    'nav.home': 'घर',
    'nav.buy': 'किन्नुहोस्',
    'nav.sell': 'बेच्नुहोस्',
    'nav.rent': 'भाडामा',
    'nav.repairing': 'मर्मत',
    'nav.contact': 'सम्पर्क',
    'nav.login': 'लगइन',
    'nav.register': 'दर्ता',
    
    // Home Page
    'home.hero.title': 'आफ्नो सपनाको घर खोज्नुहोस्',
    'home.hero.subtitle': 'हाम्रो व्यापक रियल इस्टेट प्लेटफर्मसँग उत्तम सम्पत्ति पत्ता लगाउनुहोस्',
    'home.search.location': 'स्थान',
    'home.search.price': 'मूल्य दायरा',
    'home.search.type': 'सम्पत्तिको प्रकार',
    'home.search.button': 'खोज्नुहोस्',
    'home.featured.title': 'विशेष सम्पत्तिहरू',
    'home.featured.subtitle': 'हाम्रो हातले छानिएका प्रिमियम सम्पत्तिहरू पत्ता लगाउनुहोस्',
    'home.action.buy.title': 'घर किन्नुहोस्',
    'home.action.buy.desc': 'हजारौं सूचीहरूबाट आफ्नो उत्तम घर फेला पार्नुहोस्',
    'home.action.sell.title': 'घर बेच्नुहोस्',
    'home.action.sell.desc': 'आफ्नो सम्पत्ति सूचीबद्ध गर्नुहोस् र खरीददारहरूसँग जडान गर्नुहोस्',
    'home.action.rent.title': 'घर भाडामा लिनुहोस्',
    'home.action.rent.desc': 'आफ्नो क्षेत्रमा भाडाका सम्पत्तिहरू पत्ता लगाउनुहोस्',
    
    // Common
    'common.beds': 'शयनकक्ष',
    'common.baths': 'बाथरूम',
    'common.featured': 'विशेष',
    'common.company': 'रियल इस्टेट क्राफ्टर्स',
    'common.tagline': 'रियल इस्टेट र घर सेवाहरूमा तपाईंको भरपर्दो साझेदार।',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'np'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'np' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
