"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CategoryDropdown from "./category-dropdown";

const categories = [
  // قمت بتغيير translationKey لتكون 'home_page' لتطابق ما هو موجود في ملف الترجمة الخاص بكِ
  { slug: "shoes", translationKey: "shoes", items: ["sports"] },
  { slug: "electronics", translationKey: "electronics", items: ["electronics"] },
  { slug: "beauty", translationKey: "beauty", items: ["beauty"] },
  { slug: "clothes", translationKey: "clothes", items: ["clothes"] },
];

export default function CategoryBar() {
  const { t } = useTranslation();
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <div className="bg-[#ebd2c3] relative z-50 px-6 py-2 border-b border-[#dfc4b5]">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
        
        {/* رابط "الكل" */}
        <Link href="/products" className="text-[#5c3e31] text-sm px-3 py-1 hover:bg-white/50 rounded-lg font-extrabold transition">
          {t("all")}
        </Link>

        {/* قائمة الفئات */}
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="relative shrink-0"
            onMouseEnter={() => setOpenCat(cat.slug)}
            onMouseLeave={() => setOpenCat(null)}
          >
            {/* رابط التنقل الصحيح لصفحة المنتجات مع الفلترة */}
            <Link 
              href={`/products?category=${cat.slug}`}
              className="text-[#5c3e31] text-sm px-3 py-1 hover:bg-white/50 rounded-lg flex items-center gap-1 font-bold transition"
            >
              {/* هنا سيتم عرض كلمة "الأحذية" لأننا استخدمنا مفتاح home_page */}
              {t(cat.translationKey)}
              <span className="text-[10px] text-[#8a6d5f]">▾</span>
            </Link>

            {/* القائمة المنسدلة تظهر عند تمرير الماوس */}
            {openCat === cat.slug && <CategoryDropdown category={cat} />}
          </div>
        ))}
      </div>
    </div>
  );
}