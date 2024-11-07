'use client';

import * as React from 'react';
import InterviewRoom from '@/features/interview/components/InterviewRoom';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function InterviewRoomPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return null;
  }

  return <InterviewRoom interviewId={parseInt(params.id, 10)} />;
} 