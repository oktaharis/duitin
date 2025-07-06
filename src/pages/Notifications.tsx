
import { NotificationList } from "@/components/Notifications/NotificationList";
import { ReminderSettings } from "@/components/Notifications/ReminderSettings";
import { NotificationPermission } from "@/components/Notifications/NotificationPermission";

const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Notifikasi & Pengingat</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <NotificationPermission />
          <ReminderSettings />
        </div>
        <NotificationList />
      </div>
    </div>
  );
};

export default Notifications;
