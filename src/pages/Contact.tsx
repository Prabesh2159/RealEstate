
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
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
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Mail className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-down">{t('contact.title')}</h1>
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in-up animate-delay-300">{t('contact.subtitle')}</p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Contact Information with improved spacing */}
          <div className="space-y-8 sm:space-y-10 animate-fade-in-left">
            <Card className="shadow-xl hover-lift smooth-transition border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl sm:text-3xl text-gray-800 font-bold">Get in Touch</CardTitle>
                <p className="text-gray-600 mt-2">We'd love to hear from you. Here's how you can reach us.</p>
              </CardHeader>
              <CardContent className="space-y-8 p-6 sm:p-8">
                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-100">
                  <div className="bg-green-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-green-200 hover:scale-110">
                    <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">Our Address</h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      Dhanusha<br />
                      Janakpurdham<br />
                     </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-200">
                  <div className="bg-blue-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-blue-200 hover:scale-110">
                    <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">Phone Number</h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                      <a href="tel:+977 9707362213" className="hover:text-blue-600 smooth-transition">
                       +977 970-7362231
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-300">
                  <div className="bg-purple-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-purple-200 hover:scale-110">
                    <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">Email Address</h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                      <a href="mailto:realestatecrafters1@gmail.com" className="hover:text-purple-600 smooth-transition">
                        realestatecrafters1@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-400">
                  <div className="bg-orange-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-orange-200 hover:scale-110">
                    <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">Business Hours</h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      Sunday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday:Closed <br />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Map Placeholder */}
            <Card className="shadow-xl hover-lift animate-scale-in animate-delay-300 border-0 bg-white/80 backdrop-blur-sm">
  <iframe
   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.4383042902004!2d85.92298397552759!3d26.73038577675638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec40069de3d507%3A0x5e9842f10a951d7f!2sJanaki%20Temple!5e0!3m2!1sen!2snp!4v1751989193610!5m2!1sen!2snp"
    className="w-full h-[450px]"
    loading="lazy"
    style={{ border: 0 }}
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</Card>
          </div>

          {/* Enhanced Contact Form */}
          <Card className="shadow-xl hover-lift animate-fade-in-right border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl sm:text-3xl text-gray-800 font-bold">Send us a Message</CardTitle>
              <p className="text-gray-600 mt-2">Fill out the form below and we'll get back to you as soon as possible.</p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up animate-delay-100">
                    <Label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                    />
                  </div>
                  
                  <div className="animate-fade-in-up animate-delay-200">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up animate-delay-300">
                  <Label htmlFor="subject" className="text-base font-semibold text-gray-700 mb-2 block">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                    className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                  />
                </div>

                <div className="animate-fade-in-up animate-delay-400">
                  <Label htmlFor="message" className="text-base font-semibold text-gray-700 mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows={6}
                    className="text-base border-2 border-gray-200 focus:border-green-500 resize-none smooth-transition rounded-lg"
                  />
                </div>

                <div className="animate-fade-in-up animate-delay-500 pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-[#006D4E] hover:bg-[#006D4E] text-lg font-semibold py-4 smooth-transition hover-lift shadow-lg hover:shadow-xl rounded-lg"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional spacing at bottom */}
        <div className="mt-16 sm:mt-20 lg:mt-24"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
