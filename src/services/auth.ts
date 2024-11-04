// frontend/src/services/auth.ts
import axios from 'axios';
import { api } from './api';

interface LoginResponse {
  message: string;
  tokens: {
    access: string;
    refresh: string;
  }
}

interface LoginCredentials {
  username_or_email: string;
  password: string;
}

export const authService = {
  async login(username_or_email: string, password: string): Promise<LoginResponse> {
    try {
      const credentials: LoginCredentials = {
        username_or_email,
        password
      };
      
      const { data } = await api.post<LoginResponse>('/auth/login/', credentials);
      
      // Store both tokens
      localStorage.setItem('accessToken', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
      
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
      throw error;
    }
  },

  async register(username: string, email: string, password: string) {
    try {
      const { data } = await api.post('/auth/register/', {
        username: username,
        email: email,
        password: password,
      });
      localStorage.setItem('token', data.tokens.access);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error details:', error.response?.data);
        throw new Error(error.response?.data?.detail || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  },

  async getProfile() {
    try {
      const { data } = await api.get('/user/profile');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Failed to fetch profile');
      }
      throw new Error('Failed to fetch profile');
    }
  },

  async logout() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }
      
      await api.post('/auth/logout/', null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  }
};