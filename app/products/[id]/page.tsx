"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import AddToCartSection from "@/components/AddToCartSection";
import { products as localData } from "@/lib/data"; // استيراد البيانات كخطة بديلة
import { Product } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. محاولة البحث في localStorage
    const storedData = localStorage.getItem("products");
    let foundProduct = null;

    if (storedData) {
      const products: Product[] = JSON.parse(storedData);
      foundProduct = products.find((p) => String(p.id) === String(id));
    }

    // 2. إذا لم يوجد في localStorage، ابحث في الملف مباشرة
    if (!foundProduct) {
      foundProduct = localData.find((p) => String(p.id) === String(id));
    }

    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;
  if (!product) return <div className="text-center py-20">عذراً، المنتج غير موجود.</div>;

  return (
    <div className="min-h-screen bg-[#fdf8f5] py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg grid md:grid-cols-2 gap-8">
        <Image src={product.image} alt={product.name} width={400} height={400} className="rounded-2xl" />
        <div>
          <h1 className="text-3xl font-black text-[#5c3e31]">{product.nameAr}</h1>
          <p className="text-xl text-[#a0522d] my-4">{product.price}₪</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <AddToCartSection product={product} />
        </div>
      </div>
    </div>
  );
}