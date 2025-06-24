"use client";
import React from "react";
import Image from "next/image";
import { LuMinus, LuPlus, LuChevronLeft } from "react-icons/lu";

type Product = {
  img: string;
  title: string;
  capacity: string;
  price: string;
  desc: string;
};

type Props = {
  product: Product;
  qty: number;
  setQty: (n: number) => void;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
};

const localImages = ["/im1.png", "/im2.png", "/im3.png"];

export default function ProductDetail({ product, qty, setQty, onClose, onAddToCart }: Props) {
  const totalPrice = (parseFloat(product.price.replace(/[^\d.]/g, "")) * qty).toFixed(2);
  return (
    <div className="w-[375px] h-[812px] bg-principal-100 rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative animate-fadeIn">
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <button className="text-[#222] text-base font-medium" onClick={onClose}>
          <LuChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-5"></div>
      </div>
      <div className="flex flex-col items-center mt-2 mb-5">
        <div className="w-[220px] h-[220px] bg-white rounded-[32px] shadow flex items-center justify-center relative">
          <Image
            className="w-[160px] h-[180px] object-contain rounded-[18px]"
            src={localImages[Math.floor(Math.random() * localImages.length)]}
            alt={product.title}
            width={160}
            height={180}
          />
          <button className="absolute top-4 right-4 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow text-[#EA7A53] text-lg border-none">
            &#9825;
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col px-5 pt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[1.15rem] font-bold text-[#222]">{product.title}</span>
          <span className="flex items-center gap-1 text-yellow-400 text-[1.1rem]">
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span className="text-[0.9rem] text-[#222]/55 ml-1">(128 Reviews)</span>
          </span>
        </div>
        <div className="text-[0.95rem] text-[#222]/55 mb-2">Capacidad: {product.capacity}</div>
        <div className="text-[1rem] font-semibold text-[#222] mb-1">Descripción</div>
        <div className="text-[0.97rem] text-[#222]/85 leading-snug mb-4">{product.desc}</div>
      </div>
      <div className="w-full bg-accent-300 shadow px-6 py-4 absolute left-0 bottom-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-black text-lg font-bold">{qty} producto{qty > 1 ? 's' : ''}</span>
          <span className="text-black text-lg font-bold">${totalPrice}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="flex items-center bg-white rounded-[16px] px-2 py-1 gap-2 justify-center h-10 items-center">
            <button
              className={`text-[#222] text-lg font-bold w-7 h-7 flex items-center justify-center${qty === 1 ? ' opacity-60' : ''}`}
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              <LuMinus className="w-5 h-5" />
            </button>
            <span className="text-[1.1rem] text-[#222] font-bold min-w-[18px] text-center h-full flex items-center justify-center">{qty}</span>
            <button
              className="text-[#222] text-lg font-bold w-7 h-7 flex items-center justify-center"
              onClick={() => setQty(qty + 1)}
            >
              <LuPlus className="w-5 h-5" />
            </button>
          </div>
          <button
            className="text-accent-300 col-span-2 bg-white text-lm font-bold rounded-[16px] px-4 h-10 shadow flex items-center gap-2 justify-center"
            onClick={() => onAddToCart(product, qty)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
} 