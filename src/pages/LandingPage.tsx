
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, PieChart, Target, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold">💰 CatatUang</div>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link to="/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Daftar</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-fade-in">
            Kelola Keuangan Anda dengan Mudah
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in delay-300">
            CatatUang membantu Anda mencatat, menganalisis, dan mengontrol pengeluaran harian dengan interface yang sederhana dan intuitif.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-500">
            <Button size="lg" className="px-8 py-3 text-lg" asChild>
              <Link to="/register">
                Mulai Gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
              <Link to="/login">Masuk Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Fitur Unggulan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Analisis Pengeluaran</h3>
                <p className="text-muted-foreground text-sm">
                  Visualisasi data pengeluaran dengan chart dan grafik yang mudah dipahami.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Target Bulanan</h3>
                <p className="text-muted-foreground text-sm">
                  Tetapkan target pengeluaran bulanan dan pantau progress secara real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Laporan Lengkap</h3>
                <p className="text-muted-foreground text-sm">
                  Export data dan generate laporan keuangan untuk kebutuhan pribadi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 px-4 py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Mengapa Memilih CatatUang?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              "Interface sederhana dan mudah digunakan",
              "Responsif di semua perangkat",
              "Kategori pengeluaran yang dapat disesuaikan",
              "Reminder otomatis untuk mencatat pengeluaran",
              "Data tersimpan aman dan terjaga privasi",
              "Gratis dan tanpa iklan mengganggu"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Siap Mengelola Keuangan Anda?
          </h2>
          <p className="text-muted-foreground mb-8">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan mengelola keuangan dengan CatatUang.
          </p>
          
          <Button size="lg" className="px-12 py-3 text-lg" asChild>
            <Link to="/register">
              Daftar Sekarang - Gratis!
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 CatatUang. Dibuat dengan ❤️ untuk mengelola keuangan yang lebih baik.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
