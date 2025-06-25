import React from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  img: string;
  title: string;
  capacity: string;
  price: string;
  desc: string;
};

type Props = {
  products: Product[];
  onProductClick: (product: Product) => void;
  extraPadding?: boolean;
};

const localImages = ["/im1.png", "/im2.png", "/im3.png"];
const pastelBg = [
  "bg-[#FFF9C4]", // pastel yellow
  "bg-[#FFD6E0]", // pastel pink
  "bg-[#B3E5FC]", // pastel blue
  "bg-[#FFE5B4]", // pastel orange
  "bg-[#C8F7C5]", // pastel green
  "bg-[#E5D4FF]", // pastel purple
];
const pastelStrong = [
  "bg-[#FFE066]", // strong yellow
  "bg-[#FF6F91]", // strong pink
  "bg-[#4FC3F7]", // strong blue
  "bg-[#FFB347]", // strong orange
  "bg-[#43D39E]", // strong green
  "bg-[#A259FF]", // strong purple
];

export default function ProductsGrid({ products, onProductClick, extraPadding }: Props) {
  return (
    <div className={`flex-1 overflow-y-auto px-5 ${extraPadding ? 'pb-24' : 'pb-6'} pt-12 grid grid-cols-2 gap-x-6 gap-y-14 mt-2 scrollbar-hide relative overflow-hidden`}>
      <AnimatePresence>
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.22 }}
            className={`relative w-full h-[132.5px] rounded-2xl shadow-lg flex flex-col justify-end pt-10 pb-4 px-3 ${pastelBg[i % pastelBg.length]} transition hover:scale-[1.03] hover:shadow-xl cursor-pointer`}
          >
            {/* Bottle image overflowing card */}
            <div className="absolute -top-8 left-4 pointer-events-none">
              <Image
                src={localImages[i % localImages.length]}
                alt={p.title}
                width={64}
                height={120}
                className="object-contain h-[100px] w-auto drop-shadow-xl"
              />
            </div>
            {/* Floating + button with strong pastel color */}
            <button
              className={`absolute top-3 right-3 w-9 h-9 rounded-full ${pastelStrong[i % pastelStrong.length]} flex items-center justify-center shadow-md border border-white/40 hover:brightness-110 transition`}
              onClick={e => { e.stopPropagation(); onProductClick(p); }}
              aria-label="Agregar"
            >
              <FiPlus className="text-2xl text-white drop-shadow" />
            </button>
            {/* Price and name */}
            <div className="w-full mt-10 flex flex-col items-start">
              <div className="text-[15px] font-bold text-[#222] leading-tight">{p.price}</div>
              <div className="text-[14px] text-[#222] font-medium leading-tight">{p.title}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 