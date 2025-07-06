
import { StatisticsCharts } from "@/components/Statistics/StatisticsCharts";
import { TimePeriodSelector } from "@/components/Statistics/TimePeriodSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/hooks/useExpenses";
import { formatCurrency } from "@/utils/currency";
import { useState, useMemo } from "react";

const Statistics = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const { expenses, isLoading } = useExpenses();

  // Filter expenses based on selected time period
  const filteredExpenses = useMemo(() => {
    if (!timePeriod || timePeriod === 'all') return expenses;
    
    const now = new Date();
    const startDate = new Date();
    
    switch (timePeriod) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return expenses;
    }
    
    return expenses.filter(expense => new Date(expense.date) >= startDate);
  }, [expenses, timePeriod]);

  // Calculate statistics from filtered data
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const getDaysDifference = () => {
    switch (timePeriod) {
      case 'day': return 1;
      case 'week': return 7;
      case 'month': return 30;
      case 'year': return 365;
      default: return 30;
    }
  };
  
  const avgDaily = filteredExpenses.length > 0 ? totalExpenses / getDaysDifference() : 0;
  const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(e => e.amount)) : 0;
  const transactionCount = filteredExpenses.length;

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Statistik Pengeluaran</h1>
          <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
        </div>
        <div className="text-center py-8">
          Memuat data statistik...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Statistik Pengeluaran</h1>
        <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Rata-rata Harian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-blue-600">
              {formatCurrency(avgDaily)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Pengeluaran Tertinggi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">
              {formatCurrency(highestExpense)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {transactionCount}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {filteredExpenses.length > 0 ? (
        <StatisticsCharts timePeriod={timePeriod} />
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Belum ada data pengeluaran untuk periode: {timePeriod}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Mulai tambahkan pengeluaran untuk melihat statistik
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Statistics;

// Created by DevOktaharis
