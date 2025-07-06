
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Bell, Lightbulb } from "lucide-react";
import { formatCurrency } from "@/utils/currency";

interface OnboardingStep4Props {
  purpose: string;
  purposeOther: string;
  hasMonthlyTarget: boolean;
  monthlyTargetAmount: number | undefined;
  wantsDailyReminder: boolean;
  onComplete: () => void;
  isSubmitting: boolean;
}

const PURPOSE_LABELS: Record<string, string> = {
  daily_tracking: "Mencatat pengeluaran harian",
  budget_management: "Mengatur anggaran bulanan", 
  financial_reports: "Melihat laporan dan statistik keuangan",
  other: "Tujuan khusus"
};

export const OnboardingStep4 = ({
  purpose,
  purposeOther,
  hasMonthlyTarget,
  monthlyTargetAmount,
  wantsDailyReminder,
  onComplete,
  isSubmitting,
}: OnboardingStep4Props) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl text-green-800">Terima Kasih! 🎉</CardTitle>
        <p className="text-muted-foreground">
          Pengaturan awal Anda telah dikonfigurasi. Mari mulai mengelola keuangan dengan lebih baik!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Ringkasan Pengaturan Anda:</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Tujuan Penggunaan</p>
                <p className="text-sm text-blue-700">
                  {purpose === "other" ? purposeOther : PURPOSE_LABELS[purpose]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <Target className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-purple-800">Target Pengeluaran</p>
                <p className="text-sm text-purple-700">
                  {hasMonthlyTarget && monthlyTargetAmount 
                    ? `${formatCurrency(monthlyTargetAmount)} per bulan`
                    : "Belum ada target yang ditetapkan"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Bell className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Pengingat Harian</p>
                <p className="text-sm text-green-700">
                  {wantsDailyReminder 
                    ? "Aktif - Notifikasi setiap hari jam 20:00 WIB"
                    : "Tidak aktif - Anda akan mencatat secara manual"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Apa selanjutnya?</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Mulai mencatat pengeluaran pertama Anda</li>
            <li>• Jelajahi kategori pengeluaran yang tersedia</li>
            <li>• Lihat statistik dan laporan keuangan Anda</li>
            <li>• Ubah pengaturan kapan saja di halaman Profil</li>
          </ul>
        </div>

        <Button 
          onClick={onComplete} 
          disabled={isSubmitting}
          className="w-full py-6 text-lg"
        >
          {isSubmitting ? "Menyimpan..." : "Lanjut ke Beranda"}
        </Button>
      </CardContent>
    </Card>
  );
};
