// src/services/contact.ts

import api from "./api";  // your axios instance

export interface ContactMessageData {
  id?: number; // optional for create
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string; // optional, usually returned by API
}


export const submitContactMessage = async (
  data: ContactMessageData
): Promise<any> => {
  try {
    const response = await api.post("/messages/create/", data);
    return response.data;
  } catch (error: any) {
    // Throw the backend error message or a generic one
    throw error.response?.data || "Failed to send contact message.";
  }
};

// Create a new contact message
export const createContactMessage = async (
  data: ContactMessageData
): Promise<ContactMessageData> => {
  try {
    const response = await api.post("/messages/create/", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to create contact message.";
  }
};

// List all contact messages
export const listContactMessages = async (): Promise<ContactMessageData[]> => {
  try {
    const response = await api.get("/messages/");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch contact messages.";
  }
};

// Retrieve detail of one contact message by ID
export const getContactMessage = async (
  id: number
): Promise<ContactMessageData> => {
  try {
    const response = await api.get(`/messages/${id}/`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Failed to fetch contact message detail.";
  }
};

// Delete a contact message by ID
export const deleteContactMessage = async (id: number): Promise<void> => {
  try {
    await api.delete(`/messages/${id}/delete/`);
  } catch (error: any) {
    throw error.response?.data || "Failed to delete contact message.";
  }
};
