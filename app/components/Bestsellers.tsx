import React from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { BsDropletFill } from "react-icons/bs";

type Product = {
  img: string;
  title: string;
  capacity: string;
  price: string;
  desc: string;
};

type Props = {
  bestsellers: Product[];
  onProductClick?: (product: Product) => void;
};

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

export default function Bestsellers({ bestsellers, onProductClick }: Props) {
  return (
    <div className="px-5 ">
      {/* Banner destacado */}
      <div className="mb-6 pt-2 flex items-center justify-between">
        <div>
          <h2 className="text-[2rem] font-bold leading-tight text-black">
            Agua <span className="text-[#4FC3F7]">pura</span>,<br />
            <span className="text-[#43D39E]">planeta</span> sano
          </h2>
        </div>
        <BsDropletFill className="text-[#4FC3F7] ml-4" size={44} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[24px] font-semibold text-[#222]">Más vendidos</span>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-4 pt-12 scrollbar-hide relative overflow-visible">
        {bestsellers.map((b, i) => (
          <div
            key={i}
            className={`relative min-w-[140px] max-w-[140px] h-[110px] rounded-2xl shadow-lg flex flex-col justify-end pb-3 px-2 ${pastelBg[i % pastelBg.length]} overflow-visible`}
          >
            {/* Bottle image overflowing card */}
            <div className="absolute -top-8 left-4 z-10 pointer-events-none">
              <Image
                src={b.img}
                alt={b.title}
                width={56}
                height={100}
                className="object-contain h-[80px] w-auto drop-shadow-xl"
              />
            </div>
            {/* Floating + button with strong pastel color */}
            <button
              className={`absolute top-3 right-3 w-9 h-9 rounded-full ${pastelStrong[i % pastelStrong.length]} flex items-center justify-center shadow-md border border-white/40 hover:brightness-110 transition`}
              onClick={e => { e.stopPropagation(); onProductClick && onProductClick(b); }}
              aria-label="Agregar"
            >
              <FiPlus className="text-2xl text-white drop-shadow" />
            </button>
            {/* Capacity badge and bottle name */}
            <div className="flex flex-col items-start gap-1 pl-1">
              <span className="bg-accent-100 text-[#222] text-[13px] font-semibold rounded-[10px] px-2 py-1 shadow-sm border-none min-w-[20px] text-center">
                {b.capacity}
              </span>
              <span className="text-[14px] text-[#222] font-medium leading-tight">
                {b.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 