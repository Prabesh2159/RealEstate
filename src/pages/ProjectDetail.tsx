import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, CheckCircle, Users, Building, Clock, Trophy, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for projects
const getAllProjects = () => [
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
    status: "completed",
    description: "A state-of-the-art business complex featuring modern office spaces, retail outlets, and parking facilities. This project represents the pinnacle of commercial architecture in the downtown area.",
    features: ["LEED Certified", "Smart Building Technology", "High-Speed Elevators", "Underground Parking", "Rooftop Garden", "Conference Centers"],
    teamSize: "150+ professionals",
    budget: "रू 50 Crore",
    startDate: "March 2022",
    contact: {
      manager: "Rajesh Sharma",
      phone: "+977-1234567890",
      email: "rajesh.sharma@company.com"
    },
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
    ],
    challenges: [
      "Complex architectural design requirements",
      "Tight construction timeline",
      "Integration of smart building systems",
      "Environmental sustainability goals"
    ],
    outcomes: [
      "Completed 2 months ahead of schedule",
      "LEED Gold certification achieved",
      "100% client satisfaction",
      "Zero workplace accidents"
    ]
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
    status: "completed",
    description: "A beautiful residential complex with 150 modern units, featuring eco-friendly design and sustainable living solutions for families.",
    features: ["Solar Power", "Rainwater Harvesting", "Children's Play Area", "Community Garden", "Gym & Pool", "24/7 Security"],
    teamSize: "80+ professionals",
    budget: "रू 30 Crore",
    startDate: "July 2022",
    contact: {
      manager: "Priya Patel",
      phone: "+977-9876543210",
      email: "priya.patel@company.com"
    },
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
    ],
    challenges: [
      "Sustainable construction methods",
      "Community integration planning",
      "Infrastructure development"
    ],
    outcomes: [
      "All units sold within 6 months",
      "Green building certification",
      "Community satisfaction rating: 4.8/5"
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const project = getAllProjects().find(p => p.id === parseInt(id || "0"));
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
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
                src={project.image}
                alt={project.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
              />
              {project.gallery && project.gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {project.gallery.slice(1, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${project.title} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5" />
                      {project.location}
                    </p>
                  </div>
                  <div className="flex items-center bg-[#006d4e] text-white px-4 py-2 rounded-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Completed</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Building className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.size}</div>
                    <div className="text-sm text-gray-600">Project Size</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.teamSize}</div>
                    <div className="text-sm text-gray-600">Team Size</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-[#006d4e]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{project.completedDate}</div>
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
                    <span className="font-semibold">{project.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold capitalize">{project.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold">{project.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-semibold">{project.completedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Project Manager</h3>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#006d4e] rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">{project.contact.manager}</h4>
                  <p className="text-sm text-gray-600">Project Manager</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">{project.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">{project.contact.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Manager
                  </Button>
                  <Button variant="outline" className="w-full border-[#006d4e] text-[#006d4e] hover:bg-[#006d4e] hover:text-white">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Portfolio
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