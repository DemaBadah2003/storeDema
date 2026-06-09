"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useTranslation } from "react-i18next"; // 👈 استيراد الـ hook الخاص بالترجمة

export default function CartButton() {
  const { t, i18n } = useTranslation(); // 👈 تفعيل الترجمة ومعرفة اللغة الحالية
  const [isMounted, setIsMounted] = useState(false);
  const cartCount = useCartStore((state) => state.count());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const count = isMounted ? cartCount : 0;
  const isRtl = i18n.language === "ar";

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-3 border border-transparent hover:border-[#dfc4b5] hover:bg-white/40 rounded-xl px-4 py-1 min-w-fit transition"
    >
      <div className="relative">
        <svg 
          className="w-8 h-8 text-[#5c3e31]" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.8}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4m-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d48c56] to-[#b36d39] text-white text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-in fade-in zoom-in duration-200">
            {count}
          </span>
        )}
      </div>
      
      {/* 🛠️ نصوص السلة مترجمة ديناميكياً بناءً على ملف الـ config */}
      <div className={`flex flex-col justify-center ${isRtl ? "text-right" : "text-left"}`}>
        <span className="text-[#8a6d5f] text-[11px] font-semibold">
          {isRtl ? `${count} ${t("cart_items")}` : `${count} ${t("cart_items")}`}
        </span>
        <span className="text-[#5c3e31] font-black text-sm leading-tight">
          {t("cart")}
        </span>
      </div>
    </Link>
  );
}