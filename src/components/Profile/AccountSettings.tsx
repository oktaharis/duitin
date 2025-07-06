
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { toast } from "sonner";
import { Lock, Bell, LogOut } from "lucide-react";

export const AccountSettings = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Berhasil logout');
      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal logout');
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3"
            onClick={() => setShowPasswordDialog(true)}
          >
            <Lock className="h-4 w-4" />
            Ubah Password
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3"
            onClick={() => navigate("/home/notifications")}
          >
            <Bell className="h-4 w-4" />
            Pengaturan Notifikasi
          </Button>
          
          <Button 
            variant="destructive" 
            className="w-full gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      {showPasswordDialog && (
        <ChangePasswordDialog
          onClose={() => setShowPasswordDialog(false)}
        />
      )}
    </>
  );
};
