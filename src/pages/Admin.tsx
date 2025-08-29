import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitSellForm, SellFormData, fetchSellList, fetchSellItem, deleteSellItem } from "@/back/sellapi";
import { isAuthenticated, getAdminUser, logout, checkAdmin, getAccessToken } from "@/back/auth";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, Clock, Phone, Eye, Trophy, BookOpen, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import * as LucideIcons from "lucide-react";
import { listContactMessages, createContactMessage, getContactMessage, deleteContactMessage, ContactMessageData } from '../back/contact';
import { fetchServiceRequests, deleteServiceRequest, submitServiceRequest, ServiceRequestItem } from '../back/serviceform';
 
import { Project, listProjects, createProject, updateProject, deleteProject, getProject } from "../back/project"; // Import project CRUD functions
import { listProperties, getProperty, createProperty, updateProperty, deleteProperty, togglePropertyStatus, listFeatures, Feature } from "../back/property";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead?: boolean;
}


type ServiceRequest = ServiceRequestItem;

interface Property {
  id: number;
  name: string;
  address: string;
  price: number | string;  // Allow string for form input
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number | string;  // Allow string for form input
  property_type: string;
  for_type: 'sale' | 'rent';
  features: number[];  // IDs of selected features
  custom_features: string[];
  image: string | File | null;
  status: 'active' | 'inactive';
  is_featured: boolean;
  featured_image1: string | File | null;
  featured_image2: string | File | null;
}

interface PropertyDisplay {
  id: number;
  name: string;
  address: string;
  area: number | string;
  property_type: string;
  for_type: 'sale' | 'rent';
  price: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  features: number[];
  feature_names: string[];
  custom_features: string[];
  image: string | File | null;
  status: 'active' | 'inactive';
  is_featured: boolean;
  featured_image1: string | File | null;
  featured_image2: string | File | null;
}
// ...existing code...

interface PendingProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
}



