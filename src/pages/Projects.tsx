

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, CheckCircle, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
const Projects = () => {
const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const completedProjects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      title: "Skyline Business Complex",
      location: "Downtown Financial District",
      completedDate: "March 2024",
      projectType: "commercial",
      client: "Metro Corporation",
      size: "250,000 sq ft",
      duration: "24 months",
      status: "completed"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      title: "Green Valley Residential",
      location: "Suburb Hills, North Side",
      completedDate: "January 2024",
      projectType: "residential",  
      client: "Valley Homes Ltd",
      size: "150 units",
      duration: "18 months",
      status: "completed"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Modern Office Tower",
      location: "Central Business District",
      completedDate: "November 2023",
      projectType: "commercial",
      client: "Tech Solutions Inc",
      size: "180,000 sq ft",
      duration: "30 months",
      status: "completed"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      title: "Luxury Resort Development",
      location: "Coastal Highway, East Bay",
      completedDate: "September 2023",
      projectType: "hospitality",
      client: "Coastal Resorts Group",
      size: "50 acres",
      duration: "36 months",
      status: "completed"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1590725140246-20acdee442be",
      title: "Heritage Mall Renovation",
      location: "Historic Downtown Area",
      completedDate: "July 2023",
      projectType: "renovation",
      client: "Heritage Properties",
      size: "300,000 sq ft",
      duration: "12 months",
      status: "completed"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
      title: "Smart City Infrastructure",
      location: "New Development Zone",
      completedDate: "May 2023",
      projectType: "infrastructure",
      client: "City Development Authority",
      size: "500 acres",
      duration: "48 months",
      status: "completed"
    }
  ];

  const filteredProjects = completedProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || project.projectType === typeFilter;
    const matchesLocation = !locationFilter || project.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesType && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <div className="bubble"></div>
        <div className="bubble"></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Trophy className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-down">Completed Projects</h1>
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in-up animate-delay-300">Showcasing our successful developments and construction achievements</p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Completed Projects</h1>
          <p className="text-gray-600 text-lg">Explore our portfolio of successfully delivered projects</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">All Locations</option>
              <option value="downtown">Downtown</option>
              <option value="suburb">Suburb</option>
              <option value="central">Central</option>
              <option value="coastal">Coastal</option>
              <option value="historic">Historic</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">All Types</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="hospitality">Hospitality</option>
              <option value="renovation">Renovation</option>
              <option value="infrastructure">Infrastructure</option>
            </select>

            <Button className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {completedProjects.length} completed projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-[#006d4e] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.projectType}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {project.completedDate}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {project.location}
                </p>
                <p className="text-gray-600 mb-4 flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  Client: {project.client}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex flex-col">
                    <span className="font-semibold">Size</span>
                    <span>{project.size}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="font-semibold">Duration</span>
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">Status</span>
                    <span className="text-[#006d4e] font-semibold">✓ Completed</span>
                  </div>
                </div>
                <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
                  View Project Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setTypeFilter("");
                setLocationFilter("");
              }}
              className="mt-4 bg-[#006d4e] hover:bg-[#005a3f]"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;
