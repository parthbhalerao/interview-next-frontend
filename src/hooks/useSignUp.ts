import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

export const useSignUp = () => {
    const { register } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (formData: SignUpFormData) => {
        console.log('Attempting to sign up with:', formData);
        setIsLoading(true);
        setError(null);
        try {
            await register(formData.name, formData.email, formData.password);
            console.log('Sign up successful');
            router.push('/dashboard');
            return true;
        } catch (error) {
            console.error('Sign up error:', error);
            setError('Failed to sign up');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        handleSignUp, 
        isLoading, 
        error 
    };
};