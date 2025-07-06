import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "@/components/AddExpense/CategorySelector";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useExpenses, Expense } from "@/hooks/useExpenses";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.string().min(1, "Jumlah harus diisi").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Jumlah harus berupa angka positif"
  ),
  description: z.string().min(1, "Deskripsi harus diisi"),
  category_id: z.string().optional(),
  date: z.date(),
});

interface EditExpenseDialogProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditExpenseDialog = ({ expense, open, onOpenChange }: EditExpenseDialogProps) => {
  const { updateExpense } = useExpenses();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: expense?.amount.toString() || "",
      description: expense?.description || "",
      category_id: expense?.category_id || "",
      date: expense ? new Date(expense.date) : new Date(),
    },
  });

  // Reset form when expense changes
  useEffect(() => {
    if (expense) {
      form.reset({
        amount: expense.amount.toString(),
        description: expense.description,
        category_id: expense.category_id || "",
        date: new Date(expense.date),
      });
    }
  }, [expense, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!expense) return;

    try {
      await updateExpense.mutateAsync({
        id: expense.id,
        data: {
          amount: Number(values.amount),
          description: values.description,
          category_id: values.category_id || undefined,
          date: format(values.date, "yyyy-MM-dd"),
        },
      });

      onOpenChange(false);
      toast.success("Pengeluaran berhasil diperbarui!", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Gagal memperbarui pengeluaran", {
        duration: 2000,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pengeluaran</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (Rp)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="50000"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Beli makan siang..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori (Opsional)</FormLabel>
                  <FormControl>
                    <CategorySelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={updateExpense.isPending}
              >
                {updateExpense.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
