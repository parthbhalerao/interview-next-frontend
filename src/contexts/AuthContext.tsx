import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { authService } from '@/services/auth';
import { customerService } from '@/services/customerService';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username_or_email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          setLoading(true);
          const customerData = await customerService.getCurrentCustomer();
          setUser(customerData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username_or_email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login(username_or_email, password);
      
      // Set user data from the login response
      const customerData = await customerService.getCurrentCustomer();
      setUser(customerData);
      setIsAuthenticated(true);
      
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login error details:', error.response?.data);
        throw new Error(error.response?.data?.error || 'Login failed');
      }
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        username: username,
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear state even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        loading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};