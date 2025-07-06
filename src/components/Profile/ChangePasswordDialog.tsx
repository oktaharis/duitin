
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordDialogProps {
  onClose: () => void;
}

export const ChangePasswordDialog = ({ onClose }: ChangePasswordDialogProps) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      toast.success("Password berhasil diubah!");
      onClose();
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error.message || "Gagal mengubah password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Password</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Password Baru *</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Masukkan password baru"
                required
                disabled={isSubmitting}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                disabled={isSubmitting}
              >
                {showPassword.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Ulangi password baru"
                required
                disabled={isSubmitting}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                disabled={isSubmitting}
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Mengubah..." : "Ubah Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
