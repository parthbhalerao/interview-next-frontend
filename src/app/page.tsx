'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import MarketingPage from '@/views/landing/MarketingPage';
import { unstable_noStore as noStore } from 'next/cache';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  noStore();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; // You might want to replace this with a proper loading component
  }

  if (isAuthenticated) {
    return null; // Return null while redirecting
  }

  return <MarketingPage />;
}
