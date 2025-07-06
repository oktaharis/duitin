
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";

interface OnboardingStep3Props {
  wantsDailyReminder: boolean;
  onReminderChange: (wants: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

export const OnboardingStep3 = ({
  wantsDailyReminder,
  onReminderChange,
  onNext,
  onPrev,
  onSkip,
}: OnboardingStep3Props) => {
  const handleReminderChange = (value: string) => {
    onReminderChange(value === "yes");
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Bell className="h-6 w-6" />
          Pengingat Harian
        </CardTitle>
        <p className="text-muted-foreground">
          Apakah Anda ingin menerima pengingat harian untuk mencatat pengeluaran?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              wantsDailyReminder ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground'
            }`}
            onClick={() => onReminderChange(true)}
          >
            <div className="flex items-center space-x-3">
              <RadioGroup value={wantsDailyReminder ? "yes" : "no"} onValueChange={handleReminderChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="reminder-yes" />
                  <Bell className="h-5 w-5 text-green-600" />
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor="reminder-yes" className="font-medium cursor-pointer">
                  Ya, ingatkan saya setiap hari
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notifikasi pada jam 20:00 WIB
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              !wantsDailyReminder ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground'
            }`}
            onClick={() => onReminderChange(false)}
          >
            <div className="flex items-center space-x-3">
              <RadioGroup value={wantsDailyReminder ? "yes" : "no"} onValueChange={handleReminderChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="reminder-no" />
                  <BellOff className="h-5 w-5 text-gray-600" />
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor="reminder-no" className="font-medium cursor-pointer">
                  Tidak, saya akan mencatat sendiri
                </Label>
                <p className="text-sm text-muted-foreground">
                  Tanpa pengingat otomatis
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tips:</strong> Pengingat harian dapat membantu Anda konsisten mencatat pengeluaran. 
            Anda bisa mengubah pengaturan ini kapan saja di halaman Profil.
          </p>
        </div>

        <div className="flex justify-between gap-3 pt-4">
          <Button variant="outline" onClick={onPrev}>
            Kembali
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Lewati
          </Button>
          <Button onClick={onNext}>
            Lanjut
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
