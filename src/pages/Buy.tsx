
// src/pages/buy.tsx
'use client'; // This directive is crucial for Next.js App Router for client-side interactivity.

import { useState, useMemo } from "react";
import { Search, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Buy = () => {
  const { t } = useLanguage(); // Use the translation hook
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const properties = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Luxury Condo with City View",
      location: "333 Skyline Boulevard",
      price: "रू 80,00,000",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: "condo"
    }
  ], []);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || property.type === typeFilter;
      // Adjusted location filter logic to match actual property locations
      const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter.toLowerCase());

      let matchesPrice = true;
      if (priceFilter) {
        // Parse price from string to number for comparison
        // Remove 'रू' and commas before parsing
        const price = parseInt(property.price.replace(/[रू,\s]/g, ''));
        switch (priceFilter) {
          case '0-5000000': // Under रू 50 Lakh
            matchesPrice = price <= 5000000;
            break;
          case '5000000-7500000': // रू 50 Lakh - 75 Lakh
            matchesPrice = price > 5000000 && price <= 7500000;
            break;
          case '7500000-10000000': // रू 75 Lakh - रू 1 Crore
            matchesPrice = price > 7500000 && price <= 10000000;
            break;
          case '10000000+': // Over रू 1 Crore
            matchesPrice = price > 10000000;
            break;
        }
      }

      return matchesSearch && matchesType && matchesLocation && matchesPrice;
    });
  }, [properties, searchTerm, typeFilter, locationFilter, priceFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceFilter("");
    setTypeFilter("");
    setLocationFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      {/* Hero Section with Bubble Effect */}
      <section className="relative h-64 sm:h-80 lg:h-96 bg-[#006d4e] flex items-center justify-center animate-fade-in-up overflow-hidden">
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
          <Heart className="mx-auto h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mb-3 sm:mb-4 lg:mb-6 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-slide-in-down leading-tight">{t("buy.hero.title")}</h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl animate-fade-in-up animate-delay-300 leading-relaxed">{t("buy.hero.subtitle")}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">{t("buy.title")}</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{t("buy.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t("buy.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>

            {/* LOCATION FILTER - Adjusted options to match property data */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e] transition-colors"
            >
              <option value="">{t("buy.filters.allLocations")}</option>
              {/* These values should be substrings that exist in your property.location field */}
              <option value="ocean view drive">{t("buy.filters.downtown")}</option>
              <option value="city center plaza">{t("buy.filters.uptown")}</option>
              <option value="green valley road">{t("buy.filters.suburbs")}</option>
              <option value="hilltop avenue">{t("buy.filters.midtown")}</option>
              <option value="art lane">{t("buy.filters.artsDistrict")}</option>
              <option value="skyline boulevard">Skyline Boulevard</option> {/* Example from your property data */}
            </select>

            {/* PRICE FILTER */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e] transition-colors"
            >
              <option value="">{t("buy.filters.allPrices")}</option>
              <option value="0-5000000">{t("buy.filters.under50L")}</option>
              <option value="5000000-7500000">{t("buy.filters.50L75L")}</option>
              <option value="7500000-10000000">{t("buy.filters.75L1Cr")}</option>
              <option value="10000000+">{t("buy.filters.over1Cr")}</option>
            </select>

            {/* TYPE FILTER */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e] transition-colors"
            >
              <option value="">{t("buy.filters.allTypes")}</option>
              <option value="house">{t("buy.filters.house")}</option>
              <option value="apartment">{t("buy.filters.apartment")}</option>
              <option value="condo">{t("buy.filters.condo")}</option>
              <option value="loft">{t("buy.filters.loft")}</option>
            </select>

            <Button className="bg-[#006d4e] hover:bg-[#005a3f] text-sm sm:text-base transition-all duration-200">
              <Filter className="mr-2 h-4 w-4" />
              {t("buy.filters.apply")}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {t("buy.results.showing")} {filteredProperties.length} {t("buy.results.of")} {properties.length} {t("buy.results.properties")}
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                bedsLabel={t("common.beds")}
                bathsLabel={t("common.baths")}
                sqftLabel={t("common.sqft")}
                viewDetailsLabel={t("common.viewDetails")}
              />
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-500 text-base sm:text-lg mb-4">{t("buy.noResults.message")}</p>
              <Button
                onClick={handleClearFilters}
                className="bg-[#006d4e] hover:bg-[#005a3f] text-sm sm:text-base transition-all duration-200"
              >
                {t("buy.noResults.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Buy;
