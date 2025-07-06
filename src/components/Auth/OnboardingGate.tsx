
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingGateProps {
  children: React.ReactNode;
}

export const OnboardingGate = ({ children }: OnboardingGateProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const { hasCompletedOnboarding, isInitializing } = useOnboardingStatus();

  useEffect(() => {
    // Don't redirect if we're already on onboarding page or auth is loading
    if (location.pathname === '/onboarding' || authLoading || isInitializing) {
      return;
    }

    // If onboarding is not completed, redirect to onboarding
    if (hasCompletedOnboarding === false) {
      console.log('User needs onboarding, redirecting...');
      navigate('/onboarding', { replace: true });
    }
  }, [hasCompletedOnboarding, authLoading, isInitializing, location.pathname, navigate]);

  // Show loading while checking onboarding status
  if (authLoading || isInitializing || hasCompletedOnboarding === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user needs onboarding and we're not on onboarding page, don't render children
  if (hasCompletedOnboarding === false && location.pathname !== '/onboarding') {
    return null;
  }

  return <>{children}</>;
};
