import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SelectCategoryProps {
  onCategoryChange: (category: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://remotive.com/api/remote-jobs/categories");
        const data = await response.json();
        if (data.jobs && Array.isArray(data.jobs)) {
          setCategories(data.jobs);
        } else {
          console.error("Erro: 'jobs' não contém um array válido", data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Select onValueChange={onCategoryChange}>
      <SelectTrigger className="w-1/2 sm:w-1/5">
        <SelectValue placeholder="Escolha a categoria" />
      </SelectTrigger>
      <SelectContent className="h-[280px]">
        <SelectGroup>
          {categories.length > 0 ? (
            categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))
          ) : (
            <p>Sem categorias disponíveis.</p>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SelectCategory };
