import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "./CategorySelector";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useExpenses } from "@/hooks/useExpenses";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

const formSchema = z.object({
  amount: z.string().min(1, "Jumlah harus diisi").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Jumlah harus berupa angka positif"
  ),
  description: z.string().min(1, "Deskripsi harus diisi"),
  category_id: z.string().optional(),
  date: z.date(),
});

interface AddExpenseFormProps {
  initialAmount?: string;
}

export const AddExpenseForm = ({ initialAmount }: AddExpenseFormProps) => {
  const { createExpense } = useExpenses();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: initialAmount || "",
      description: "",
      category_id: "",
      date: new Date(),
    },
  });

  useEffect(() => {
    if (initialAmount) {
      form.setValue("amount", initialAmount);
    }
  }, [initialAmount, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createExpense.mutateAsync({
        amount: Number(values.amount),
        description: values.description,
        category_id: values.category_id || undefined,
        date: format(values.date, "yyyy-MM-dd"),
      });

      // Reset form after successful submission
      form.reset({
        amount: "",
        description: "",
        category_id: "",
        date: new Date(),
      });

      // Show success toast with 2 second duration
      toast.success("Pengeluaran berhasil ditambahkan!", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Gagal menambahkan pengeluaran", {
        duration: 2000,
      });
    }
  }

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
                      className="text-base md:text-sm"
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
                      className="resize-none text-base md:text-sm"
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
                            "w-full pl-3 text-left font-normal text-base md:text-sm",
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

            <Button 
              type="submit" 
              className="w-full text-base md:text-sm h-12 md:h-10"
              disabled={createExpense.isPending}
            >
              {createExpense.isPending ? "Menyimpan..." : "Tambah Pengeluaran"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
