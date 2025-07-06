
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { checkOnboardingStatus, initializeNewUser } from '@/utils/userInitialization';

export const useOnboardingStatus = () => {
  const { user, loading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const initializeAndCheckOnboarding = async () => {
      if (!user || loading) {
        setHasCompletedOnboarding(null);
        return;
      }

      try {
        setIsInitializing(true);
        
        // Initialize user if needed (for Google login users)
        await initializeNewUser(
          user.id, 
          user.email || '', 
          user.user_metadata?.full_name || user.user_metadata?.name
        );

        // Check onboarding status
        const completed = await checkOnboardingStatus(user.id);
        setHasCompletedOnboarding(completed);
      } catch (error) {
        console.error('Error in onboarding check:', error);
        setHasCompletedOnboarding(false);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAndCheckOnboarding();
  }, [user, loading]);

  return {
    hasCompletedOnboarding,
    isInitializing,
    needsOnboarding: hasCompletedOnboarding === false,
  };
};
