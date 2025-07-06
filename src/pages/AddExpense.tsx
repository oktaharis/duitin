
import { AddExpenseForm } from "@/components/AddExpense/AddExpenseForm";
import { QuickAmountButtons } from "@/components/AddExpense/QuickAmountButtons";
import { useState } from "react";

const AddExpense = () => {
  const [quickAmount, setQuickAmount] = useState<string>("");

  const handleQuickAmountSelect = (amount: string) => {
    setQuickAmount(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Tambah Pengeluaran</h1>
      
      <div className="space-y-4">
        <QuickAmountButtons onAmountSelect={handleQuickAmountSelect} />
        <AddExpenseForm initialAmount={quickAmount} />
      </div>
    </div>
  );
};

export default AddExpense;
