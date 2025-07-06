
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OnboardingStep1Props {
  purpose: string;
  purposeOther: string;
  onPurposeChange: (purpose: string) => void;
  onPurposeOtherChange: (text: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

const PURPOSE_OPTIONS = [
  { value: "daily_tracking", label: "Mencatat pengeluaran harian" },
  { value: "budget_management", label: "Mengatur anggaran bulanan" },
  { value: "financial_reports", label: "Melihat laporan dan statistik keuangan" },
  { value: "other", label: "Lainnya" },
];

export const OnboardingStep1 = ({
  purpose,
  purposeOther,
  onPurposeChange,
  onPurposeOtherChange,
  onNext,
  onSkip,
}: OnboardingStep1Props) => {
  const canProceed = purpose && (purpose !== "other" || purposeOther.trim());

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Selamat Datang! 👋</CardTitle>
        <p className="text-muted-foreground">
          Apa tujuan utama Anda menggunakan aplikasi ini?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={purpose} onValueChange={onPurposeChange}>
          {PURPOSE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {purpose === "other" && (
          <div className="space-y-2">
            <Label htmlFor="purpose-other">Jelaskan tujuan Anda:</Label>
            <Input
              id="purpose-other"
              value={purposeOther}
              onChange={(e) => onPurposeOtherChange(e.target.value)}
              placeholder="Contoh: Mengontrol pengeluaran untuk tabungan"
              maxLength={100}
            />
          </div>
        )}

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="outline" onClick={onSkip} className="flex-1">
            Lewati Survey
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            className="flex-1"
          >
            Lanjut
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
