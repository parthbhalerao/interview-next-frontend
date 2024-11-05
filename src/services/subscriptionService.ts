import { api } from '@/services/api';

export interface SubscriptionPlan {
  id: string;
  title: string;
  price: string;
  interval: 'month' | 'year';
  description: string[];
  features: string[];
  buttonText: string;
  buttonVariant: 'outlined' | 'contained';
  buttonColor: 'primary' | 'secondary';
  recommended?: boolean;
  subheader?: string;
}

export const subscriptionService = {
  async getPlans() {
    try {
      const { data } = await api.get('/subscriptions/plans/');
      return data.map((plan: any) => ({
        id: plan.id.toString(),
        title: plan.name,
        price: plan.prices[0]?.price.toString() || '0',
        interval: plan.prices[0]?.interval || 'month',
        description: plan.features ? plan.features.split('\n').filter(Boolean).map((f: string) => f.trim()) : [],
        features: plan.features ? plan.features.split('\n').filter(Boolean).map((f: string) => f.trim()) : [],
        buttonText: 'Subscribe',
        buttonVariant: plan.featured ? 'contained' : 'outlined',
        buttonColor: 'primary',
        recommended: plan.featured,
        subheader: plan.subtitle
      }));
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  },

  async getCurrentSubscription() {
    try {
      const { data } = await api.get('/subscriptions/me/');
      return data;
    } catch (error) {
      console.error('Error fetching current subscription:', error);
      throw error;
    }
  },

  async createCheckoutSession(priceId: string) {
    try {
      const { data } = await api.post(`/checkout/${priceId}`);
      return data.checkout_url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  async subscribe(planId: string) {
    try {
      const checkoutUrl = await this.createCheckoutSession(planId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return true;
      }
      throw new Error('No checkout URL received');
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      throw error;
    }
  }
}; 