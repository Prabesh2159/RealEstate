
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
    'nav.others': 'Others',
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
    
    // Others Page
    'others.hero.title': 'Other Services',
    'others.hero.subtitle': 'House Renovation & Painting Services',
    'others.services.title': 'Our Services',
    'others.services.subtitle': 'Professional renovation and painting services for your home',
    'others.form.title': 'Request a Service',
    'others.form.name': 'Full Name',
    'others.form.phone': 'Phone Number',
    'others.form.email': 'Email Address',
    'others.form.address': 'Property Address',
    'others.form.serviceType': 'Service Type',
    'others.form.urgency': 'Urgency Level',
    'others.form.preferredDate': 'Preferred Start Date',
    'others.form.description': 'Project Description',
    'others.form.upload': 'Upload Images (Optional)',
    'others.form.uploadDesc': 'Upload photos of the area to be renovated',
    'others.form.uploadFormat': 'PNG, JPG up to 5MB each',
    'others.form.chooseImages': 'Choose Images',
    'others.form.submit': 'Submit Service Request',
    'others.services.houseRenovation': 'House Renovation',
    'others.services.houseRenovationDesc': 'Complete home makeovers, room additions, and structural improvements',
    'others.services.interiorPainting': 'Interior Painting',
    'others.services.interiorPaintingDesc': 'Professional interior wall painting and color consultations',
    'others.services.exteriorPainting': 'Exterior Painting',
    'others.services.exteriorPaintingDesc': 'Weather-resistant exterior painting and facade improvements',
    'others.services.kitchenRenovation': 'Kitchen Renovation',
    'others.services.kitchenRenovationDesc': 'Modern kitchen upgrades, cabinet installation, and countertops',
    'others.services.bathroomRenovation': 'Bathroom Renovation',
    'others.services.bathroomRenovationDesc': 'Bathroom remodeling, tile work, and fixture installation',
    'others.services.flooring': 'Flooring Services',
    'others.services.flooringDesc': 'Hardwood, tile, carpet, and laminate flooring installation',
    'others.toast.title': 'Service Request Submitted!',
    'others.toast.description': 'We\'ll contact you within 24 hours to discuss your renovation project.',
    
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
    'nav.others': 'अन्य',
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
    
    // Others Page
    'others.hero.title': 'अन्य सेवाहरू',
    'others.hero.subtitle': 'घर नवीकरण र पेन्टिङ सेवाहरू',
    'others.services.title': 'हाम्रा सेवाहरू',
    'others.services.subtitle': 'तपाईंको घरको लागि व्यावसायिक नवीकरण र पेन्टिङ सेवाहरू',
    'others.form.title': 'सेवाको लागि अनुरोध गर्नुहोस्',
    'others.form.name': 'पूरा नाम',
    'others.form.phone': 'फोन नम्बर',
    'others.form.email': 'इमेल ठेगाना',
    'others.form.address': 'सम्पत्तिको ठेगाना',
    'others.form.serviceType': 'सेवाको प्रकार',
    'others.form.urgency': 'जरुरीको स्तर',
    'others.form.preferredDate': 'मनपर्ने सुरुवात मिति',
    'others.form.description': 'परियोजना विवरण',
    'others.form.upload': 'तस्विरहरू अपलोड गर्नुहोस् (वैकल्पिक)',
    'others.form.uploadDesc': 'नवीकरण गरिने क्षेत्रका तस्विरहरू अपलोड गर्नुहोस्',
    'others.form.uploadFormat': 'PNG, JPG प्रत्येक 5MB सम्म',
    'others.form.chooseImages': 'तस्विरहरू छान्नुहोस्',
    'others.form.submit': 'सेवा अनुरोध पेश गर्नुहोस्',
    'others.services.houseRenovation': 'घर नवीकरण',
    'others.services.houseRenovationDesc': 'पूर्ण घर परिवर्तन, कोठा थप, र संरचनात्मक सुधार',
    'others.services.interiorPainting': 'भित्री पेन्टिङ',
    'others.services.interiorPaintingDesc': 'व्यावसायिक भित्री भित्ता पेन्टिङ र रंग सल्लाह',
    'others.services.exteriorPainting': 'बाहिरी पेन्टिङ',
    'others.services.exteriorPaintingDesc': 'मौसम प्रतिरोधी बाहिरी पेन्टिङ र अग्रभाग सुधार',
    'others.services.kitchenRenovation': 'भान्साको नवीकरण',
    'others.services.kitchenRenovationDesc': 'आधुनिक भान्सा स्तरोन्नति, क्याबिनेट स्थापना, र काउन्टरटप',
    'others.services.bathroomRenovation': 'बाथरूम नवीकरण',
    'others.services.bathroomRenovationDesc': 'बाथरूम पुनर्निर्माण, टाइल काम, र फिक्स्चर स्थापना',
    'others.services.flooring': 'फर्श सेवाहरू',
    'others.services.flooringDesc': 'कडा काठ, टाइल, कार्पेट, र ल्यामिनेट फर्श स्थापना',
    'others.toast.title': 'सेवा अनुरोध पेश गरियो!',
    'others.toast.description': 'हामी तपाईंको नवीकरण परियोजनाको बारेमा छलफल गर्न 24 घण्टा भित्र सम्पर्क गर्नेछौं।',
    
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
