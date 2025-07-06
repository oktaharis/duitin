
import { NavLink } from "react-router-dom";
import { FolderOpen, BarChart3, Download, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const menuItems = [
    { title: "Kategori", url: "/home/categories", icon: FolderOpen },
    { title: "Statistik", url: "/home/statistics", icon: BarChart3 },
    { title: "Export Data", url: "/home/export", icon: Download },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[40vh]">
        <DrawerHeader className="text-center">
          <DrawerTitle>Menu Tambahan</DrawerTitle>
          <DrawerClose asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 pb-6">
          <div className="grid gap-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
