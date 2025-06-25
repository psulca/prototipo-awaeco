import React from "react";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-3 bg-[#F8F6E6]">
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-gray-500 font-medium">¡Escoge tu botella Awaeco!</span>
        <span className="text-[22px] font-bold text-[#222] flex items-center gap-1">Hola, Piero</span>
      </div>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <Image
          className="w-10 h-10 rounded-full bg-pink-100 object-cover"
          src="/im4.jpg"
          alt="Avatar"
          width={40}
          height={40}
        />
        <span className="absolute top-1 right-1 w-3 h-3 bg-accent-300 rounded-full border-2 border-white"></span>
      </div>
    </div>
  );
} 