
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/hooks/useExpenses";
import { formatCurrency } from "@/utils/currency";
import { EditExpenseDialog } from "./EditExpenseDialog";
import { DeleteExpenseDialog } from "./DeleteExpenseDialog";
import { Edit, Trash2 } from "lucide-react";
import type { Expense } from "@/hooks/useExpenses";

interface ExpenseTableProps {
  searchTerm: string;
  selectedCategory: string;
  dateRange: { from: string; to: string };
}

export const ExpenseTable = ({ searchTerm, selectedCategory, dateRange }: ExpenseTableProps) => {
  const { expenses, isLoading } = useExpenses();
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || expense.category_id === selectedCategory;
    
    let matchesDateRange = true;
    if (dateRange.from && dateRange.to) {
      const expenseDate = new Date(expense.date);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      matchesDateRange = expenseDate >= fromDate && expenseDate <= toDate;
    }
    
    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const handleEditClick = (expense: Expense) => {
    setEditExpense(expense);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setDeleteExpense(expense);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Memuat data pengeluaran...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {expenses.length === 0 
                  ? "Belum ada pengeluaran yang tercatat."
                  : "Tidak ada pengeluaran yang sesuai dengan filter."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="border rounded-lg p-3 sm:p-4 space-y-3">
                  {/* Mobile Layout - Stacked */}
                  <div className="block sm:hidden">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-medium text-sm leading-tight">{expense.description}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {expense.categories?.name || 'Tanpa Kategori'}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-red-600 text-sm">
                          {formatCurrency(expense.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(expense)}
                        className="h-7 px-2 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(expense)}
                        className="h-7 px-2 text-xs text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/5"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout - Horizontal */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{expense.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {expense.categories?.name || 'Tanpa Kategori'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          {formatCurrency(expense.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(expense)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(expense)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EditExpenseDialog
        expense={editExpense}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      <DeleteExpenseDialog
        expense={deleteExpense}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
};
