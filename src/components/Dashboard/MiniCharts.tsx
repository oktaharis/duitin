
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useExpenses } from "@/hooks/useExpenses";
import { useCategories } from "@/hooks/useCategories";

export const MiniCharts = () => {
  const { expenses } = useExpenses();
  const { categories } = useCategories();

  // Data untuk pie chart kategori
  const categoryData = categories.map(category => ({
    name: category.name,
    value: expenses
      .filter(expense => expense.category_id === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
    color: category.color
  })).filter(item => item.value > 0);

  // Data untuk bar chart mingguan
  const getWeeklyData = () => {
    const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayExpenses = expenses
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === date.toDateString();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);

      weekData.push({
        day: weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1],
        amount: dayExpenses
      });
    }
    
    return weekData;
  };

  const weeklyData = getWeeklyData();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Pengeluaran per Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs">{entry.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              Belum ada data pengeluaran
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Pengeluaran Mingguan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Created by DevOktaharis
