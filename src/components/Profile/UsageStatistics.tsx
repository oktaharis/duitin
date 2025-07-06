
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenses } from "@/hooks/useExpenses";
import { formatCurrency } from "@/utils/currency";

export const UsageStatistics = () => {
  const { expenses, isLoading } = useExpenses();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistik Penggunaan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground">Memuat statistik...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalTransactions = expenses.length;
  
  // Find most used category
  const categoryCount: Record<string, number> = {};
  expenses.forEach(expense => {
    const categoryName = expense.categories?.name || 'Tanpa Kategori';
    categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
  });
  
  const favoriteCategory = Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Belum ada';
  
  // Calculate join date (using oldest expense date as approximation)
  const oldestExpense = expenses.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0];
  const joinDate = oldestExpense 
    ? new Date(oldestExpense.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : 'Baru bergabung';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Penggunaan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Pengeluaran:</span>
          <span className="font-semibold">{formatCurrency(totalExpenses)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Transaksi:</span>
          <span className="font-semibold">{totalTransactions} transaksi</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Kategori Favorit:</span>
          <span className="font-semibold">{favoriteCategory}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bergabung sejak:</span>
          <span className="font-semibold">{joinDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};
