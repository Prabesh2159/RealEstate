
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Bed, Bath, LayoutGrid, Calendar,
  User, Phone, Mail, Heart, Share2, Home, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProperty, Property } from "@/back/property";



const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert relative image URLs to absolute URLs
  const getAbsoluteImageUrl = (imageUrl: string | File | null): string => {
    if (!imageUrl || typeof imageUrl !== 'string') return '/api/placeholder/400/300';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl; // Already absolute
    }
    // Convert relative URL to absolute by adding backend base URL
    return `http://localhost:8000${imageUrl}`;
  };

  // Fetch property data from API
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError('No property ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🏠 Fetching property with ID:', id);

        const propertyData = await getProperty(parseInt(id));
        console.log('📋 Property data received:', propertyData);

        setProperty(propertyData);
      } catch (error) {
        console.error('❌ Error fetching property:', error);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ✅ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Loading Property Details...</h1>
          <p className="text-gray-600">Please wait while we fetch the property information.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || 'Property Not Found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "The property you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate(-1)} className="bg-[#006d4e] hover:bg-[#005a3f]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mb-6 hover:bg-[#006d4e] hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img
                src={getAbsoluteImageUrl(property.image)}
                alt={property.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
                onError={(e) => {
                  console.log('Property main image failed to load:', property.image);
                  e.currentTarget.src = '/api/placeholder/400/300';
                }}
              />

              {/* Additional Images Section */}
              <div className="grid grid-cols-3 gap-4">
                {property.featured_image1 && (
                  <img
                    src={getAbsoluteImageUrl(property.featured_image1)}
                    alt={`${property.name} - Featured Image 1`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      console.log('Featured image 1 failed to load:', property.featured_image1);
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                )}
                {property.featured_image2 && (
                  <img
                    src={getAbsoluteImageUrl(property.featured_image2)}
                    alt={`${property.name} - Featured Image 2`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      console.log('Featured image 2 failed to load:', property.featured_image2);
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                )}
                {/* Placeholder for third image if needed */}
                {!property.featured_image2 && property.featured_image1 && (
                  <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Home className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.name}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5" />
                      {property.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Property Type and Status Badges */}
                <div className="flex gap-3 mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {property.property_type}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    (property.for_type === 'sale' || (property.for_type as string) === 'buy') ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {(() => {
                      console.log('🔍 PropertyDetail for_type:', property.for_type, 'Property name:', property.name);
                      const forType = property.for_type as string;
                      return `For ${(forType === 'sale' || forType === 'buy') ? 'Sale' : 'Rent'}`;
                    })()}
                  </span>
                  {property.is_featured && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                  )}
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                </div>

                <div className="text-4xl font-bold text-[#006d4e] mb-6">
                  रू {property.price.toLocaleString()}
                  {property.for_type === 'rent' && <span className="text-lg text-gray-500">/month</span>}
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 mb-6">
                  <div className="text-center">
                    <Bed className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <LayoutGrid className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.area}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description || 'No description available for this property.'}
                  </p>
                </div>

                {/* Features Section */}
                {(() => {
                  // Helper function to parse features properly
                  const parseFeatures = (features: any): string[] => {
                    console.log('🔍 Raw features:', features, 'Type:', typeof features);

                    if (!features) return [];

                    // If it's a string (most likely JSON string like '["feature1","feature2"]')
                    if (typeof features === 'string') {
                      console.log('🔍 String features detected:', features);

                      // Check if it looks like a JSON array
                      if (features.startsWith('[') && features.endsWith(']')) {
                        try {
                          console.log('🔍 Attempting JSON parse...');
                          const parsed = JSON.parse(features);
                          console.log('🔍 JSON parsed successfully:', parsed);

                          if (Array.isArray(parsed)) {
                            const result = parsed.map(f => String(f)).filter(f => f && f.length > 0);
                            console.log('🔍 Final parsed result:', result);
                            return result;
                          }
                        } catch (e) {
                          console.log('🔍 JSON parse failed:', e);
                        }
                      }

                      // If not JSON, try other parsing methods
                      if (features.includes(',')) {
                        return features.split(',').map(f => f.trim()).filter(f => f.length > 0);
                      }

                      return features.trim() ? [features.trim()] : [];
                    }

                    // If it's already an array
                    if (Array.isArray(features)) {
                      console.log('🔍 Array features detected:', features);
                      const result: string[] = [];

                      for (let i = 0; i < features.length; i++) {
                        const f = features[i];
                        console.log(`🔍 Processing feature ${i}:`, f, 'Type:', typeof f);

                        if (typeof f === 'string') {
                          result.push(f);
                        } else if (typeof f === 'object' && f !== null) {
                          console.log('🔍 Object properties:', Object.keys(f));

                          // Try common property names for features
                          const possibleNames = [
                            f.name, f.title, f.feature, f.label, f.text,
                            f.feature_name, f.description, f.value
                          ];

                          let found = false;
                          for (const name of possibleNames) {
                            if (name && typeof name === 'string' && name.trim()) {
                              console.log('🔍 Found feature name:', name);

                              // Check if the name is a JSON string that needs parsing
                              if (name.startsWith('[') && name.endsWith(']')) {
                                try {
                                  console.log('🔍 Attempting to parse JSON from name:', name);
                                  const parsed = JSON.parse(name);
                                  if (Array.isArray(parsed)) {
                                    console.log('🔍 Successfully parsed JSON array:', parsed);
                                    // Add all parsed items to result
                                    parsed.forEach(item => {
                                      if (typeof item === 'string' && item.trim()) {
                                        result.push(item.trim());
                                      }
                                    });
                                    found = true;
                                    break;
                                  }
                                } catch (e) {
                                  console.log('🔍 JSON parse failed for name:', e);
                                }
                              }

                              if (!found) {
                                result.push(name.trim());
                                found = true;
                                break;
                              }
                            }
                          }

                          if (!found) {
                            // If no standard property found, log the object structure
                            console.log('🔍 No standard property found, object structure:', JSON.stringify(f, null, 2));

                            // Try to extract any string value from the object
                            const values = Object.values(f);
                            for (const value of values) {
                              if (typeof value === 'string' && value.trim()) {
                                console.log('🔍 Using object value as feature:', value);
                                result.push(value.trim());
                                found = true;
                                break;
                              }
                            }

                            // Last resort: add JSON string for debugging
                            if (!found) {
                              result.push(JSON.stringify(f));
                            }
                          }
                        } else {
                          result.push(String(f));
                        }
                      }

                      return result.filter(f => f && f.length > 0);
                    }

                    // If it's an object
                    if (typeof features === 'object' && features !== null) {
                      console.log('🔍 Object features detected:', features);
                      const name = features.name || features.title || features.feature || features.label;
                      return name ? [name] : [];
                    }

                    console.log('🔍 No matching type, returning empty array');
                    return [];
                  };

                  // Parse both standard and custom features
                  const standardFeatures = parseFeatures(property.features);
                  const customFeatures = parseFeatures(property.custom_features);
                  const allFeatures = [...standardFeatures, ...customFeatures].filter(f => f && f.length > 0);

                  console.log('🎯 Final features:', { standardFeatures, customFeatures, allFeatures });

                  return allFeatures.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {allFeatures.map((feature, index) => (
                          <div key={`feature-${index}`} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-[#006d4e] rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Property Dates */}
                {(property.created_at || property.updated_at) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Property Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      {property.created_at && (
                        <div>
                          <span className="font-medium">Listed:</span> {new Date(property.created_at).toLocaleDateString()}
                        </div>
                      )}
                      {property.updated_at && (
                        <div>
                          <span className="font-medium">Updated:</span> {new Date(property.updated_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Agent</h3>

                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                  <img
                    src="/images/realstate-removebg-preview.png"
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/100/100';
                    }}
                  />
                </div>

                <div className="text-center mb-4">
                  <h4 className="font-semibold text-gray-800">Real Estate Crafters</h4>
                  <p className="text-sm text-gray-600">International Private Limited</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">+977 970-7362231</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">realestatecrafters1@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#006d4e] hover:bg-[#005a3f]"
                    onClick={() => window.location.href = 'tel:+977970-7362231'}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = 'mailto:realestatecrafters1@gmail.com?subject=Inquiry about ' + property.name}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>

                {/* Property ID for reference */}
                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">Property ID: {property.id}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
