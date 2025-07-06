
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ExternalLink } from "lucide-react";

export const DeploymentGuide = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Panduan Konfigurasi Setelah Deploy ke Vercel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Setelah deploy ke Vercel, Anda perlu mengkonfigurasi beberapa pengaturan agar Google OAuth berfungsi dengan baik.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">1. Konfigurasi Supabase Dashboard</h3>
            <div className="space-y-2 text-sm">
              <p>Buka Supabase Dashboard → Authentication → URL Configuration:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Site URL:</strong> https://your-app-name.vercel.app</li>
                <li><strong>Redirect URLs:</strong> Tambahkan https://your-app-name.vercel.app/home</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">2. Konfigurasi Google Cloud Console</h3>
            <div className="space-y-2 text-sm">
              <p>Buka Google Cloud Console → APIs & Services → Credentials:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Authorized JavaScript origins:</strong> https://your-app-name.vercel.app</li>
                <li><strong>Authorized redirect URIs:</strong> 
                  <br />https://ezpjkkzskntufvajvmby.supabase.co/auth/v1/callback
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">3. Langkah-langkah Deploy</h3>
            <div className="space-y-2 text-sm">
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Push kode ke GitHub repository</li>
                <li>Connect repository ke Vercel</li>
                <li>Deploy aplikasi</li>
                <li>Catat URL Vercel yang diberikan</li>
                <li>Update konfigurasi Supabase dan Google Cloud dengan URL tersebut</li>
                <li>Test Google OAuth login</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">4. Troubleshooting</h3>
            <div className="space-y-2 text-sm">
              <p>Jika masih ada error 404 saat login Google:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pastikan semua URL sudah benar di Supabase dan Google Cloud</li>
                <li>Tunggu beberapa menit untuk propagasi perubahan</li>
                <li>Clear browser cache dan coba lagi</li>
                <li>Periksa console browser untuk error detail</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm">
            File vercel.json sudah ditambahkan untuk mengatasi masalah 404 saat refresh halaman.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
