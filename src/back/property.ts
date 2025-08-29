import api from "./api"; // your axios instance with baseURL

// Feature type
export interface Feature {
  id: number;
  name: string;
}

// Property type
export interface Property {
  id?: number;
  name: string;
  address: string;
  price: number;
  description: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  is_featured: boolean;
  property_type: string;
  for_type: 'sale' | 'rent';
  features: number[]; // feature IDs selected
  custom_features?: string[];
  image: string | File | null;
  featured_image1?: string | File | null;
  featured_image2?: string | File | null;
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

// Property List Response
export interface PropertyListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Property[];
}

// Helper function to create form data from property object
const createPropertyFormData = (property: Partial<Property>): FormData => {
  const formData = new FormData();

  console.log('🔍 Creating FormData from property:', property);

  // Append all basic fields
  if (property.name) formData.append('name', property.name);
  if (property.address) formData.append('address', property.address);
  if (property.price !== undefined) formData.append('price', property.price.toString());
  if (property.description) formData.append('description', property.description);
  if (property.area !== undefined) formData.append('area', property.area.toString());
  if (property.bedrooms !== undefined) formData.append('bedrooms', property.bedrooms.toString());
  if (property.bathrooms !== undefined) formData.append('bathrooms', property.bathrooms.toString());
  if (property.is_featured !== undefined) formData.append('is_featured', property.is_featured.toString());

  // Debug property_type and for_type specifically
  console.log('🔍 property_type value:', property.property_type, 'Type:', typeof property.property_type);
  console.log('🔍 for_type value:', property.for_type, 'Type:', typeof property.for_type);

  if (property.property_type) {
    // Ensure it's a string, not an array
    const propertyTypeValue = Array.isArray(property.property_type) ? property.property_type[0] : property.property_type;
    formData.append('property_type', propertyTypeValue);
    console.log('🔍 Added property_type to FormData:', propertyTypeValue);
  }
  if (property.for_type) {
    // Ensure it's a string, not an array
    const forTypeValue = Array.isArray(property.for_type) ? property.for_type[0] : property.for_type;
    formData.append('for_type', forTypeValue);
    console.log('🔍 Added for_type to FormData:', forTypeValue);
  }
  if (property.status) formData.append('status', property.status);

  // Handle features array
  if (property.features && property.features.length > 0) {
    property.features.forEach(id => formData.append('features', id.toString()));
  }

  // Handle custom features
  if (property.custom_features && property.custom_features.length > 0) {
    formData.append('custom_features', JSON.stringify(property.custom_features));
  }

  // Handle image files
  if (property.image instanceof File) {
    formData.append('image', property.image);
  }
  if (property.featured_image1 instanceof File) {
    formData.append('featured_image1', property.featured_image1);
  }
  if (property.featured_image2 instanceof File) {
    formData.append('featured_image2', property.featured_image2);
  }

  // Debug: Log all FormData entries
  console.log('🔍 FormData entries:');
  for (const [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value, 'Type:', typeof value);
  }

  return formData;
};

// List all properties
export async function listProperties(params?: {
  page?: number;
  pageSize?: number;
  status?: 'active' | 'inactive';
  property_type?: string;
  for_type?: 'sale' | 'rent';
}): Promise<PropertyListResponse> {
  try {
    const response = await api.get('/api/properties/', { params });

    // Ensure the response has the expected structure
    if (!response.data) {
      console.warn('API returned empty response');
      return { count: 0, next: null, previous: null, results: [] };
    }

    // If the response is directly an array (not paginated)
    if (Array.isArray(response.data)) {
      return {
        count: response.data.length,
        next: null,
        previous: null,
        results: response.data
      };
    }

    // If the response has the expected paginated structure
    if (response.data.results && Array.isArray(response.data.results)) {
      return response.data;
    }

    // Fallback for unexpected structure
    console.warn('Unexpected API response structure:', response.data);
    return { count: 0, next: null, previous: null, results: [] };

  } catch (error) {
    console.error('Failed to fetch properties', error);
    console.log('Falling back to mock data...');

    // Return mock data as fallback
    const mockProperties: Property[] = [
      {
        id: 1,
        name: "Modern Downtown Apartment",
        address: "123 Main St, Downtown",
        price: 450000,
        description: "Beautiful modern apartment in the heart of downtown",
        area: 1200,
        bedrooms: 2,
        bathrooms: 2,
        is_featured: true,
        property_type: "apartment",
        for_type: "sale",
        features: [1, 2, 3],
        custom_features: ["Balcony", "City View"],
        image: "/api/placeholder/400/300",
        status: "active"
      },
      {
        id: 2,
        name: "Cozy Suburban House",
        address: "456 Oak Ave, Suburbs",
        price: 2500,
        description: "Perfect family home with large backyard",
        area: 1800,
        bedrooms: 3,
        bathrooms: 2,
        is_featured: false,
        property_type: "house",
        for_type: "rent",
        features: [2, 4, 5],
        custom_features: ["Garden", "Garage"],
        image: "/api/placeholder/400/300",
        status: "active"
      }
    ];

    return {
      count: mockProperties.length,
      next: null,
      previous: null,
      results: mockProperties
    };
  }
}

