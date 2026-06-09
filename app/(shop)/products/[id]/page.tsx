"use client";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      
      <Link href="/products" className="text-blue-600 hover:underline mb-6 block">
        ← العودة للمنتجات
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* صورة */}
        <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center text-8xl">
          🛍️
        </div>

        {/* التفاصيل */}
        <div>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mt-3 text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-600 mt-3 leading-relaxed">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-4">
            {product.price} ₪
          </p>
          <p className="text-sm text-green-600 mt-1">
            ✅ متوفر في المخزن ({product.stock} قطعة)
          </p>
          <button
            onClick={() => addItem(product)}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl 
                       hover:bg-blue-700 transition text-lg font-bold"
          >
            أضف للسلة 🛒
          </button>
        </div>

      </div>
    </div>
  );
}