"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

export default function AddToCartSection({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* حقل الكمية */}
      <div className="flex items-center gap-3">
        <span className="text-[#5c3e31] font-bold">الكمية:</span>
        <div className="flex items-center border border-[#b36d39] rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-[#b36d39] font-black text-lg hover:bg-[#f5e4da] transition"
          >
            −
          </button>
          <span className="px-5 py-2 font-bold text-[#5c3e31]">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 text-[#b36d39] font-black text-lg hover:bg-[#f5e4da] transition"
          >
            +
          </button>
        </div>
      </div>

      {/* زر أضف للسلة */}
      <button
        onClick={handleAdd}
        className="w-full bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 active:scale-95"
      >
        أضف للسلة 🛒
      </button>
    </div>
  );
}