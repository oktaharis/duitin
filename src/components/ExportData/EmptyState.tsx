
import { Card, CardContent } from "@/components/ui/card";
import { FileX, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  hasAnyData: boolean;
  isFiltered: boolean;
}

export const EmptyState = ({ hasAnyData, isFiltered }: EmptyStateProps) => {
  const navigate = useNavigate();

  if (!hasAnyData) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileX className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum Ada Data Pengeluaran</h3>
          <p className="text-muted-foreground mb-6">
            Anda belum memiliki data pengeluaran untuk diekspor. 
            Mulai dengan menambahkan pengeluaran pertama Anda.
          </p>
          <Button onClick={() => navigate('/home/add-expense')}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pengeluaran
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isFiltered) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tidak Ada Data Sesuai Filter</h3>
          <p className="text-muted-foreground mb-6">
            Tidak ada pengeluaran yang sesuai dengan filter yang Anda pilih. 
            Coba ubah rentang tanggal atau kategori untuk melihat data yang berbeda.
          </p>
          <p className="text-sm text-muted-foreground">
            Tips: Kosongkan semua filter untuk melihat semua data pengeluaran Anda.
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
};
