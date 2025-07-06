
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const suggestions = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Tambah Pengeluaran", path: "/add-expense", icon: Search },
    { label: "Riwayat", path: "/history", icon: Search },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <p className="text-xl text-muted-foreground">Halaman Tidak Ditemukan</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
          
          <div className="space-y-3">
            <p className="text-sm font-medium">Mungkin Anda mencari:</p>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.path}
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate(suggestion.path)}
                >
                  <suggestion.icon className="h-4 w-4" />
                  {suggestion.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="flex-1 gap-2"
            >
              <Home className="h-4 w-4" />
              Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
