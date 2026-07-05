"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const categories = [
    { icon: "👟", key: "home_category_shoes", slug: "shoes" },
    { icon: "👕", key: "home_category_clothes", slug: "clothes" },
    { icon: "📱", key: "home_category_electronics", slug: "electronics" },
    { icon: "🏠", key: "home_category_home", slug: "home" },
    { icon: "⌚", key: "home_category_watches", slug: "watches" },
    { icon: "👜", key: "home_category_bags", slug: "bags" },
    { icon: "⚽", key: "home_category_sports", slug: "sports" },
    { icon: "💄", key: "home_category_beauty", slug: "beauty" },
  ];

  return (
    // الخلفية الوردية الناعمة (الباستيل الدافئ) المعتمدة في التصميم المقترح
    <div className="bg-[#f3e1d6] min-h-screen text-gray-800 font-sans">

      {/* الشريط العلوي الترويجي — متناسق مع التدرج الوردي */}
      <div className="bg-[#ebd3c5] text-[#7a5a4a] text-center text-xs py-2.5 font-semibold border-b border-[#dfc4b5]">
        {t("home_promo_banner")}
      </div>

      {/* البانر الرئيسي — بخلفية الباستيل الفاتحة المدمجة مع الزخارف الفاخرة المريحة للعين */}
      <section className="bg-gradient-to-b from-[#f7eae1] to-[#f3e1d6] text-gray-900 py-20 px-6 text-center border-b border-[#dfc4b5] relative overflow-hidden">
        <span className="bg-[#e49b73]/20 text-[#a0522d] border border-[#e49b73]/40 text-xs px-4 py-1.5 rounded-full mb-5 inline-block font-bold backdrop-blur-sm">
          {t("home_hero_badge")}
        </span>
        <h1 className="text-4xl font-extrabold mb-5 tracking-tight text-[#5c3e31]">
          {t("home_hero_title")}
        </h1>
        <p className="text-lg text-[#8a6d5f] mb-10 max-w-xl mx-auto font-medium">
          {t("home_hero_subtitle")}
        </p>

        {/* زر "تسوق الآن" الذهبي الفاخر المرتفع ذو الظل الناعم ثلاثي الأبعاد */}
        <Link
          href="/products"
          className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-[#bd7a47] hover:to-[#9e5c2d] transition-all duration-300 inline-block shadow-[0_8px_20px_rgba(179,109,57,0.3)] hover:shadow-[0_12px_24px_rgba(179,109,57,0.45)] hover:-translate-y-0.5"
        >
          {t("home_hero_cta")}
        </Link>
      </section>

      {/* فئات التسوق — بخلفيات وتأثيرات الـ Glassmorphism والتجسيم ثلاثي الأبعاد الناعم */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-bold mb-8 text-[#5c3e31] border-r-4 border-[#b36d39] pr-3">
          {t("home_categories_title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              // كلاسات الـ Glassmorphism والتأثير المرتفع مع الحواف الدائرية الأنيقة
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-[#b36d39] hover:bg-white/90 hover:shadow-[0_10px_25px_rgba(179,109,57,0.12)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                {cat.icon}
              </div>
              <p className="text-sm font-bold text-[#5c3e31] group-hover:text-[#b36d39] transition-colors">
                {t(cat.key)}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}