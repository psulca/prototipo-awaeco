import React from "react";

type CartItem = {
  img: string;
  title: string;
  capacity: string;
  price: string;
  desc: string;
  qty: number;
};

type Props = {
  cart: CartItem[];
  onViewCart: () => void;
};

export default function CartBar({ cart, onViewCart }: Props) {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty, 0).toFixed(2);
  return (
    <div className="w-full bg-principal-500 px-6 py-4 grid grid-cols-4 items-center justify-between absolute left-0 bottom-0 z-10 gap-2 shadow-[0_-6px_12px_-4px_rgba(0,0,0,0.12)]">
      <div className="col-span-1 flex flex-col items-start justify-center">
        <span className="text-[#222] text-xs font-normal">{totalQty} producto{totalQty > 1 ? 's' : ''}</span>
        <span className="text-[#222] text-lg font-bold">${total}</span>
      </div>
      <button className="text-principal-500 col-span-3 bg-white text-lm font-bold rounded-[16px] px-4 h-10 flex items-center gap-2 justify-center" onClick={onViewCart}>
        Ver carrito
      </button>
    </div>
  );
} 