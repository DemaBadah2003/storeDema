"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data"; // تأكد أن ملف البيانات يحتوي على المنتجات
import ProductCard from "@/components/ProductCard";

function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // التقاط الفئة من الرابط

  // فلترة المنتجات بناءً على الفئة (تأكد أن البيانات تحتوي على categorySlug)
  const filteredProducts = category
    ? products.filter((p) => p.categorySlug === category)
    : products;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 py-10">لا توجد منتجات في هذه الفئة حالياً.</p>
      )}
    </div>
  );
}

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