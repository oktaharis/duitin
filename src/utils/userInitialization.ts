
import { supabase } from '@/integrations/supabase/client';

export const initializeNewUser = async (userId: string, email: string, fullName?: string) => {
  try {
    console.log('Initializing new user:', userId, email);

    // Check if user already has profile
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          full_name: fullName || email.split('@')[0],
        }]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }
    }

    // Check if user already has notification_settings
    const { data: existingSettings } = await supabase
      .from('notification_settings')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!existingSettings) {
      // Create notification settings
      const { error: notifError } = await supabase
        .from('notification_settings')
        .insert([{
          user_id: userId,
          daily_reminder: false,
          weekly_summary: true,
          push_notifications: true,
          reminder_time: '20:00:00',
        }]);

      if (notifError) {
        console.error('Error creating notification settings:', notifError);
        throw notifError;
      }
    }

    console.log('User initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize user:', error);
    return false;
  }
};

export const checkOnboardingStatus = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_onboarding')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking onboarding status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Failed to check onboarding status:', error);
    return false;
  }
};
