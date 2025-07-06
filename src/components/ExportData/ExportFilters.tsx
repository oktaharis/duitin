
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface ExportFiltersProps {
  dateFrom: string;
  dateTo: string;
  selectedCategory: string;
  categories: any[];
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const ExportFilters = ({
  dateFrom,
  dateTo,
  selectedCategory,
  categories,
  onDateFromChange,
  onDateToChange,
  onCategoryChange,
}: ExportFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filter Data Export
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Gunakan filter untuk mengekspor data sesuai kebutuhan Anda
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date-from">Tanggal Mulai</Label>
            <Input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Kosongkan untuk semua data
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date-to">Tanggal Selesai</Label>
            <Input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Kosongkan untuk semua data
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={selectedCategory || undefined} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Semua kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua kategori</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Pilih kategori spesifik atau biarkan kosong
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
