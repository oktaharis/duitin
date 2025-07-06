
import { useMemo } from 'react';
import { useExpenses } from './useExpenses';
import { useCategories } from './useCategories';
import { useExportData } from './useExportData';

interface ExportFilters {
  startDate: string;
  endDate: string;
  categoryId: string;
}

export const useExportLogic = (filters: ExportFilters) => {
  const { expenses, isLoading: expensesLoading } = useExpenses();
  const { categories } = useCategories();
  const { exportToCSV, exportToJSON, exportToPDF, isExporting } = useExportData();

  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];
    
    let filtered = [...expenses];

    if (filters.startDate) {
      filtered = filtered.filter(expense => expense.date >= filters.startDate);
    }

    if (filters.endDate) {
      filtered = filtered.filter(expense => expense.date <= filters.endDate);
    }

    if (filters.categoryId) {
      filtered = filtered.filter(expense => expense.category_id === filters.categoryId);
    }

    return filtered;
  }, [expenses, filters]);

  return {
    expenses,
    categories,
    isLoading: expensesLoading,
    filteredExpenses,
    exportToCSV,
    exportToJSON,
    exportToPDF,
    isExporting
  };
};
