
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface MonthlyTarget {
  id: string;
  user_id: string;
  target_amount: number;
  month: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface CreateMonthlyTargetData {
  target_amount: number;
  month: number;
  year: number;
}

export const useMonthlyTarget = (month?: number, year?: number) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const currentMonth = month || new Date().getMonth() + 1;
  const currentYear = year || new Date().getFullYear();

  const { data: monthlyTarget, isLoading, error } = useQuery({
    queryKey: ['monthlyTarget', user?.id, currentMonth, currentYear],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('monthly_targets')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const upsertMonthlyTarget = useMutation({
    mutationFn: async (targetData: CreateMonthlyTargetData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('monthly_targets')
        .upsert([{
          ...targetData,
          user_id: user.id,
        }], {
          onConflict: 'user_id,month,year'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyTarget'] });
      toast.success('Target bulanan berhasil disimpan!');
    },
    onError: (error) => {
      console.error('Error saving monthly target:', error);
      toast.error('Gagal menyimpan target bulanan');
    },
  });

  return {
    monthlyTarget,
    isLoading,
    error,
    upsertMonthlyTarget,
  };
};
