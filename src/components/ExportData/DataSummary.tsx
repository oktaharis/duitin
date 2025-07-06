
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";
import { TrendingUp, FileText, Calendar } from "lucide-react";

interface DataSummaryProps {
  filteredCount: number;
  totalCount: number;
  filteredTotal: number;
  grandTotal: number;
  dateFrom?: string;
  dateTo?: string;
}

export const DataSummary = ({
  filteredCount,
  totalCount,
  filteredTotal,
  grandTotal,
  dateFrom,
  dateTo,
}: DataSummaryProps) => {
  const currentMonth = new Date().toLocaleDateString('id-ID', { 
    month: 'long', 
    year: 'numeric' 
  });

  const periodText = dateFrom && dateTo 
    ? `${new Date(dateFrom).toLocaleDateString('id-ID')} - ${new Date(dateTo).toLocaleDateString('id-ID')}`
    : currentMonth;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <TrendingUp className="h-5 w-5" />
          Ringkasan Data Export
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Data yang akan diekspor berdasarkan filter yang dipilih
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">Total Transaksi</p>
            </div>
            <p className="text-2xl font-bold text-primary">{filteredCount}</p>
            {filteredCount !== totalCount && (
              <p className="text-xs text-muted-foreground">dari {totalCount} total transaksi</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(filteredTotal)}</p>
            {filteredTotal !== grandTotal && (
              <p className="text-xs text-muted-foreground">dari {formatCurrency(grandTotal)} total</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <p className="text-sm text-muted-foreground">Periode</p>
            </div>
            <p className="text-lg font-semibold">{periodText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
