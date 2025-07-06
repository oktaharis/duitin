
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { AvatarUpload } from "./AvatarUpload";
import { Edit, Save, X } from "lucide-react";

export const ProfileInfo = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: "",
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Memuat profil...</div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">Gagal memuat profil</div>
        </CardContent>
      </Card>
    );
  }

  const handleStartEdit = () => {
    setEditData({
      full_name: profile.full_name || "",
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ full_name: "" });
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: editData.full_name.trim() || null,
      });
      setIsEditing(false);
    } catch (error) {
      // Error already handled in useProfile
    }
  };

  const handleAvatarChange = async (url: string) => {
    try {
      await updateProfile({ avatar_url: url });
    } catch (error) {
      // Error already handled in useProfile
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Informasi Profil</CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleStartEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <AvatarUpload
          currentAvatarUrl={profile.avatar_url}
          onAvatarChange={handleAvatarChange}
          displayName={profile.full_name || profile.email}
        />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Lengkap</Label>
            {isEditing ? (
              <Input
                value={editData.full_name}
                onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Masukkan nama lengkap"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {profile.full_name || 'Belum diisi'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
          
          <div className="space-y-2">
            <Label>Bergabung Sejak</Label>
            <p className="text-sm text-muted-foreground">
              {new Date(profile.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
