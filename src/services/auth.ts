// frontend/src/services/auth.ts
import axios from 'axios';
import { api } from './api';

export const authService = {
  async login(username_or_email: string, password: string) {
    try {
      const { data } = await api.post('/auth/login/', { 
        username_or_email: username_or_email, 
        password: password });
      localStorage.setItem('token', data.tokens.access);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Login failed');
      }
      throw new Error('Login failed');
    }
  },

  async register(username: string, email: string, password: string) {
    try {
      const { data } = await api.post('/auth/register/', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', data.tokens.access);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  },

  async getProfile() {
    try {
      const { data } = await api.get('/user/profile');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch profile');
    }
  },

  logout() {
    localStorage.removeItem('token');
  }
};