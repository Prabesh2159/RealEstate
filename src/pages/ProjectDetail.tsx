import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, CheckCircle, Users, Building, Clock, Trophy, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProject, Project } from "@/back/project";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert relative image URLs to absolute URLs
  const getAbsoluteImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '/api/placeholder/400/300';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl; // Already absolute
    }
    // Convert relative URL to absolute by adding backend base URL
    return `http://localhost:8000${imageUrl}`;
  };

  // Fetch project data from API
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🏗️ Fetching project with ID:', id);

        const projectData = await getProject(parseInt(id));
        console.log('📋 Project data received:', projectData);

        setProject(projectData);
      } catch (error) {
        console.error('❌ Error fetching project:', error);
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // ✅ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e]"></div>
            <span className="ml-4 text-lg text-gray-600">Loading project details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {error || 'Project Not Found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate(-1)} className="bg-[#006d4e] hover:bg-[#005a3f]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6 hover:bg-[#006d4e] hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="mb-8">
              <img
                src={project.image_urls && project.image_urls.length > 0 ? getAbsoluteImageUrl(project.image_urls[0]) : '/api/placeholder/800/400'}
                alt={project.proj_name}
                className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
                onError={(e) => {
                  console.log('Project detail image failed to load:', project.image_urls?.[0]);
                  e.currentTarget.src = '/api/placeholder/800/400';
                }}
              />
              {project.image_urls && project.image_urls.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {project.image_urls.slice(1, 4).map((img, index) => (
                    <img
                      key={index}
                      src={getAbsoluteImageUrl(img)}
                      alt={`${project.proj_name} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/200/100';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Project Overview */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.proj_name}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5" />
                      {project.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-[#006d4e] text-white px-4 py-2 rounded-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span className="font-semibold capitalize">{project.proj_status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Building className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.proj_area}</div>
                    <div className="text-sm text-gray-600">Project Area</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.proj_duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.professionals}</div>
                    <div className="text-sm text-gray-600">Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {project.completed_date ? new Date(project.completed_date).toLocaleDateString() : 'In Progress'}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Project Description</h3>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-[#006d4e] rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Challenges</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Outcomes</h3>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client:</span>
                    <span className="font-semibold">{project.client_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold capitalize">{project.proj_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold">रू {project.proj_budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not specified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-semibold">
                      {project.end_date ? new Date(project.end_date).toLocaleDateString() :
                       project.completed_date ? new Date(project.completed_date).toLocaleDateString() : 'In Progress'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Project Manager</h3>

                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
                    <img
                      src="/images/realstate-removebg-preview.png"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Project Manager</h4>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">+977-970-7362231</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">realestatecrafters1@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Changed Button to an anchor tag wrapped in a Button component for styling */}
                  <Button asChild className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
                    <a href="tel:+977-970-7362231">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Manager
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;