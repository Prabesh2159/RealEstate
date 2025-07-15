import { useState } from "react";
import { Upload, DollarSign, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Sell = () => {
  const { t } = useLanguage();
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

  // Sample properties for demonstration
  const sampleProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      title: "Modern Family Home",
      location: "Kathmandu, Nepal",
      price: "रू 1,50,00,000",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "house"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      title: "Luxury Apartment",
      location: "Pokhara, Nepal",
      price: "रू 85,00,000",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "apartment"
    }
  ];

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
      title: t("sell.form.success.title"),
      description: t("sell.form.success.description"),
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
          <Home className="mx-auto h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mb-3 sm:mb-4 lg:mb-6 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-slide-in-down leading-tight">{t("sell.hero.title")}</h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl animate-fade-in-up animate-delay-300 leading-relaxed">{t("sell.hero.subtitle")}</p>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">{t("sell.title")}</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{t("sell.subtitle")}</p>
        </div>

        {/* Sample Properties Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {sampleProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                bedsLabel={t("common.beds")}
                bathsLabel={t("common.baths")}
                sqftLabel={t("common.sqft")}
                viewDetailsLabel={t("common.viewDetails")}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-xl">
          <CardHeader className="bg-[#006d4e] text-white p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center">
              <Home className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              {t("sell.form.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Property Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">{t("sell.form.propertyTitle")} *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={t("sell.form.propertyTitlePlaceholder")}
                    required
                    className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">{t("sell.form.location")} *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.locationPlaceholder")}
                      required
                      className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">{t("sell.form.price")} *</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 sm:top-3 text-gray-400 text-sm">रू</span>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.pricePlaceholder")}
                      required
                      className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertyType" className="text-sm font-medium">{t("sell.form.propertyType")} *</Label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                  >
                    <option value="">{t("sell.form.selectType")}</option>
                    <option value="house">{t("sell.form.types.house")}</option>
                    <option value="apartment">{t("sell.form.types.apartment")}</option>
                    <option value="condo">{t("sell.form.types.condo")}</option>
                    <option value="townhouse">{t("sell.form.types.townhouse")}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="bedrooms" className="text-sm font-medium">{t("sell.form.bedrooms")}</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 3"
                    className="mt-1 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>

                <div>
                  <Label htmlFor="bathrooms" className="text-sm font-medium">{t("sell.form.bathrooms")}</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5"
                    className="mt-1 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>

                <div>
                  <Label htmlFor="sqft" className="text-sm font-medium">{t("sell.form.sqft")}</Label>
                  <Input
                    id="sqft"
                    name="sqft"
                    type="number"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    placeholder="e.g., 2400"
                    className="mt-1 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">{t("sell.form.description")} *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t("sell.form.descriptionPlaceholder")}
                  required
                  rows={5}
                  className="mt-1 text-sm sm:text-base resize-none focus:border-[#006d4e] transition-colors duration-200"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <Label className="text-sm font-medium">{t("sell.form.images")}</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-[#006d4e] transition-colors duration-300">
                  <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400 mb-3 sm:mb-4" />
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">{t("sell.form.upload.text")}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{t("sell.form.upload.formats")}</p>
                  <Button type="button" variant="outline" className="mt-3 sm:mt-4 text-sm sm:text-base border-[#006d4e] text-[#006d4e] hover:bg-[#006d4e] hover:text-white transition-colors duration-200">
                    {t("sell.form.upload.button")}
                  </Button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 sm:pt-6 border-t">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{t("sell.form.contact.title")}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-sm font-medium">{t("sell.form.contact.name")} *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.namePlaceholder")}
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="text-sm font-medium">{t("sell.form.contact.email")} *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.emailPlaceholder")}
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-sm font-medium">{t("sell.form.contact.phone")}</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.phonePlaceholder")}
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button type="submit" className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-base sm:text-lg py-2 sm:py-3 transition-all duration-200 hover:scale-105 transform">
                  {t("sell.form.submit")}
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
