import { motion } from "framer-motion";

interface CategoryCardProps {
  image: string;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => {
  return (
    <motion.div
      className="relative w-full h-40 rounded-3xl overflow-hidden cursor-pointer shadow-[0px_1px_27px_3px_#000000]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover saturate-50"
      />

      {/* Title overlay */}
      <div className="absolute inset-0  flex items-end justify-center scale-110  mb-4 z-50 text-center">
        <h3 className=" text-medium font-bold z-50 text-white ">{title}</h3>
      </div>
      <div className="w-full h-32 bg-gradient-to-t from-black/85 to-transparent absolute -bottom-0  z-[39]"></div>
    </motion.div>
  );
};

export default CategoryCard;
