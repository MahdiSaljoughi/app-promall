import { ICategory } from "@/types/interfaces";
import CategoryCard from "../ui/category-card/category-card";

interface ICategoriesProps {
  categories: ICategory[];
}

export default function CategorySection({ categories }: ICategoriesProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 dark:shadow-2xl dark:drop-shadow-2xl">
        {categories.map((category: ICategory, index) => (
          <div key={index}>
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
    </>
  );
}
