import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, Home, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

// Rain animation component
const RainAnimation = () => {
  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(10deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(10deg); opacity: 0; }
        }
        .rain-drop {
          animation: fall linear infinite;
        }
      `}</style>
      <div className="rain-container absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="rain-drop absolute w-0.5 bg-gradient-to-b from-transparent via-green-200/30 to-green-300/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              height: `${20 + Math.random() * 30}px`,
              transform: `translateY(-${Math.random() * 100}px)`,
            }}
          />
        ))}
      </div>
    </>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const { t } = useLanguage();

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      alert("Please enter a location to search");
      return;
    }
    
    // Create search parameters
    const searchParams = new URLSearchParams();
    if (searchLocation) searchParams.append('location', searchLocation);
    if (priceRange) searchParams.append('price', priceRange);
    if (propertyType) searchParams.append('type', propertyType);
    
    // Navigate to buy page with search parameters
    navigate(`/buy?${searchParams.toString()}`);
  };

  const featuredProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Modern Family Home",
      location: "Downtown, City Center",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sq ft"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      title: "Luxury Apartment",
      location: "Uptown District",
      price: "$680,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      title: "Cozy Cottage",
      location: "Suburban Area",
      price: "$320,000",
      beds: 2,
      baths: 1,
      sqft: "1,400 sq ft"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      title: "Executive Villa",
      location: "Premium Location",
      price: "$850,000",
      beds: 4,
      baths: 3,
      sqft: "3,200 sq ft"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      title: "Contemporary House",
      location: "Residential Area",
      price: "$520,000",
      beds: 3,
      baths: 2,
      sqft: "2,400 sq ft"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      title: "Garden View Apartment",
      location: "Green District",
      price: "$390,000",
      beds: 2,
      baths: 1,
      sqft: "1,600 sq ft"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Green Scenery and Rain */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Beautiful Green Scenery Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        
        {/* Rain Animation Overlay */}
        <RainAnimation />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-green-700/40" />
        
        {/* Floating particles for extra atmosphere */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-200/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg drop-shadow-2xl animate-slide-in-down">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 drop-shadow-lg animate-fade-in-up animate-delay-300">
            {t('home.hero.subtitle')}
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-4xl border border-white/20 animate-scale-in animate-delay-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-green-500" />
                <Input
                  placeholder={t('home.search.location')}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-12 h-12 text-gray-700 border-2 border-green-200 focus:border-brand-green rounded-xl smooth-transition"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 h-5 w-5 text-green-500" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 border-2 border-green-200 focus:border-brand-green rounded-xl text-gray-700 smooth-transition"
                >
                  <option value="">{t('home.search.price')}</option>
                  <option value="0-200k">$0 - $200,000</option>
                  <option value="200k-500k">$200,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>
              <div className="relative">
                <Home className="absolute left-4 top-4 h-5 w-5 text-green-500" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 border-2 border-green-200 focus:border-brand-green rounded-xl text-gray-700 smooth-transition"
                >
                  <option value="">{t('home.search.type')}</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-brand-green hover:bg-green-600 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl smooth-transition hover-lift"
              >
                <Search className="mr-2 h-5 w-5" />
                {t('home.search.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold text-green-800 mb-6">{t('home.featured.title')}</h2>
          <p className="text-green-600 text-xl">{t('home.featured.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProperties.map((property, index) => (
            <Card key={property.id} className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 rounded-2xl overflow-hidden border-2 border-green-100 hover:border-green-300 hover-lift animate-scale-in animate-delay-${200 + index * 100}`}>
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-6 right-6 bg-brand-green text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {t('common.featured')}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-3">{property.title}</h3>
                <p className="text-green-600 mb-4 flex items-center text-lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  {property.location}
                </p>
                <p className="text-3xl font-bold text-blue-600 mb-6">{property.price}</p>
                <div className="flex justify-between text-green-600 text-lg">
                  <span className="font-medium">{property.beds} {t('common.beds')}</span>
                  <span className="font-medium">{property.baths} {t('common.baths')}</span>
                  <span className="font-medium">{property.sqft}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Action Boxes */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link to="/buy" className="group animate-fade-in-left">
              <Card className="h-80 relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 rounded-2xl border-2 border-green-200 hover:border-green-400 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-800/90 group-hover:from-green-500/90 group-hover:to-green-700/90 transition-all duration-500" />
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-10">
                  <Home className="h-20 w-20 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold mb-4">{t('home.action.buy.title')}</h3>
                  <p className="text-green-100 text-lg">{t('home.action.buy.desc')}</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/sell" className="group animate-fade-in-up animate-delay-200">
              <Card className="h-80 relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 rounded-2xl border-2 border-green-200 hover:border-green-400 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-green-700/90 group-hover:from-green-400/90 group-hover:to-green-600/90 transition-all duration-500" />
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-10">
                  <DollarSign className="h-20 w-20 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold mb-4">{t('home.action.sell.title')}</h3>
                  <p className="text-green-100 text-lg">{t('home.action.sell.desc')}</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/rent" className="group animate-fade-in-right animate-delay-400">
              <Card className="h-80 relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 rounded-2xl border-2 border-green-200 hover:border-green-400 hover-lift">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7")'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-800/90 group-hover:from-green-500/90 group-hover:to-green-700/90 transition-all duration-500" />
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-10">
                  <Users className="h-20 w-20 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold mb-4">{t('home.action.rent.title')}</h3>
                  <p className="text-green-100 text-lg">{t('home.action.rent.desc')}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="animate-fade-in-left">
              <h3 className="text-2xl font-bold mb-6 text-gray-200">{t('common.company')}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{t('common.tagline')}</p>
            </div>
            <div className="animate-fade-in-up animate-delay-200">
              <h4 className="font-bold mb-6 text-xl text-gray-200">Quick Links</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/buy" className="hover:text-gray-100 smooth-transition text-lg">{t('nav.buy')}</Link></li>
                <li><Link to="/sell" className="hover:text-gray-100 smooth-transition text-lg">{t('nav.sell')}</Link></li>
                <li><Link to="/rent" className="hover:text-gray-100 smooth-transition text-lg">{t('nav.rent')}</Link></li>
                <li><Link to="/others" className="hover:text-gray-100 smooth-transition text-lg">{t('nav.others')}</Link></li>
              </ul>
            </div>
            <div className="animate-fade-in-up animate-delay-400">
              <h4 className="font-bold mb-6 text-xl text-gray-200">Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="text-lg">Property Management</li>
                <li className="text-lg">Home Inspection</li>
                <li className="text-lg">Repair Services</li>
                <li className="text-lg">Real Estate Investment</li>
              </ul>
            </div>
            <div className="animate-fade-in-right animate-delay-600">
              <h4 className="font-bold mb-6 text-xl text-gray-200">Contact</h4>
              <div className="text-gray-300 space-y-2">
                <p className="text-lg">123 Real Estate St.</p>
                <p className="text-lg">City, State 12345</p>
                <p className="text-lg">Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300 animate-fade-in-up animate-delay-800">
            <p className="text-lg">&copy; 2024 {t('common.company')}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
