
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useExpenses } from "@/hooks/useExpenses";
import { useCategories } from "@/hooks/useCategories";
import { formatCurrency } from "@/utils/currency";
import { useMemo } from "react";

interface StatisticsChartsProps {
  timePeriod: string;
}

export const StatisticsCharts = ({ timePeriod }: StatisticsChartsProps) => {
  const { expenses } = useExpenses();
  const { categories } = useCategories();

  const filteredExpenses = useMemo(() => {
    if (!timePeriod || timePeriod === 'all') return expenses;
    
    const now = new Date();
    const startDate = new Date();
    
    switch (timePeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return expenses;
    }
    
    return expenses.filter(expense => new Date(expense.date) >= startDate);
  }, [expenses, timePeriod]);

  // Data untuk pie chart kategori
  const categoryData = useMemo(() => {
    const categoryTotals = categories.map(category => {
      const total = filteredExpenses
        .filter(expense => expense.category_id === category.id)
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        name: category.name,
        value: total,
        color: category.color,
      };
    }).filter(item => item.value > 0);

    // Add uncategorized expenses
    const uncategorizedTotal = filteredExpenses
      .filter(expense => !expense.category_id)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (uncategorizedTotal > 0) {
      categoryTotals.push({
        name: 'Tanpa Kategori',
        value: uncategorizedTotal,
        color: '#6B7280',
      });
    }

    return categoryTotals;
  }, [filteredExpenses, categories]);

  // Data untuk bar chart trend mingguan
  const weeklyTrendData = useMemo(() => {
    const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const dailyTotals = new Array(7).fill(0);
    
    filteredExpenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const dayOfWeek = expenseDate.getDay();
      dailyTotals[dayOfWeek] += expense.amount;
    });

    return weekDays.map((day, index) => ({
      day,
      amount: dailyTotals[index],
    }));
  }, [filteredExpenses]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p style={{ color: data.color }}>
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grafik Kategori</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              Belum ada data pengeluaran untuk periode: {timePeriod}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tren Pengeluaran Mingguan</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              Belum ada data untuk menampilkan tren
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Grafik Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Tidak ada data kategori
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tren Pengeluaran Mingguan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Created by DevOktaharis
