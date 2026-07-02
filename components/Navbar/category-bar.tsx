"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CategoryDropdown from "./category-dropdown";
import { categories } from "./config";

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

        {/* قائمة الفئات الثمانية */}
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="relative shrink-0"
            onMouseEnter={() => setOpenCat(cat.slug)}
            onMouseLeave={() => setOpenCat(null)}
          >
            <Link 
              href={`/products?category=${cat.slug}`}
              className="text-[#5c3e31] text-sm px-3 py-1 hover:bg-white/50 rounded-lg flex items-center gap-1 font-bold transition"
            >
              <span>{cat.icon}</span>
              {t(cat.slug, cat.name)}
              <span className="text-[10px] text-[#8a6d5f]">▾</span>
            </Link>

            {openCat === cat.slug && (
              <CategoryDropdown
                category={{
                  slug: cat.slug,
                  translationKey: cat.slug,
                  items: cat.items,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}