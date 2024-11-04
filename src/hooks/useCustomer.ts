import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Customer, customerService } from '@/services/customerService';
import axios from 'axios';

export const useCustomer = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCurrentCustomer = async () => {
    if (customer) return customer;
    
    console.log('fetchCurrentCustomer called:', { authLoading, isAuthenticated });
    
    if (authLoading) {
      console.log('Auth is still loading, returning early');
      return;
    }
    
    const token = localStorage.getItem('accessToken');
    console.log('Current auth state:', { isAuthenticated, token });

    if (!isAuthenticated || !token) {
      console.log('No auth or token, setting error');
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getCurrentCustomer();
      console.log('Customer data received:', data);
      setCustomer(data);
      return data;
    } catch (err) {
      console.error('Customer fetch error:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch customer profile');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCustomers = async (search?: string) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await customerService.getAllCustomers(search);
      setCustomers(data);
      return data;
    } catch (err) {
      setError('Failed to fetch customers');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    customer,
    customers,
    loading,
    error,
    fetchCurrentCustomer,
    fetchAllCustomers
  };
};