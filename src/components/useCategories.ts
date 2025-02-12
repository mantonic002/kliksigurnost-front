import { useMemo } from "react";
import categoriesData from "../data/content-categories.json";

export const useCategories = () => {
  const { categoryOptions, categoryMap } = useMemo(() => {
    const categoryMap = new Map<number, string>();
    const categoryOptions = categoriesData.categories.flatMap((category) => [
      { value: category.id, label: category.name, parentId: null },
      ...(category.subcategories
        ? category.subcategories.map((sub) => ({
            value: sub.id,
            label: `— ${sub.name}`,
            parentId: category.id,
          }))
        : []),
    ]);

    categoriesData.categories.forEach((category) => {
      categoryMap.set(category.id, category.name);
      category.subcategories?.forEach((sub) => {
        categoryMap.set(sub.id, sub.name);
      });
    });

    return { categoryOptions, categoryMap };
  }, []);

  return { categoryOptions, categoryMap };
};