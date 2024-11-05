import { api } from '@/services/api';

export interface Customer {
  id: number;
  init_email: string;
  init_email_confirmed: boolean;
  stripe_id: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const customerService = {
  // Get current customer profile
  async getCurrentCustomer() {
    try {
      const { data } = await api.get<Customer>('/customers/me/');
      return data;
    } catch (error) {
      console.error('Error fetching current customer:', error);
      throw error;
    }
  },
  
  // ADMIN ONLY FUNCTIONS
  // Get specific customer (admin only)
  async getCustomer(customerId: number) {
    try {
      const { data } = await api.get<Customer>(`/customers/${customerId}/`);
      return data;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error);
      throw error;
    }
  },

  // List all customers (admin only)
  async getAllCustomers(search?: string) {
    try {
      const params = search ? { search } : undefined;
      const { data } = await api.get<Customer[]>('/customers/', { params });
      return data;
    } catch (error) {
      console.error('Error fetching all customers:', error);
      throw error;
    }
  }
}; 