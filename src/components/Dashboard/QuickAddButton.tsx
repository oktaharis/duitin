
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickAddButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/home/add-expense")} className="gap-2">
      <Plus className="h-4 w-4" />
      Tambah Pengeluaran
    </Button>
  );
};

// Created by DevOktaharis
