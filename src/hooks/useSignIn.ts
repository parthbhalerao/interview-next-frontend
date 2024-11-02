import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface SignInFormData {
  email: string;
  password: string;
}
export const useSignIn = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSignIn = async (formData: SignInFormData) => {
      console.log('Attempting sign in with:', formData);
      setIsLoading(true);
      setError(null);
  
      try {
        await login(formData.email, formData.password);
        console.log('Sign in successful');
        router.push('/dashboard'); // Redirect after successful login
        return true;
      } catch (err) {
        console.error('Sign in error:', err);
        setError(err instanceof Error ? err.message : 'Failed to sign in');
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleGoogleSignIn = async () => {
      setError(null);
      // Implement Google sign-in logic here
      alert('Google sign-in to be implemented');
    };
  
    const handleLinkedInSignIn = async () => {
      setError(null);
      // Implement LinkedIn sign-in logic here
      alert('LinkedIn sign-in to be implemented');
    };
  
    return {
      handleSignIn,
      handleGoogleSignIn,
      handleLinkedInSignIn,
      isLoading,
      error,
    };
  };