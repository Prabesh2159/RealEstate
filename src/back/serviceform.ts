// servicerequestapi.ts
import api from "./api";

export interface ServiceRequestItem {
  id: number;
  service_name: string;
  phone_no: string;
  email: string;
  address: string;
  service_type: string;
  Service_urgency: string;
  preffered_date: string;
  description: string;
  imag?: File | null;
  created_at: string;
  isRead?: boolean;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
}


export const fetchServiceRequests = async (): Promise<ServiceRequestItem[]> => {
  const response = await api.get("/service-requests/");
  return response.data;
};


export const submitServiceRequest = async (
  formData: FormData
): Promise<ServiceRequestItem> => {
  const response = await api.post("/service-requests/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const deleteServiceRequest = async (id: number): Promise<void> => {
  await api.delete(`/service-requests/${id}/delete/`);
};
