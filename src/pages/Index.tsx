
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, DollarSign, Home, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const { t } = useLanguage();

  const featuredProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Modern Family Home",
      location: "Downtown, City Center",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sq ft"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      title: "Luxury Apartment",
      location: "Uptown District",
      price: "$680,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      title: "Cozy Cottage",
      location: "Suburban Area",
      price: "$320,000",
      beds: 2,
      baths: 1,
      sqft: "1,400 sq ft"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-brand-green to-brand-blue flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('home.hero.title')}</h1>
          <p className="text-xl mb-8">{t('home.hero.subtitle')}</p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('home.search.location')}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md"
                >
                  <option value="">{t('home.search.price')}</option>
                  <option value="0-200k">$0 - $200,000</option>
                  <option value="200k-500k">$200,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md"
                >
                  <option value="">{t('home.search.type')}</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              <Button className="bg-brand-green hover:bg-brand-green/90 h-10">
                <Search className="mr-2 h-4 w-4" />
                {t('home.search.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('home.featured.title')}</h2>
          <p className="text-gray-600 text-lg">{t('home.featured.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('common.featured')}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {property.location}
                </p>
                <p className="text-2xl font-bold text-brand-green mb-4">{property.price}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{property.beds} {t('common.beds')}</span>
                  <span>{property.baths} {t('common.baths')}</span>
                  <span>{property.sqft}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Action Boxes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/buy" className="group">
              <Card className="h-64 relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green to-green-700 group-hover:from-green-600 group-hover:to-green-800 transition-all duration-300"></div>
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-8">
                  <Home className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-3">{t('home.action.buy.title')}</h3>
                  <p className="text-green-100">{t('home.action.buy.desc')}</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/sell" className="group">
              <Card className="h-64 relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-700 group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300"></div>
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-8">
                  <DollarSign className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-3">{t('home.action.sell.title')}</h3>
                  <p className="text-blue-100">{t('home.action.sell.desc')}</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/rent" className="group">
              <Card className="h-64 relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-3">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300"></div>
                <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-8">
                  <Users className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-3">{t('home.action.rent.title')}</h3>
                  <p className="text-purple-100">{t('home.action.rent.desc')}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('common.company')}</h3>
              <p className="text-gray-300">{t('common.tagline')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/buy" className="hover:text-white">{t('nav.buy')}</Link></li>
                <li><Link to="/sell" className="hover:text-white">{t('nav.sell')}</Link></li>
                <li><Link to="/rent" className="hover:text-white">{t('nav.rent')}</Link></li>
                <li><Link to="/repairing" className="hover:text-white">{t('nav.repairing')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Property Management</li>
                <li>Home Inspection</li>
                <li>Repair Services</li>
                <li>Real Estate Investment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">123 Real Estate St.</p>
              <p className="text-gray-300">City, State 12345</p>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 {t('common.company')}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
