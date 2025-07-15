
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Bed, Bath, LayoutGrid } from 'lucide-react'; // Import icons
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui Button

// Define the interface for a single property object
interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
}

// Define the props interface for the PropertyCard component
interface PropertyCardProps {
  property: Property;
  bedsLabel?: string;
  bathsLabel?: string;
  sqftLabel?: string;
  viewDetailsLabel?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  bedsLabel = "Beds",
  bathsLabel = "Baths", 
  sqftLabel = "sqft",
  viewDetailsLabel = "View Details"
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm mx-auto sm:max-w-none cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 sm:h-52 lg:h-56 object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 flex items-center mb-3 text-sm sm:text-base">
          <Building className="h-4 w-4 mr-2 flex-shrink-0" /> {/* Location icon */}
          <span className="truncate">{property.location}</span>
        </p>

        {/* Price - Now in plain bold text */}
        <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          {property.price}
        </p>

        {/* Beds, Baths, Sqft */}
        <div className="flex items-center justify-between text-gray-600 text-xs sm:text-sm mb-4 gap-2">
          <span className="flex items-center min-w-0">
            <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" /> {/* Bed icon */}
            <span className="truncate">{property.beds} {bedsLabel}</span>
          </span>
          <span className="flex items-center min-w-0">
            <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" /> {/* Bath icon */}
            <span className="truncate">{property.baths} {bathsLabel}</span>
          </span>
          <span className="flex items-center min-w-0">
            <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" /> {/* Sqft icon */}
            <span className="truncate">{property.sqft} {sqftLabel}</span>
          </span>
        </div>

        {/* View Details Button */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-sm sm:text-base py-2 sm:py-2.5 transition-all duration-200 transform hover:scale-105"
        >
          {viewDetailsLabel}
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
