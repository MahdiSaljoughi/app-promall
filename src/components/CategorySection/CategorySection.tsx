import CategoryCard from "../ui/category-card/category-card";

interface Category {
  image: string;
  title: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategorySection({
  categories,
}: CategoriesSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mx-4 md:mx-0 my-8 dark:shadow-2xl dark:drop-shadow-2xl">
        {categories.map((category: Category, index) => (
          <div key={index}>
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
    </>
  );
}
