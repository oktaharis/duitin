
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const NotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Browser tidak mendukung notifikasi");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === "granted") {
      toast.success("Izin notifikasi berhasil diberikan!");
    } else {
      toast.error("Izin notifikasi ditolak");
    }
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case "granted":
        return {
          icon: CheckCircle,
          text: "Notifikasi Diizinkan",
          color: "text-green-600",
          description: "Anda akan menerima pengingat sesuai jadwal"
        };
      case "denied":
        return {
          icon: BellOff,
          text: "Notifikasi Ditolak",
          color: "text-red-600",
          description: "Untuk mengaktifkan, ubah pengaturan di browser"
        };
      default:
        return {
          icon: Bell,
          text: "Belum Diizinkan",
          color: "text-orange-600",
          description: "Klik tombol untuk mengaktifkan notifikasi"
        };
    }
  };

  const status = getPermissionStatus();
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 ${status.color}`} />
          Izin Notifikasi Browser
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className={`font-medium ${status.color}`}>{status.text}</p>
          <p className="text-sm text-muted-foreground">{status.description}</p>
        </div>

        {permission !== "granted" && (
          <Button 
            onClick={requestPermission} 
            className="w-full gap-2"
            disabled={permission === "denied"}
          >
            <Bell className="h-4 w-4" />
            {permission === "denied" ? "Diatur di Pengaturan Browser" : "Aktifkan Notifikasi"}
          </Button>
        )}

        {permission === "denied" && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Untuk mengaktifkan notifikasi:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Klik ikon kunci/info di address bar</li>
              <li>Pilih "Izinkan" untuk Notifikasi</li>
              <li>Refresh halaman ini</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
