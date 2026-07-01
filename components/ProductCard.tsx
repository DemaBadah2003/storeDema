"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success("تمت الإضافة للسلة! 🛒", {
      description: product.nameAr,
      duration: 3000,
      style: {
        background: "#b36d39",
        color: "#fff",
        border: "1px solid #9e5c2d",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#b36d39",
      },
    });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(179,109,57,0.1)] hover:border-[#b36d39]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* صورة المنتج — قابلة للضغط */}
      <Link href={`/products/${product.id}`}>
        <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/40 h-44 relative overflow-hidden group cursor-pointer">
          <Image
            src={product.image}
            alt={product.nameAr}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#b36d39] mb-1.5 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="text-sm font-bold text-[#5c3e31] line-clamp-2 mb-2 leading-snug">
            {product.nameAr}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-[#a0522d]">{product.price}₪</span>
          </div>
        </div>

        {/* زرين جنب بعض */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] text-white text-xs font-bold py-2.5 rounded-xl shadow-[0_4px_10px_rgba(179,109,57,0.2)] transition-all duration-300 active:scale-95"
          >
            أضف للسلة
          </button>

          <Link
            href={`/products/${product.id}`}
            className="flex-1 border border-[#b36d39] text-[#b36d39] hover:bg-[#b36d39] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all duration-300 text-center"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}