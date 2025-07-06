
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Plus, 
  History, 
  FolderOpen, 
  BarChart3, 
  User, 
  Target, 
  Download,
  Bell
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/home", icon: LayoutDashboard },
  { title: "Tambah Pengeluaran", url: "/home/add-expense", icon: Plus },
  { title: "Riwayat", url: "/home/history", icon: History },
  { title: "Kategori", url: "/home/categories", icon: FolderOpen },
  { title: "Statistik", url: "/home/statistics", icon: BarChart3 },
  { title: "Target Bulanan", url: "/home/target", icon: Target },
  { title: "Export Data", url: "/home/export", icon: Download },
  { title: "Notifikasi", url: "/home/notifications", icon: Bell },
  { title: "Profil", url: "/home/profile", icon: User },
];

export const Sidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarUI className={collapsed ? "w-16" : "w-64"}>
      <SidebarHeader className="p-4">
        <div className={`font-bold text-lg ${collapsed ? "text-center" : ""}`}>
          {collapsed ? "💰" : "💰 CatatUang"}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          linkActive || isActive(item.url)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
};
