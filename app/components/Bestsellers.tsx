import React from "react";

type Bestseller = {
  cap: string;
};

type Props = {
  bestsellers: Bestseller[];
};

export default function Bestsellers({ bestsellers }: Props) {
  return (
    <div className="px-5 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[16px] font-semibold text-[#222]">Más vendidos</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        {bestsellers.map((b, i) => (
          <div
            key={i}
            className="min-w-[80px] max-w-[80px] aspect-square bg-principal-300 border border-[#222] rounded-[14px] flex items-end justify-center relative"
          >
            <img
              src={`https://placehold.co/80x80?text=Botella+${b.cap}`}
              alt={`Botella ${b.cap}`}
              className="w-full h-full object-cover rounded-[14px] bg-principal-100"
            />
            <span className="absolute left-2 bottom-2 bg-accent-100 text-[#222] text-[11px] font-semibold rounded-[8px] px-2 py-0.5 shadow-sm border-none min-w-[16px] text-center">
              {b.cap}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 