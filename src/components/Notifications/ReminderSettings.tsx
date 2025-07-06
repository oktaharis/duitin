
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Bell } from "lucide-react";
import { toast } from "sonner";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

export const ReminderSettings = () => {
  const { settings, isLoading, updateSettings } = useNotificationSettings();
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("15:00");
  const [weeklyReminder, setWeeklyReminder] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Update local state when settings are loaded
  useEffect(() => {
    if (settings) {
      setReminderEnabled(settings.daily_reminder);
      setReminderTime(settings.reminder_time);
      setWeeklyReminder(settings.weekly_summary);
      setPushNotifications(settings.push_notifications);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings.mutateAsync({
        daily_reminder: reminderEnabled,
        reminder_time: reminderTime,
        weekly_summary: weeklyReminder,
        push_notifications: pushNotifications,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Test Pengingat CatatUang", {
        body: "Jangan lupa catat pengeluaran hari ini! 💰",
        icon: "/favicon.ico"
      });
      toast.success("Test notifikasi berhasil dikirim!");
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Test Pengingat CatatUang", {
            body: "Jangan lupa catat pengeluaran hari ini! 💰",
            icon: "/favicon.ico"
          });
          toast.success("Test notifikasi berhasil dikirim!");
        } else {
          toast.error("Izin notifikasi ditolak");
        }
      });
    } else {
      toast.error("Izin notifikasi belum diberikan");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pengaturan Pengingat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            Memuat pengaturan...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pengaturan Pengingat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications" className="text-base font-medium">
              Notifikasi Push
            </Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan notifikasi push dari aplikasi
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="daily-reminder" className="text-base font-medium">
              Pengingat Harian
            </Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan pengingat untuk mencatat pengeluaran
            </p>
          </div>
          <Switch
            id="daily-reminder"
            checked={reminderEnabled}
            onCheckedChange={setReminderEnabled}
          />
        </div>

        {reminderEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="reminder-time">Waktu Pengingat (WIB)</Label>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Waktu saat ini: {reminderTime} WIB
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reminder" className="text-sm font-medium">
                  Pengingat Mingguan
                </Label>
                <p className="text-xs text-muted-foreground">
                  Ringkasan pengeluaran mingguan setiap Minggu
                </p>
              </div>
              <Switch
                id="weekly-reminder"
                checked={weeklyReminder}
                onCheckedChange={setWeeklyReminder}
              />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleSaveSettings} 
            className="flex-1"
            disabled={updateSettings.isPending}
          >
            {updateSettings.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTestNotification}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            Test
          </Button>
        </div>

        {settings && (
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <p><strong>Status:</strong> {reminderEnabled ? 'Aktif' : 'Nonaktif'}</p>
            <p><strong>Terakhir diperbarui:</strong> {new Date(settings.updated_at).toLocaleString('id-ID')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Created by DevOktaharis
