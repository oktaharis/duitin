
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface DeleteCategoryDialogProps {
  category: any;
  onClose: () => void;
}

export const DeleteCategoryDialog = ({ category, onClose }: DeleteCategoryDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteCategory } = useCategories();
  const { expenses } = useExpenses();

  const expensesUsingCategory = expenses.filter(expense => expense.category_id === category.id);
  const hasExpenses = expensesUsingCategory.length > 0;

  const handleDelete = async () => {
    if (hasExpenses) {
      toast.error("Tidak dapat menghapus kategori yang masih digunakan");
      return;
    }

    setIsDeleting(true);
    
    try {
      await deleteCategory.mutateAsync(category.id);
      toast.success("Kategori berhasil dihapus!");
      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Gagal menghapus kategori");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Hapus Kategori
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus kategori "{category.name}"?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {hasExpenses && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                Kategori tidak dapat dihapus
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Kategori ini masih digunakan oleh {expensesUsingCategory.length} pengeluaran. 
                Hapus atau ubah kategori pengeluaran tersebut terlebih dahulu.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || hasExpenses}
              className="flex-1"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
