/**
 * HTTP Request Client
 * Axios-based request handler with interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/apiConfig';

interface RequestOptions extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
}

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(
                `${API_CONFIG.BASE_URL}/auth/refresh`,
                { refreshToken }
              );
              const { token } = response.data;
              localStorage.setItem('token', token);
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, options);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, options);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, options);
    return response.data;
  }

  async delete<T = any>(url: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, options);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, options);
    return response.data;
  }

  async upload<T = any>(
    url: string,
    file: File | Blob,
    onProgress?: (percent: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse<T> = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });

    return response.data;
  }
}

export const httpClient = new HttpClient();