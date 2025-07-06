
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Expense {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    icon: string;
    color: string;
  };
}

export interface CreateExpenseData {
  amount: number;
  description: string;
  category_id?: string;
  date?: string;
}

export const useExpenses = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          *,
          categories (
            name,
            icon,
            color
          )
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createExpense = useMutation({
    mutationFn: async (expenseData: CreateExpenseData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('expenses')
        .insert([{
          ...expenseData,
          user_id: user.id,
          date: expenseData.date || new Date().toISOString().split('T')[0],
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Pengeluaran berhasil ditambahkan!', {
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error('Error creating expense:', error);
      toast.error('Gagal menambahkan pengeluaran', {
        duration: 2000,
      });
    },
  });

  const updateExpense = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateExpenseData> }) => {
      const { data: updatedData, error } = await supabase
        .from('expenses')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Pengeluaran berhasil diperbarui!', {
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error('Error updating expense:', error);
      toast.error('Gagal memperbarui pengeluaran', {
        duration: 2000,
      });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Pengeluaran berhasil dihapus!', {
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error('Error deleting expense:', error);
      toast.error('Gagal menghapus pengeluaran', {
        duration: 2000,
      });
    },
  });

  return {
    expenses,
    isLoading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};
