
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AddCategoryButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      className="gap-2 shrink-0"
      onClick={() => navigate("/home/categories/add")}
      size="sm"
    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">Tambah Kategori</span>
      <span className="sm:hidden">Tambah</span>
    </Button>
  );
};
