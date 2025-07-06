
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/hooks/useExpenses";
import { useMonthlyTarget } from "@/hooks/useMonthlyTarget";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const DashboardSummary = () => {
  const { expenses } = useExpenses();
  const { monthlyTarget } = useMonthlyTarget();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const monthlyExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth - 1 && 
             expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const todayExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const today = new Date();
      return expenseDate.toDateString() === today.toDateString();
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const weeklyExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return expenseDate >= weekAgo;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const targetAmount = monthlyTarget?.target_amount || 0;
  const remainingBudget = targetAmount - monthlyExpenses;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold text-red-600">
            {formatCurrency(todayExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">Minggu Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold text-orange-600">
            {formatCurrency(weeklyExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">Bulan Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold text-blue-600">
            {formatCurrency(monthlyExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg md:text-2xl font-bold text-purple-600">
            {formatCurrency(totalExpenses)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs md:text-sm font-medium">Sisa Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-lg md:text-2xl font-bold ${
            remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(Math.abs(remainingBudget))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
