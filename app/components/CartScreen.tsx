"use client";
import React, { useState } from "react";
import { LuChevronLeft, LuMinus, LuPlus, LuTrash } from "react-icons/lu";
import Image from "next/image";

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
  onClose: () => void;
  setCart: (cart: CartItem[]) => void;
  onProceedToCheckout?: () => void;
};

export default function CartScreen({ cart, onClose, setCart, onProceedToCheckout }: Props) {
  const [swipedItem, setSwipedItem] = useState<number | null>(null);
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty, 0);
  const shipping = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + shipping;

  const handleSwipeStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleSwipeMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentX = touch.clientX;
      const diffX = startX - currentX;
      
      if (diffX > 50) { // Swipe left (reveal delete)
        setSwipedItem(index);
      } else if (diffX < -50) { // Swipe right (hide delete)
        setSwipedItem(null);
      }
    };
    
    const handleSwipeEnd = () => {
      document.removeEventListener('touchmove', handleSwipeMove);
      document.removeEventListener('touchend', handleSwipeEnd);
    };
    
    document.addEventListener('touchmove', handleSwipeMove);
    document.addEventListener('touchend', handleSwipeEnd);
  };

  const handleDelete = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
    setSwipedItem(null);
  };

  const handleLeftButtonClick = (index: number, qty: number) => {
    if (qty === 1) {
      // If quantity is 1, show delete panel
      setSwipedItem(index);
    } else {
      // Otherwise reduce quantity
      setCart(cart.map((p, i) => i === index ? { ...p, qty: p.qty - 1 } : p));
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-[32px] flex flex-col overflow-hidden relative animate-fadeIn">
      <div className="flex items-center justify-between px-5 pt-5 pb-2 mb-4">
        <button className="text-[#222] text-base font-medium" onClick={onClose}>
          <LuChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg text-[#222]">Mi Carrito</span>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {cart.map((item, idx) => {
          const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
          const itemTotal = (itemPrice * item.qty).toFixed(2);
          const isSwiped = swipedItem === idx;
          
          return (
            <div key={item.title} className="relative mb-4 overflow-hidden">
              {/* Delete Panel */}
              <div className={`absolute right-0 top-0 h-full bg-red-500 rounded-xl flex flex-col items-center justify-center px-4 transition-transform duration-300 ${isSwiped ? 'translate-x-0' : 'translate-x-full'}`}>
                <button 
                  onClick={() => handleDelete(idx)}
                  className="flex flex-col items-center text-white"
                >
                  <LuTrash className="w-6 h-6 mb-1" />
                  <span className="text-xs">Eliminar</span>
                </button>
              </div>
              
              {/* Item Content */}
              <div 
                className={`flex items-center bg-principal-100 rounded-xl p-3 shadow-sm relative transition-transform duration-300 ${isSwiped ? '-translate-x-20' : 'translate-x-0'}`}
                onTouchStart={(e) => handleSwipeStart(e, idx)}
              >
                <Image src={item.img} alt={item.title} width={56} height={56} className="w-14 h-14 rounded-lg object-cover mr-3" />
                <div className="flex-1">
                  <div className="font-semibold text-[#222] text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-[#222]/55 mb-1">Capacidad: {item.capacity}</div>
                  <div className="text-principal-500 font-bold text-base">${itemTotal}</div>
                </div>
                <div className="flex items-center ml-2">
                  <button 
                    className="w-7 h-7 rounded-full bg-accent-300 text-white font-bold flex items-center justify-center" 
                    onClick={() => handleLeftButtonClick(idx, item.qty)}
                  >
                    {item.qty === 1 ? <LuTrash className="w-4 h-4" /> : <LuMinus className="w-4 h-4" />}
                  </button>
                  <span className="text-[#222] mx-2 w-6 text-center">{item.qty.toString().padStart(2, '0')}</span>
                  <button className="w-7 h-7 rounded-full bg-accent-300 text-white font-bold flex items-center justify-center" onClick={() => setCart(cart.map((p, i) => i === idx ? { ...p, qty: p.qty + 1 } : p))}>
                    <LuPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {cart.length === 0 && <div className="text-center text-[#222]/50 mt-16">Tu carrito está vacío</div>}
      </div>
      {/* Resumen fuera del scroll */}
      <div className="px-5 pb-20 pt-0 bg-white">
        <div className="flex items-center bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 mb-3">
          <input type="text" placeholder="Código promocional" className="flex-1 outline-none bg-transparent text-sm text-[#222]" />
          <button className="bg-accent-300 text-white font-semibold rounded-lg px-4 py-1 ml-2">Aplicar</button>
        </div>
        <div className="flex justify-between text-sm mb-1 text-[#222]">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-3 text-[#222]">
          <span>Envío:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
      </div>
      {/* Barra fija abajo */}
      <div className="w-full bg-accent-300 shadow px-6 py-4 grid grid-cols-4 items-center justify-between absolute left-0 bottom-0 z-10 gap-2">
        <div className="col-span-1 flex flex-col items-start justify-center">
          <span className="text-[#222] text-xs font-normal">Total</span>
          <span className="text-[#222] text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          className="text-accent-300 col-span-3 bg-white font-bold rounded-[16px] px-4 h-12 shadow flex items-center gap-2 justify-center text-lg transition active:scale-95"
          onClick={onProceedToCheckout}
        >
          Proceder al pago
        </button>
      </div>
    </div>
  );
} 