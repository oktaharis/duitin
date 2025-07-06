
import { NavLink } from "react-router-dom";
import { Home, History, Target, Menu } from "lucide-react";
import { useState } from "react";
import { MobileDrawer } from "./MobileDrawer";

export const BottomNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const mainNavItems = [
    { title: "Home", url: "/home", icon: Home },
    { title: "Riwayat", url: "/home/history", icon: History },
    { title: "Target", url: "/home/target", icon: Target },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
        <div className="flex items-center justify-around py-2">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </NavLink>
          ))}
          
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
};
