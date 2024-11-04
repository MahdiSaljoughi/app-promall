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
      <div className="flex flex-wrap gap-5 mx-5 mt-5 items-center justify-center shadow-2xl drop-shadow-2xl">
        {categories.map((category: Category, index) => (
          <div key={index}>
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
    </>
  );
}
