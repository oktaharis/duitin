
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExpenseFiltersProps {
  category: string;
  onCategoryChange: (category: string) => void;
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
}

export const ExpenseFilters = ({ 
  category, 
  onCategoryChange, 
  dateRange, 
  onDateRangeChange 
}: ExpenseFiltersProps) => {
  return (
    <Card className="w-full lg:w-80">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label>Tanggal Mulai</Label>
          <Input
            type="date"
            value={dateRange.from}
            onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Tanggal Akhir</Label>
          <Input
            type="date"
            value={dateRange.to}
            onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
          />
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            onCategoryChange("");
            onDateRangeChange({ from: "", to: "" });
          }}
        >
          Reset Filter
        </Button>
      </CardContent>
    </Card>
  );
};
