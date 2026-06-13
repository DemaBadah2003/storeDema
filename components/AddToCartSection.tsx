// components/AddToCartSection.tsx
"use client";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types";

export default function AddToCartSection({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full mt-6 bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 text-base"
    >
      🛒 أضف للسلة
    </button>
  );
}