import React from "react";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-5 bg-principal-100">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-500 font-medium">¡Escoge tu botella Awaeco!</span>
        <span className="text-[16px] font-bold text-[#222] flex items-center gap-1">Hola, Piero</span>
      </div>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <Image
          className="w-7 h-7 rounded-full bg-pink-100 object-cover"
          src="https://i.imgur.com/0y0y0y0.png"
          alt="Avatar"
          width={28}
          height={28}
        />
        <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-accent-300 rounded-full border border-white"></span>
      </div>
    </div>
  );
} 