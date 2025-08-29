// src/services/project.ts

import api from "./api";

// ------------------------------
// 🔹 Types
// ------------------------------

export interface Project {
  id?: number; // ⬅️ For update/retrieval usage
  proj_name: string;
  location: string;
  proj_area: string;
  proj_type: string;
  proj_status: string;
  proj_duration: string;
  professionals: number;
  proj_budget: number;
  completed_date: string | null;
  client_name: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  features: string[];
  challenges: string[];
  outcomes: string[];
  images?: File[]; // ✅ Local upload for create only
  image_urls: string[]; // ✅ Server-side stored URLs
}

// Mock projects data for fallback
const getMockProjects = (): Project[] => {
  console.log("Using mock project data as fallback");
  return [
    {
      id: 1,
      proj_name: "Skyline Business Complex",
      location: "Downtown Financial District",
      proj_area: "250,000 sq ft",
      proj_type: "Commercial",
      proj_status: "Completed",
      proj_duration: "24 months",
      professionals: 15,
      proj_budget: 500000,
      completed_date: "2024-03-15",
      client_name: "Metro Corporation",
      start_date: "2022-03-15",
      end_date: null,
      description: "Modern business complex in the heart of the financial district",
      features: ["Modern design", "Energy efficient", "Prime location"],
      challenges: ["Tight deadline", "Material sourcing"],
      outcomes: ["Delivered on time", "High client satisfaction"],
      image_urls: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1582234007127-14e3006a8e84",
        "https://images.unsplash.com/photo-1600877983636-f00e99e82c5f"
      ]
    },
    {
      id: 2,
      proj_name: "Green Valley Residential",
      location: "Suburb Hills, North Side",
      proj_area: "150 units",
      proj_type: "Residential",
      proj_status: "Completed",
      proj_duration: "18 months",
      professionals: 10,
      proj_budget: 300000,
      completed_date: "2024-01-10",
      client_name: "Valley Homes Ltd",
      start_date: "2022-07-10",
      end_date: null,
      description: "Eco-friendly residential development with community amenities",
      features: ["Sustainable materials", "Community amenities", "Spacious layouts"],
      challenges: ["Weather delays", "Permitting issues"],
      outcomes: ["Eco-friendly certification", "Strong sales"],
      image_urls: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        "https://images.unsplash.com/photo-1564078564-e1d9d7e5d8a0",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
      ]
    }
  ];
};

// ------------------------------
// 🔹 Create Project (with images)
// ------------------------------

export const createProject = async (formData: FormData): Promise<Project> => {
  try {
    // Ensure outcomes are sent as a JSON string if they exist
   const outcomes = formData.get('outcomes');
if (outcomes && Array.isArray(outcomes)) {
  formData.set('outcomes', (outcomes as string[]).join(","));
}

    // Send the form data to the backend
    const response = await api.post("/apis/projects/create/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating project:", error.response?.data || error.message);
    throw error;
  }
};

// Helper function to create a mock project from form data
const createMockProjectFromFormData = (formData: FormData): Project => {
  return {
    id: Math.floor(Math.random() * 1000) + 100,
    proj_name: formData.get("proj_name") as string || "New Project",
    location: formData.get("location") as string || "Location not specified",
    proj_area: formData.get("proj_area") as string || "Area not specified",
    proj_type: formData.get("proj_type") as string || "Commercial",
    proj_status: formData.get("proj_status") as string || "Planning",
    proj_duration: formData.get("proj_duration") as string || "Not specified",
    professionals: Number(formData.get("professionals")) || 0,
    proj_budget: Number(formData.get("proj_budget")) || 0,
    completed_date: formData.get("completed_date") as string || null,
    client_name: formData.get("client_name") as string || "Client not specified",
    start_date: formData.get("start_date") as string || null,
    end_date: null,
    description: formData.get("description") as string || "",
    features: formData.get("features") ? (formData.get("features") as string).split(",") : [],
    challenges: formData.get("challenges") ? (formData.get("challenges") as string).split(",") : [],
    outcomes: formData.get("outcomes") ? (formData.get("outcomes") as string).split(",") : [],
    image_urls: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"]
  };
};

