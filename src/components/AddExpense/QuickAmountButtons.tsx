
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickAmounts = [10000, 25000, 50000, 100000, 200000, 500000];

interface QuickAmountButtonsProps {
  onAmountSelect: (amount: string) => void;
}

export const QuickAmountButtons = ({ onAmountSelect }: QuickAmountButtonsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyInput = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const handleQuickAmount = (amount: number) => {
    const formattedAmount = formatCurrencyInput(amount);
    onAmountSelect(formattedAmount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nominal Cepat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              onClick={() => handleQuickAmount(amount)}
              className="text-sm"
            >
              {formatCurrency(amount)}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
