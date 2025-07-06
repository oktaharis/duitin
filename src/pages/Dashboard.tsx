
import { DashboardSummary } from "@/components/Dashboard/DashboardSummary";
import { QuickAddButton } from "@/components/Dashboard/QuickAddButton";
import { MiniCharts } from "@/components/Dashboard/MiniCharts";
import { RecentTransactions } from "@/components/Dashboard/RecentTransactions";
import { MonthlyProgress } from "@/components/Dashboard/MonthlyProgress";

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <QuickAddButton />
      </div>
      
      <DashboardSummary />
      <MonthlyProgress />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <MiniCharts />
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
