
import { useState } from "react";
import { ExpenseTable } from "@/components/ExpenseHistory/ExpenseTable";
import { ExpenseFilters } from "@/components/ExpenseHistory/ExpenseFilters";
import { ExpenseSearch } from "@/components/ExpenseHistory/ExpenseSearch";

const ExpenseHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Riwayat Pengeluaran</h1>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <ExpenseSearch value={searchTerm} onChange={setSearchTerm} />
        <ExpenseFilters 
          category={selectedCategory}
          onCategoryChange={setSelectedCategory}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>
      
      <ExpenseTable 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        dateRange={dateRange}
      />
    </div>
  );
};

export default ExpenseHistory;
