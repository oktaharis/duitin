
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useExpenses, Expense } from "@/hooks/useExpenses";
import { formatCurrency } from "@/utils/currency";
import { toast } from "sonner";

interface DeleteExpenseDialogProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteExpenseDialog = ({ expense, open, onOpenChange }: DeleteExpenseDialogProps) => {
  const { deleteExpense } = useExpenses();

  const handleDelete = async () => {
    if (!expense) return;

    try {
      await deleteExpense.mutateAsync(expense.id);
      onOpenChange(false);
      toast.success("Pengeluaran berhasil dihapus!", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Gagal menghapus pengeluaran", {
        duration: 2000,
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pengeluaran</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus pengeluaran ini?
            {expense && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(expense.amount)} • {new Date(expense.date).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
            <span className="text-destructive font-medium">
              Tindakan ini tidak dapat dibatalkan.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteExpense.isPending}
          >
            {deleteExpense.isPending ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
