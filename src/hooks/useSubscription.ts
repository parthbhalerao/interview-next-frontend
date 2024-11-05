import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService, SubscriptionPlan } from '@/services/subscriptionService';

export const useSubscription = () => {
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getPlans();
      setPlans(data);
    } catch (err) {
      setError('Failed to fetch subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPlan = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getCurrentSubscription();
      setCurrentPlan(data);
    } catch (err) {
      setError('Failed to fetch current subscription');
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId: string) => {
    if (!isAuthenticated) {
      setError('Please login to subscribe');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await subscriptionService.subscribe(planId);
      await fetchCurrentPlan();
    } catch (err) {
      setError('Failed to subscribe to plan');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentPlan();
    }
  }, [isAuthenticated]);

  return {
    plans,
    currentPlan,
    loading,
    error,
    subscribe,
    fetchPlans,
    fetchCurrentPlan,
  };
}; 