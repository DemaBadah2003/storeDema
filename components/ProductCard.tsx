"use client";
import Link from "next/link";
import Image from "next/image"; // 1. استيراد المكون
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(179,109,57,0.1)] hover:border-[#b36d39]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* 2. منطقة الصورة المعدلة */}
      <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/40 h-44 relative overflow-hidden group">
        <Image
          src={product.image} // المسار من بيانات المنتج (مثل '/shoes.jpg')
          alt={product.nameAr} // استخدام الاسم العربي للـ accessibility
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#b36d39] mb-1.5 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-sm font-bold text-[#5c3e31] line-clamp-2 mb-2 leading-snug hover:text-[#b36d39] transition-colors">
            {product.nameAr} {/* تم التعديل لعرض الاسم العربي */}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#d48c56] text-xs">★★★★★</span>
            <span className="text-[11px] font-semibold text-[#8a6d5f]">(128)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xs text-[#8a6d5f] line-through font-medium">
              {Math.round(product.price * 1.3)}₪
            </span>
            <span className="text-lg font-black text-[#a0522d]">
              {product.price}₪
            </span>
            <span className="text-[11px] bg-[#e49b73]/20 text-[#a0522d] px-2 py-0.5 rounded-md font-bold">
              وفر 23%
            </span>
          </div>
        </div>

        <div>
          <button
            onClick={() => addItem(product)}
            className="w-full bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] text-white text-xs font-bold py-2.5 rounded-xl shadow-[0_4px_10px_rgba(179,109,57,0.2)] transition-all duration-300 active:scale-95"
          >
            أضف للسلة
          </button>

          <Link
            href={`/products/${product.id}`}
            className="block w-full mt-3 text-center text-xs font-bold text-[#8a6d5f] hover:text-[#b36d39] hover:underline transition-colors"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}