
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency";

interface OnboardingStep2Props {
  hasMonthlyTarget: boolean;
  monthlyTargetAmount: number | undefined;
  onTargetChange: (hasTarget: boolean) => void;
  onAmountChange: (amount: number | undefined) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export const OnboardingStep2 = ({
  hasMonthlyTarget,
  monthlyTargetAmount,
  onTargetChange,
  onAmountChange,
  onNext,
  onPrev,
  onSkip,
}: OnboardingStep2Props) => {
  const handleTargetChange = (value: string) => {
    const hasTarget = value === "yes";
    onTargetChange(hasTarget);
    if (!hasTarget) {
      onAmountChange(undefined);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const amount = value ? parseInt(value) : undefined;
    onAmountChange(amount);
  };

  const canProceed = !hasMonthlyTarget || (hasMonthlyTarget && monthlyTargetAmount && monthlyTargetAmount > 0);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Target Pengeluaran 🎯</CardTitle>
        <p className="text-muted-foreground">
          Apakah Anda memiliki target pengeluaran bulanan?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={hasMonthlyTarget ? "yes" : "no"} 
          onValueChange={handleTargetChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="target-yes" />
            <Label htmlFor="target-yes" className="flex-1 cursor-pointer">
              Ya, saya memiliki target pengeluaran
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="target-no" />
            <Label htmlFor="target-no" className="flex-1 cursor-pointer">
              Tidak, belum ada target khusus
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unsure" id="target-unsure" />
            <Label htmlFor="target-unsure" className="flex-1 cursor-pointer">
              Belum yakin, mungkin nanti
            </Label>
          </div>
        </RadioGroup>

        {hasMonthlyTarget && (
          <div className="space-y-3">
            <Label htmlFor="target-amount">Target Pengeluaran Bulanan (Rp)</Label>
            <Input
              id="target-amount"
              type="text"
              value={monthlyTargetAmount ? monthlyTargetAmount.toLocaleString('id-ID') : ''}
              onChange={handleAmountChange}
              placeholder="Contoh: 2000000"
              className="text-right"
            />
            {monthlyTargetAmount && (
              <p className="text-sm text-muted-foreground">
                Target: {formatCurrency(monthlyTargetAmount)} per bulan
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              💡 Target ini akan membantu Anda mengontrol pengeluaran dan melihat progress bulanan
            </p>
          </div>
        )}

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="outline" onClick={onPrev}>
            Kembali
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Lewati
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
          >
            Lanjut
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
