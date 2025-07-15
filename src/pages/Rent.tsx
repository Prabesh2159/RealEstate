import { useState } from "react";
import { Search, Filter, MapPin, Bed, Bath, Square, Calendar, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Rent = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const rentalProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", // Image from Projects.tsx
      title: "Spacious Downtown Apartment",
      location: "123 Main Street, Downtown",
      price: "रू 22,000/month",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: "apartment",
      available: "Available Now"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00", // Image from Projects.tsx
      title: "Modern Studio Loft",
      location: "456 Oak Avenue, Arts District",
      price: "रू 18,000/month",
      beds: 1,
      baths: 1,
      sqft: 900,
      type: "studio",
      available: "Dec 1, 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c", // Image from Projects.tsx
      title: "Family House with Yard",
      location: "789 Pine Street, Suburbs",
      price: "रू 35,000/month",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "house",
      available: "Available Now"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43", // Image from Projects.tsx
      title: "Luxury Penthouse",
      location: "321 Tower Drive, Uptown",
      price: "रू 42,000/month",
      beds: 3,
      baths: 2.5,
      sqft: 2000,
      type: "penthouse",
      available: "Jan 15, 2025"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1590725140246-20acdee442be", // Image from Projects.tsx
      title: "Cozy One Bedroom",
      location: "654 Elm Street, Midtown",
      price: "रू 16,000/month",
      beds: 1,
      baths: 1,
      sqft: 800,
      type: "apartment",
      available: "Available Now"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5", // Image from Projects.tsx
      title: "Shared Townhouse",
      location: "987 Cedar Lane, West Side",
      price: "रू 28,000/month",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      type: "townhouse",
      available: "Feb 1, 2025"
    }
  ];

  const filteredProperties = rentalProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || property.type === typeFilter;
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter) {
      const price = parseInt(property.price.replace(/[रू,\/month]/g, ''));
      switch (priceFilter) {
        case '0-15000':
          matchesPrice = price <= 15000;
          break;
        case '15000-25000':
          matchesPrice = price > 15000 && price <= 25000;
          break;
        case '25000-35000':
          matchesPrice = price > 25000 && price <= 35000;
          break;
        case '35000+':
          matchesPrice = price > 35000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  // Get translated sqft label based on language
  const getSqftLabel = () => {
    return t("common.sqft") || "वर्ग फिट";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {/* Hero Section with Bubble Effect */}
      <section className="relative h-64 sm:h-80 lg:h-96 hero-bubble-bg flex items-center justify-center animate-fade-in-up overflow-hidden">
        {/* Floating Bubbles */}
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#006d4e]"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Key className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-down">{t("rent.hero.title")}</h1>
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in-up animate-delay-300">{t("rent.hero.subtitle")}</p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("rent.title")}</h1>
          <p className="text-gray-600 text-lg">{t("rent.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t("rent.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">{t("rent.filters.allLocations")}</option>
              <option value="downtown">Downtown</option>
              <option value="uptown">Uptown</option>
              <option value="suburbs">Suburbs</option>
              <option value="midtown">Midtown</option>
              <option value="arts district">Arts District</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">{t("rent.filters.allPrices")}</option>
              <option value="0-15000">Under रू 15,000</option>
              <option value="15000-25000">रू 15,000 - रू 25,000</option>
              <option value="25000-35000">रू 25,000 - रू 35,000</option>
              <option value="35000+">रू 35,000+</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">{t("rent.filters.allTypes")}</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="townhouse">Townhouse</option>
              <option value="penthouse">Penthouse</option>
            </select>

            <Button className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Filter className="mr-2 h-4 w-4" />
              {t("rent.filters.apply")}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t("rent.results.showing")} {filteredProperties.length} {t("rent.results.of")} {rentalProperties.length} {t("rent.results.properties")}
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-[#006d4e] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t("rent.property.forRent")}
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {property.available}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {property.location}
                </p>
                <p className="text-2xl font-bold text-[#006d4e] mb-4">{property.price}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Bed className="mr-1 h-4 w-4" />
                    {property.beds} {t("rent.property.bed")}
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-1 h-4 w-4" />
                    {property.baths} {t("rent.property.bath")}
                  </div>
                  <div className="flex items-center">
                    <Square className="mr-1 h-4 w-4" />
                    {property.sqft} {getSqftLabel()}
                  </div>
                </div>
                <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
                  {t("rent.property.contact")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("rent.noResults.message")}</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
                setTypeFilter("");
                setLocationFilter("");
              }}
              className="mt-4 bg-[#006d4e] hover:bg-[#005a3f]"
            >
              {t("rent.noResults.clearFilters")}
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Rent;