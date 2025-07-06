
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface EditCategoryDialogProps {
  category: any;
  onClose: () => void;
}

export const EditCategoryDialog = ({ category, onClose }: EditCategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: category.name,
    icon: category.icon,
    color: category.color
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateCategory } = useCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Nama kategori harus diisi");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await updateCategory.mutateAsync({
        id: category.id,
        data: {
          name: formData.name.trim(),
          icon: formData.icon,
          color: formData.color
        }
      });
      
      toast.success("Kategori berhasil diperbarui!");
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Gagal memperbarui kategori");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Kategori</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nama kategori"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Pilih Ikon</Label>
            <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto">
              {ICON_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-2 text-lg rounded border-2 transition-colors ${
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

          <div className="space-y-2">
            <Label>Pilih Warna</Label>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-4 transition-transform ${
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

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
