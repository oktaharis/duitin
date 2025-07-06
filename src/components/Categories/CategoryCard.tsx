
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Category } from "@/hooks/useCategories";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: category.color + '20' }}
          >
            {category.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{category.name}</h3>
            <p className="text-xs text-muted-foreground">
              {category.is_default ? 'Default' : 'Custom'}
            </p>
          </div>
          
          {!category.is_default && (
            <div className="flex gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                title="Edit kategori"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(category)}
                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                title="Hapus kategori"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
