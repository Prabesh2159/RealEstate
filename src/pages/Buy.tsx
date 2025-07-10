
import { useState } from "react";
import { Search, Filter, MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Luxury Villa with Pool",
      location: "123 Ocean View Drive",
      price: "रू 1,20,00,000",
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: "house"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Cozy Apartment in Downtown",
      location: "456 City Center Plaza",
      price: "रू 45,00,000",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "apartment"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Charming House with Garden",
      location: "789 Green Valley Road",
      price: "रू 75,00,000",
      beds: 3,
      baths: 3,
      sqft: 2000,
      type: "house"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Modern Loft in Arts District",
      location: "101 Art Lane",
      price: "रू 60,00,000",
      beds: 1,
      baths: 1,
      sqft: 1000,
      type: "loft"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Spacious Family Home",
      location: "222 Hilltop Avenue",
      price: "रू 90,00,000",
      beds: 4,
      baths: 3,
      sqft: 2500,
      type: "house"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Luxury Condo with City View",
      location: "333 Skyline Boulevard",
      price: "रू 80,00,000",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: "condo"
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || property.type === typeFilter;
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter) {
      const price = parseInt(property.price.replace(/[रू,]/g, ''));
      switch (priceFilter) {
        case '0-5000000':
          matchesPrice = price <= 5000000;
          break;
        case '5000000-7500000':
          matchesPrice = price > 5000000 && price <= 7500000;
          break;
        case '7500000-10000000':
          matchesPrice = price > 7500000 && price <= 10000000;
          break;
        case '10000000+':
          matchesPrice = price > 10000000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

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
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Heart className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-down">Properties for Sale</h1>
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in-up animate-delay-300">Discover your dream home from our curated collection of premium properties</p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Home</h1>
          <p className="text-gray-600 text-lg">Explore our listings of properties for sale</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search properties..."
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
              <option value="">All Locations</option>
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
              <option value="">All Prices</option>
              <option value="0-5000000">Under रू 50,00,000</option>
              <option value="5000000-7500000">रू 50,00,000 - रू 75,00,000</option>
              <option value="7500000-10000000">रू 75,00,000 - रू 1,00,00,000</option>
              <option value="10000000+">रू 1,00,00,000+</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="loft">Loft</option>
            </select>

            <Button className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
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
                  For Sale
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {property.location}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Bed className="mr-1 h-4 w-4" />
                    {property.beds} bed{property.beds !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Bath className="mr-1 h-4 w-4" />
                    {property.baths} bath{property.baths !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center">
                    <Square className="mr-1 h-4 w-4" />
                    {property.sqft} sq ft
                  </div>
                </div>
                <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
                  Contact Agent
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
                setTypeFilter("");
                setLocationFilter("");
              }}
              className="mt-4 bg-[#006d4e] hover:bg-[#005a3f]"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Buy;
