
import { useCategories } from "@/hooks/useCategories";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryCard } from "./CategoryCard";
import { useState } from "react";
import type { Category } from "@/hooks/useCategories";

export const CategoryGrid = () => {
  const { categories, isLoading } = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Memuat kategori...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Belum ada kategori yang dibuat.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={setEditingCategory}
            onDelete={setDeletingCategory}
          />
        ))}
      </div>

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          category={deletingCategory}
          onClose={() => setDeletingCategory(null)}
        />
      )}
    </>
  );
};
