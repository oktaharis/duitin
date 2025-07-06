
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Hide sidebar trigger on mobile */}
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
        <h1 className="text-lg md:text-xl font-semibold">💰 CatatUang</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home/notifications")}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home/profile")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
