import axios from "axios";
import api from "./api"; 


export interface SellFormData {
  id?: number;  // ID from the backend
  name: string;
  email: string;
  phone_no: string;
  propert_title: string;
  property_location: string;
  property_price: string;
  property_type: string;
  no_of_bedrooms?: number;
  no_of_bathrooms?: number;
  area: string;
  description: string;
  image?: string | File | null;  // Can be URL string or File object
}


export const submitSellForm = async (data: SellFormData) => {
  const formData = new FormData();
  
  // Handle each field explicitly to ensure correct formatting
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone_no", data.phone_no);
  formData.append("propert_title", data.propert_title);
  formData.append("property_location", data.property_location);
  formData.append("property_price", data.property_price);
  formData.append("property_type", data.property_type || "");  // Ensure empty string if undefined
  formData.append("description", data.description);

  // Handle optional fields
  if (data.no_of_bedrooms !== undefined) {
    formData.append("no_of_bedrooms", data.no_of_bedrooms.toString());
  }
  if (data.no_of_bathrooms !== undefined) {
    formData.append("no_of_bathrooms", data.no_of_bathrooms.toString());
  }
  if (data.area) {
    formData.append("area", data.area);
  }
  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  try {
    const response = await api.post("/sell/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      // Enhance error message with validation details
      if (error.response.data && error.response.data.property_type) {
        console.error("Property Type Error:", error.response.data.property_type);
      }
    }
    throw error;
  }
};




export const fetchSellItem = (id: number) => {
  return api.get(`/sell/${id}/`);
};

export const deleteSellItem = (id: number) => {
  // Try the correct endpoint pattern as shown in URLconf
  return api.delete(`/sell/${id}/delete/`).catch(error => {
    console.warn(`Failed to delete sell item using /sell/${id}/delete/`, error);
    // Fallback to the old pattern in case the URLconf is wrong
    return api.delete(`/sell/${id}/`);
  });
};

export async function fetchSellList() {
  try {
    const response = await api.get("/sell/");
    return response.data;  // This should be an array of sell items
  } catch (error) {
    console.error("Error fetching sell list:", error);
    // Return empty array as fallback
    return [];
  }
}