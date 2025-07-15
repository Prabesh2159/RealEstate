import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

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
      about: "About",
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
    buy: {
      hero: {
        title: "Find Your Perfect Property",
        subtitle: "Discover amazing properties that match your dreams and budget."
      },
      title: "Buy Property",
      subtitle: "Discover your perfect property from our extensive collection of homes and commercial spaces.",
      search: {
        placeholder: "Search properties by title or location..."
      },
      filters: {
        allLocations: "All Locations",
        downtown: "Downtown",
        uptown: "Uptown",
        suburbs: "Suburbs",
        midtown: "Midtown",
        artsDistrict: "Arts District",
        allPrices: "All Prices",
        under50L: "Under रू 50,00,000",
        "50L75L": "रू 50,00,000 - रू 75,00,000",
        "75L1Cr": "रू 75,00,000 - रू 1,00,00,000",
        over1Cr: "रू 1,00,00,000+",
        allTypes: "All Types",
        house: "House",
        apartment: "Apartment",
        condo: "Condo",
        loft: "Loft",
        apply: "Apply Filters"
      },
      results: {
        showing: "Showing",
        of: "of",
        properties: "properties"
      },
      property: {
        forSale: "For Sale",
        beds: "beds",
        baths: "baths",
        contact: "Contact Agent"
      },
      noResults: {
        message: "No properties found matching your criteria.",
        clearFilters: "Clear All Filters"
      }
    },
    sell: {
      hero: {
        title: "Sell Your Property with Ease",
        subtitle: "List your property quickly and reach a wide network of potential buyers."
      },
      title: "Sell Your Property",
      subtitle: "Get the best value for your property with our professional selling services.",
      form: {
        title: "Property Details",
        propertyTitle: "Property Title",
        propertyTitlePlaceholder: "e.g., Spacious Family Home",
        location: "Property Location",
        locationPlaceholder: "e.g., Kathmandu, Nepal",
        price: "Expected Price",
        pricePlaceholder: "e.g., 1,50,00,000",
        propertyType: "Property Type",
        selectType: "Select Property Type",
        types: {
          house: "House",
          apartment: "Apartment",
          condo: "Condo",
          townhouse: "Townhouse"
        },
        bedrooms: "Number of Bedrooms",
        bathrooms: "Number of Bathrooms",
        sqft: "Total Area (sq ft)",
        description: "Property Description",
        descriptionPlaceholder: "Provide a detailed description of your property...",
        images: "Property Images",
        upload: {
          text: "Drag & drop your property images here, or",
          formats: "Supported formats: JPG, PNG, PDF (Max 5MB each)",
          button: "Browse Files"
        },
        contact: {
          title: "Your Contact Information",
          name: "Full Name",
          namePlaceholder: "Your Full Name",
          email: "Email Address",
          emailPlaceholder: "your@example.com",
          phone: "Phone Number",
          phonePlaceholder: "+977-XXXXXXXXXX"
        },
        submit: "List Property",
        success: {
          title: "Property Listed Successfully!",
          description: "Your property has been submitted for review. We will contact you soon."
        }
      }
    },
    rent: {
      hero: {
        title: "Find Your Ideal Rental",
        subtitle: "Discover a wide range of rental properties to suit your lifestyle and budget."
      },
      title: "Rent Property",
      subtitle: "Find your ideal rental property from our carefully curated selection.",
      search: {
        placeholder: "Search rentals by title or location..."
      },
      filters: {
        location: "Location",
        rentRange: "Rent Range",
        propertyType: "Property Type",
        bedrooms: "Bedrooms",
        search: "Search Rentals",
        allLocations: "All Locations",
        downtown: "Downtown",
        uptown: "Uptown",
        suburbs: "Suburbs",
        midtown: "Midtown",
        artsDistrict: "Arts District",
        allPrices: "All Prices",
        "0-15000": "Under रू 15,000",
        "15000-25000": "रू 15,000 - रू 25,000",
        "25000-35000": "रू 25,000 - रू 35,000",
        "35000+": "रू 35,000+",
        allTypes: "All Types",
        apartment: "Apartment",
        house: "House",
        studio: "Studio",
        townhouse: "Townhouse",
        penthouse: "Penthouse",
        apply: "Apply Filters"
      },
      results: {
        showing: "Showing",
        of: "of",
        properties: "properties"
      },
      property: {
        forRent: "For Rent",
        bed: "bed",
        bath: "bath",
        contact: "Contact Agent"
      },
      noResults: {
        message: "No rental properties found matching your criteria.",
        clearFilters: "Clear All Filters"
      }
    },
    projects: {
      title: "Our Projects",
      subtitle: "Explore our completed and ongoing real estate development projects.",
      status: {
        completed: "Completed",
        ongoing: "Ongoing",
        upcoming: "Upcoming"
      },
      details: {
        location: "Location",
        units: "Total Units",
        completion: "Completion Date"
      },
      search: {
        placeholder: "Search projects by title, location or client..."
      },
      filters: {
        allLocations: "All Locations",
        downtown: "Downtown",
        suburb: "Suburb",
        central: "Central",
        coastal: "Coastal",
        historic: "Historic",
        allStatus: "All Status",
        completed: "Completed",
        allTypes: "All Types",
        apply: "Apply Filters"
      },
      results: {
        showing: "Showing",
        of: "of",
        projects: "projects"
      },
      project: {
        completed: "Completed",
        client: "Client",
        size: "Size",
        duration: "Duration",
        status: "Status",
        viewDetails: "View Details"
      },
      noResults: {
        message: "No projects found matching your criteria.",
        clearFilters: "Clear All Filters"
      }
    },
    about: {
      title: "About Us",
      subtitle: "Real Estate Crafters International Private Limited is a leading real estate company committed to providing exceptional property services.",
      stats: {
        title: "Our Achievements",
        subtitle: "Years of dedication and excellence in the real estate industry.",
        experience: "Years of Experience",
        experienceDesc: "Serving clients with dedication and expertise",
        projects: "Completed Projects",
        projectsDesc: "Successfully delivered residential and commercial projects",
        clients: "Happy Clients",
        clientsDesc: "Satisfied customers who trust our services"
      },
      branches: {
        title: "Our Branches",
        subtitle: "We have established our presence across multiple locations to serve you better.",
        branch1: {
          name: "Kathmandu Branch",
          location: "Thamel, Kathmandu, Nepal"
        },
        branch2: {
          name: "Pokhara Branch",
          location: "Lakeside, Pokhara, Nepal"
        },
        branch3: {
          name: "Bardibas Branch",
          location: "Bardibas-1,Mahottari, Nepal"
        },
        branch4: {
          name: "Janakpur Branch",
          location: "Janakpurdham, Dhanusha, Nepal"
        }
      },
      ceo: {
        title: "Chief Executive Officer",
        name: "Mr. Aarman",
        description: "Leading the company with vision and expertise in real estate industry. With over 15 years of experience, he has successfully guided our organization to become a trusted name in the real estate sector."
      },
      reviews: {
        title: "What Our Clients Say",
        subtitle: "Read testimonials from our satisfied customers who have experienced our exceptional service.",
        client1: {
          name: "Aashutosh Bhattarai",
          review: "Excellent service! They helped me find my dream home within my budget. Highly professional and reliable."
        },
        client2: {
          name: "Prabesh Ojha",
          review: "Outstanding experience selling my property. The team was very supportive throughout the entire process."
        },
        client3: {
          name: "Arjun Dahal",
          review: "Great rental service! Found the perfect apartment in my preferred location. Very responsive team."
        }
      }
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team for any inquiries.",
      form: {
        title: "Send us a Message",
        subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        button: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "your@email.com",
        subjectPlaceholder: "What's this about?",
        messagePlaceholder: "Tell us how we can help you...",
      },
      info: {
        getInTouchTitle: "Get in Touch",
        getInTouchDesc: "We'd love to hear from you. Here's how you can reach us.",
        addressTitle: "Our Address",
        phoneTitle: "Phone Number",
        emailTitle: "Email Address",
        hoursTitle: "Business Hours",
        hoursDays: "Sunday - Friday: 9:00 AM - 6:00 PM",
        hoursSaturday: "Saturday: Closed",
        address: "Dhanusha, Janakpurdham",
        phone: "+977 970-7362231",
        email: "realestatecrafters1@gmail.com",
      },
      toast: {
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
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
      sqft: "sq ft",
      callNow: "Call Now",
      phone: "Phone",
      viewDetails: "View Details", // Added for common
    },
  },
  np: {
    nav: {
      home: "गृह",
      buy: "खरिद",
      sell: "बिक्री",
      rent: "भाडामा",
      others: "अन्य",
      contact: "सम्पर्क",
      Projects: "परियोजनाहरू",
      about: "हाम्रो बारे",
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
    buy: {
      hero: {
        title: "आफ्नो उत्तम सम्पत्ति खोज्नुहोस्",
        subtitle: "तपाईंको सपना र बजेट अनुकूल अद्भुत सम्पत्तिहरू पत्ता लगाउनुहोस्।"
      },
      title: "सम्पत्ति किन्नुहोस्",
      subtitle: "घर र व्यावसायिक स्थानहरूको हाम्रो व्यापक संग्रहबाट आफ्नो उत्तम सम्पत्ति पत्ता लगाउनुहोस्।",
      search: {
        placeholder: "शीर्षक वा स्थानद्वारा सम्पत्तिहरू खोज्नुहोस्..."
      },
      filters: {
        allLocations: "सबै स्थानहरू",
        downtown: "डाउनटाउन",
        uptown: "अपटाउन",
        suburbs: "उपनगरहरू",
        midtown: "मिडटाउन",
        artsDistrict: "कला जिल्ला",
        allPrices: "सबै मूल्यहरू",
        under50L: "रू ५०,००,००० मुनि",
        "50L75L": "रू ५०,००,००० - रू ७५,००,०००",
        "75L1Cr": "रू ७५,००,००० - रू १,००,००,०००",
        over1Cr: "रू १,००,००,०००+",
        allTypes: "सबै प्रकारहरू",
        house: "घर",
        apartment: "अपार्टमेन्ट",
        condo: "कन्डो",
        loft: "लफ्ट",
        apply: "फिल्टर लागू गर्नुहोस्"
      },
      results: {
        showing: "देखाइँदै",
        of: "को",
        properties: "सम्पत्तिहरू"
      },
      property: {
        forSale: "बिक्रीको लागि",
        beds: "शैयाहरू",
        baths: "बाथरूमहरू",
        contact: "एजेन्टलाई सम्पर्क गर्नुहोस्"
      },
      noResults: {
        message: "तपाईंको मापदण्ड मिल्ने कुनै सम्पत्ति फेला परेन।",
        clearFilters: "सबै फिल्टरहरू सफा गर्नुहोस्"
      }
    },
    sell: {
      hero: {
        title: "आफ्नो सम्पत्ति सजिलै बेच्नुहोस्",
        subtitle: "आफ्नो सम्पत्ति छिटो सूचीबद्ध गर्नुहोस् र सम्भावित खरीददारहरूको विस्तृत सञ्जालमा पुग्नुहोस्।"
      },
      title: "आफ्नो सम्पत्ति बेच्नुहोस्",
      subtitle: "हाम्रो व्यावसायिक बिक्री सेवाहरूको साथ आफ्नो सम्पत्तिको लागि उत्तम मूल्य प्राप्त गर्नुहोस्।",
      form: {
        title: "सम्पत्ति विवरणहरू",
        propertyTitle: "सम्पत्तिको शीर्षक",
        propertyTitlePlaceholder: "जस्तै, विशाल पारिवारिक घर",
        location: "सम्पत्ति स्थान",
        locationPlaceholder: "जस्तै, काठमाडौं, नेपाल",
        price: "अपेक्षित मूल्य",
        pricePlaceholder: "जस्तै, १,५०,००,०००",
        propertyType: "सम्पत्ति प्रकार",
        selectType: "सम्पत्तिको प्रकार छान्नुहोस्",
        types: {
          house: "घर",
          apartment: "अपार्टमेन्ट",
          condo: "कन्डो",
          townhouse: "टाउनहाउस"
        },
        bedrooms: "शयनकक्षहरूको संख्या",
        bathrooms: "बाथरूमहरूको संख्या",
        sqft: "कुल क्षेत्रफल (वर्ग फिट)",
        description: "सम्पत्ति विवरण",
        descriptionPlaceholder: "आफ्नो सम्पत्तिको विस्तृत विवरण प्रदान गर्नुहोस्...",
        images: "सम्पत्तिको छविहरू",
        upload: {
          text: "आफ्ना सम्पत्तिका छविहरू यहाँ तान्नुहोस् र छोड्नुहोस्, वा",
          formats: "समर्थित ढाँचाहरू: JPG, PNG, PDF (प्रत्येक अधिकतम 5MB)",
          button: "फाइलहरू ब्राउज गर्नुहोस्"
        },
        contact: {
          title: "तपाईंको सम्पर्क जानकारी",
          name: "पूरा नाम",
          namePlaceholder: "तपाईंको पूरा नाम",
          email: "इमेल ठेगाना",
          emailPlaceholder: "your@example.com",
          phone: "फोन नम्बर",
          phonePlaceholder: "+९७७-XXXXXXXXXX"
        },
        submit: "सम्पत्ति सूचीबद्ध गर्नुहोस्",
        success: {
          title: "सम्पत्ति सफलतापूर्वक सूचीबद्ध भयो!",
          description: "तपाईंको सम्पत्ति समीक्षाको लागि पेश गरिएको छ। हामी तपाईंलाई चाँडै सम्पर्क गर्नेछौं।"
        }
      }
    },
    rent: {
      hero: {
        title: "आफुले भाडामा लिने घर खोज्नुहोस्",
        subtitle: "तपाईंको जीवनशैली र बजेट अनुरूप भाडाका सम्पत्तिहरूको विस्तृत श्रृंखला पत्ता लगाउनुहोस्।"
      },
      title: "सम्पत्ति भाडामा",
      subtitle: "हाम्रो सावधानीपूर्वक चयन गरिएको संग्रहबाट आफ्नो आदर्श भाडा सम्पत्ति पत्ता लगाउनुहोस्।",
      search: {
        placeholder: "शीर्षक वा स्थानद्वारा भाडा खोज्नुहोस्..."
      },
      filters: {
        location: "स्थान",
        rentRange: "भाडा दायरा",
        propertyType: "सम्पत्ति प्रकार",
        bedrooms: "शयनकक्षहरू",
        search: "भाडाहरू खोज्नुहोस्",
        allLocations: "सबै स्थानहरू",
        downtown: "डाउनटाउन",
        uptown: "अपटाउन",
        suburbs: "उपनगरहरू",
        midtown: "मिडटाउन",
        artsDistrict: "कला जिल्ला",
        allPrices: "सबै मूल्यहरू",
        "0-15000": "रू १५,००० मुनि",
        "15000-25000": "रू १५,००० - रू २५,०००",
        "25000-35000": "रू २५,००० - रू ३५,०००",
        "35000+": "रू ३५,०००+",
        allTypes: "सबै प्रकारहरू",
        apartment: "अपार्टमेन्ट",
        house: "घर",
        studio: "स्टुडियो",
        townhouse: "टाउनहाउस",
        penthouse: "पेन्टहाउस",
        apply: "फिल्टर लागू गर्नुहोस्"
      },
      results: {
        showing: "देखाइँदै",
        of: "को",
        properties: "सम्पत्तिहरू"
      },
      property: {
        forRent: "भाडाको लागि",
        bed: "शैया",
        bath: "बाथरूम",
        contact: "एजेन्टलाई सम्पर्क गर्नुहोस्"
      },
      noResults: {
        message: "तपाईंको मापदण्ड मिल्ने कुनै भाडाका सम्पत्तिहरू फेला परेनन्।",
        clearFilters: "सबै फिल्टरहरू सफा गर्नुहोस्"
      }
    },
    projects: {
      title: "हाम्रा परियोजनाहरू",
      subtitle: "हाम्रो पूरा भएका र चलिरहेका घरजग्गा विकास परियोजनाहरू अन्वेषण गर्नुहोस्।",
      status: {
        completed: "पूरा भएको",
        ongoing: "चलिरहेको",
        upcoming: "आगामी"
      },
      details: {
        location: "स्थान",
        units: "कुल एकाइहरू",
        completion: "पूर्णता मिति"
      },
      search: {
        placeholder: "शीर्षक, स्थान वा ग्राहकद्वारा परियोजनाहरू खोज्नुहोस्..."
      },
      filters: {
        allLocations: "सबै स्थानहरू",
        downtown: "डाउनटाउन",
        suburb: "उपनगर",
        central: "केन्द्रीय",
        coastal: "तटीय",
        historic: "ऐतिहासिक",
        allStatus: "सबै स्थिति",
        completed: "पूरा भएको",
        allTypes: "सबै प्रकारहरू",
        apply: "फिल्टर लागू गर्नुहोस्"
      },
      results: {
        showing: "देखाइँदै",
        of: "को",
        projects: "परियोजनाहरू"
      },
      project: {
        completed: "पूरा भएको",
        client: "ग्राहक",
        size: "आकार",
        duration: "अवधि",
        status: "स्थिति",
        viewDetails: "विवरण हेर्नुहोस्" // Added for projects.project
      },
      noResults: {
        message: "तपाईंको मापदण्ड मिल्ने कुनै परियोजनाहरू फेला परेनन्।",
        clearFilters: "सबै फिल्टरहरू सफा गर्नुहोस्"
      }
    },
    about: {
      title: "हाम्रो बारेमा",
      subtitle: "रियल इस्टेट क्राफ्टर्स इन्टरनेशनल प्राइवेट लिमिटेड एक अग्रणी घर जग्गा कम्पनी हो जुन असाधारण सम्पत्ति सेवाहरू प्रदान गर्न प्रतिबद्ध छ।",
      stats: {
        title: "हाम्रा उपलब्धिहरू",
        subtitle: "घर जग्गा उद्योगमा वर्षौंको समर्पण र उत्कृष्टता।",
        experience: "वर्षौंको अनुभव",
        experienceDesc: "समर्पण र विशेषज्ञताका साथ ग्राहकहरूलाई सेवा प्रदान गर्दै",
        projects: "पूरा भएका परियोजनाहरू",
        projectsDesc: "आवासीय र व्यावसायिक परियोजनाहरू सफलतापूर्वक सम्पन्न",
        clients: "खुसी ग्राहकहरू",
        clientsDesc: "हाम्रो सेवाहरूमा विश्वास गर्ने सन्तुष्ट ग्राहकहरू"
      },
      branches: {
        title: "हाम्रा शाखाहरू",
        subtitle: "हामीले तपाईंलाई अझ राम्रो सेवा दिन धेरै स्थानहरूमा आफ्नो उपस्थिति स्थापना गरेका छौं।",
        branch1: {
          name: "काठमाडौं शाखा",
          location: "ठमेल, काठमाडौं, नेपाल"
        },
        branch2: {
          name: "पोखरा शाखा",
          location: "लेकसाइड, पोखरा, नेपाल"
        },
        branch3: {
          name: "बर्दिबास शाखा",
          location: "बर्दिबास-१, महोत्तरी, नेपाल"
        },
        branch4: {
          name: "जनकपुर शाखा",
          location: "जनकपुरधाम, धनुषा, नेपाल"
        }
      },
      ceo: {
        title: "प्रमुख कार्यकारी अधिकृत",
        name: "श्री अरमान",
        description: "घर जग्गा उद्योगमा दूरदृष्टि र विशेषज्ञताका साथ कम्पनीको नेतृत्व गर्दै। १५ वर्षभन्दा बढीको अनुभवका साथ, उहाँले हाम्रो संस्थालाई घर जग्गा क्षेत्रमा एक विश्वसनीय नाम बनाउन सफलतापूर्वक मार्गदर्शन गर्नुभएको छ।"
      },
      reviews: {
        title: "हाम्रा ग्राहकहरू के भन्छन्",
        subtitle: "हाम्रो असाधारण सेवा अनुभव गरेका सन्तुष्ट ग्राहकहरूका प्रशंसापत्रहरू पढ्नुहोस्।",
        client1: {
          name: "आशुतोष भट्टराई",
          review: "उत्कृष्ट सेवा! उनीहरूले मलाई मेरो बजेट भित्र मेरो सपनाको घर फेला पार्न मद्दत गरे। निकै व्यावसायिक र विश्वसनीय।"
        },
        client2: {
          name: "प्रवेश ओझा",
          review: "मेरो सम्पत्ति बेच्नमा उत्कृष्ट अनुभव। टोलीले पूरै प्रक्रियामा धेरै सहयोग गर्यो।"
        },
        client3: {
          name: "अर्जुन दाहाल",
          review: "मैले मेरो मनपर्ने स्थानमा उत्तम अपार्टमेन्ट फेला पारे। धेरै प्रतिक्रियाशील टोली अनि उस्तै उत्कृष्ट सेवा ।"
        }
      }
    },
    contact: {
      title: "हामीलाई सम्पर्क गर्नुहोस्",
      subtitle: "हाम्रो टोलीसँग कुनै पनि सोधपुछको लागि सम्पर्कमा रहनुहोस्।",
      form: {
        title: "हामीलाई सन्देश पठाउनुहोस्",
        subtitle: "तलको फारम भर्नुहोस् र हामी तपाईंलाई चाँडो भन्दा चाँडो सम्पर्क गर्नेछौं।",
        name: "तपाईंको नाम",
        email: "तपाईंको इमेल",
        subject: "विषय",
        message: "तपाईंको सन्देश",
        button: "सन्देश पठाउनुहोस्",
        namePlaceholder: "आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्",
        emailPlaceholder: "तपाईंको@example.com",
        subjectPlaceholder: "यो केको बारेमा हो?",
        messagePlaceholder: "तपाईंलाई कसरी मद्दत गर्न सक्छौं भन्नुहोस्...",
      },
      info: {
        getInTouchTitle: "सम्पर्कमा रहनुहोस्",
        getInTouchDesc: "हामी तपाईंबाट सुन्न चाहन्छौं। यहाँ तपाईं हामीलाई कसरी सम्पर्क गर्न सक्नुहुन्छ।",
        addressTitle: "हाम्रो ठेगाना",
        phoneTitle: "फोन नम्बर",
        emailTitle: "इमेल ठेगाना",
        hoursTitle: "व्यवसायका घण्टाहरू",
        hoursDays: "आइतबार - शुक्रबार: बिहान ९:०० - बेलुका ६:००",
        hoursSaturday: "शनिबार: बन्द",
        address: "धनुषा, जनकपुरधाम",
        phone: "+९७७ ९७०-७३६२२३१",
        email: "realestatecrafters1@gmail.com",
      },
      toast: {
        title: "सन्देश पठाइयो!",
        description: "हामीलाई सम्पर्क गर्नुभएकोमा धन्यवाद। हामी तपाईंलाई चाँडै सम्पर्क गर्नेछौं।",
      },
    },
    others: {
      hero: {
        title: "व्यावसायिक गृह सेवाहरू",
        subtitle: "हाम्रो विशेषज्ञ नवीकरण र चित्रकला सेवाहरूको साथ तपाईंको ठाउँ बदल्नुहोस्।",
      },
      services: {
        title: "हाम्रा सेवाहरू",
        subtitle: "तपाईंको आवश्यकता अनुसार अनुकूलित व्यावसायिक गृह सुधार सेवाहरू।",
        houseRenovation: "घर नवीकरण",
        houseRenovationDesc: "आधुनिक डिजाइन र गुणस्तरीय शिल्पकलाको साथ पूर्ण घर रूपान्तरण।",
        interiorPainting: "भित्री चित्रकला",
        interiorPaintingDesc: "तपाईंको बस्ने ठाउँहरू ताजा गर्न व्यावसायिक भित्री चित्रकला सेवाहरू।",
        exteriorPainting: "बाहिरी चित्रकला",
        exteriorPaintingDesc: "तपाईंको घरको सुरक्षा र सुन्दरताको लागि मौसम प्रतिरोधी बाहिरी चित्रकला।",
        kitchenRenovation: "भान्छा नवीकरण",
        kitchenRenovationDesc: "प्रिमियम सामग्री र उपकरणहरूको साथ आधुनिक भान्छा डिजाइन।",
        bathroomRenovation: "बाथरूम नवीकरण",
        bathroomRenovationDesc: "समकालीन फिक्स्चर र फिनिशको साथ विलासी बाथरूम अपग्रेड।",
        flooring: "फ्लोरिंग सेवाहरू",
        flooringDesc: "हार्डवुड, टाइल, र गलैँचा सहित व्यावसायिक फ्लोरिंग स्थापना।",
      },
      form: {
        title: "सेवा उद्धरण अनुरोध गर्नुहोस्",
        name: "पूरा नाम",
        phone: "फोन नम्बर",
        email: "इमेल ठेगाना",
        address: "सम्पत्ति ठेगाना",
        serviceType: "सेवा प्रकार",
        urgency: "परियोजनाको जरुरीता",
        preferredDate: "मनपर्ने सुरु मिति",
        description: "परियोजना विवरण",
        upload: "छविहरू अपलोड गर्नुहोस्",
        uploadDesc: "तपाईंको परियोजना राम्रोसँग बुझ्नको लागि तपाईंको ठाउँका छविहरू अपलोड गर्नुहोस्",
        uploadFormat: "समर्थित ढाँचाहरू: JPG, PNG, PDF (प्रत्येक अधिकतम 5MB)",
        chooseImages: "छविहरू छान्नुहोस्",
        submit: "अनुरोध पेश गर्नुहोस्",
      },
      toast: {
        title: "सेवा अनुरोध पेश गरियो!",
        description: "हामी तपाईंको परियोजना छलफल गर्न २४ घण्टा भित्र तपाईंलाई सम्पर्क गर्नेछौं।",
      },
    },
    common: {
      company: "रियल इस्टेट क्राफ्टर्स इन्टरनेशनल प्राइवेट लिमिटेड",
      tagline: "घर जग्गा समाधानमा तपाईंको विश्वसनीय साझेदार",
      featured: "विशेष",
      beds: "शैयाहरू",
      baths: "बाथरूमहरू",
      sqft: "वर्ग फिट",
      callNow: "अहिले कल गर्नुहोस्",
      phone: "फोन",
      viewDetails: "विवरण हेर्नुहोस्", // Added for common
    },
  },
};

const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'np'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'np') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'np' : 'en'));
  }, []);

  const t = useCallback((key: string): string => {
    console.log(`Translation requested for key: ${key}, language: ${language}`);
    
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.log(`Key not found: ${k} in ${JSON.stringify(Object.keys(result || {}))}`);
        // Fallback to English if translation is missing
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
          if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
            fallbackResult = fallbackResult[fk];
          } else {
            console.log(`Fallback key not found: ${fk}`);
            return key; // Return the key itself if no translation is found
          }
        }
        return fallbackResult;
      }
    }
    
    console.log(`Translation result: ${result}`);
    return typeof result === 'string' ? result : key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
    t,
  }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };