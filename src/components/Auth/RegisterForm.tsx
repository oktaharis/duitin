
import { useState, useEffect } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      console.log('User already logged in, redirecting to home');
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, fullName);
      toast.success("Pendaftaran berhasil! Periksa email untuk konfirmasi.");
      // Let OnboardingGate handle the redirect
      navigate("/home");
    } catch (error: any) {
      console.error("Register error:", error);
      if (error.message?.includes("already registered")) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain atau login.");
      } else {
        toast.error(error.message || "Pendaftaran gagal. Coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      const redirectTo = `${window.location.origin}/home`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
        }
      });
      
      if (error) {
        console.error('Google register error:', error);
        toast.error("Pendaftaran dengan Google gagal");
      }
    } catch (error) {
      console.error('Google register error:', error);
      toast.error("Pendaftaran dengan Google gagal");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render form if user is already logged in
  if (user && !loading) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl">Buat Akun Baru</CardTitle>
          <p className="text-sm text-muted-foreground">
            Isi data di bawah untuk mendaftar
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama lengkap Anda"
                required
                disabled={isLoading || loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                disabled={isLoading || loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (minimal 6 karakter)"
                required
                minLength={6}
                disabled={isLoading || loading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Memproses..." : "Daftar"}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau
              </span>
            </div>
          </div>

          <GoogleLoginButton type="register" onClick={handleGoogleRegister} />
          
          <div className="text-xs text-muted-foreground text-center px-4">
            Dengan mendaftar, Anda menyetujui{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Kebijakan Privasi
            </span>{" "}
            kami.
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Masuk di sini
          </Link>
        </p>
        
        <Link 
          to="/" 
          className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};
