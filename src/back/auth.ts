// src/back/auth.ts
import api from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface AdminCheckResponse {
  is_admin: boolean;
  username: string;
  is_staff: boolean;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/api/token/', credentials);
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
};

// Check if user is admin
export const checkAdmin = async (token: string): Promise<AdminCheckResponse> => {
  try {
    const response = await api.get('/api/check-admin/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Admin check error:', error);
    throw new Error(error.response?.data?.detail || 'Admin check failed');
  }
};

// Token management
export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

export const clearTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('adminUser');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

// Get admin user info from localStorage
export const getAdminUser = (): any => {
  const adminUser = localStorage.getItem('adminUser');
  return adminUser ? JSON.parse(adminUser) : null;
};

// Set admin user info
export const setAdminUser = (userInfo: any): void => {
  localStorage.setItem('adminUser', JSON.stringify(userInfo));
};

// Logout function
export const logout = (): void => {
  clearTokens();
};

// Refresh token function
export const refreshToken = async (): Promise<string> => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/api/token/refresh/', {
      refresh: refresh
    });

    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
    return newAccessToken;
  } catch (error: any) {
    console.error('Token refresh error:', error);
    clearTokens();
    throw new Error('Token refresh failed');
  }
};
