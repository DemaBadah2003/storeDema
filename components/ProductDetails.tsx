"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";
import AddToCartSection from "@/components/AddToCartSection";

export default function ProductDetails({ product }: { product: Product }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const displayName = isArabic ? product.nameAr : product.name;
  const displayCategory = isArabic ? product.category : t(product.categorySlug);

  return (
    <div className="max-w-6xl mx-auto p-6" dir={isArabic ? "rtl" : "ltr"}>
      {/* مسار التنقل */}
      <div className="text-sm text-[#8a6d5f] mb-6">
        <Link href="/products" className="hover:text-[#b36d39] transition">
          {t("breadcrumb_products")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#5c3e31] font-semibold">{displayName}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* صورة المنتج */}
        <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/40 rounded-2xl h-96 relative overflow-hidden">
          <Image
            src={product.image}
            alt={displayName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col">
          <p className="text-xs font-bold text-[#b36d39] uppercase tracking-wider mb-2">
            {displayCategory}
          </p>
          <h1 className="text-2xl font-black text-[#5c3e31] mb-4">
            {displayName}
          </h1>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black text-[#a0522d]">
              {product.price}₪
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            {t("product_default_description")}
          </p>

          <AddToCartSection product={product} />

          <Link
            href="/products"
            className="mt-6 text-sm text-[#b36d39] hover:underline font-semibold text-center"
          >
            {t("back_to_products")}
          </Link>
        </div>
      </div>
    </div>
  );
}