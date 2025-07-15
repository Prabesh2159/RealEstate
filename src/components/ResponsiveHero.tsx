
import { ReactNode } from 'react';

interface ResponsiveHeroProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  backgroundClass?: string;
}

const ResponsiveHero = ({ 
  icon, 
  title, 
  subtitle, 
  backgroundClass = "bg-[#006d4e]" 
}: ResponsiveHeroProps) => {
  return (
    <section className={`${backgroundClass} text-white py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e] via-[#005a41] to-[#004d37]"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 lg:top-16 lg:left-16 xl:top-20 xl:left-20 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-16 right-8 sm:top-32 sm:right-20 lg:top-40 lg:right-32 xl:top-48 xl:right-40 w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-8 sm:bottom-20 sm:left-1/4 lg:bottom-24 lg:left-1/4 xl:bottom-32 xl:left-1/4 w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-12 right-12 sm:bottom-32 sm:right-1/3 lg:bottom-40 lg:right-1/3 xl:bottom-48 xl:right-1/3 w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white rounded-full animate-pulse delay-3000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center relative z-10">
        <div className="mb-4 sm:mb-6 lg:mb-8 xl:mb-10 animate-fade-in opacity-0 animation-delay-300">
          {icon}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 animate-fade-in opacity-0 animation-delay-300 leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl animate-fade-in opacity-0 animation-delay-600 leading-relaxed max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          {subtitle}
        </p>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-1/2 left-0 w-2 h-2 sm:w-4 sm:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 bg-green-300 rounded-full animate-bounce opacity-30"></div>
      <div className="absolute top-1/3 right-0 w-3 h-3 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-green-200 rounded-full animate-bounce opacity-40 delay-500"></div>
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-5 lg:h-5 xl:w-6 xl:h-6 bg-green-400 rounded-full animate-bounce opacity-50 delay-1000"></div>
    </section>
  );
};

export default ResponsiveHero;
