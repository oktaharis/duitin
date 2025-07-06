
import { useState } from "react";
import { ExportFilters } from "@/components/ExportData/ExportFilters";
import { DataSummary } from "@/components/ExportData/DataSummary";
import { ExportOptions } from "@/components/ExportData/ExportOptions";
import { EmptyState } from "@/components/ExportData/EmptyState";
import { LoadingState } from "@/components/ExportData/LoadingState";
import { useExportLogic } from "@/hooks/useExportLogic";

const ExportData = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    categoryId: ""
  });

  const {
    expenses,
    categories,
    isLoading,
    filteredExpenses,
    exportToCSV,
    exportToJSON,
    exportToPDF,
    isExporting
  } = useExportLogic(filters);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const allExpenses = expenses || [];
  const filteredTotal = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const grandTotal = allExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  
  const hasAnyData = allExpenses.length > 0;
  const hasFilteredData = filteredExpenses.length > 0;
  const isFiltered = filters.startDate || filters.endDate || filters.categoryId;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Export Data Pengeluaran</h1>
        <p className="text-muted-foreground">
          Ekspor data pengeluaran Anda dalam berbagai format
        </p>
      </div>

      <ExportFilters 
        dateFrom={filters.startDate}
        dateTo={filters.endDate}
        selectedCategory={filters.categoryId}
        categories={categories}
        onDateFromChange={(value) => handleFilterChange({ ...filters, startDate: value })}
        onDateToChange={(value) => handleFilterChange({ ...filters, endDate: value })}
        onCategoryChange={(value) => handleFilterChange({ ...filters, categoryId: value })}
      />

      {!hasAnyData ? (
        <EmptyState hasAnyData={false} isFiltered={false} />
      ) : !hasFilteredData && isFiltered ? (
        <EmptyState hasAnyData={true} isFiltered={true} />
      ) : (
        <>
          <DataSummary
            filteredCount={filteredExpenses.length}
            totalCount={allExpenses.length}
            filteredTotal={filteredTotal}
            grandTotal={grandTotal}
            dateFrom={filters.startDate}
            dateTo={filters.endDate}
          />

          <ExportOptions 
            onExportCSV={() => exportToCSV(filters)}
            onExportJSON={() => exportToJSON(filters)}
            onExportPDF={() => exportToPDF(filters)}
            isExporting={isExporting}
            hasData={hasFilteredData}
          />
        </>
      )}
    </div>
  );
};

export default ExportData;
