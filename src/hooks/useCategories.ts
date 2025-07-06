
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  icon: string;
  color: string;
}

export const useCategories = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createCategory = useMutation({
    mutationFn: async (categoryData: CreateCategoryData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('categories')
        .insert([{
          ...categoryData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Kategori berhasil ditambahkan!');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
      toast.error('Gagal menambahkan kategori');
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateCategoryData> }) => {
      const { data: updatedData, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updatedData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Kategori berhasil diperbarui!');
    },
    onError: (error) => {
      console.error('Error updating category:', error);
      toast.error('Gagal memperbarui kategori');
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Kategori berhasil dihapus!');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
      toast.error('Gagal menghapus kategori');
    },
  });

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
