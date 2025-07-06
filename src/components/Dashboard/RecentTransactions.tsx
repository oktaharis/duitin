
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/hooks/useExpenses";
import { useNavigate } from "react-router-dom";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const RecentTransactions = () => {
  const navigate = useNavigate();
  const { expenses } = useExpenses();
  const recentExpenses = expenses.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Transaksi Terbaru</CardTitle>
        <Button variant="outline" onClick={() => navigate("/home/history")}>
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {expense.categories?.name || 'Tanpa Kategori'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">
                    {formatCurrency(expense.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Belum ada transaksi
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
