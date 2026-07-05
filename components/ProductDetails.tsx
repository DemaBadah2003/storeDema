"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

export default function ProductDetails({ product }: { product: Product }) {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);

  const isArabic = i18n.language === "ar";
  const displayName = isArabic ? product.nameAr : product.name;
  const displayCategory = isArabic ? product.category : t(product.categorySlug);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(t("added_to_cart_toast"), {
      description: displayName,
      duration: 3000,
      style: {
        background: "#b36d39",
        color: "#fff",
        border: "1px solid #9e5c2d",
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* صورة المنتج */}
      <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/40 rounded-2xl relative overflow-hidden h-96 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <Image
          src={product.image}
          alt={displayName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="flex flex-col justify-center gap-4">
        <p className="text-xs font-bold text-[#b36d39] uppercase tracking-wider">
          {displayCategory}
        </p>

        <h1 className="text-2xl md:text-3xl font-black text-[#5c3e31] leading-snug">
          {displayName}
        </h1>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-[#a0522d]">
            {product.price}₪
          </span>
        </div>

        <p
          className={`text-sm font-bold ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${t("in_stock")} (${product.stock})`
            : t("out_of_stock")}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-4 bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-[0_4px_10px_rgba(179,109,57,0.2)] transition-all duration-300 active:scale-95"
        >
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
}