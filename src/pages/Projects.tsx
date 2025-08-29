import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Calendar, CheckCircle, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { listProjects, Project } from "@/back/project";

const Projects = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to convert relative image URLs to absolute URLs
  const getAbsoluteImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '/api/placeholder/400/300';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl; // Already absolute
    }
    // Convert relative URL to absolute by adding backend base URL
    return `http://localhost:8000${imageUrl}`;
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('🏗️ Fetching projects from API...');
        const projectsData = await listProjects();
        console.log('📋 Projects response:', projectsData);

        setProjects(projectsData);
        console.log('🎯 Projects loaded:', projectsData.length);
      } catch (error) {
        console.error('❌ Error fetching projects:', error);
        // Keep empty array on error, API has fallback mock data
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects using the correct Project interface field names
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.proj_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || project.proj_type.toLowerCase() === typeFilter.toLowerCase();
    const matchesLocation = !locationFilter || project.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus = !statusFilter || project.proj_status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {/* Hero Section with Animations (Updated) */}
      <section className="bg-[#006d4e] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006d4e] via-[#005a41] to-[#004d37]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white rounded-full animate-pulse delay-3000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Trophy className="mx-auto h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300" /> {/* Changed to fade-in */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in opacity-0 animation-delay-300">{t('projects.title')}</h1> {/* Changed to fade-in */}
          <p className="text-base sm:text-lg lg:text-xl animate-fade-in opacity-0 animation-delay-600">{t('projects.subtitle')}</p> {/* Changed to fade-in */}
        </div>
        
        {/* Floating Animation Elements (New) */}
        <div className="absolute top-1/2 left-0 w-4 h-4 bg-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-0 w-6 h-6 bg-green-200 rounded-full animate-bounce opacity-40 delay-500"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-50 delay-1000"></div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("projects.title")}</h1>
          <p className="text-gray-600 text-lg">{t("projects.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t("projects.search.placeholder")}
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
              <option value="">{t("projects.filters.allLocations")}</option>
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
              <option value="">{t("projects.filters.allStatus")}</option>
              <option value="completed">{t("projects.filters.completed")}</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 border border-gray-300 rounded-md"
            >
              <option value="">{t("projects.filters.allTypes")}</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="hospitality">Hospitality</option>
              <option value="renovation">Renovation</option>
              <option value="infrastructure">Infrastructure</option>
            </select>

            <Button className="bg-[#006d4e] hover:bg-[#005a3f]">
              <Filter className="mr-2 h-4 w-4" />
              {t("projects.filters.apply")}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? "Loading..." : `${t("projects.results.showing")} ${filteredProjects.length} ${t("projects.results.of")} ${projects.length} ${t("projects.results.projects")}`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading state
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e]"></div>
              <span className="ml-4 text-lg text-gray-600">Loading projects...</span>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image_urls && project.image_urls.length > 0 ? getAbsoluteImageUrl(project.image_urls[0]) : '/api/placeholder/400/300'}
                    alt={project.proj_name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      console.log('Project image failed to load:', project.image_urls?.[0]);
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#006d4e] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {project.proj_status}
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {project.proj_type}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {project.completed_date ? new Date(project.completed_date).toLocaleDateString() : 'In Progress'}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.proj_name}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {project.location}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {t("projects.project.client")}: {project.client_name}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{t("projects.project.size")}</span>
                      <span>{project.proj_area}</span>
                    </div>
                    <div className="flex flex-col text-center">
                      <span className="font-semibold">{t("projects.project.duration")}</span>
                      <span>{project.proj_duration}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-semibold">Budget</span>
                      <span className="text-[#006d4e] font-semibold">रू {project.proj_budget.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.scrollTo(0, 0); // Scroll to top before navigating
                      navigate(`/project/${project.id}`);
                    }}
                    className="w-full bg-[#006d4e] hover:bg-[#005a3f]"
                  >
                    {t("projects.project.viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">{t("projects.noResults.message")}</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  setTypeFilter("");
                  setLocationFilter("");
                }}
                className="mt-4 bg-[#006d4e] hover:bg-[#005a3f]"
              >
                {t("projects.noResults.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;