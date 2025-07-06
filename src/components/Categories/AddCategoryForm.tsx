
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

const ICON_OPTIONS = [
  "🍽️", "🚗", "🎬", "🛍️", "💡", "⚕️", "📚", "✈️", 
  "💰", "🏠", "📱", "🎮", "☕", "👔", "🎯", "🔧"
];

const COLOR_OPTIONS = [
  "#EF4444", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", 
  "#10B981", "#06B6D4", "#6B7280", "#F97316", "#84CC16"
];

export const AddCategoryForm = () => {
  const navigate = useNavigate();
  const { createCategory } = useCategories();
  
  const [formData, setFormData] = useState({
    name: "",
    icon: "💰",
    color: "#3B82F6"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Nama kategori harus diisi");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("Nama kategori minimal 2 karakter");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createCategory.mutateAsync({
        name: formData.name.trim(),
        icon: formData.icon,
        color: formData.color
      });
      
      toast.success("Kategori berhasil ditambahkan!");
      navigate("/home/categories");
    } catch (error: any) {
      console.error("Error creating category:", error);
      if (error.message?.includes("duplicate")) {
        toast.error("Kategori dengan nama tersebut sudah ada");
      } else {
        toast.error("Gagal menambahkan kategori. Coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-0">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/home/categories")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <h1 className="text-xl md:text-2xl font-bold">Tambah Kategori Baru</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detail Kategori</CardTitle>
            <p className="text-sm text-muted-foreground">
              Isi informasi kategori pengeluaran baru
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Kategori *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Olahraga, Hobi, dll"
                  required
                  disabled={isSubmitting}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  Maksimal 50 karakter
                </p>
              </div>

              <div className="space-y-3">
                <Label>Pilih Ikon</Label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                  {ICON_OPTIONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      className={`p-2 text-lg md:text-xl rounded border-2 transition-colors ${
                        formData.icon === icon 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-muted-foreground"
                      }`}
                      disabled={isSubmitting}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Pilih Warna</Label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-4 transition-transform ${
                        formData.color === color 
                          ? "border-gray-400 scale-110" 
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                      disabled={isSubmitting}
                    />
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !formData.name.trim()}
              >
                {isSubmitting ? "Menyimpan..." : "Tambah Kategori"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Preview Kategori
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Pratinjau kategori yang akan dibuat
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="p-4 rounded-lg border-2 border-dashed border-muted flex items-center gap-3"
                style={{ borderColor: formData.color + "40", backgroundColor: formData.color + "10" }}
              >
                <span className="text-2xl">{formData.icon}</span>
                <div>
                  <p className="font-medium">
                    {formData.name || "Nama Kategori"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Kategori Pengeluaran
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Ikon: {formData.icon}</p>
                <p>• Warna: {formData.color}</p>
                <p>• Nama: {formData.name || "(belum diisi)"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
