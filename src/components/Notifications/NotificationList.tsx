
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, TrendingUp } from "lucide-react";

const notifications = [
  {
    id: "1",
    type: "reminder",
    title: "Pengingat Harian",
    message: "Jangan lupa catat pengeluaran hari ini!",
    time: "15:00",
    date: new Date(),
    read: false,
  },
  {
    id: "2", 
    type: "budget",
    title: "Mendekati Target Bulanan",
    message: "Anda sudah menggunakan 85% dari target bulanan",
    time: "09:30",
    date: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: "3",
    type: "summary",
    title: "Ringkasan Mingguan",
    message: "Total pengeluaran minggu ini: Rp 450.000",
    time: "10:00",
    date: new Date(Date.now() - 172800000),
    read: true,
  },
];

export const NotificationList = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return Bell;
      case "budget":
        return TrendingUp;
      default:
        return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-blue-100 text-blue-800";
      case "budget":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Notifikasi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            
            return (
              <div 
                key={notification.id}
                className={`p-4 border rounded-lg ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    !notification.read ? 'text-blue-600' : 'text-muted-foreground'
                  }`} />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${
                        !notification.read ? 'text-blue-900' : ''
                      }`}>
                        {notification.title}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={getTypeColor(notification.type)}
                      >
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">
                          Baru
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      {notification.date.toLocaleDateString('id-ID')} • {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
