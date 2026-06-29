"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data"; 
import ProductCard from "@/components/ProductCard";

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

export default function ProductsPage() {
  // تخزين المنتجات في localStorage عند تحميل الصفحة
  useEffect(() => {
    if (products && products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, []); // [] تعني أن هذا الكود سيعمل مرة واحدة فقط عند تحميل الصفحة

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-[#5c3e31] mb-8">استعراض المنتجات</h1>
      
      <Suspense fallback={<p>جاري تحميل المنتجات...</p>}>
        <ProductList />
      </Suspense>
    </main>
  );
}