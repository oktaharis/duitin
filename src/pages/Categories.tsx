
import { CategoryGrid } from "@/components/Categories/CategoryGrid";
import { AddCategoryButton } from "@/components/Categories/AddCategoryButton";

const Categories = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Kategori Pengeluaran</h1>
        <AddCategoryButton />
      </div>
      
      <CategoryGrid />
    </div>
  );
};

export default Categories;
