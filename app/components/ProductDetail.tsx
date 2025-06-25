"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuMinus, LuPlus, LuChevronLeft } from "react-icons/lu";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

// Placeholder 3D model (simple box)
function Bottle3D({ textureUrl }: { textureUrl: string }) {
  const texture = textureUrl ? useLoader(TextureLoader, textureUrl) : undefined;
  return (
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial map={texture} color={!texture ? '#ccc' : undefined} />
    </mesh>
  );
}

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

const designProposals = [
  "/im1.png",
  "/im2.png",
  "/im3.png"
];

export default function ProductDetail({ product, qty, setQty, onClose, onAddToCart }: Props) {
  const totalPrice = (parseFloat(product.price.replace(/[^\d.]/g, "")) * qty).toFixed(2);
  const [showModal, setShowModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<string>("");
  const [uploadedDesign, setUploadedDesign] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedDesign(url);
      setSelectedDesign(url);
    }
  };

  return (
    <div className="w-[375px] h-[812px] bg-principal-100 rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative animate-fadeIn">
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <button className="text-[#222] text-[17px] font-medium" onClick={onClose}>
          <LuChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-6"></div>
      </div>
      <div className="flex flex-col items-center mt-3 mb-6">
        <div className="w-[240px] h-[240px] bg-white rounded-[32px] shadow flex items-center justify-center relative">
          <Image
            className="w-[180px] h-[200px] object-contain rounded-[20px]"
            src={product.img}
            alt={product.title}
            width={180}
            height={200}
          />
          <button className="absolute top-5 right-5 bg-white rounded-full w-11 h-11 flex items-center justify-center shadow text-[#EA7A53] text-[20px] border-none">
            &#9825;
          </button>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-principal-500 text-white rounded-full font-semibold shadow hover:bg-principal-600 transition"
          onClick={() => setShowModal(true)}
        >
          Personalizar
        </button>
      </div>
      <div className="flex-1 flex flex-col px-5 pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[22px] font-bold text-[#222]">{product.title}</span>
          <span className="flex items-center gap-1 text-yellow-400 text-[20px]">
            &#9733;&#9733;&#9733;&#9733;&#9734;
            <span className="text-[15px] text-[#222]/55 ml-2">(128 Reviews)</span>
          </span>
        </div>
        <div className="text-[17px] text-[#222]/55 mb-3">Capacidad: {product.capacity}</div>
        <div className="text-[20px] font-semibold text-[#222] mb-2">Descripción</div>
        <div className="text-[17px] text-[#222]/85 leading-snug mb-6">{product.desc}</div>
      </div>
      <div className="w-full bg-principal-500 px-6 py-4 absolute left-0 bottom-0 z-10 shadow-[0_-6px_12px_-4px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-black text-lg font-bold">{qty} producto{qty > 1 ? 's' : ''}</span>
          <span className="text-black text-lg font-bold">${totalPrice}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="flex items-center bg-white rounded-[16px] px-2 py-1 gap-2 justify-center h-10">
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
            className="text-principal-500 col-span-2 bg-white text-lm font-bold rounded-[16px] px-4 h-10 shadow flex items-center gap-2 justify-center"
            onClick={() => onAddToCart(product, qty)}
          >
            Agregar
          </button>
        </div>
      </div>
      {/* Modal de personalización */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeInModal">
          {/* Fondo con gradiente y desenfoque */}
          <div className="absolute inset-0 bg-gradient-to-br from-principal-100/80 via-white/90 to-principal-200/90 backdrop-blur-[2px]" />
          <div className="relative bg-white rounded-3xl shadow-2xl p-7 w-[350px] max-w-full border border-principal-100 flex flex-col gap-5 animate-popIn">
            <button className="absolute top-3 right-3 text-3xl text-principal-500 hover:bg-principal-100 rounded-full w-10 h-10 flex items-center justify-center transition" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-1 text-principal-500 text-center tracking-tight">Personaliza tu botella</h3>
            {/* Selección de diseño */}
            <div>
              <div className="mb-2 text-sm font-semibold text-[#222]">Elige un diseño:</div>
              <div className="flex gap-3 mb-3 justify-center">
                {designProposals.map((img, idx) => (
                  <button
                    key={img}
                    className={`rounded-xl border-2 transition-all duration-150 shadow-sm bg-principal-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-principal-300 ${selectedDesign === img ? 'border-principal-500 ring-2 ring-principal-200 scale-110' : 'border-transparent'}`}
                    onClick={() => setSelectedDesign(img)}
                  >
                    <Image src={img} alt={`Propuesta ${idx + 1}`} width={56} height={56} className="rounded-xl object-cover w-14 h-14" />
                  </button>
                ))}
              </div>
              <div className="mb-2 text-sm font-semibold text-[#222]">O sube tu propio diseño:</div>
              <label className="block w-full cursor-pointer">
                <span className="inline-block w-full bg-principal-500 text-white rounded-xl py-3 font-bold text-lg shadow-lg hover:bg-principal-600 active:scale-95 transition text-center">Seleccionar archivo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {uploadedDesign && <span className="block mt-2 text-xs text-principal-500">Archivo seleccionado</span>}
              </label>
            </div>
            {/* Separador visual */}
            <div className="border-t border-principal-100 my-2" />
            {/* Simulación 3D */}
            <div>
              <div className="text-sm font-semibold mb-2 text-[#222]">Simulación 3D:</div>
              <div className="w-full h-40 bg-gradient-to-br from-principal-100 via-white to-principal-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 4] }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 5, 5]} />
                  <OrbitControls enablePan={false} />
                  <Bottle3D textureUrl={selectedDesign || product.img} />
                </Canvas>
              </div>
            </div>
            <button className="w-full bg-principal-500 text-white rounded-xl py-3 font-bold text-lg shadow-lg mt-2 hover:bg-principal-600 active:scale-95 transition" onClick={() => setShowModal(false)}>
              Guardar personalización
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 