import React, { useState } from "react";
import { FaCcMastercard, FaCcPaypal, FaGoogle, FaApple } from "react-icons/fa";
import { LuQrCode, LuChevronLeft } from "react-icons/lu";
import MastercardIcon from "./MastercardIcon";
import VisaIcon from "./VisaIcon";
import GooglePayIcon from "./GooglePayIcon";
import ApplePayIcon from "./ApplePayIcon";
import PaypalIcon from "./PaypalIcon";

const paymentMethods = [
  {
    name: "Mastercard",
    icon: MastercardIcon,
    configured: true,
    cardHolder: "Darlene Robertson",
    cardNumber: "2574 909452 98201",
    bg: "bg-[#222] text-white",
  },
  {
    name: "Visa",
    icon: VisaIcon,
    configured: false,
    bg: "bg-[#e3eafe] text-[#222]",
  },
  {
    name: "Google Pay",
    icon: GooglePayIcon,
    configured: false,
    bg: "bg-[#23272f] text-white",
  },
  {
    name: "Apple Pay",
    icon: ApplePayIcon,
    configured: false,
    bg: "bg-white text-white",
  },
  {
    name: "PayPal",
    icon: PaypalIcon,
    configured: false,
    bg: "bg-[#e0f2fe] text-[#222]",
  },
];

function getCarouselIndices(center: number, length: number) {
  // Returns [left, center, right] indices for infinite carousel
  const left = (center - 1 + length) % length;
  const right = (center + 1) % length;
  return [left, center, right];
}

export default function ConfirmOrderScreen({ total = 34.15, onConfirm, onBack }: { total?: number; onConfirm?: () => void, onBack?: () => void }) {
  const [current, setCurrent] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = e.changedTouches[0].clientX - dragStart;
    if (diff > 40) setCurrent((prev) => (prev - 1 + paymentMethods.length) % paymentMethods.length);
    else if (diff < -40) setCurrent((prev) => (prev + 1) % paymentMethods.length);
    setDragStart(null);
  };

  const [leftIdx, centerIdx, rightIdx] = getCarouselIndices(current, paymentMethods.length);
  const showCards = [leftIdx, centerIdx, rightIdx];

  return (
    <div className="w-[375px] h-[812px] bg-principal-100 rounded-[32px] shadow-xl flex flex-col overflow-hidden relative animate-fadeIn">
      <div className="flex items-center justify-between px-5 pt-5 pb-2 mb-4">
        <button className="text-[#222] text-base font-medium" onClick={onBack}>
          <LuChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg text-[#222]">Confirmar pedido</span>
        <div className="w-5"></div>
      </div>
      <div className="flex-1 flex flex-col gap-4 px-5 pb-5">
        {/* Carrusel de métodos de pago */}
        <div className="flex justify-center items-center relative h-[170px] select-none overflow-x-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {showCards.map((idx, i) => {
            const method = paymentMethods[idx];
            const Icon = method.icon;
            const isCenter = idx === centerIdx;
            const z = isCenter ? 30 : 20;
            const scale = isCenter ? "scale-100" : "scale-90";
            let position = "";
            if (i === 0) position = "left-0 -translate-x-1/2";
            else if (i === 1) position = "left-1/2 -translate-x-1/2";
            else if (i === 2) position = "left-full -translate-x-1/2";
            const shadow = isCenter ? "shadow-2xl" : "shadow";
            const border = "border-none";
            return (
              <div
                key={method.name}
                className={`absolute top-0 w-[240px] h-[150px] p-4 ${position} ${scale} ${shadow} ${border} ${method.bg} rounded-2xl flex flex-col justify-center transition-all duration-500 ease-in-out`}
                style={{ zIndex: z, opacity: isCenter ? 1 : 0.7 }}
              >
                { !method.configured && <Icon className="w-12 h-12 mb-2" /> }
                {method.configured ? (
                  <div className="flex flex-col h-full justify-between w-full">
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-sm opacity-80">Saldo actual</span>
                      <LuQrCode className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="flex flex-col justify-end">
                        <span className="block text-[10px] text-white/80 leading-tight mb-0.5">{method.cardHolder}</span>
                        <span className="text-xs font-bold font-mono leading-tight">{method.cardNumber}</span>
                      </div>
                      <MastercardIcon className="w-12 h-12 ml-4" />
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-xs text-gray-500 mt-2">Agregar método de pago</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        {/* Total a pagar */}
        <div className="flex items-center justify-between mt-2 mb-2">
          <span className="text-[15px] text-[#222] font-semibold">Total a pagar</span>
          <span className="text-[20px] font-bold text-principal-500">${total.toFixed(2)} <span className="text-xs font-normal text-[#888]">USD</span></span>
        </div>
        {/* Dirección de envío */}
        <div>
          <span className="text-[13px] text-[#222] font-semibold mb-2 block">Enviar a</span>
          <div className="flex items-center bg-white rounded-xl p-3 shadow border border-[#eee]">
            <div className="flex-1">
              <span className="block text-[13px] font-semibold text-[#222] mb-1">Residencia</span>
              <span className="block text-xs text-[#666]">3891 Ranchview Dr, Richardson, California 62639</span>
            </div>
            <span className="w-12 h-12 bg-principal-300 rounded-xl flex items-center justify-center ml-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2ec4b6"/><path d="M12 8a4 4 0 100 8 4 4 0 000-8z" fill="#fff"/></svg>
            </span>
          </div>
        </div>
        {/* Botón confirmar */}
        <button onClick={onConfirm} className="mt-auto w-full bg-accent-300 text-white font-bold rounded-xl py-3 text-lg shadow transition active:scale-95">Confirmar pedido</button>
      </div>
    </div>
  );
} 