"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { motion as motionSvg } from "motion/react";
import Topbar from "./components/Topbar";
import Bestsellers from "./components/Bestsellers";
import CustomDesignBanner from "./components/CustomDesignBanner";
import CapacitySelector from "./components/CapacitySelector";
import ProductsGrid from "./components/ProductsGrid";
import ProductDetail from "./components/ProductDetail";
import CartBar from "./components/CartBar";
import CartScreen from "./components/CartScreen";
import ConfirmOrderScreen from "./components/ConfirmOrderScreen";

type Product = {
  img: string;
  title: string;
  capacity: string;
  price: string;
  desc: string;
};
type CartItem = Product & { qty: number };

const products = [
  {
    img: "https://placehold.co/80x80?text=Bottle1",
    title: "Custom Bottle1",
    capacity: "1L",
    price: "$12.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
  {
    img: "https://placehold.co/80x80?text=Bottle2",
    title: "Custom Bottle2",
    capacity: "1.5L",
    price: "$19.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
  {
    img: "https://placehold.co/80x80?text=Tote",
    title: "Custom Tote Bag",
    capacity: "2L",
    price: "$15.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
  {
    img: "https://placehold.co/80x80?text=Bottle3",
    title: "Custom Bottle3",
    capacity: "1L",
    price: "$3.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
  {
    img: "https://placehold.co/80x80?text=Bottle4",
    title: "Custom Bottle4",
    capacity: "2L",
    price: "$22.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
  {
    img: "https://placehold.co/80x80?text=Bottle5",
    title: "Eco Bottle5",
    capacity: "1.5L",
    price: "$17.99",
    desc: "Botella reutilizable de alta calidad, perfecta para mantener tus bebidas frías o calientes durante horas. Personalízala a tu gusto y cuida el planeta con estilo.",
  },
];

const bestsellers = [
  { cap: "1L" },
  { cap: "1.5L" },
  { cap: "2L" },
  { cap: "1L" },
];

const capacities = ["1L", "1.5L", "2L"];

export default function Home() {
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [detailProduct, setDetailProduct] = useState(products[0]);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Navegación
  const showDetailScreen = (product: Product) => {
    setDetailProduct(product);
    setQty(1);
    setShowDetail(true);
  };
  const hideDetailScreen = () => setShowDetail(false);
  const showCartScreen = () => setShowCart(true);
  const hideCartScreen = () => setShowCart(false);
  const showConfirmScreen = () => setShowConfirmOrder(true);
  const hideConfirmScreen = () => setShowConfirmOrder(false);

  // Calcular total del carrito
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty, 0);
  const shipping = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#e5e5e5] py-8">
      <div className={`flex flex-row gap-8`}>
        <AnimatePresence mode="wait">
          {!showDetail && !showCart && !showConfirmOrder && !showOrderSuccess && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              className="w-[375px] h-[812px] bg-principal-100 rounded-[32px] shadow-xl flex flex-col overflow-hidden relative"
            >
              <Topbar />
              <Bestsellers bestsellers={bestsellers} />
              <CustomDesignBanner />
              <CapacitySelector
                capacities={capacities}
                selected={selectedCapacity}
                onSelect={setSelectedCapacity}
              />
              <ProductsGrid
                products={selectedCapacity ? products.filter((p) => p.capacity === selectedCapacity) : products}
                onProductClick={showDetailScreen}
              />
              {cart.length > 0 && (
                <CartBar cart={cart} onViewCart={showCartScreen} />
              )}
            </motion.div>
          )}
          {showDetail && !showCart && !showConfirmOrder && !showOrderSuccess && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              className="w-[375px] h-[812px]"
            >
              <ProductDetail
                product={detailProduct}
                qty={qty}
                setQty={setQty}
                onClose={hideDetailScreen}
                onAddToCart={(product, quantity) => {
                  setCart((prev) => {
                    const existing = prev.find((item) => item.title === product.title);
                    if (existing) {
                      return prev.map((item) =>
                        item.title === product.title
                          ? { ...item, qty: item.qty + quantity }
                          : item
                      );
                    } else {
                      return [...prev, { ...product, qty: quantity }];
                    }
                  });
                  hideDetailScreen();
                }}
              />
            </motion.div>
          )}
          {showCart && !showConfirmOrder && !showOrderSuccess && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              className="w-[375px] h-[812px]"
            >
              <CartScreen 
                cart={cart} 
                onClose={hideCartScreen} 
                setCart={setCart}
                onProceedToCheckout={showConfirmScreen}
              />
            </motion.div>
          )}
          {showConfirmOrder && !showOrderSuccess && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              className="w-[375px] h-[812px]"
            >
              <ConfirmOrderScreen 
                total={total}
                onConfirm={() => {
                  setShowConfirmOrder(false);
                  setCart([]);
                  setShowOrderSuccess(true);
                  setTimeout(() => {
                    setShowOrderSuccess(false);
                    setShowDetail(false);
                    setShowCart(false);
                    setShowConfirmOrder(false);
                  }, 1800);
                }}
                onBack={hideConfirmScreen}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showOrderSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-white/95 z-[9999]"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex flex-col items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="38" fill="#2ec4b6" stroke="#e0e0e0" strokeWidth="2" />
                  <motionSvg.path
                    d="M26 42 L37 53 L56 32"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </svg>
                <span className="mt-6 text-2xl font-bold text-[#222] animate-fadeIn">¡Pedido realizado!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
