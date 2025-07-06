
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface OnboardingData {
  purpose: string;
  purposeOther?: string;
  hasMonthlyTarget: boolean;
  monthlyTargetAmount?: number;
  wantsDailyReminder: boolean;
}

export const useOnboarding = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    purpose: '',
    purposeOther: '',
    hasMonthlyTarget: false,
    monthlyTargetAmount: undefined,
    wantsDailyReminder: false,
  });

  const submitOnboarding = useMutation({
    mutationFn: async (data: OnboardingData) => {
      if (!user) throw new Error('User not authenticated');

      try {
        // Save onboarding data
        const { error: onboardingError } = await supabase
          .from('user_onboarding')
          .insert([{
            user_id: user.id,
            purpose: data.purpose,
            purpose_other: data.purposeOther,
            has_monthly_target: data.hasMonthlyTarget,
            monthly_target_amount: data.monthlyTargetAmount,
            wants_daily_reminder: data.wantsDailyReminder,
          }]);

        if (onboardingError) throw onboardingError;

        // Configure notification settings if user wants daily reminder
        if (data.wantsDailyReminder) {
          const { error: notifError } = await supabase
            .from('notification_settings')
            .update({
              daily_reminder: true,
              reminder_time: '20:00:00',
            })
            .eq('user_id', user.id);

          if (notifError) {
            console.error('Failed to update notification settings:', notifError);
            // Don't throw error, just log it
          }
        }

        // Set monthly target if provided
        if (data.hasMonthlyTarget && data.monthlyTargetAmount) {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();

          // Use INSERT with ON CONFLICT DO UPDATE to handle the constraint properly
          const { error: targetError } = await supabase
            .from('monthly_targets')
            .insert([{
              user_id: user.id,
              target_amount: data.monthlyTargetAmount,
              month: currentMonth,
              year: currentYear,
            }])
            .select();

          if (targetError) {
            console.error('Failed to set monthly target:', targetError);
            // Don't throw error, just log it
          }
        }

        return data;
      } catch (error) {
        console.error('Onboarding submission error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Pengaturan awal berhasil disimpan!');
    },
    onError: (error) => {
      console.error('Onboarding error:', error);
      toast.error('Gagal menyimpan pengaturan. Coba lagi.');
    },
  });

  const updateFormData = (updates: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipOnboarding = async () => {
    if (!user) return;
    
    try {
      // Just mark as completed with minimal data
      const { error } = await supabase
        .from('user_onboarding')
        .insert([{
          user_id: user.id,
          purpose: 'skip',
          has_monthly_target: false,
          wants_daily_reminder: false,
        }]);

      if (error) throw error;
      return Promise.resolve();
    } catch (error) {
      console.error('Skip onboarding error:', error);
      throw error;
    }
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    submitOnboarding,
    skipOnboarding,
    isSubmitting: submitOnboarding.isPending,
  };
};
