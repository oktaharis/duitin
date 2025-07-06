
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileData {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  created_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, created_at')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setError('Failed to load profile data');
          return;
        }

        setProfile({
          ...data,
          email: user.email || '',
        });
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast.success('Profil berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Gagal memperbarui profil');
      throw error;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
