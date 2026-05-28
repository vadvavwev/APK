/**
 * Authentication API Service
 */

import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/apiConfig';

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    role: string;
  };
}

export interface RegisterRequest {
  phone: string;
  password: string;
  name?: string;
}

export const authApi = {
  /**
   * Login with phone and password
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await httpClient.post<LoginResponse>(ENDPOINTS.LOGIN, data);
    return response;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<any> => {
    const response = await httpClient.post<any>(ENDPOINTS.REGISTER, data);
    return response;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    try {
      await httpClient.post(ENDPOINTS.LOGOUT);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    const response = await httpClient.get(ENDPOINTS.USER_PROFILE);
    return response;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: any) => {
    const response = await httpClient.put(ENDPOINTS.USER_UPDATE, data);
    return response;
  },

  /**
   * Upload avatar
   */
  uploadAvatar: async (file: File, onProgress?: (percent: number) => void) => {
    const response = await httpClient.upload<{ avatar: string }>(
      ENDPOINTS.USER_AVATAR,
      file,
      onProgress
    );
    return response;
  },
};