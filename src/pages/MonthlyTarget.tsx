
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useMonthlyTarget } from "@/hooks/useMonthlyTarget";
import { useExpenses } from "@/hooks/useExpenses";
import { useState } from "react";
import { Edit, Save, X } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const MonthlyTarget = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const { monthlyTarget, upsertMonthlyTarget } = useMonthlyTarget(currentMonth, currentYear);
  const { expenses } = useExpenses();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState('');
  
  const targetAmount = monthlyTarget?.target_amount || 2000000;
  
  // Calculate monthly spent from expenses
  const monthlySpent = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth - 1 && 
             expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const percentage = (monthlySpent / targetAmount) * 100;
  const isOverBudget = percentage > 100;
  const remaining = targetAmount - monthlySpent;

  const handleEdit = () => {
    setTempTarget(targetAmount.toString());
    setIsEditing(true);
  };

  const handleSave = () => {
    const newTarget = parseInt(tempTarget);
    if (newTarget > 0) {
      upsertMonthlyTarget.mutate({
        target_amount: newTarget,
        month: currentMonth,
        year: currentYear,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempTarget(targetAmount.toString());
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Target Bulanan</h1>
      
      {/* Target Setting */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg md:text-xl">Pengaturan Target</CardTitle>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
                className="w-full sm:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Target
              </Button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" onClick={handleSave} disabled={upsertMonthlyTarget.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="target">Target Bulanan (Rp)</Label>
                <Input
                  id="target"
                  type="number"
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  placeholder="Masukkan target bulanan"
                />
              </div>
            </div>
          ) : (
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {formatCurrency(targetAmount)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Progress Bulan Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Sisa Budget</p>
              <p className={`text-xl font-bold ${
                remaining >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(Math.abs(remaining))}
                {remaining < 0 && ' (Over)'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hari Tersisa</p>
              <p className="text-xl font-bold text-blue-600">
                {new Date(currentYear, currentMonth, 0).getDate() - new Date().getDate()} hari
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips Mengatur Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Tentukan target yang realistis berdasarkan pendapatan</li>
            <li>• Pantau pengeluaran harian secara rutin</li>
            <li>• Prioritaskan kebutuhan dibanding keinginan</li>
            <li>• Sisihkan 20% untuk tabungan/investasi</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyTarget;
