
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExpenses } from "@/hooks/useExpenses";
import { useMonthlyTarget } from "@/hooks/useMonthlyTarget";
import { formatCurrency } from "@/utils/currency";

export const MonthlyProgress = () => {
  const { expenses } = useExpenses();
  const { monthlyTarget } = useMonthlyTarget();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const monthlySpent = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth - 1 && 
             expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const targetAmount = monthlyTarget?.target_amount || 2000000; // Default 2 juta
  const percentage = (monthlySpent / targetAmount) * 100;
  const isOverBudget = percentage > 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progress Target Bulanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Terpakai: {formatCurrency(monthlySpent)}</span>
            <span>Target: {formatCurrency(targetAmount)}</span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className={`h-3 ${isOverBudget ? 'bg-red-100' : ''}`}
          />
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {percentage.toFixed(1)}% dari target
            </span>
            {isOverBudget && (
              <span className="text-xs text-red-600 font-medium">
                Melebihi budget!
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Created by DevOktaharis
