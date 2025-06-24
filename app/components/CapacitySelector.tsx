import React from "react";

type Props = {
  capacities: string[];
  selected: string;
  onSelect: (cap: string) => void;
};

export default function CapacitySelector({ capacities, selected, onSelect }: Props) {
  return (
    <div className="px-5 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[16px] font-semibold text-[#222]">Capacidad</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        <button
          className={`px-4 h-6 rounded-full text-[11px] font-medium flex items-center justify-center transition-colors text-[#222] border-none outline-none shadow-sm whitespace-nowrap ${!selected ? 'bg-principal-500 font-semibold' : 'bg-white'}`}
          onClick={() => onSelect("")}
        >
          Todas
        </button>
        {capacities.map((cap) => (
          <button
            key={cap}
            className={`w-12 h-6 rounded-full text-[11px] font-medium flex items-center justify-center transition-colors px-0 text-[#222] border-none outline-none shadow-sm whitespace-nowrap ${selected === cap ? 'bg-principal-500 font-semibold' : 'bg-white'}`}
            onClick={() => onSelect(cap)}
          >
            {cap}
          </button>
        ))}
      </div>
    </div>
  );
} 