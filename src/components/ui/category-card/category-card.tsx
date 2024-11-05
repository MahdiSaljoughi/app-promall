import { motion } from "framer-motion";

interface CategoryCardProps {
  image: string;
  title: string;
}

export default function CategoryCard({ image, title }: CategoryCardProps) {
  return (
    <>
      <motion.div
        className="relative max-h-40 rounded-3xl overflow-hidden cursor-pointer shadow-xl dark:shadow-[0px_1px_27px_3px_#000000]"
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
        <div className="absolute inset-0 flex items-end justify-center scale-110 mb-4 z-20 text-center">
          <h3 className="text-white font-bold z-10">{title}</h3>
        </div>
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/85 to-transparent z-10" />
      </motion.div>
    </>
  );
}
