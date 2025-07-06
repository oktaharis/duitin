
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

export const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      console.log('User already logged in, redirecting to home');
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success("Login berhasil!");
      // Navigation will be handled by useEffect above
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login gagal. Periksa email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        console.error('Google login error:', error);
        toast.error("Login dengan Google gagal");
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Login dengan Google gagal");
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
          <CardTitle className="text-xl">Masuk ke Akun Anda</CardTitle>
          <p className="text-sm text-muted-foreground">
            Masukkan email dan password untuk masuk
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
                placeholder="Password"
                required
                disabled={isLoading || loading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Memproses..." : "Masuk"}
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
          
          <GoogleLoginButton type="login" onClick={handleGoogleLogin} />
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Daftar di sini
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
