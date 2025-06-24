import React from "react";
import Image from "next/image";

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
};

const localImages = ["/im1.png", "/im2.png", "/im3.png"];

export default function ProductsGrid({ products, onProductClick }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-5 pb-5 grid grid-cols-2 gap-4 mt-2 scrollbar-hide">
      {products.map((p, i) => (
        <div
          key={i}
          className="w-full h-[140px] bg-principal-300 rounded-[14px] shadow p-3 flex flex-col items-start text-left transition hover:scale-[1.03] hover:shadow-lg cursor-pointer"
          onClick={() => onProductClick(p)}
        >
          <Image
            src={localImages[Math.floor(Math.random() * localImages.length)]}
            alt={p.title}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-[12px] bg-white self-center mb-2 shadow-sm"
          />
          <div className="text-[0.95rem] font-bold text-[#222] mb-0.5 ml-0.5 leading-tight line-clamp-1">
            {p.title}
          </div>
          <div className="flex items-center gap-1 text-[0.75rem] text-[#222]/55 font-medium mb-0.5 ml-0.5">
            <span className="text-[#222]/45">Capacidad</span> {p.capacity}
          </div>
          <div className="text-[0.9rem] font-bold text-principal-500 mt-0.5 ml-0.5 leading-tight">
            {p.price}
          </div>
        </div>
      ))}
    </div>
  );
} 