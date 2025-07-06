
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OnboardingGate } from "@/components/auth/OnboardingGate";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <OnboardingGate>
        <div className="min-h-screen flex w-full bg-background">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
              <Outlet />
            </main>
          </div>
          
          {/* Mobile Bottom Navigation */}
          <BottomNavigation />
        </div>
      </OnboardingGate>
    </SidebarProvider>
  );
};