// Get a single property by ID
export async function getProperty(id: number): Promise<Property> {
  try {
    const response = await api.get(`/api/properties/${id}/`);
    if (!response.data) {
      throw new Error(`Property ${id} not found`);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch property ${id}`, error);
    throw new Error(`Failed to fetch property ${id}`);
  }
}

// Create a new property
export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  try {
    // Ensure all string fields are actually strings before creating FormData
    const cleanedProperty = {
      ...property,
      property_type: Array.isArray(property.property_type) ? property.property_type[0] : property.property_type,
      for_type: Array.isArray(property.for_type) ? property.for_type[0] : property.for_type,
    };

    console.log('🔍 Cleaned property before FormData:', cleanedProperty);
    const formData = createPropertyFormData(cleanedProperty);

    // Try different possible endpoints for creation
    let response: any;
    try {
      response = await api.post('/api/properties/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (firstError: any) {
      if (firstError.response?.status === 404) {
        // Try alternative endpoint
        response = await api.post('/api/properties/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        throw firstError;
      }
    }

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    return response.data;
  } catch (error: any) {
    console.error('createProperty error', error);

    // Provide more specific error messages
    if (error.response?.status === 400) {
      const errorMsg = error.response.data?.message || 'Invalid property data';
      throw new Error(errorMsg);
    } else if (error.response?.status === 500) {
      throw new Error('Server error occurred while creating property');
    }

    throw new Error('Failed to create property');
  }
}

// Update an existing property
export async function updateProperty(
  id: number,
  property: Partial<Property>
): Promise<Property> {
  try {
    // Ensure all string fields are actually strings before creating FormData
    const cleanedProperty = {
      ...property,
      property_type: Array.isArray(property.property_type) ? property.property_type[0] : property.property_type,
      for_type: Array.isArray(property.for_type) ? property.for_type[0] : property.for_type,
    };

    console.log('🔍 Cleaned property for update:', cleanedProperty);
    const formData = createPropertyFormData(cleanedProperty);

    // Try the correct update endpoint first
    let response: any;
    try {
      response = await api.put(`/api/properties/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (firstError: any) {
      if (firstError.response?.status === 404 || firstError.response?.status === 405) {
        // Try alternative endpoint structure
        try {
          response = await api.patch(`/api/properties/${id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (secondError: any) {
          // Try PUT on the base endpoint
          response = await api.put(`/api/properties/${id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      } else {
        throw firstError;
      }
    }

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    return response.data;
  } catch (error: any) {
    console.error(`updateProperty error for id ${id}`, error);

    // Provide more specific error messages
    if (error.response?.status === 404) {
      throw new Error(`Property ${id} not found`);
    } else if (error.response?.status === 405) {
      throw new Error('Update method not allowed - check backend configuration');
    } else if (error.response?.status === 400) {
      const errorMsg = error.response.data?.message || 'Invalid property data';
      throw new Error(errorMsg);
    } else if (error.response?.status === 500) {
      throw new Error('Server error occurred while updating property');
    }

    throw new Error('Failed to update property');
  }
}

// Delete a property
export async function deleteProperty(id: number): Promise<void> {
  try {
    // Try different possible endpoints for deletion
    try {
      await api.delete(`/api/properties/${id}/delete/`);
    } catch (firstError: any) {
      if (firstError.response?.status === 404) {
        // Try alternative endpoint
        await api.delete(`/api/properties/delete/${id}/`);
      } else if (firstError.response?.status === 405) {
        // If DELETE method not allowed, try POST with delete action
        await api.post(`/api/properties/${id}/delete/`);
      } else {
        throw firstError;
      }
    }
  } catch (error: any) {
    console.error(`deleteProperty error for id ${id}`, error);

    // If all API methods fail, provide graceful fallback
    if (error.response?.status === 405) {
      throw new Error('Delete operation not supported by the server');
    } else if (error.response?.status === 404) {
      throw new Error(`Property ${id} not found`);
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to delete this property');
    }

    throw new Error('Failed to delete property');
  }
}

// Toggle property status
export async function togglePropertyStatus(id: number, currentStatus: 'active' | 'inactive'): Promise<Property> {
  try {
    const response = await api.patch(`/api/properties/${id}/`, {
      status: currentStatus === 'active' ? 'inactive' : 'active'
    });
    return response.data;
  } catch (error) {
    console.error(`togglePropertyStatus error for id ${id}`, error);
    throw new Error('Failed to toggle property status');
  }
}

// Fetch features list
export async function listFeatures(): Promise<Feature[]> {
  try {
    const response = await api.get('/api/features/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch features', error);
    return [];
  }
}

// Submit form handler wrapper
export async function onSubmitForm(
  property: Omit<Property, 'id'>,
  onSuccess: (data: Property) => void,
  onError: (error: Error) => void
) {
  try {
    const data = await createProperty(property);
    onSuccess(data);
  } catch (error) {
    onError(error as Error);
  }
}
