
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Kategori *</Label>
        <div className="text-sm text-muted-foreground">Memuat kategori...</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Kategori *</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`p-3 border rounded-lg text-left transition-colors ${
              value === category.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
