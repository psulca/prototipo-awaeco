"use client";
import React from "react";
import Marquee from "react-fast-marquee";

export default function CustomDesignBanner() {
  return (
    <div className="w-full h-11 bg-principal-500 flex items-center px-1 border-t border-b border-[#222] overflow-hidden mt-4">
      <Marquee gradient={false} speed={40} pauseOnHover={false}>
        <span className="text-[#222] font-semibold text-[16px] mx-8">Realiza tu propio diseño</span>
        <span className="text-[#222] font-semibold text-[16px] mx-8">Realiza tu propio diseño</span>
        <span className="text-[#222] font-semibold text-[16px] mx-8">Realiza tu propio diseño</span>
      </Marquee>
    </div>
  );
} 