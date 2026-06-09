"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CategoryDropdown from "./category-dropdown";

const categories = [
  { 
    slug: "shoes", 
    translationKey: "home_page", 
    items: ["home_page", "sports"] 
  },
  { 
    slug: "electronics", 
    translationKey: "electronics", 
    items: ["electronics"] 
  },
  { 
    slug: "beauty", 
    translationKey: "beauty", 
    items: ["beauty"] 
  },
  { 
    slug: "clothes", 
    translationKey: "clothes", 
    items: ["clothes"] 
  },
];

const staticLinks = ["deals", "sports", "home"];

export default function CategoryBar() {
  const { t } = useTranslation();
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <div className="bg-[#ebd2c3] relative z-50 px-6 py-2 border-b border-[#dfc4b5]">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
        
        <Link
          href="/products"
          className="text-[#5c3e31] text-sm px-3 py-1 border border-transparent hover:border-[#dfc4b5] hover:bg-white/50 rounded-lg whitespace-nowrap flex items-center gap-1 font-extrabold shrink-0 transition"
        >
          <svg className="w-4 h-4 text-[#5c3e31] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {t("all")}
        </Link>

        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="relative shrink-0"
            onMouseEnter={() => setOpenCat(cat.slug)}
            onMouseLeave={() => setOpenCat(null)}
          >
            <button className="text-[#5c3e31] text-sm px-3 py-1 border border-transparent hover:border-[#dfc4b5] hover:bg-white/50 rounded-lg whitespace-nowrap flex items-center gap-1 font-bold transition">
              {t(cat.translationKey)}
              <span className="text-[10px] text-[#8a6d5f]">▾</span>
            </button>

            {openCat === cat.slug && <CategoryDropdown category={cat} />}
          </div>
        ))}

        {staticLinks.map((linkKey) => (
          <Link
            key={linkKey}
            href="/products"
            className="text-[#5c3e31] text-sm px-3 py-1 border border-transparent hover:border-[#dfc4b5] hover:bg-white/50 rounded-lg whitespace-nowrap font-bold shrink-0 transition"
          >
            {t(linkKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}