const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  
  const [contacts, setContacts] = useState<ContactMessageData[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);
  const [newContact, setNewContact] = useState<ContactMessageData>({ name: '', email: '', subject: '', message: '' });
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewPropertyDialog, setShowViewPropertyDialog] = useState(false);
  const [showViewPendingDialog, setShowViewPendingDialog] = useState(false);
  const [showViewProjectDialog, setShowViewProjectDialog] = useState(false);
  const [showViewServiceRequestDialog, setShowViewServiceRequestDialog] = useState(false);
  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [viewingProperty, setViewingProperty] = useState<PropertyDisplay | null>(null);
  const [viewingSellItem, setViewingSellItem] = useState<SellFormData | null>(null);
  const [viewingPendingProperty, setViewingPendingProperty] = useState<PendingProperty | null>(null);
  const [viewingServiceRequest, setViewingServiceRequest] = useState<ServiceRequest | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showProjectPreviewDialog, setShowProjectPreviewDialog] = useState(false);
  const [showProjectEditDialog, setShowProjectEditDialog] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    proj_name: "",
    location: "",
    proj_area: "",
    proj_type: "Commercial",
    proj_status: "Planning",
    proj_duration: "",
    professionals: 0,
    proj_budget: 0,
    completed_date: null,
    client_name: "",
    start_date: null,
    end_date: null,
    description: "",
    features: [],
    challenges: [],
    outcomes: [],
    image_urls: []
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [serviceRequests, setServiceRequests] = useState<ServiceRequestItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<PropertyDisplay[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyDisplay | null>(null);
  const [propertyImagePreview, setPropertyImagePreview] = useState<string | null>(null);

  const initialNewPropertyState: Property = {
    id: 0,
    name: "",
    address: "",
    price: "",
    description: "",
    bedrooms: 1,
    bathrooms: 1,
    area: "",
    property_type: "house",
    for_type: 'sale',
    features: [],
    custom_features: [],
    image: null,
    status: 'active',
    is_featured: false,
    featured_image1: null,
    featured_image2: null
  };

  const [newProperty, setNewProperty] = useState<Property>(initialNewPropertyState);
  const [availableFeatures, setAvailableFeatures] = useState<Feature[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

  // Missing state variables
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false);
  const [pendingPropertyImagePreview, setPendingPropertyImagePreview] = useState<string | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [showViewSellItemDialog, setShowViewSellItemDialog] = useState(false);



  const fetchFeatures = async () => {
    try {
      const features = await listFeatures();
      setAvailableFeatures(features);
    } catch (error) {
      console.error('Error fetching features:', error);
      // Set some default features as fallback
      setAvailableFeatures([
        { id: 1, name: 'Parking' },
        { id: 2, name: 'Balcony' },
        { id: 3, name: 'Garden' },
        { id: 4, name: 'Swimming Pool' },
        { id: 5, name: 'Gym' },
        { id: 6, name: 'Security' },
        { id: 7, name: 'Elevator' },
        { id: 8, name: 'Air Conditioning' }
      ]);
    }
  };

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await listProperties();

      // Check if response has the expected structure
      if (!response || !response.results || !Array.isArray(response.results)) {
        console.warn('Unexpected API response structure:', response);
        setProperties([]);
        return;
      }

      // Convert API response to display format
      const displayProperties: PropertyDisplay[] = response.results.map(p => ({
        id: p.id!,
        name: p.name,
        address: p.address,
        area: p.area,
        property_type: p.property_type,
        for_type: p.for_type,
        price: `$${p.price}`,
        description: p.description,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        features: p.features,
        feature_names: availableFeatures.filter(f => p.features.includes(f.id)).map(f => f.name),
        custom_features: p.custom_features,
        image: p.image,
        status: p.status || 'active',
        is_featured: p.is_featured,
        featured_image1: p.featured_image1,
        featured_image2: p.featured_image2
      }));
      setProperties(displayProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Set empty array as fallback
      setProperties([]);
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [sellItems, setSellItems] = useState<SellFormData[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);




  // Handler for feature selection
  const handleFeatureChange = (featureId: number, add: boolean) => {
    if (add) {
      setSelectedFeatures(prev => [...prev, featureId]);
      setNewProperty(prev => ({
        ...prev,
        features: [...prev.features, featureId]
      }));
    } else {
      setSelectedFeatures(prev => prev.filter(id => id !== featureId));
      setNewProperty(prev => ({
        ...prev,
        features: prev.features.filter(id => id !== featureId)
      }));
    }
  };

  const initialSellFormState: SellFormData = {
    name: "",
    email: "",
    phone_no: "",
    propert_title: "",
    property_location: "",
    property_price: "",
    property_type: "",
    no_of_bedrooms: undefined,
    no_of_bathrooms: undefined,
    area: "",
    description: "",
    image: null
  };



  const [pendingProperties, setPendingProperties] = useState<PendingProperty[]>([]);

  const initialNewPendingPropertyState: Omit<PendingProperty, 'id' | 'status' | 'submissionDate'> = {
    title: "",
    location: "",
    price: "",
    description: "",
    propertyType: "",
    bedrooms: 1,
    bathrooms: 1,
    sqft: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: ""
  };

  const [newPendingProperty, setNewPendingProperty] = useState<typeof initialNewPendingPropertyState>(initialNewPendingPropertyState);

  const availableIcons = [
    'Home', 'Calculator', 'Hammer', 'PaintBucket', 'Shield', 
    'Key', 'MapPin', 'Phone', 'Mail', 'Users', 'Building', 'Cog', 'Star', 
    'Heart', 'CheckCircle', 'Award', 'Target', 'Zap', 'Lightbulb', 'Camera',
    'FileText', 'Clock', 'Calendar', 'TrendingUp', 'DollarSign', 'CreditCard'
  ] as (keyof typeof LucideIcons)[];

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if user has tokens
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

      // Check if user is still admin
      try {
        const token = getAccessToken();
        if (token) {
          const adminCheck = await checkAdmin(token);
          if (!adminCheck.is_admin) {
            logout();
            navigate('/login');
            return;
          }
        }
      } catch (error) {
        console.error('Admin check failed:', error);
        logout();
        navigate('/login');
        return;
      }
    };

    checkAuthentication();
    
    // Load available features and properties
    fetchFeatures();
    fetchProperties();

    // Fetch contacts from backend
    setLoadingContacts(true);
    listContactMessages()
      .then((data) => setContacts(data))
      .catch(() => setContacts([]))
      .finally(() => setLoadingContacts(false));

    // Fetch service requests
    fetchServiceRequests()
      .then((data) => setServiceRequests(data))
      .catch((error) => {
        console.error('Error fetching service requests:', error);
        toast({
          title: "Error",
          description: "Failed to load service requests",
          variant: "destructive"
        });
      });

    // Fetch sell items
    fetchSellList()
      .then((data) => setSellItems(data))
      .catch((error) => {
        console.error('Error fetching sell items:', error);
        toast({
          title: "Error",
          description: "Failed to load sell items",
          variant: "destructive"
        });
      });

    // Fetch projects from backend
    listProjects()
      .then((data) => {
        console.log('🏗️ Initial projects loaded:', data.length, 'projects');
        if (data.length > 0) {
          console.log('🔍 First project structure on load:', {
            project: data[0],
            outcomes: data[0].outcomes,
            outcomesType: typeof data[0].outcomes,
            outcomesIsArray: Array.isArray(data[0].outcomes),
            image_urls: data[0].image_urls,
            imageUrlsType: typeof data[0].image_urls,
            imageUrlsIsArray: Array.isArray(data[0].image_urls)
          });
        }
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleDeleteContact = (id: number) => {
    deleteContactMessage(id)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
        toast({ title: "Contact Deleted", description: "Contact message has been removed." });
      })
      .catch((error) => {
        toast({ title: "Delete Failed", description: error.toString(), variant: "destructive" });
      });
  };

  const handleMarkContactAsRead = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, isRead: true } : contact
    ));
    toast({
      title: "Message Marked as Read",
      description: "Contact message has been marked as read.",
    });
  };

  const handleDeleteServiceRequest = async (id: number) => {
    try {
      await deleteServiceRequest(id);
      setServiceRequests(serviceRequests.filter(request => request.id !== id));
      toast({
        title: "Service Request Deleted",
        description: "Service request has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service request. Please try again.",
        variant: "destructive"
      });
      console.error("Error deleting service request:", error);
    }
  };

  const handleMarkServiceRequestAsRead = (id: number) => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === id ? { ...request, isRead: true } : request
    ));
    toast({
      title: "Service Request Marked as Read",
      description: "Service request has been marked as read.",
    });
  };



  const handlePendingPropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPendingPropertyImagePreview(reader.result);
          const newValue = { ...newPendingProperty };
          newValue.image = reader.result;
          setNewPendingProperty(newValue);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPendingPropertyImagePreview(null);
      const newValue = { ...newPendingProperty };
      newValue.image = "";
      setNewPendingProperty(newValue);
    }
  };















  const handleAddPendingProperty = () => {
    const newId = pendingProperties.length > 0 ? Math.max(...pendingProperties.map(p => p.id)) + 1 : 1;
    const currentDate = new Date().toISOString().split('T')[0];
    setPendingProperties([...pendingProperties, { 
        ...newPendingProperty, 
        id: newId, 
        status: 'pending', 
        submissionDate: currentDate 
    }]);
    toast({ title: "Pending Property Added", description: "New pending property has been added for review." });
    setNewPendingProperty(initialNewPendingPropertyState);
    setPendingPropertyImagePreview(null);
    // Removed setShowAddPendingPropertyDialog(false) as it's being merged
  };

  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? { 
          ...p,
          title: newPendingProperty.title,
          location: newPendingProperty.location,
          price: newPendingProperty.price,
          description: newPendingProperty.description,
          propertyType: newPendingProperty.propertyType,
          bedrooms: newPendingProperty.bedrooms,
          bathrooms: newPendingProperty.bathrooms,
          sqft: newPendingProperty.sqft,
          contactName: newPendingProperty.contactName,
          contactEmail: newPendingProperty.contactEmail,
          contactPhone: newPendingProperty.contactPhone,
          image: newPendingProperty.image
        } : p
      ));
      toast({
        title: "Property Updated",
        description: "Pending property has been updated.",
      });
    }
    setEditingPendingProperty(null);
    setShowPendingPropertyDialog(false);
    setPendingPropertyImagePreview(null);
  };



  const handleViewContact = (contact: ContactMessage) => {
    getContactMessage(contact.id!).then((data) => {
      // Map ContactMessageData to ContactMessage
      setViewingContact({
        id: data.id ?? contact.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        date: data.created_at ?? contact.date ?? '',
        isRead: contact.isRead ?? false
      });
      setShowContactDialog(true);
    }).catch((error) => {
      toast({ title: "Fetch Failed", description: error.toString(), variant: "destructive" });
    });
  };



  const handleDeleteSellItem = async (id: number) => {
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteSellItem(id);
      const updatedList = await fetchSellList();
      setSellItems(updatedList);
      toast({
        title: "Success",
        description: "Property listing deleted successfully",
      });
    } catch (error: any) {
      console.error('Delete sell item error:', error);

      // If the API doesn't support deletion, provide a fallback
      if (error.message?.includes('not supported') || error.message?.includes('Method') || error.message?.includes('405')) {
        // Remove from local state as fallback
        setSellItems(prevItems => prevItems.filter(item => item.id !== id));
        toast({
          title: "Item Removed",
          description: "Property listing removed from display (API deletion not supported)",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to delete property listing",
          variant: "destructive"
        });
      }
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createContactMessage(newContact);
      setContacts([created, ...contacts]);
      setNewContact({ name: '', email: '', subject: '', message: '' });
      toast({ title: "Message Sent", description: "Contact message sent successfully." });
    } catch (error) {
      toast({ title: "Send Failed", description: error.toString(), variant: "destructive" });
    }
  };



  const handleViewPendingProperty = (property: PendingProperty) => {
    setViewingPendingProperty(property);
    setShowViewPendingDialog(true);
    
  };

  // Store actual File objects for upload
  const [projectImageFiles, setProjectImageFiles] = useState<File[]>([]);

  // Helper function to convert relative image URLs to absolute URLs
  const getAbsoluteImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '/api/placeholder/400/300';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl; // Already absolute
    }
    // Convert relative URL to absolute by adding backend base URL
    return `http://localhost:8000${imageUrl}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log('🖼️ Image upload started:', files.length, 'files selected');

    if (files.length === 0) {
      console.log('❌ No files selected');
      return;
    }

    const imageUrls: string[] = [];

    // Store the actual files for upload
    console.log('📁 Storing files for upload...');
    setProjectImageFiles(prev => {
      const newFiles = [...prev, ...files];
      console.log('📁 Total files stored:', newFiles.length);
      return newFiles;
    });

    // Create preview URLs
    console.log('🔄 Creating preview URLs...');
    files.forEach((file, index) => {
      console.log(`📸 Processing file ${index + 1}:`, file.name, file.size, 'bytes');
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          imageUrls.push(reader.result);
          console.log(`✅ Preview created for file ${index + 1}:`, file.name);
          if (imageUrls.length === files.length) {
            console.log('🎉 All previews created, updating state...');
            setProjectImages(prev => {
              const newImages = [...prev, ...imageUrls];
              console.log('🖼️ Total preview images:', newImages.length);
              return newImages;
            });
          }
        }
      };
      reader.onerror = () => {
        console.error('❌ Error reading file:', file.name);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProjectImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setProjectImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateProjectForm = () => {
    console.log('🔍 Validating form...');
    console.log('📝 Project data:', {
      proj_name: newProject.proj_name,
      location: newProject.location,
      proj_type: newProject.proj_type,
      client_name: newProject.client_name,
      proj_area: newProject.proj_area,
      proj_duration: newProject.proj_duration,
      completed_date: newProject.completed_date
    });

    // Check required fields (removed completed_date as it's optional)
    if (
      newProject.proj_name.trim() === "" ||
      newProject.location.trim() === "" ||
      newProject.proj_type.trim() === "" ||
      newProject.client_name.trim() === "" ||
      newProject.proj_area.trim() === "" ||
      newProject.proj_duration.trim() === ""
    ) {
      console.log('❌ Missing required basic information');
      toast({
        title: "Missing Information",
        description: "Please fill in all required project details (name, location, type, client, area, duration).",
        variant: "destructive",
      });
      return false;
    }

    // Make features, challenges, and outcomes optional for now
    console.log('📋 Features:', newProject.features?.length || 0);
    console.log('⚠️ Challenges:', newProject.challenges?.length || 0);
    console.log('🎯 Outcomes:', newProject.outcomes?.length || 0);

    console.log('📸 Image validation - Preview images:', projectImages.length, 'File objects:', projectImageFiles.length);

    // For editing, we might not need new images if they already exist
    if (!editingProject && projectImages.length < 3) {
      console.log('❌ Insufficient images for new project');
      toast({
        title: "Missing Images",
        description: "Please upload at least 3 project images.",
        variant: "destructive",
      });
      return false;
    }

    console.log('✅ All validations passed');
    return true;
  };

  const handleAddOrUpdateProject = async () => {
    console.log('🚀 Starting project submission...');
    console.log('📊 Current project data:', newProject);
    console.log('🎯 Outcomes data:', {
      outcomes: newProject.outcomes,
      type: typeof newProject.outcomes,
      isArray: Array.isArray(newProject.outcomes),
      length: newProject.outcomes?.length
    });
    console.log('🖼️ Preview images count:', projectImages.length);
    console.log('📁 File objects count:', projectImageFiles.length);

    if (!validateProjectForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed');
    const formData = new FormData();
    Object.entries(newProject).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Convert arrays to comma-separated strings for backend
        formData.append(key, value.join(','));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    // Add actual image files (not base64 strings)
    projectImageFiles.forEach((file) => {
      formData.append('images', file);
    });

    // Debug logging
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log('Number of image files:', projectImageFiles.length);
    try {
      console.log('🌐 Making API call...');
      let result;

      if (editingProject && editingProject.id) {
        console.log('📝 Updating existing project:', editingProject.id);
        result = await updateProject(editingProject.id, formData);
        console.log('✅ Project updated successfully:', result);
        toast({ title: "Project Updated", description: "Project has been updated successfully." });
      } else {
        console.log('➕ Creating new project...');
        result = await createProject(formData);
        console.log('✅ Project created successfully:', result);
        toast({ title: "Project Added", description: "New project has been added successfully." });
      }

      console.log('🔄 Refreshing project list...');
      const updated = await listProjects();
      console.log('📋 Updated project list:', updated.length, 'projects');

      // Debug the first project's data structure
      if (updated.length > 0) {
        console.log('🔍 First project data structure:', {
          project: updated[0],
          outcomes: updated[0].outcomes,
          outcomesType: typeof updated[0].outcomes,
          outcomesIsArray: Array.isArray(updated[0].outcomes),
          image_urls: updated[0].image_urls,
          imageUrlsType: typeof updated[0].image_urls,
          imageUrlsIsArray: Array.isArray(updated[0].image_urls)
        });
      }

      setProjects(updated);

      console.log('🎉 Project submission completed successfully!');

    } catch (error: any) {
      console.error('❌ Project save error:', error);
      console.error('📊 Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });

      let errorMessage = "Failed to save project";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
    setNewProject({
      proj_name: "",
      location: "",
      proj_area: "",
      proj_type: "",
      proj_status: "Planning",
      proj_duration: "",
      professionals: 0,
      proj_budget: 0,
      completed_date: null,
      client_name: "",
      start_date: null,
      end_date: null,
      description: "",
      features: [],
      challenges: [],
      outcomes: [],
      image_urls: []
    });
    setProjectImages([]);
    setProjectImageFiles([]);
    setEditingProject(null);
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(false);
  };

  const handlePreviewProject = () => {
    if (!validateProjectForm()) {
      return;
    }
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(true);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      proj_name: project.proj_name,
      location: project.location,
      proj_area: project.proj_area,
      proj_type: project.proj_type,
      proj_status: project.proj_status,
      proj_duration: project.proj_duration,
      professionals: project.professionals,
      proj_budget: project.proj_budget,
      completed_date: project.completed_date,
      client_name: project.client_name,
      start_date: project.start_date,
      end_date: project.end_date,
      description: project.description || "",
      features: project.features,
      challenges: project.challenges,
      outcomes: project.outcomes || [],
      image_urls: project.image_urls || []
    });
    setProjectImages(project.image_urls || []);
    setEditingProject(project);
    setShowProjectDialog(true);
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      toast({ title: "Project Deleted", description: "Project has been removed." });
      // Refresh list from backend
      const updated = await listProjects();
      setProjects(updated);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete project", variant: "destructive" });
    }
  };

  const handleViewProject = async (project: Project) => {
    try {
      const data = await getProject(project.id!);
      setViewingProject(data);
      setShowViewProjectDialog(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to fetch project details", variant: "destructive" });
    }
  };

  const handleViewServiceRequest = (request: ServiceRequest) => {
    setViewingServiceRequest(request);
    setShowViewServiceRequestDialog(true);
  };

  const handleViewSellItem = (item: SellFormData) => {
    setViewingSellItem(item);
    setShowViewSellItemDialog(true);
  };

  const handleUpdateProperty = async () => {
    try {
      console.log('🔍 Raw newProperty state before processing:', newProperty);
      console.log('🔍 Raw property_type:', newProperty.property_type, 'Type:', typeof newProperty.property_type, 'IsArray:', Array.isArray(newProperty.property_type));
      console.log('🔍 Raw for_type:', newProperty.for_type, 'Type:', typeof newProperty.for_type, 'IsArray:', Array.isArray(newProperty.for_type));

      // Convert string values to numbers for API and ensure proper string values
      const propertyData = {
        ...newProperty,
        price: typeof newProperty.price === 'string' ? parseFloat(newProperty.price) || 0 : newProperty.price,
        area: typeof newProperty.area === 'string' ? parseFloat(newProperty.area) || 0 : newProperty.area,
        // Ensure property_type and for_type are strings, not arrays
        property_type: Array.isArray(newProperty.property_type) ? newProperty.property_type[0] : newProperty.property_type,
        for_type: Array.isArray(newProperty.for_type) ? newProperty.for_type[0] : newProperty.for_type,
      };

      console.log('🔍 Processed property data being sent to API:', propertyData);
      console.log('🔍 Processed property_type:', propertyData.property_type, 'Type:', typeof propertyData.property_type);
      console.log('🔍 Processed for_type:', propertyData.for_type, 'Type:', typeof propertyData.for_type);

      if (editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
        toast({ title: "Property Updated", description: "Property has been updated successfully." });
      } else {
        await createProperty(propertyData);
        toast({ title: "Property Added", description: "New property has been added successfully." });
      }
      await fetchProperties();
      setEditingProperty(null);
      setShowPropertyDialog(false);
      setPropertyImagePreview(null);
      setNewProperty(initialNewPropertyState);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to save property", variant: "destructive" });
    }
  };

  const handleEditProperty = (property: PropertyDisplay) => {
    const editProperty: Property = {
      id: property.id,
      name: property.name,
      address: property.address,
      price: property.price,
      description: property.description,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      property_type: property.property_type,
      for_type: property.for_type,
      features: property.features,
      custom_features: property.custom_features,
      image: property.image,
      status: property.status,
      is_featured: property.is_featured,
      featured_image1: property.featured_image1,
      featured_image2: property.featured_image2
    };
    setNewProperty(editProperty);
    setEditingProperty(property);
    setPropertyImagePreview(typeof property.image === 'string' ? property.image : null);
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = async (id: number) => {
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteProperty(id);
      toast({ title: "Property Deleted", description: "Property has been removed." });
      await fetchProperties();
    } catch (error: any) {
      console.error('Delete property error:', error);

      // If the API doesn't support deletion, provide a fallback
      if (error.message?.includes('not supported') || error.message?.includes('Method') || error.message?.includes('405')) {
        // Remove from local state as fallback
        setProperties(prevProperties => prevProperties.filter(p => p.id !== id));
        toast({
          title: "Property Removed",
          description: "Property removed from display (API deletion not supported)",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to delete property",
          variant: "destructive"
        });
      }
    }
  };

  const handleTogglePropertyStatus = async (id: number) => {
    try {
      const property = properties.find(p => p.id === id);
      if (property) {
        await togglePropertyStatus(id, property.status);
        toast({ title: "Status Updated", description: "Property status has been changed." });
        await fetchProperties();
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update status", variant: "destructive" });
    }
  };

  const handleViewProperty = (property: PropertyDisplay) => {
    setViewingProperty(property);
    setShowViewPropertyDialog(true);
  };

  const handlePropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPropertyImagePreview(reader.result);
          setNewProperty({ ...newProperty, image: file });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPropertyImagePreview(null);
      setNewProperty({ ...newProperty, image: null });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('listings')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'listings' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Properties</span>
            <span className="sm:hidden">Listings</span>
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'pending' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Properties For Sale</span>
            <span className="sm:hidden">For Sale</span>
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('projects')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'projects' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Trophy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Projects</span>
            <span className="sm:hidden">Projects</span>
          </Button>
          
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'contacts' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact Messages</span>
            <span className="sm:hidden">Contacts</span>
          </Button>
          <Button
            variant={activeTab === 'service-requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('service-requests')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'service-requests' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Service Requests</span>
            <span className="sm:hidden">Requests</span>
          </Button>
        </div>

        {/* All Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Property Listings</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => { setNewProperty(initialNewPropertyState); setEditingProperty(null); setPropertyImagePreview(null); setShowPropertyDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90" >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add Property</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border">
                      {/* Property Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={typeof property.image === 'string' ? property.image : '/api/placeholder/400/300'}
                          alt={property.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                        {/* Featured Badge */}
                        {property.is_featured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Featured
                            </span>
                          </div>
                        )}
                        {/* Listing Type Badge */}
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (property.for_type === 'sale' || (property.for_type as string) === 'buy') ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {((property.for_type as string) === 'sale' || (property.for_type as string) === 'buy') ? 'For Sale' : 'For Rent'}
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-5">
                        {/* Title and Price */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{property.name}</h3>
                          <p className="text-2xl font-bold text-indigo-600">{property.price}</p>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm line-clamp-1">{property.address}</span>
                        </div>

                        {/* Property Stats */}
                        <div className="flex items-center justify-between mb-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            </svg>
                            <span className="text-sm font-medium">{property.bedrooms} beds</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <span className="text-sm font-medium">{property.bathrooms} baths</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-sm font-medium">{property.area} sq ft</span>
                          </div>
                        </div>

                        {/* Property Type */}
                        <div className="mb-4">
                          <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                            {property.property_type}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProperty(property)}
                            className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProperty(property)}
                            className="flex-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {properties.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <Home className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Properties Found</h3>
                    <p className="text-gray-600 mb-4">Get started by adding your first property listing.</p>
                    <Button onClick={() => setShowPropertyDialog(true)} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Property
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Property Dialog */}
        <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="property-dialog-description">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
            </DialogHeader>
            <div id="property-dialog-description" className="sr-only">
              {editingProperty ? 'Edit existing property details' : 'Add a new property listing with all required information'}
            </div>
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Property Name *</Label>
                    <Input
                      id="name"
                      value={newProperty.name}
                      onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                      placeholder="e.g., Modern Downtown Apartment"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={newProperty.address}
                      onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                      placeholder="Full property address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) || 0 })}
                      placeholder="450000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sq ft) *</Label>
                    <Input
                      id="area"
                      type="number"
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({ ...newProperty, area: Number(e.target.value) || 0 })}
                      placeholder="1200"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Property Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="0"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bathrooms: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select
                      value={newProperty.property_type}
                      onValueChange={(value: string) => {
                        console.log('🔍 Select onValueChange property_type:', value, 'Type:', typeof value);
                        setNewProperty({ ...newProperty, property_type: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="for-type">Listing Type</Label>
                    <Select
                      value={newProperty.for_type}
                      onValueChange={(value: 'sale' | 'rent') => {
                        console.log('🔍 Select onValueChange for_type:', value, 'Type:', typeof value);
                        setNewProperty({ ...newProperty, for_type: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProperty.status || 'active'}
                      onValueChange={(value: 'active' | 'inactive') => setNewProperty({ ...newProperty, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={newProperty.is_featured}
                      onChange={(e) => setNewProperty({ ...newProperty, is_featured: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="is_featured" className="text-sm font-medium">
                      Featured Property
                    </Label>
                  </div>
                </div>
              </div>
              {/* Features Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Features</h3>
                {/* Available Features
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">Available Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {availableFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`feature-${feature.id}`}
                          checked={newProperty.features.includes(feature.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewProperty({
                                ...newProperty,
                                features: [...newProperty.features, feature.id]
                              });
                            } else {
                              setNewProperty({
                                ...newProperty,
                                features: newProperty.features.filter(id => id !== feature.id)
                              });
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`feature-${feature.id}`} className="text-sm">
                          {feature.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Custom Features */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Custom Features</Label>
                  <div className="space-y-2">
                    {(newProperty.custom_features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const updatedFeatures = [...(newProperty.custom_features || [])];
                            updatedFeatures[index] = e.target.value;
                            setNewProperty({ ...newProperty, custom_features: updatedFeatures });
                          }}
                          placeholder="e.g., Swimming Pool, Garden"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const updatedFeatures = (newProperty.custom_features || []).filter((_, i) => i !== index);
                            setNewProperty({ ...newProperty, custom_features: updatedFeatures });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updatedFeatures = [...(newProperty.custom_features || []), ""];
                        setNewProperty({ ...newProperty, custom_features: updatedFeatures });
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Custom Feature
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Description</h3>
                <Textarea
                  id="description"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                  placeholder="Describe the property in detail, including unique selling points, nearby amenities, etc."
                  className="min-h-[100px]"
                />
              </div>
              {/* Images Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Images</h3>

                {/* Main Image */}
                <div className="mb-4">
                  <Label htmlFor="main-image" className="text-sm font-medium mb-2 block">Main Image</Label>
                  <Input
                    id="main-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewProperty({ ...newProperty, image: file });
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPropertyImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-2"
                  />
                  {(propertyImagePreview || (typeof newProperty.image === 'string' && newProperty.image)) && (
                    <div className="mt-2">
                      <img
                        src={propertyImagePreview || (typeof newProperty.image === 'string' ? newProperty.image : '')}
                        alt="Main property preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Featured Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="featured-image1" className="text-sm font-medium mb-2 block">Featured Image 1</Label>
                    <Input
                      id="featured-image1"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewProperty({ ...newProperty, featured_image1: file });
                        }
                      }}
                      className="mb-2"
                    />
                    {newProperty.featured_image1 && (
                      <div className="mt-2">
                        <img
                          src={newProperty.featured_image1 instanceof File ? URL.createObjectURL(newProperty.featured_image1) : newProperty.featured_image1}
                          alt="Featured image 1 preview"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="featured-image2" className="text-sm font-medium mb-2 block">Featured Image 2</Label>
                    <Input
                      id="featured-image2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewProperty({ ...newProperty, featured_image2: file });
                        }
                      }}
                      className="mb-2"
                    />
                    {newProperty.featured_image2 && (
                      <div className="mt-2">
                        <img
                          src={newProperty.featured_image2 instanceof File ? URL.createObjectURL(newProperty.featured_image2) : newProperty.featured_image2}
                          alt="Featured image 2 preview"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowPropertyDialog(false);
                    setEditingProperty(null);
                    setNewProperty(initialNewPropertyState);
                    setPropertyImagePreview(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateProperty}
                  className="flex-1 bg-[#006d4e] text-white hover:bg-[#006d4e]/90"
                >
                  {editingProperty ? 'Update Property' : 'Add Property'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Property Dialog */}
        <Dialog open={showViewPropertyDialog} onOpenChange={setShowViewPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto" aria-describedby="view-property-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Property Details</DialogTitle>
            </DialogHeader>
            <div id="view-property-description" className="sr-only">
              Detailed view of the selected property with all information and features displayed in a beautiful card format
            </div>
            {viewingProperty && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
                {/* Property Images Section */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Image */}
                    {viewingProperty.image && (
                      <div className="md:col-span-2">
                        <img
                          src={typeof viewingProperty.image === 'string' ? viewingProperty.image : undefined}
                          alt={viewingProperty.name}
                          className="w-full h-80 object-cover rounded-xl shadow-md"
                        />
                      </div>
                    )}
                    {/* Featured Images */}
                    <div className="space-y-4">
                      {viewingProperty.featured_image1 && (
                        <img
                          src={typeof viewingProperty.featured_image1 === 'string' ? viewingProperty.featured_image1 : undefined}
                          alt="Featured view 1"
                          className="w-full h-36 object-cover rounded-lg shadow-sm"
                        />
                      )}
                      {viewingProperty.featured_image2 && (
                        <img
                          src={typeof viewingProperty.featured_image2 === 'string' ? viewingProperty.featured_image2 : undefined}
                          alt="Featured view 2"
                          className="w-full h-36 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-800">{viewingProperty.name}</h3>
                    {viewingProperty.is_featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-2xl text-indigo-600 font-bold">{viewingProperty.price}</p>
                  <p className="text-gray-600 mt-1">📍 {viewingProperty.address}</p>
                </div>

                {/* Property Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Basic Info */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                      </svg>
                      Property Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                          </svg>
                          Property Type:
                        </span>
                        <span className="font-medium text-gray-800 capitalize">{viewingProperty.property_type}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          Listing Type:
                        </span>
                        <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                          ((viewingProperty.for_type as string) === 'sale' || (viewingProperty.for_type as string) === 'buy') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {((viewingProperty.for_type as string) === 'sale' || (viewingProperty.for_type as string) === 'buy') ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          Area:
                        </span>
                        <span className="font-medium text-gray-800">{viewingProperty.area} sq ft</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Status:
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          viewingProperty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {viewingProperty.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Room Details */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      Room Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Bedrooms</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">{viewingProperty.bedrooms}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">Bathrooms</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-600">{viewingProperty.bathrooms}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* In Property Details dialog, display features if any */}
                {viewingProperty && viewingProperty.feature_names && viewingProperty.feature_names.length > 0 && (
                  <div>
                    <h4 className="font-semibold mt-4">Features:</h4>
                    <ul className="list-disc pl-5">
                      {viewingProperty.feature_names.map((name, index) => <li key={index}>{name}</li>)}
                    </ul>
                  </div>
                )}
                {viewingProperty && viewingProperty.description && (
                  <div>
                    <Label className="font-semibold">Description</Label>
                    <p className="text-gray-700">{viewingProperty.description}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Properties For Sale Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Properties For Sale</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                {/* Sell Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border">
                      {/* Property Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={typeof item.image === 'string' ? item.image : '/api/placeholder/400/300'}
                          alt={item.propert_title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {/* Property Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.property_type === 'apartment' ? 'bg-purple-100 text-purple-800' :
                            item.property_type === 'house' ? 'bg-blue-100 text-blue-800' :
                            item.property_type === 'commercial' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.property_type}
                          </span>
                        </div>
                        {/* Seller Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            For Sale
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-5">
                        {/* Title and Price */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{item.propert_title}</h3>
                          <p className="text-2xl font-bold text-indigo-600">रू {item.property_price}</p>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm line-clamp-1">{item.property_location}</span>
                        </div>

                        {/* Property Stats */}
                        <div className="flex items-center justify-between mb-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            </svg>
                            <span className="text-sm font-medium">{item.no_of_bedrooms || 0} beds</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <span className="text-sm font-medium">{item.no_of_bathrooms || 0} baths</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-sm font-medium">{item.area} sq ft</span>
                          </div>
                        </div>

                        {/* Contact Info Preview */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm text-gray-600">{item.phone_no}</span>
                          </div>
                        </div>

                        {/* Description Preview */}
                        {item.description && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSellItem(item)}
                            className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSellItem(item.id!)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {sellItems.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Property Listings Found</h3>
                    <p className="text-gray-600 mb-4">Property listings submitted by users will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Pending Property Dialog */}
        <Dialog open={showViewPendingDialog} onOpenChange={setShowViewPendingDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="view-pending-property-description">
            <DialogHeader>
              <DialogTitle>Pending Property Details</DialogTitle>
            </DialogHeader>
            <div id="view-pending-property-description" className="sr-only">
              Detailed view of the pending property submission with all information
            </div>
            {viewingPendingProperty && (
              <div className="space-y-4">
                <img src={viewingPendingProperty.image} alt={viewingPendingProperty.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingPendingProperty.title}</h3>
                <p className="text-lg text-gray-700">Price: {viewingPendingProperty.price}</p>
                <p className="text-gray-700">{viewingPendingProperty.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingPendingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700">{viewingPendingProperty.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bedrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingPendingProperty.sqft}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Name</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Email</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactEmail}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactPhone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingPendingProperty.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        viewingPendingProperty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''
                      }`}
                    >
                      {viewingPendingProperty.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Completed Projects</h2>
              <Button onClick={() => { setNewProject({ proj_name: "", location: "", completed_date: null, start_date: null, proj_type: "", client_name: "", proj_area: "", proj_duration: "", professionals: 0, proj_budget: 0, features: [], challenges: [], outcomes: [], image_urls: [], description: "", proj_status: "Planning", end_date: null }); setProjectImages([]); setEditingProject(null); setShowProjectDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {project.image_urls && project.image_urls.length > 0 ? (
                          <img
                            src={getAbsoluteImageUrl(project.image_urls[0])}
                            alt={project.proj_name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              console.log('Image failed to load:', project.image_urls?.[0]);
                              console.log('Attempted URL:', getAbsoluteImageUrl(project.image_urls?.[0] || ''));
                              e.currentTarget.src = '/api/placeholder/400/300';
                            }}
                          />
                        ) : (
                          /* No Image Placeholder */
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-xs text-gray-500">No Image</p>
                            </div>
                          </div>
                        )}
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.proj_status === 'Completed' ? 'bg-green-100 text-green-800' :
                            project.proj_status === 'Under Construction' ? 'bg-blue-100 text-blue-800' :
                            project.proj_status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                            project.proj_status === 'On Hold' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {project.proj_status}
                          </span>
                        </div>
                        {/* Project Type Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.proj_type === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                            project.proj_type === 'Residential' ? 'bg-blue-100 text-blue-800' :
                            project.proj_type === 'Industrial' ? 'bg-gray-100 text-gray-800' :
                            'bg-indigo-100 text-indigo-800'
                          }`}>
                            {project.proj_type}
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-5">
                        {/* Title and Budget */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{project.proj_name}</h3>
                          {project.proj_budget > 0 && (
                            <p className="text-xl font-bold text-indigo-600">${project.proj_budget.toLocaleString()}</p>
                          )}
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm line-clamp-1">{project.location}</span>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-xs text-gray-500">Client</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">{project.client_name}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              <span className="text-xs text-gray-500">Area</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800">{project.proj_area}</p>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">
                              {project.proj_duration}
                              {project.completed_date && (
                                <span className="text-green-600 ml-2">• Completed {project.completed_date}</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Team Size */}
                        {project.professionals > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="text-sm">{project.professionals} professionals</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProject(project)}
                            className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProject(project)}
                            className="flex-1 text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Projects Found</h3>
                    <p className="text-gray-600 mb-4">Get started by adding your first project.</p>
                    <Button onClick={() => setShowProjectDialog(true)} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add/Edit Project Dialog */}
        <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
          <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto" aria-describedby="project-dialog-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div id="project-dialog-description" className="sr-only">
              {editingProject ? 'Edit existing project details' : 'Add a new project with all required information'}
            </div>
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={newProject.proj_name}
                      onChange={(e) => setNewProject({ ...newProject, proj_name: e.target.value })}
                      placeholder="e.g., Grand Commercial Complex"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectLocation">Location *</Label>
                    <Input
                      id="projectLocation"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="e.g., Downtown Financial District"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client">Client Name *</Label>
                    <Input
                      id="client"
                      value={newProject.client_name}
                      onChange={(e) => setNewProject({ ...newProject, client_name: e.target.value })}
                      placeholder="e.g., Metro Corporation"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Project Area *</Label>
                    <Input
                      id="size"
                      value={newProject.proj_area}
                      onChange={(e) => setNewProject({ ...newProject, proj_area: e.target.value })}
                      placeholder="e.g., 250,000 sq ft or 150 units"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Project Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={newProject.proj_type}
                      onValueChange={(value) => setNewProject({ ...newProject, proj_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="projectStatus">Project Status *</Label>
                    <Select
                      value={newProject.proj_status}
                      onValueChange={(value) => setNewProject({ ...newProject, proj_status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Under Construction">Under Construction</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      value={newProject.proj_duration}
                      onChange={(e) => setNewProject({ ...newProject, proj_duration: e.target.value })}
                      placeholder="e.g., 24 months"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="professionals">Number of Professionals</Label>
                    <Input
                      id="professionals"
                      type="number"
                      min="0"
                      value={newProject.professionals}
                      onChange={(e) => setNewProject({ ...newProject, professionals: Number(e.target.value) || 0 })}
                      placeholder="e.g., 15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      min="0"
                      value={newProject.proj_budget}
                      onChange={(e) => {
                        const value = Number(e.target.value) || 0;
                        setNewProject({ ...newProject, proj_budget: value });
                      }}
                      placeholder="e.g., 500000"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.start_date || ""}
                      onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value || null })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.end_date || ""}
                      onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value || null })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="completedDate">Completed Date</Label>
                    <Input
                      id="completedDate"
                      type="date"
                      value={newProject.completed_date || ""}
                      onChange={(e) => setNewProject({ ...newProject, completed_date: e.target.value || null })}
                    />
                  </div>
                </div>
              </div>

              {/* Project Features Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Features</h3>

                {/* Key Features */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">Key Features</Label>
                  <div className="space-y-2">
                    {newProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const updatedFeatures = [...newProject.features];
                            updatedFeatures[index] = e.target.value;
                            setNewProject({ ...newProject, features: updatedFeatures });
                          }}
                          placeholder="e.g., Modern design, Energy efficient"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setNewProject({ ...newProject, features: newProject.features.filter((_, i) => i !== index) });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewProject({ ...newProject, features: [...newProject.features, ""] })}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Feature
                    </Button>
                  </div>
                </div>

                {/* Challenges */}
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-2 block">Challenges Faced</Label>
                  <div className="space-y-2">
                    {newProject.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={challenge}
                          onChange={(e) => {
                            const updatedChallenges = [...newProject.challenges];
                            updatedChallenges[index] = e.target.value;
                            setNewProject({ ...newProject, challenges: updatedChallenges });
                          }}
                          placeholder="e.g., Tight deadline, Material sourcing"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setNewProject({ ...newProject, challenges: newProject.challenges.filter((_, i) => i !== index) });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewProject({ ...newProject, challenges: [...newProject.challenges, ""] })}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Challenge
                    </Button>
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Project Outcomes</Label>
                  <div className="space-y-2">
                    {newProject.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={outcome}
                          onChange={(e) => {
                            const updatedOutcomes = [...newProject.outcomes];
                            updatedOutcomes[index] = e.target.value;
                            setNewProject({ ...newProject, outcomes: updatedOutcomes });
                          }}
                          placeholder="e.g., Delivered on time, High client satisfaction"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setNewProject({ ...newProject, outcomes: newProject.outcomes.filter((_, i) => i !== index) });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewProject({ ...newProject, outcomes: [...newProject.outcomes, ""] })}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Outcome
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Images Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Images</h3>
                <div className="mb-4">
                  <Label htmlFor="projectImages" className="text-sm font-medium mb-2 block">Upload Images (Minimum 3 required)</Label>
                  <Input
                    id="projectImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-500">Upload high-quality images showcasing different aspects of the project</p>
                </div>

                {projectImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {projectImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Project ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border shadow-sm"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {projectImages.length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">No images uploaded yet</p>
                    <p className="text-sm text-gray-400">Click "Choose Files" above to add project images</p>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Description</h3>
                <Textarea
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Provide a detailed description of the project, including objectives, scope, unique aspects, and any other relevant information..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProjectDialog(false);
                  setEditingProject(null);
                  setNewProject({
                    proj_name: "",
                    location: "",
                    proj_area: "",
                    proj_type: "Commercial",
                    proj_status: "Planning",
                    proj_duration: "",
                    professionals: 0,
                    proj_budget: 0,
                    completed_date: null,
                    client_name: "",
                    start_date: null,
                    end_date: null,
                    description: "",
                    features: [],
                    challenges: [],
                    outcomes: [],
                    image_urls: []
                  });
                  setProjectImages([]);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePreviewProject}
                className="bg-blue-600 text-white hover:bg-blue-600/90"
                disabled={projectImages.length < 3}
              >
                Preview Project
              </Button>
              <Button
                onClick={handleAddOrUpdateProject}
                className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90"
                disabled={projectImages.length < 3}
              >
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>

            {projectImages.length < 3 && (
              <div className="text-center mt-2">
                <p className="text-sm text-red-600">
                  Please upload at least 3 images to continue
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Project Preview Dialog */}
        <Dialog open={showProjectPreviewDialog} onOpenChange={setShowProjectPreviewDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="project-preview-description">
            <DialogHeader>
              <DialogTitle>Project Preview</DialogTitle>
            </DialogHeader>
            <div id="project-preview-description" className="sr-only">
              Preview of the project before saving with all details and images
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{newProject.proj_name || 'Untitled Project'}</h3>
              <p className="text-gray-700"><strong>Location:</strong> {newProject.location}</p>
              <p className="text-gray-700"><strong>Project Start Date:</strong> {newProject.start_date}</p>
              <p className="text-gray-700"><strong>Completed Date:</strong> {newProject.completed_date}</p>
              <p className="text-gray-700"><strong>Project Type:</strong> {newProject.proj_type}</p>
              <p className="text-gray-700"><strong>Client:</strong> {newProject.client_name}</p>
              <p className="text-gray-700"><strong>Size:</strong> {newProject.proj_area}</p>
              <p className="text-gray-700"><strong>Duration:</strong> {newProject.proj_duration}</p>
              <p className="text-gray-700"><strong>No of Professionals:</strong> {newProject.professionals}</p>
              <p className="text-gray-700"><strong>Budget:</strong> {newProject.proj_budget}</p>
              <p className="text-gray-700"><strong>Status:</strong> {newProject.proj_status}</p>

              <div>
                <h4 className="font-semibold mt-4">Key Features:</h4>
                <ul className="list-disc pl-5">
                  {newProject.features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mt-4">Challenges:</h4>
                <ul className="list-disc pl-5">
                  {newProject.challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mt-4">Outcomes:</h4>
                <ul className="list-disc pl-5">
                  {newProject.outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mt-4">Project Images:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {projectImages.map((img, index) => (
                    <img key={index} src={img} alt={`Project Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                  ))}
                </div>
              </div>
              {newProject.description && (
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="text-gray-700">{newProject.description}</p>
                </div>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => { setShowProjectPreviewDialog(false); setShowProjectDialog(true); }}>
                Back to Edit
              </Button>
              <Button onClick={handleAddOrUpdateProject} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Sell Item Dialog */}
        <Dialog open={showViewSellItemDialog} onOpenChange={setShowViewSellItemDialog}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="view-sell-item-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Property For Sale Details</DialogTitle>
            </DialogHeader>
            <div id="view-sell-item-description" className="sr-only">
              Detailed view of the property for sale with all submitted information displayed in a beautiful card format
            </div>
            {viewingSellItem && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
                {/* Property Image */}
                {viewingSellItem.image && (
                  <div className="mb-6">
                    <img
                      src={viewingSellItem.image instanceof File ? URL.createObjectURL(viewingSellItem.image) : viewingSellItem.image}
                      alt={viewingSellItem.propert_title}
                      className="w-full h-80 object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}

                {/* Property Title */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{viewingSellItem.propert_title}</h3>
                  <p className="text-2xl text-indigo-600 font-semibold">रू {viewingSellItem.property_price?.toLocaleString()}</p>
                </div>

                {/* Property Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Property Info */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Property Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-800">{viewingSellItem.property_location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-800 capitalize">{viewingSellItem.property_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium text-gray-800">{viewingSellItem.no_of_bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium text-gray-800">{viewingSellItem.no_of_bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium text-gray-800">{viewingSellItem.area} sq ft</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Contact Info */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-800">{viewingSellItem.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-blue-600">{viewingSellItem.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium text-green-600">{viewingSellItem.phone_no}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {viewingSellItem.description && (
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{viewingSellItem.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => window.open(`mailto:${viewingSellItem.email}`, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </button>
                  <button
                    onClick={() => window.open(`tel:${viewingSellItem.phone_no}`, '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </button>
                </div>

                {/* Features Section */}
                {viewingProperty && (viewingProperty.feature_names?.length > 0 || viewingProperty.custom_features?.length > 0) && (
                  <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Property Features
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {viewingProperty.feature_names?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {viewingProperty.custom_features?.map((feature, index) => (
                        <div key={`custom-${index}`} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Section */}
                {viewingProperty && viewingProperty.description && (
                  <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{viewingProperty.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {viewingProperty && (
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => { handleEditProperty(viewingProperty); setShowViewPropertyDialog(false); }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                    >
                      <Edit className="w-5 h-5" />
                      Edit Property
                    </Button>
                    <Button
                      onClick={() => handleTogglePropertyStatus(viewingProperty.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2 ${
                        viewingProperty.status === 'active'
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                      {viewingProperty.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      onClick={() => handleDeleteProperty(viewingProperty.id)}
                      variant="destructive"
                      className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Project Dialog */}
        <Dialog open={showViewProjectDialog} onOpenChange={setShowViewProjectDialog}>
          <DialogContent className="w-[95vw] max-w-6xl max-h-[90vh] overflow-y-auto" aria-describedby="view-project-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Project Details</DialogTitle>
            </DialogHeader>
            <div id="view-project-description" className="sr-only">
              Detailed view of the selected project with all information and images displayed in a beautiful card format
            </div>
            {viewingProject && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
                {/* Project Images Gallery */}
                <div className="mb-6">
                  {Array.isArray(viewingProject.image_urls) && viewingProject.image_urls.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {viewingProject.image_urls.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={getAbsoluteImageUrl(img)}
                            alt={`${viewingProject.proj_name} - Image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              console.log('Project image failed to load:', img);
                              console.log('Attempted URL:', getAbsoluteImageUrl(img));
                              e.currentTarget.src = '/api/placeholder/400/300';
                            }}
                          />
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            Image {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* No Images Placeholder */
                    <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">No Project Images</h4>
                      <p className="text-gray-500">Images for this project haven't been uploaded yet.</p>
                      <div className="mt-4 text-sm text-gray-400">
                        <p>Debug Info: image_urls = {JSON.stringify(viewingProject.image_urls)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-800">{viewingProject.proj_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      viewingProject.proj_status === 'Completed' ? 'bg-green-100 text-green-800' :
                      viewingProject.proj_status === 'Under Construction' ? 'bg-blue-100 text-blue-800' :
                      viewingProject.proj_status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      viewingProject.proj_status === 'On Hold' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingProject.proj_status}
                    </span>
                  </div>
                  {viewingProject.proj_budget > 0 && (
                    <p className="text-2xl text-indigo-600 font-bold">${viewingProject.proj_budget.toLocaleString()}</p>
                  )}
                  <p className="text-gray-600 mt-1">📍 {viewingProject.location}</p>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Basic Info */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                      </svg>
                      Project Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Project Type:</span>
                        <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                          viewingProject.proj_type === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                          viewingProject.proj_type === 'Residential' ? 'bg-blue-100 text-blue-800' :
                          viewingProject.proj_type === 'Industrial' ? 'bg-gray-100 text-gray-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          {viewingProject.proj_type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Client:</span>
                        <span className="font-medium text-gray-800">{viewingProject.client_name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Project Area:</span>
                        <span className="font-medium text-gray-800">{viewingProject.proj_area}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-800">{viewingProject.proj_duration}</span>
                      </div>
                      {viewingProject.professionals > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Team Size:</span>
                          <span className="font-medium text-gray-800">{viewingProject.professionals} professionals</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Timeline */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Project Timeline
                    </h4>
                    <div className="space-y-3">
                      {viewingProject.start_date && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-medium text-gray-800">{new Date(viewingProject.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {viewingProject.end_date && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">End Date:</span>
                          <span className="font-medium text-gray-800">{new Date(viewingProject.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {viewingProject.completed_date && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium text-green-600">{new Date(viewingProject.completed_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features, Challenges, Outcomes */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {/* Features */}
                  {Array.isArray(viewingProject.features) && viewingProject.features.length > 0 && (
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {viewingProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges */}
                  {Array.isArray(viewingProject.challenges) && viewingProject.challenges.length > 0 && (
                    <div className="bg-white rounded-lg p-5 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Challenges
                      </h4>
                      <ul className="space-y-2">
                        {viewingProject.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-sm text-gray-700">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Outcomes */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Project Outcomes
                    </h4>
                    {Array.isArray(viewingProject.outcomes) && viewingProject.outcomes.length > 0 ? (
                      <ul className="space-y-2">
                        {viewingProject.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-sm">No outcomes recorded yet</p>
                        <div className="mt-2 text-xs text-gray-400">
                          <p>Debug: outcomes = {JSON.stringify(viewingProject.outcomes)}</p>
                          <p>Type: {typeof viewingProject.outcomes}</p>
                          <p>Is Array: {Array.isArray(viewingProject.outcomes) ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {viewingProject.description && (
                  <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Project Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{viewingProject.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => { handleEditProject(viewingProject!); setShowViewProjectDialog(false); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <Edit className="w-5 h-5" />
                    Edit Project
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                        handleDeleteProject(viewingProject!.id);
                        setShowViewProjectDialog(false);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Project
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => { handleEditProject(viewingProject!); setShowViewProjectDialog(false); }} variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Edit Project
              </Button>
              <Button onClick={() => { handleDeleteProject(viewingProject!.id); setShowViewProjectDialog(false); }} variant="destructive">
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Contact Messages</h2>
              <div className="text-sm text-gray-600">
                {contacts.length} message{contacts.length !== 1 ? 's' : ''}
              </div>
            </div>

            {loadingContacts ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d4e]"></div>
                <span className="ml-3 text-gray-600">Loading messages...</span>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-xl p-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Contact Messages</h3>
                  <p className="text-gray-500">No messages have been received yet.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contacts.map((contact) => {
                  // Map ContactMessageData to ContactMessage for rendering
                  const mappedContact: ContactMessage = {
                    id: contact.id ?? 0,
                    name: contact.name,
                    email: contact.email,
                    subject: contact.subject,
                    message: contact.message,
                    date: contact.created_at ?? '',
                    isRead: (contact as any).isRead ?? false
                  };

                  return (
                    <Card key={mappedContact.id} className={`transition-all duration-200 hover:shadow-lg ${!mappedContact.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : 'hover:shadow-md'}`}>
                      <CardContent className="p-6">
                        {/* Header with status indicator */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {mappedContact.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{mappedContact.name}</h3>
                              <p className="text-sm text-gray-600">{mappedContact.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!mappedContact.isRead && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                            <span className="text-xs text-gray-500">
                              {mappedContact.date ? new Date(mappedContact.date).toLocaleDateString() : 'No date'}
                            </span>
                          </div>
                        </div>

                        {/* Subject */}
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">Subject:</h4>
                          <p className="text-sm text-gray-700 line-clamp-1">{mappedContact.subject}</p>
                        </div>

                        {/* Message Preview */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">Message:</h4>
                          <p className="text-sm text-gray-600 line-clamp-3">{mappedContact.message}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                          <Button
                            onClick={() => handleViewContact(mappedContact)}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Button>
                          <Button
                            onClick={() => window.location.href = `mailto:${mappedContact.email}`}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Reply
                          </Button>
                          <Button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
                                handleDeleteContact(mappedContact.id);
                              }
                            }}
                            variant="destructive"
                            size="sm"
                            className="text-xs"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* View Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="view-contact-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Contact Message Details</DialogTitle>
            </DialogHeader>
            <div id="view-contact-description" className="sr-only">
              Detailed view of the contact message with sender information and message content displayed in a beautiful card format
            </div>
            {viewingContact && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
                {/* Header with sender info */}
                <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {viewingContact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{viewingContact.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{viewingContact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{viewingContact.date ? new Date(viewingContact.date).toLocaleString() : 'No date'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {!viewingContact.isRead ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="3" />
                          </svg>
                          New Message
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Subject
                  </h4>
                  <p className="text-gray-700 font-medium">{viewingContact.subject}</p>
                </div>

                {/* Message */}
                <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingContact.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {!viewingContact.isRead && (
                    <Button
                      onClick={() => { handleMarkContactAsRead(viewingContact.id); setShowContactDialog(false); }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    onClick={() => window.location.href = `mailto:${viewingContact.email}?subject=Re: ${viewingContact.subject}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Reply via Email
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
                        handleDeleteContact(viewingContact.id);
                        setShowContactDialog(false);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Service Requests Tab */}
        {activeTab === 'service-requests' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Service Requests</h2>
              <div className="text-sm text-gray-600">
                {serviceRequests.length} request{serviceRequests.length !== 1 ? 's' : ''}
              </div>
            </div>

            {serviceRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-xl p-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Service Requests</h3>
                  <p className="text-gray-500">No service requests have been submitted yet.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {serviceRequests.map((request) => (
                  <Card key={request.id} className={`transition-all duration-200 hover:shadow-lg ${!request.isRead ? 'border-l-4 border-l-orange-500 bg-orange-50/30' : 'hover:shadow-md'}`}>
                    <CardContent className="p-6">
                      {/* Header with urgency and status */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {request.service_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{request.service_name}</h3>
                            <p className="text-sm text-gray-600">{request.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {!request.isRead && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              New
                            </span>
                          )}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.Service_urgency === 'High' ? 'bg-red-100 text-red-800' :
                            request.Service_urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.Service_urgency || 'Normal'} Priority
                          </span>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Service:</span>
                          <span className="text-sm text-gray-600">{request.service_type}</span>
                        </div>

                        {request.projectType && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Project:</span>
                            <span className="text-sm text-gray-600">{request.projectType}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Phone:</span>
                          <span className="text-sm text-gray-600">{request.phone_no}</span>
                        </div>

                        {request.budget && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Budget:</span>
                            <span className="text-sm text-gray-600">{request.budget}</span>
                          </div>
                        )}

                        {request.preffered_date && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Preferred Date:</span>
                            <span className="text-sm text-gray-600">{new Date(request.preffered_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Description Preview */}
                      {request.description && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Description:</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                        </div>
                      )}

                      {/* Submission Date */}
                      <div className="text-xs text-gray-500 mb-4">
                        Submitted: {new Date(request.created_at).toLocaleDateString()} at {new Date(request.created_at).toLocaleTimeString()}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <Button
                          onClick={() => handleViewServiceRequest(request)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => window.location.href = `tel:${request.phone_no}`}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        {!request.isRead && (
                          <Button
                            onClick={() => handleMarkServiceRequestAsRead(request.id)}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <MailCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this service request? This action cannot be undone.')) {
                              handleDeleteServiceRequest(request.id);
                            }
                          }}
                          variant="destructive"
                          size="sm"
                          className="text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View Service Request Dialog */}
        <Dialog open={showViewServiceRequestDialog} onOpenChange={setShowViewServiceRequestDialog}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="view-service-request-description">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">Service Request Details</DialogTitle>
            </DialogHeader>
            <div id="view-service-request-description" className="sr-only">
              Detailed view of the service request with client information and service details displayed in a beautiful card format
            </div>
            {viewingServiceRequest && (
              <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 shadow-lg">
                {/* Header with client info and urgency */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {viewingServiceRequest.service_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{viewingServiceRequest.service_name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{viewingServiceRequest.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{viewingServiceRequest.phone_no}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          viewingServiceRequest.Service_urgency === 'High' ? 'bg-red-100 text-red-800' :
                          viewingServiceRequest.Service_urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {viewingServiceRequest.Service_urgency || 'Normal'} Priority
                        </span>
                        {!viewingServiceRequest.isRead ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="3" />
                            </svg>
                            New Request
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Reviewed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Submitted on {new Date(viewingServiceRequest.created_at).toLocaleDateString()} at {new Date(viewingServiceRequest.created_at).toLocaleTimeString()}
                  </div>
                </div>

                {/* Service Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left Column - Service Info */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m4 0h1" />
                      </svg>
                      Service Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Service Type:</span>
                        <span className="font-medium px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                          {viewingServiceRequest.service_type}
                        </span>
                      </div>
                      {viewingServiceRequest.projectType && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Project Type:</span>
                          <span className="font-medium text-gray-800">{viewingServiceRequest.projectType}</span>
                        </div>
                      )}
                      {viewingServiceRequest.budget && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium text-green-600">{viewingServiceRequest.budget}</span>
                        </div>
                      )}
                      {viewingServiceRequest.timeline && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-medium text-gray-800">{viewingServiceRequest.timeline}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Project Details */}
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Project Details
                    </h4>
                    <div className="space-y-3">
                      {viewingServiceRequest.location && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium text-gray-800">{viewingServiceRequest.location}</span>
                        </div>
                      )}
                      {viewingServiceRequest.address && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600">Address:</span>
                          <span className="font-medium text-gray-800 text-right max-w-xs">{viewingServiceRequest.address}</span>
                        </div>
                      )}
                      {viewingServiceRequest.preffered_date && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Preferred Date:</span>
                          <span className="font-medium text-indigo-600">{new Date(viewingServiceRequest.preffered_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {viewingServiceRequest.description && (
                  <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Request Description
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{viewingServiceRequest.description}</p>
                    </div>
                  </div>
                )}

                {/* Images */}
                {viewingServiceRequest.imag && (
                  <div className="bg-white rounded-lg p-5 shadow-sm mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Attached Images
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="relative group">
                        <img
                          src={
                            viewingServiceRequest.imag instanceof File
                              ? URL.createObjectURL(viewingServiceRequest.imag)
                              : viewingServiceRequest.imag
                          }
                          alt="Service Request Image"
                          className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {!viewingServiceRequest.isRead && (
                    <Button
                      onClick={() => { handleMarkServiceRequestAsRead(viewingServiceRequest.id); setShowViewServiceRequestDialog(false); }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    onClick={() => window.location.href = `tel:${viewingServiceRequest.phone_no}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Client
                  </Button>
                  <Button
                    onClick={() => window.location.href = `mailto:${viewingServiceRequest.email}?subject=Re: Your Service Request`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Client
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this service request? This action cannot be undone.')) {
                        handleDeleteServiceRequest(viewingServiceRequest.id);
                        setShowViewServiceRequestDialog(false);
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Request
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;