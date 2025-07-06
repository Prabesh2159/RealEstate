
import { useState } from "react";
import { Wrench, Hammer, Zap, Paintbrush, Droplets, Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

const Repairing = () => {
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
      icon: Droplets,
      title: "Plumbing",
      description: "Leak repairs, pipe installation, drain cleaning",
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Wiring, outlets, lighting installation",
      color: "bg-yellow-500"
    },
    {
      icon: Paintbrush,
      title: "Painting",
      description: "Interior and exterior painting services",
      color: "bg-green-500"
    },
    {
      icon: Hammer,
      title: "General Repairs",
      description: "Drywall, flooring, doors, and windows",
      color: "bg-red-500"
    },
    {
      icon: Settings,
      title: "HVAC",
      description: "Heating, ventilation, and air conditioning",
      color: "bg-purple-500"
    },
    {
      icon: Wrench,
      title: "Renovation",
      description: "Kitchen, bathroom, and home remodeling",
      color: "bg-orange-500"
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
      title: "Service Request Submitted!",
      description: "We'll contact you within 24 hours to schedule your repair service.",
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
          <Wrench className="mx-auto h-16 w-16 mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Need Repairs?</h1>
          <p className="text-xl">We've Got You Covered with Professional Home Services</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Services Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">Professional repair and maintenance services for your home</p>
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
              <Wrench className="mr-3 h-6 w-6" />
              Request a Service
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
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
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
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
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
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
                  <Label htmlFor="address" className="text-sm font-medium">Property Address *</Label>
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
                  <Label htmlFor="serviceType" className="text-sm font-medium">Service Type *</Label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Service</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="painting">Painting</option>
                    <option value="general">General Repairs</option>
                    <option value="hvac">HVAC</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="urgency" className="text-sm font-medium">Urgency Level *</Label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-10 px-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Urgency</option>
                    <option value="emergency">Emergency (24 hours)</option>
                    <option value="urgent">Urgent (2-3 days)</option>
                    <option value="normal">Normal (1 week)</option>
                    <option value="flexible">Flexible (2+ weeks)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredDate" className="text-sm font-medium">Preferred Date</Label>
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
                <Label htmlFor="description" className="text-sm font-medium">Problem Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please describe the problem in detail..."
                  required
                  rows={5}
                  className="mt-1"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium">Upload Images (Optional)</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2">Upload photos of the problem area</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 5MB each</p>
                  <Button type="button" variant="outline" className="mt-3">
                    Choose Images
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3">
                  Submit Service Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Repairing;
