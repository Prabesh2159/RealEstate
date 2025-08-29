import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, Home, Users, Wrench, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { listProperties, Property } from "@/back/property";

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
            className="rain-drop absolute w-0.5 bg-gradient-to-b from-transparent via-green-200/30 to-green-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
              height: `${Math.random() * 30 + 20}px`,
              opacity: 0,
              transform: 'translateY(-100vh) rotate(10deg)',
            }}
          />
        ))}
      </div>
    </>
  );
};

// Land Unit Conversion Calculator Component
const LandUnitCalculator = () => {
  // State for each unit
  const [bigha, setBigha] = useState("");
  const [kattha, setKattha] = useState("");
  const [dhur, setDhur] = useState("");
  const [ropani, setRopani] = useState("");
  const [aana, setAana] = useState("");
  const [sqft, setSqft] = useState("");
  const [active, setActive] = useState("sqft"); // Which field was last edited

  // Conversion constants
  const BIGHA_TO_KATTHA = 20;
  const KATTHA_TO_DHUR = 20;
  const BIGHA_TO_SQFT = 13552.5;
  const KATTHA_TO_SQFT = 677.625;
  const DHUR_TO_SQFT = 33.88125;
  const ROPANI_TO_AANA = 16;
  const ROPANI_TO_SQFT = 5476;
  const AANA_TO_SQFT = 342.25;

  // Helper: clear all except the one being edited
  const clearOthers = (except: string) => {
    if (except !== "bigha") setBigha("");
    if (except !== "kattha") setKattha("");
    if (except !== "dhur") setDhur("");
    if (except !== "ropani") setRopani("");
    if (except !== "aana") setAana("");
    if (except !== "sqft") setSqft("");
  };

  // Conversion logic
  const handleChange = (unit: string, value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) return; // Only allow numbers
    setActive(unit);
    clearOthers(unit);
    if (value === "") {
      setBigha(""); setKattha(""); setDhur(""); setRopani(""); setAana(""); setSqft("");
      return;
    }
    const v = parseFloat(value);
    if (isNaN(v)) return;
    switch (unit) {
      case "bigha": {
        setBigha(value);
        setKattha((v * BIGHA_TO_KATTHA).toString());
        setDhur((v * BIGHA_TO_KATTHA * KATTHA_TO_DHUR).toString());
        setSqft((v * BIGHA_TO_SQFT).toString());
        setRopani((v * BIGHA_TO_SQFT / ROPANI_TO_SQFT).toFixed(6));
        setAana((v * BIGHA_TO_SQFT / AANA_TO_SQFT).toFixed(6));
        break;
      }
      case "kattha": {
        setKattha(value);
        setBigha((v / BIGHA_TO_KATTHA).toString());
        setDhur((v * KATTHA_TO_DHUR).toString());
        setSqft((v * KATTHA_TO_SQFT).toString());
        setRopani((v * KATTHA_TO_SQFT / ROPANI_TO_SQFT).toFixed(6));
        setAana((v * KATTHA_TO_SQFT / AANA_TO_SQFT).toFixed(6));
        break;
      }
      case "dhur": {
        setDhur(value);
        setKattha((v / KATTHA_TO_DHUR).toString());
        setBigha((v / (BIGHA_TO_KATTHA * KATTHA_TO_DHUR)).toString());
        setSqft((v * DHUR_TO_SQFT).toString());
        setRopani((v * DHUR_TO_SQFT / ROPANI_TO_SQFT).toFixed(6));
        setAana((v * DHUR_TO_SQFT / AANA_TO_SQFT).toFixed(6));
        break;
      }
      case "ropani": {
        setRopani(value);
        setAana((v * ROPANI_TO_AANA).toString());
        setSqft((v * ROPANI_TO_SQFT).toString());
        setBigha((v * ROPANI_TO_SQFT / BIGHA_TO_SQFT).toFixed(6));
        setKattha((v * ROPANI_TO_SQFT / KATTHA_TO_SQFT).toFixed(6));
        setDhur((v * ROPANI_TO_SQFT / DHUR_TO_SQFT).toFixed(6));
        break;
      }
      case "aana": {
        setAana(value);
        setRopani((v / ROPANI_TO_AANA).toString());
        setSqft((v * AANA_TO_SQFT).toString());
        setBigha((v * AANA_TO_SQFT / BIGHA_TO_SQFT).toFixed(6));
        setKattha((v * AANA_TO_SQFT / KATTHA_TO_SQFT).toFixed(6));
        setDhur((v * AANA_TO_SQFT / DHUR_TO_SQFT).toFixed(6));
        break;
      }
      case "sqft": {
        setSqft(value);
        setBigha((v / BIGHA_TO_SQFT).toFixed(6));
        setKattha((v / KATTHA_TO_SQFT).toFixed(6));
        setDhur((v / DHUR_TO_SQFT).toFixed(6));
        setRopani((v / ROPANI_TO_SQFT).toFixed(6));
        setAana((v / AANA_TO_SQFT).toFixed(6));
        break;
      }
    }
  };

  return (
    <Card className="mt-6 mb-6 max-w-4xl mx-auto bg-white/95 border border-green-200 shadow-xl rounded-2xl animate-fade-in-up">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-[#006d4e] mb-4 text-center">Land Unit Converter</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bigha</label>
            <input type="text" value={bigha} onChange={e => handleChange("bigha", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Kattha</label>
            <input type="text" value={kattha} onChange={e => handleChange("kattha", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Dhur</label>
            <input type="text" value={dhur} onChange={e => handleChange("dhur", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ropani</label>
            <input type="text" value={ropani} onChange={e => handleChange("ropani", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Aana</label>
            <input type="text" value={aana} onChange={e => handleChange("aana", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Sq. Ft.</label>
            <input type="text" value={sqft} onChange={e => handleChange("sqft", e.target.value)}
              className="w-full border-2 border-green-200 rounded-lg px-4 py-2 focus:border-[#006d4e] focus:ring-2 focus:ring-[#006d4e] outline-none" placeholder="0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // Helper function to convert relative image URLs to absolute URLs
  const getAbsoluteImageUrl = (imageUrl: string | File | null): string => {
    if (!imageUrl || typeof imageUrl !== 'string') return '/api/placeholder/400/300';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl; // Already absolute
    }
    // Convert relative URL to absolute by adding backend base URL
    return `http://localhost:8000${imageUrl}`;
  };

  // Fetch featured properties from API
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        console.log('🏠 Fetching properties from API...');
        const response = await listProperties({ status: 'active' });
        console.log('📋 Properties response:', response);

        // Filter only featured properties
        const featured = response.results.filter(property => property.is_featured === true);
        console.log('⭐ Featured properties found:', featured.length);
        console.log('🔍 Featured properties data:', featured);

        setFeaturedProperties(featured);
      } catch (error) {
        console.error('❌ Error fetching properties:', error);
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Green Scenery and Rain */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden bg-[#006d4e]">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e]/60 via-[#006d4e]/50 to-[#006d4e]/40" />

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
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-[#006d4e]" />
                <Input
                  placeholder={t('home.search.location')}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 h-12 text-gray-700 border-2 border-green-200 focus:border-[#006d4e]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006d4e] focus-visible:ring-offset-2
                            rounded-xl smooth-transition"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 h-5 w-5 text-[#006d4e]" />
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 border-2 border-green-200 focus:border-[#006d4e]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006d4e] focus-visible:ring-offset-2
                            rounded-xl text-gray-700 bg-white font-medium smooth-transition appearance-none"
                >
                  <option value="" disabled selected>{t('home.search.price')}</option>
                  <option value="0-2000000">रू 0 - रू 20,00,000</option>
                  <option value="2000000-5000000">रू 20,00,000 - रू 50,00,000</option>
                  <option value="5000000+">रू 50,00,000+</option>
                </select>
              </div>
              <div className="relative">
                <Home className="absolute left-4 top-4 h-5 w-5 text-[#006d4e]" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-12 pl-12 pr-12 border-2 border-green-200 focus:border-[#006d4e]
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006d4e] focus-visible:ring-offset-2
                            rounded-xl text-gray-700 bg-white font-medium smooth-transition appearance-none"
                >
                  <option value="" disabled selected>{t('home.search.type')}</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
              <Button
                onClick={handleSearch}
                className="bg-[#006d4e] hover:bg-[#005a3f] h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl smooth-transition hover-lift"
              >
                <Search className="mr-2 h-5 w-5" />
                {t('home.search.button')}
              </Button>
            </div>
          </div>

          {/* Land Unit Conversion Calculator */}
          <LandUnitCalculator />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6">{t('home.featured.title')}</h2>
          <p className="text text-xl">{t('home.featured.subtitle')}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e]"></div>
            <span className="ml-4 text-lg text-gray-600">Loading featured properties...</span>
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-50 rounded-xl p-12 max-w-md mx-auto">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Featured Properties</h3>
              <p className="text-gray-500">No featured properties are currently available.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map((property, index) => (
              <Card key={property.id} className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 rounded-2xl overflow-hidden border-2 border-green-100 hover:border-green-300 hover-lift animate-scale-in animate-delay-${200 + index * 100}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={getAbsoluteImageUrl(property.image)}
                    alt={property.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.log('Property image failed to load:', property.image);
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                  <div className="absolute top-6 right-6 bg-[#006d4e] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {t('common.featured')}
                  </div>
                  <div className="absolute top-6 left-6 bg-white/90 text-[#006d4e] px-3 py-1 rounded-full text-xs font-semibold shadow-lg capitalize">
                    {(() => {
                      const forType = property.for_type as string;
                      return (forType === 'sale' || forType === 'buy') ? 'For Sale' : 'For Rent';
                    })()}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text mb-3">{property.name}</h3>
                  <p className=" mb-4 flex items-center text-lg">
                    <MapPin className="mr-2 h-5 w-5" />
                    {property.address}
                  </p>
                  <p className="text-2xl font-normal text-gray-700 mb-6">
                    रू {property.price.toLocaleString()}
                    {property.for_type === 'rent' && <span className="text-sm text-gray-500">/month</span>}
                  </p>
                  <div className="flex justify-between text-sm mb-6 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-[#006d4e]" />
                      <span>{property.bedrooms} {t('common.beds')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-[#006d4e]" />
                      <span>{property.bathrooms} {t('common.baths')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4 text-[#006d4e]" />
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>

                  {/* Property Type Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {property.property_type}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-sm sm:text-base py-2 sm:py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105">
                      {t('projects.project.viewDetails')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Action Boxes */}
      <section className="py-20 bg-gradient-to-br">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e]/90 to-[#006d4e]/90 group-hover:from-[#005a3f]/90 group-hover:to-[#005a3f]/90 transition-all duration-500" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e]/90 to-[#006d4e]/90 group-hover:from-[#005a3f]/90 group-hover:to-[#005a3f]/90 transition-all duration-500" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e]/90 to-[#006d4e]/90 group-hover:from-[#005a3f]/90 group-hover:to-[#005a3f]/90 transition-all duration-500" />
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
      <Footer />
    </div>
  );
};
export default Index;