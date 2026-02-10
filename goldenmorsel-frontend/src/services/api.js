import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    if (error.response?.status === 429) {
      // Rate limit exceeded
      console.error('Rate limit exceeded. Please try again later.');
    }
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;