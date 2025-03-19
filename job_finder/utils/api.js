import axios from 'axios';
import { getAuthTokens, setAuthTokens, clearAuthTokens } from './auth';
import { router } from 'expo-router';

export const BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Skip auth header for auth-related endpoints
    if (config.url.includes('/login') || config.url.includes('/register')) {
      return config;
    }

    try {
      const { access } = await getAuthTokens();
      if (!access) {
        throw new Error('No access token available');
      }

      // Set auth header
      config.headers.Authorization = `Bearer ${access}`;
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error.message);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh for auth-related endpoints
    if (originalRequest.url.includes('/login') || originalRequest.url.includes('/register')) {
      return Promise.reject(error);
    }

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refresh } = await getAuthTokens();
        if (!refresh) {
          console.error('No refresh token available');
          await clearAuthTokens();
          router.replace('/auth/login');
          return Promise.reject(error);
        }

        // Attempt to refresh token
        const response = await axios.post(`${BASE_URL}/refresh-token/`, 
          { refresh },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data?.access) {
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh || refresh;
          await setAuthTokens(newAccessToken, newRefreshToken);
          
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Retry the original request
          return api(originalRequest);
        }
        
        console.error('No access token in refresh response');
        await clearAuthTokens();
        router.replace('/auth/login');
        return Promise.reject(new Error('Token refresh failed'));
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError.message);
        await clearAuthTokens();
        router.replace('/auth/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
