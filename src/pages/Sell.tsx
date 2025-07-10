
import { useState } from "react";
import { Upload, DollarSign, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Property Listed Successfully!",
      description: "Your property has been submitted for review and will be listed soon.",
    });
    console.log("Form submitted:", formData);
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
          <Home className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-down">Sell Your Property</h1>
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in-up animate-delay-300">List your property and connect with potential buyers through our platform</p>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Sell Your Property</h1>
          <p className="text-gray-600 text-base sm:text-lg">List your property and connect with potential buyers</p>
        </div>

        {/* Form */}
        <Card className="shadow-xl">
          <CardHeader className="bg-[#006d4e] text-white p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center">
              <Home className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Property Listing Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Property Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Property Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Beautiful Family Home"
                    required
                    className="mt-1 text-sm sm:text-base focus:border-[#006d4e]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Full address"
                      required
                      className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">Price (NPR) *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 sm:top-3 text-gray-400 text-sm">रू</span>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 45,00,000"
                      required
                      className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertyType" className="text-sm font-medium">Property Type *</Label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e]"
                  >
                    <option value="">Select Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 3"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms" className="text-sm font-medium">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="sqft" className="text-sm font-medium">Square Feet</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    placeholder="e.g., 2400"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Property Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your property's features, amenities, and highlights..."
                  required
                  rows={5}
                  className="mt-1 text-sm sm:text-base resize-none focus:border-[#006d4e]"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <Label className="text-sm font-medium">Property Images</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-[#006d4e] transition-colors">
                  <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400 mb-3 sm:mb-4" />
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">Click to upload or drag and drop</p>
                  <p className="text-xs sm:text-sm text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                  <Button type="button" variant="outline" className="mt-3 sm:mt-4 text-sm sm:text-base border-[#006d4e] text-[#006d4e] hover:bg-[#006d4e] hover:text-white">
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 sm:pt-6 border-t">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-sm font-medium">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button type="submit" className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-base sm:text-lg py-2 sm:py-3 transition-colors duration-200">
                  List My Property
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sell;
