"use client"; // ضروري لاستخدام hooks مثل useSearchParams

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data"; // تأكدي من مسار الاستيراد الصحيح
import ProductCard from "@/components/ProductCard"; // تأكدي من مسار الاستيراد الصحيح

// 1. المكون الداخلي الذي يستخدم الـ Hooks
function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter((p) => p.categorySlug === category)
    : products;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 2. هذا هو الـ Default Export الذي يبحث عنه Next.js
export default function ProductsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-[#5c3e31] mb-8">استعراض المنتجات</h1>
      
      {/* الـ Suspense مطلوب عند استخدام useSearchParams */}
      <Suspense fallback={<p>جاري تحميل المنتجات...</p>}>
        <ProductList />
      </Suspense>
    </main>
  );
}