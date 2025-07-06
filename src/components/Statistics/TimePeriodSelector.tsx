
import { Button } from "@/components/ui/button";

interface TimePeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimePeriodSelector = ({ value, onChange }: TimePeriodSelectorProps) => {
  const periods = [
    { value: "day", label: "Hari" },
    { value: "week", label: "Minggu" },
    { value: "month", label: "Bulan" },
    { value: "year", label: "Tahun" },
  ];

  return (
    <div className="flex gap-2">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={value === period.value ? "default" : "outline"}
          onClick={() => onChange(period.value)}
          size="sm"
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
};
