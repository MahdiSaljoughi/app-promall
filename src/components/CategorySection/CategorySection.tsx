// CategoriesSection.tsx
import React from "react";
import CategoryCard from "../ui/category-card/category-card";

interface Category {
	image: string;
	title: string;
}

interface CategoriesSectionProps {
	categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
	categories,
}) => {
	return (
		<div className="flex flex-wrap gap-5 mx-5 mt-5 items-center justify-center shadow-2xl drop-shadow-2xl">
		
			{categories.map((category, index) => (
				<CategoryCard
					key={index}
					image={category.image}
					title={category.title}
				/>
			))}
		</div>
	);
};

export default CategoriesSection;
