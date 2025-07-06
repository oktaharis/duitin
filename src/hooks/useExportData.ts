
import { useState } from 'react';
import { useExpenses } from './useExpenses';
import { useCategories } from './useCategories';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'sonner';

interface ExportFilters {
  dateFrom?: string;
  dateTo?: string;
  categoryId?: string;
}

export const useExportData = () => {
  const { expenses } = useExpenses();
  const { categories } = useCategories();
  const [isExporting, setIsExporting] = useState(false);

  const getFilteredData = (filters: ExportFilters = {}) => {
    let filteredExpenses = [...expenses];

    if (filters.dateFrom) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.date >= filters.dateFrom!
      );
    }

    if (filters.dateTo) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.date <= filters.dateTo!
      );
    }

    if (filters.categoryId) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.category_id === filters.categoryId
      );
    }

    return filteredExpenses.map(expense => ({
      tanggal: new Date(expense.date).toLocaleDateString('id-ID'),
      kategori: expense.categories?.name || 'Tanpa Kategori',
      deskripsi: expense.description,
      jumlah: expense.amount,
      jumlah_formatted: formatCurrency(expense.amount),
    }));
  };

  const exportToCSV = async (filters: ExportFilters = {}) => {
    setIsExporting(true);
    try {
      const data = getFilteredData(filters);
      
      if (data.length === 0) {
        toast.error('Tidak ada data untuk diekspor');
        return;
      }

      const headers = ['Tanggal', 'Kategori', 'Deskripsi', 'Jumlah'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => [
          row.tanggal,
          `"${row.kategori}"`,
          `"${row.deskripsi}"`,
          row.jumlah_formatted
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pengeluaran_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success('Data berhasil diekspor ke CSV!');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast.error('Gagal mengekspor data ke CSV');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async (filters: ExportFilters = {}) => {
    setIsExporting(true);
    try {
      const data = getFilteredData(filters);
      
      if (data.length === 0) {
        toast.error('Tidak ada data untuk diekspor');
        return;
      }

      const exportData = {
        exported_at: new Date().toISOString(),
        total_records: data.length,
        total_amount: data.reduce((sum, item) => sum + item.jumlah, 0),
        data: data
      };

      const jsonContent = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pengeluaran_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      toast.success('Data berhasil diekspor ke JSON!');
    } catch (error) {
      console.error('Error exporting JSON:', error);
      toast.error('Gagal mengekspor data ke JSON');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async (filters: ExportFilters = {}) => {
    setIsExporting(true);
    try {
      const data = getFilteredData(filters);
      
      if (data.length === 0) {
        toast.error('Tidak ada data untuk diekspor');
        return;
      }

      // Create HTML content for PDF
      const totalAmount = data.reduce((sum, item) => sum + item.jumlah, 0);
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .summary { margin-bottom: 20px; padding: 10px; background: #f5f5f5; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; background-color: #fffbf0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Laporan Pengeluaran</h1>
              <p>Diekspor pada: ${new Date().toLocaleDateString('id-ID')}</p>
            </div>
            <div class="summary">
              <p><strong>Total Transaksi:</strong> ${data.length}</p>
              <p><strong>Total Pengeluaran:</strong> ${formatCurrency(totalAmount)}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr>
                    <td>${row.tanggal}</td>
                    <td>${row.kategori}</td>
                    <td>${row.deskripsi}</td>
                    <td>${row.jumlah_formatted}</td>
                  </tr>
                `).join('')}
                <tr class="total">
                  <td colspan="3"><strong>TOTAL</strong></td>
                  <td><strong>${formatCurrency(totalAmount)}</strong></td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Convert HTML to PDF using browser print
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
      
      toast.success('Data berhasil diekspor ke PDF!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Gagal mengekspor data ke PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToCSV,
    exportToJSON,
    exportToPDF,
    isExporting,
    getFilteredData,
  };
};

// Created by DevOktaharis
