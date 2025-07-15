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
import React from "react"; // Ensure React is imported for React.Fragment

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
    // Use translated toast messages
    toast({
      title: t('contact.toast.title'),
      description: t('contact.toast.description'),
    });
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Navigation />

      {/* Hero Section with Animations */}
      <section className="bg-[#006d4e] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e] via-[#005a41] to-[#004d37]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white rounded-full animate-pulse delay-3000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Mail className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300" /> {/* Changed to fade-in */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300">{t('contact.title')}</h1> {/* Changed to fade-in */}
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in opacity-0 animation-delay-600">{t('contact.subtitle')}</p> {/* Changed to fade-in */}
        </div>
        
        {/* Floating Animation Elements */}
        <div className="absolute top-1/2 left-0 w-4 h-4 bg-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-0 w-6 h-6 bg-green-200 rounded-full animate-bounce opacity-40 delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-50 delay-1000"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Contact Information with improved spacing */}
          <div className="space-y-8 sm:space-y-10 animate-fade-in-left">
            <Card className="shadow-xl hover-lift smooth-transition border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl sm:text-3xl text-gray-800 font-bold">{t('contact.info.getInTouchTitle')}</CardTitle>
                <p className="text-gray-600 mt-2">{t('contact.info.getInTouchDesc')}</p>
              </CardHeader>
              <CardContent className="space-y-8 p-6 sm:p-8">
                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-100">
                  <div className="bg-green-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-green-200 hover:scale-110">
                    <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">{t('contact.info.addressTitle')}</h3>
                    {/* Use the translated address from language.tsx */}
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {t('contact.info.address').split(', ').map((line, index, arr) => (
                          <React.Fragment key={index}>
                              {line}{index < arr.length - 1 && <br />}
                          </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-200">
                  <div className="bg-blue-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-blue-200 hover:scale-110">
                    <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">{t('contact.info.phoneTitle')}</h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                      <a href={`tel:${t('contact.info.phone').replace(/\s/g, '')}`} className="hover:text-blue-600 smooth-transition">
                        {t('contact.info.phone')}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-300">
                  <div className="bg-purple-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-purple-200 hover:scale-110">
                    <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">{t('contact.info.emailTitle')}</h3>
                    <p className="text-gray-600 text-base sm:text-lg">
                      <a href={`mailto:${t('contact.info.email')}`} className="hover:text-purple-600 smooth-transition">
                        {t('contact.info.email')}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 animate-fade-in-up animate-delay-400">
                  <div className="bg-orange-100 p-3 sm:p-4 rounded-xl flex-shrink-0 smooth-transition hover:bg-orange-200 hover:scale-110">
                    <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-2">{t('contact.info.hoursTitle')}</h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {t('contact.info.hoursDays')}<br />
                      {t('contact.info.hoursSaturday')}<br />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Map Placeholder */}
            <Card className="shadow-xl hover-lift animate-scale-in animate-delay-300 border-0 bg-white/80 backdrop-blur-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14167.319760759085!2d85.91891965!3d26.719602499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed86a51d455433%3A0x6338e55e4e7e6005!2sJanakpurdham!5e0!3m2!1sen!2snp!4v1709472093557!5m2!1sen!2snp" // Updated to a more specific Janakpurdham embed
                className="w-full h-[450px]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Janakpurdham Map Location"
              ></iframe>
            </Card>
          </div>

          {/* Enhanced Contact Form */}
          <Card className="shadow-xl hover-lift animate-fade-in-right border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl sm:text-3xl text-gray-800 font-bold">{t('contact.form.title')}</CardTitle>
              <p className="text-gray-600 mt-2">{t('contact.form.subtitle')}</p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in-up animate-delay-100">
                    <Label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.name')} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                    />
                  </div>

                  <div className="animate-fade-in-up animate-delay-200">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 block">
                      {t('contact.form.email')} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up animate-delay-300">
                  <Label htmlFor="subject" className="text-base font-semibold text-gray-700 mb-2 block">
                    {t('contact.form.subject')} *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    required
                    className="h-12 text-base border-2 border-gray-200 focus:border-green-500 smooth-transition rounded-lg"
                  />
                </div>

                <div className="animate-fade-in-up animate-delay-400">
                  <Label htmlFor="message" className="text-base font-semibold text-gray-700 mb-2 block">
                    {t('contact.form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.messagePlaceholder')}
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
                    {t('contact.form.button')}
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