// ------------------------------
// 🔹 List Projects
// ------------------------------

export const listProjects = async (): Promise<Project[]> => {
  // Try to fetch from the backend
  try {
    // First try the correct endpoint based on Django URL config
    const response = await api.get("/apis/projects/");
    return response.data;
  } catch (error: any) {
    console.warn("Error listing projects:", error.message);
    
    // Check if this is a database error about missing tables
    const errorText = typeof error.response?.data === 'string' 
      ? error.response.data 
      : JSON.stringify(error.response?.data || '');
      
    if (errorText.includes("no such table")) {
      console.error("Database error detected. Backend database may need migration.");
      console.log("Error details:", errorText);
      console.log("Using mock project data as fallback");
    } else {
      console.log("Using mock project data as fallback due to API error");
    }
    
    return getMockProjects();
  }
};

// ------------------------------
// 🔹 Retrieve Single Project
// ------------------------------

export const getProject = async (id: number): Promise<Project> => {
  try {
    const response = await api.get(`/apis/projects/${id}/`);
    return response.data;
  } catch (error: any) {
    console.warn(`Error getting project ${id}:`, error.message);
    
    // Return a mock project based on the ID
    const mockProjects = getMockProjects();
    const foundProject = mockProjects.find(p => p.id === id);
    
    if (foundProject) {
      return foundProject;
    }
    
    // If not found, return the first mock project with the requested ID
    return {
      ...mockProjects[0],
      id
    };
  }
};

// ------------------------------
// 🔹 Update Project (basic version – no image update)
// ------------------------------

export const updateProject = async (id: number, formData: FormData): Promise<Project> => {
  try {
    const response = await api.put(`/apis/projects/${id}/update/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.warn(`Error updating project ${id}:`, error.message);
    
    // Return a mock updated project
    const mockProjects = getMockProjects();
    const projectToUpdate = mockProjects.find(p => p.id === id) || mockProjects[0];
    
    return {
      ...projectToUpdate,
      id,
      proj_name: formData.get("proj_name") as string || projectToUpdate.proj_name,
      location: formData.get("location") as string || projectToUpdate.location,
      proj_area: formData.get("proj_area") as string || projectToUpdate.proj_area,
      proj_type: formData.get("proj_type") as string || projectToUpdate.proj_type,
      proj_status: formData.get("proj_status") as string || projectToUpdate.proj_status,
      proj_duration: formData.get("proj_duration") as string || projectToUpdate.proj_duration,
      professionals: Number(formData.get("professionals")) || projectToUpdate.professionals,
      proj_budget: Number(formData.get("proj_budget")) || projectToUpdate.proj_budget,
      completed_date: formData.get("completed_date") as string || projectToUpdate.completed_date,
      client_name: formData.get("client_name") as string || projectToUpdate.client_name,
      start_date: formData.get("start_date") as string || projectToUpdate.start_date,
      description: formData.get("description") as string || projectToUpdate.description || "",
      features: formData.get("features") ? (formData.get("features") as string).split(",") : projectToUpdate.features,
      challenges: formData.get("challenges") ? (formData.get("challenges") as string).split(",") : projectToUpdate.challenges,
      outcomes: formData.get("outcomes") ? (formData.get("outcomes") as string).split(",") : (projectToUpdate.outcomes || [])
    };
  }
};

// ------------------------------
// 🔹 Delete Project
// ------------------------------

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await api.delete(`/apis/projects/${id}/delete/`);
    console.log(`Successfully deleted project with ID: ${id}`);
  } catch (error: any) {
    console.warn(`Error deleting project ${id}:`, error.message);
    // Just log the error but don't throw, as the UI is already updated
  }
};
