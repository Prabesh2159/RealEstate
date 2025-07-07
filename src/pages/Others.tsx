
import { useState } from "react";
import { Paintbrush, Hammer, Wrench, Palette, Home, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Others = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    serviceType: "",
    description: "",
    urgency: "",
    preferredDate: ""
  });

  const services = [
    {
      icon: Hammer,
      title: t('others.services.houseRenovation'),
      description: t('others.services.houseRenovationDesc'),
      color: "bg-orange-500"
    },
    {
      icon: Paintbrush,
      title: t('others.services.interiorPainting'),
      description: t('others.services.interiorPaintingDesc'),
      color: "bg-blue-500"
    },
    {
      icon: Palette,
      title: t('others.services.exteriorPainting'),
      description: t('others.services.exteriorPaintingDesc'),
      color: "bg-green-500"
    },
    {
      icon: Wrench,
      title: t('others.services.kitchenRenovation'),
      description: t('others.services.kitchenRenovationDesc'),
      color: "bg-red-500"
    },
    {
      icon: Home,
      title: t('others.services.bathroomRenovation'),
      description: t('others.services.bathroomRenovationDesc'),
      color: "bg-purple-500"
    },
    {
      icon: Hammer,
      title: t('others.services.flooring'),
      description: t('others.services.flooringDesc'),
      color: "bg-yellow-500"
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
    toast({
      title: t('others.toast.title'),
      description: t('others.toast.description'),
    });
    console.log("Service request submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-orange-600 to-red-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Hammer className="mx-auto h-16 w-16 mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('others.hero.title')}</h1>
          <p className="text-xl">{t('others.hero.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Services Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('others.services.title')}</h2>
            <p className="text-gray-600 text-lg">{t('others.services.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Request Form */}
        <Card className="shadow-xl max-w-4xl mx-auto">
          <CardHeader className="bg-orange-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <Hammer className="mr-3 h-6 w-6" />
              {t('others.form.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">{t('others.form.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">{t('others.form.phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">{t('others.form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">{t('others.form.address')} *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full property address"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="serviceType" className="text-sm font-medium">{t('others.form.serviceType')} *</Label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Service</option>
                    <option value="house-renovation">{t('others.services.houseRenovation')}</option>
                    <option value="interior-painting">{t('others.services.interiorPainting')}</option>
                    <option value="exterior-painting">{t('others.services.exteriorPainting')}</option>
                    <option value="kitchen-renovation">{t('others.services.kitchenRenovation')}</option>
                    <option value="bathroom-renovation">{t('others.services.bathroomRenovation')}</option>
                    <option value="flooring">{t('others.services.flooring')}</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="urgency" className="text-sm font-medium">{t('others.form.urgency')} *</Label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Urgency</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="normal">Normal (1 month)</option>
                    <option value="flexible">Flexible (2+ months)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredDate" className="text-sm font-medium">{t('others.form.preferredDate')}</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">{t('others.form.description')} *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please describe your renovation or painting project in detail..."
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium">{t('others.form.upload')}</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2">{t('others.form.uploadDesc')}</p>
                  <p className="text-sm text-gray-400">{t('others.form.uploadFormat')}</p>
                  <Button type="button" variant="outline" className="mt-3">
                    {t('others.form.chooseImages')}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">
                  {t('others.form.submit')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Others;
