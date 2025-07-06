
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface NotificationSettings {
  id: string;
  user_id: string;
  daily_reminder: boolean;
  reminder_time: string;
  push_notifications: boolean;
  weekly_summary: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateNotificationData {
  daily_reminder?: boolean;
  reminder_time?: string;
  push_notifications?: boolean;
  weekly_summary?: boolean;
}

export const useNotificationSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['notification_settings', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const updateSettings = useMutation({
    mutationFn: async (updateData: UpdateNotificationData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('notification_settings')
        .update(updateData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification_settings'] });
      toast.success('Pengaturan notifikasi berhasil diperbarui!');
    },
    onError: (error) => {
      console.error('Error updating notification settings:', error);
      toast.error('Gagal memperbarui pengaturan notifikasi');
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSettings,
  };
};

// Created by DevOktaharis
