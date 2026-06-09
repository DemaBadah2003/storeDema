"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

// 👈 قمنا بتحديث الـ Interface هنا ليتطابق مع البيانات الجديدة بدقة
interface CategoryDropdownProps {
  category: {
    slug: string;
    translationKey: string;
    items?: string[];
  };
}

export default function CategoryDropdown({ category }: CategoryDropdownProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className="absolute top-full right-0 bg-white/95 backdrop-blur-md border border-[#dfc4b5] shadow-xl min-w-[220px] z-50 rounded-xl overflow-hidden mt-1 animate-fadeIn">
      
      {/* عنوان القائمة المترجم */}
      <div className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] text-white text-xs font-bold px-4 py-2.5 text-right">
        {t(category.translationKey)}
      </div>
      
      {/* عرض العناصر الفرعية المترجمة */}
      {category?.items?.map((itemKey) => (
        <Link
          key={itemKey}
          href={`/products?category=${category.slug}`}
          className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#fff7f2] hover:text-[#b36d39] text-right border-b border-gray-100 last:border-0 font-medium transition-colors"
        >
          {t(itemKey)}
        </Link>
      ))}
      
      {/* زر عرض الكل المترجم */}
      <Link
        href={`/products?category=${category.slug}`}
        className="block px-4 py-2.5 text-xs text-[#b36d39] hover:underline bg-[#fbf5f1] font-bold text-right border-t border-[#dfc4b5]"
      >
        {isRtl ? `عرض كل ${t(category.translationKey)} ←` : `View all ${t(category.translationKey)} →`}
      </Link>
    </div>
  );
}