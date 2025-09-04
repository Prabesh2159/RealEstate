import { useState } from "react";
import { Upload, Home, MapPin } from "lucide-react";
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

import { submitSellForm, SellFormData } from "@/back/sellapi"; // adjust path as needed

const Sell = () => {
  const { t } = useLanguage();

  // Initial form state following SellFormData interface (optional fields undefined)
  const [formData, setFormData] = useState<SellFormData>({
    name: "",
    email: "",
    phone_no: "",
    propert_title: "",
    property_location: "",
    property_price: "",
    property_type: "",
    no_of_bedrooms: undefined,
    no_of_bathrooms: undefined,
    area: "",
    description: "",
    image: null as File | null,
  });

  // Handle text/select input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // For number fields, convert to number or undefined
    if (name === "no_of_bedrooms" || name === "no_of_bathrooms") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? Number(value) : undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setFormData(prev => ({
      ...prev,
      image: e.target.files![0]
    }));
  }
};

  // Submit handler using your submitSellForm function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.property_type) {
      toast({
        title: "Validation Error",
        description: "Please select a property type",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await submitSellForm(formData);
      console.log("Form submission response:", response);
      toast({
        title: t("sell.form.success.title"),
        description: t("sell.form.success.description"),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone_no: "",
        propert_title: "",
        property_location: "",
        property_price: "",
        property_type: "",
        no_of_bedrooms: undefined,
        no_of_bathrooms: undefined,
        area: "",
        description: "",
        image: null,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    }
  };

  // Sample properties (same as your previous code)
  const sampleProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      title: "Modern Family Home",
      location: "Kathmandu, Nepal",
      price: "रू 1,50,00,000",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "house",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      title: "Luxury Apartment",
      location: "Pokhara, Nepal",
      price: "रू 85,00,000",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "apartment",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 lg:h-96 bg-[#006d4e] flex items-center justify-center animate-fade-in-up overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Home className="mx-auto h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 mb-3 sm:mb-4 lg:mb-6 animate-bounce" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 animate-slide-in-down leading-tight">
            {t("sell.hero.title")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl animate-fade-in-up animate-delay-300 leading-relaxed">
            {t("sell.hero.subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex-1">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
            {t("sell.title")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{t("sell.subtitle")}</p>
        </div>

        {/* Featured properties */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Featured Properties
          </h2>
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

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-[#006d4e] text-white p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center">
              <Home className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              {t("sell.form.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 sm:space-y-6">
              {/* Property Title */}
              <div>
                <Label htmlFor="propert_title" className="text-sm font-medium">
                  {t("sell.form.propertyTitle")} *
                </Label>
                <Input
                  id="propert_title"
                  name="propert_title"
                  value={formData.propert_title}
                  onChange={handleInputChange}
                  placeholder={t("sell.form.propertyTitlePlaceholder")}
                  required
                  className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="property_location" className="text-sm font-medium">
                  {t("sell.form.location")} *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    id="property_location"
                    name="property_location"
                    value={formData.property_location}
                    onChange={handleInputChange}
                    placeholder={t("sell.form.locationPlaceholder")}
                    required
                    className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="property_price" className="text-sm font-medium">
                  {t("sell.form.price")} *
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 sm:top-3 text-gray-400 text-sm">रू</span>
                  <Input
                    id="property_price"
                    name="property_price"
                    value={formData.property_price}
                    onChange={handleInputChange}
                    placeholder={t("sell.form.pricePlaceholder")}
                    required
                    className="pl-9 sm:pl-10 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <Label htmlFor="property_type" className="text-sm font-medium">
                  {t("sell.form.propertyType")} *
                </Label>
                <select
                  id="property_type"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                >
                  <option value="">{t("sell.form.selectType")}</option>
                  <option value="House">{t("sell.form.types.house")}</option>
                  <option value="Land">{t("sell.form.types.land")}</option>
                  <option value="Apartment">{t("sell.form.types.apartment")}
                  </option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <Label htmlFor="no_of_bedrooms" className="text-sm font-medium">
                  {t("sell.form.bedrooms")}
                </Label>
                <Input
                  id="no_of_bedrooms"
                  name="no_of_bedrooms"
                  type="number"
                  value={formData.no_of_bedrooms ?? ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 3"
                  className="mt-1 text-sm sm:text-base transition-colors duration-200"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <Label htmlFor="no_of_bathrooms" className="text-sm font-medium">
                  {t("sell.form.bathrooms")}
                </Label>
                <Input
                  id="no_of_bathrooms"
                  name="no_of_bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.no_of_bathrooms ?? ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 2"
                  className="mt-1 text-sm sm:text-base transition-colors duration-200"
                />
              </div>

              {/* Area */}
              <div>
                <Label htmlFor="area" className="text-sm font-medium">
                  {t("sell.form.dhur")}
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="text"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g., 15 dhur/kattha"
                  className="mt-1 text-sm sm:text-base transition-colors duration-200"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  {t("sell.form.description")} *
                </Label>
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

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium">{t("sell.form.images")}</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center hover:border-[#006d4e] transition-colors duration-300">
                  <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400 mb-3 sm:mb-4" />
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">{t("sell.form.upload.text")}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{t("sell.form.upload.formats")}</p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    // className="hidden"
                    id="file-upload"
                  />
                  {/* <label htmlFor="file-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3 sm:mt-4 text-sm sm:text-base border-[#006d4e] text-[#006d4e] hover:bg-[#006d4e] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                    {t("sell.form.upload.button")}
                    </Button>
                  </label> */}

                  {formData.image && formData.image instanceof File && (
                    <p className="mt-2 text-sm text-gray-600">{formData.image.name}</p>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-4 sm:pt-6 border-t">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  {t("sell.form.contact.title")}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t("sell.form.contact.name")} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.namePlaceholder")}
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t("sell.form.contact.email")} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.emailPlaceholder")}
                      required
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone_no" className="text-sm font-medium">
                      {t("sell.form.contact.phone")}
                    </Label>
                    <Input
                      id="phone_no"
                      name="phone_no"
                      type="tel"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      placeholder={t("sell.form.contact.phonePlaceholder")}
                      className="mt-1 text-sm sm:text-base focus:border-[#006d4e] transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button
                  type="submit"
                  className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-base sm:text-lg py-2 sm:py-3 transition-all duration-200 hover:scale-105 transform"
                >
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
