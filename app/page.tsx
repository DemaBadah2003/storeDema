"use client";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    // الخلفية الوردية الناعمة (الباستيل الدافئ) المعتمدة في التصميم المقترح
    <div className="bg-[#f3e1d6] min-h-screen text-gray-800 font-sans">

      {/* الشريط العلوي الترويجي — متناسق مع التدرج الوردي */}
      <div className="bg-[#ebd3c5] text-[#7a5a4a] text-center text-xs py-2.5 font-semibold border-b border-[#dfc4b5]">
        🚚 شحن مجاني على الطلبات فوق 100₪ — توصيل خلال 24 ساعة
      </div>

      {/* البانر الرئيسي — بخلفية الباستيل الفاتحة المدمجة مع الزخارف الفاخرة المريحة للعين */}
      <section className="bg-gradient-to-b from-[#f7eae1] to-[#f3e1d6] text-gray-900 py-20 px-6 text-center border-b border-[#dfc4b5] relative overflow-hidden">
        <span className="bg-[#e49b73]/20 text-[#a0522d] border border-[#e49b73]/40 text-xs px-4 py-1.5 rounded-full mb-5 inline-block font-bold backdrop-blur-sm">
          عرض محدود 🔥
        </span>
        <h1 className="text-4xl font-extrabold mb-5 tracking-tight text-[#5c3e31]">
          تسوق الآن واحصل على أفضل الأسعار 🛍️
        </h1>
        <p className="text-lg text-[#8a6d5f] mb-10 max-w-xl mx-auto font-medium">
          أكثر من 1000 منتج أصلي بأسعار منافسة لا تُقاوم وبجودة مضمونة
        </p>
        
        {/* زر "تسوق الآن" الذهبي الفاخر المرتفع ذو الظل الناعم ثلاثي الأبعاد */}
        <Link
          href="/products"
          className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-[#bd7a47] hover:to-[#9e5c2d] transition-all duration-300 inline-block shadow-[0_8px_20px_rgba(179,109,57,0.3)] hover:shadow-[0_12px_24px_rgba(179,109,57,0.45)] hover:-translate-y-0.5"
        >
          تسوق الآن ←
        </Link>
      </section>

      {/* فئات التسوق — بخلفيات وتأثيرات الـ Glassmorphism والتجسيم ثلاثي الأبعاد الناعم */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-bold mb-8 text-[#5c3e31] border-r-4 border-[#b36d39] pr-3">
          تسوق حسب الفئة
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { icon: "👟", name: "أحذية" },
            { icon: "👕", name: "ملابس" },
            { icon: "📱", name: "إلكترونيات" },
            { icon: "🏠", name: "المنزل" },
            { icon: "⌚", name: "ساعات" },
            { icon: "👜", name: "حقائب" },
            { icon: "⚽", name: "رياضة" },
            { icon: "💄", name: "جمال" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="/products"
              // كلاسات الـ Glassmorphism والتأثير المرتفع مع الحواف الدائرية الأنيقة
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-[#b36d39] hover:bg-white/90 hover:shadow-[0_10px_25px_rgba(179,109,57,0.12)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">{cat.icon}</div>
              <p className="text-sm font-bold text-[#5c3e31] group-hover:text-[#b36d39] transition-colors">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* كروت ترويجية مدمجة بالكامل مع الهوية اللونية الفاخرة والجديدة للموقع */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* كرت التوصيل السريع — ستايل بلوري ناعم */}
          <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between items-start text-right">
            <div>
              <h3 className="font-extrabold text-xl text-[#5c3e31] mb-2">توصيل سريع ومضمون ⚡</h3>
              <p className="text-sm text-[#8a6d5f] mb-8 font-medium">اشترك الآن في العضوية المميزة واحصل على توصيل مجاني فوراً</p>
            </div>
            <button className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] text-white px-7 py-3 rounded-xl text-sm font-bold hover:from-[#bd7a47] hover:to-[#9e5c2d] transition-all shadow-md hover:shadow-lg">
              سجل الآن
            </button>
          </div>

          {/* كرت عروض اليوم — برتقالي دافئ وذهبي ساحر وعميق */}
          <div className="bg-gradient-to-br from-[#fcf3eb] to-[#f5dfd2] border border-[#e8c8b5] rounded-2xl p-8 shadow-[0_4px_15px_rgba(179,109,57,0.05)] flex flex-col justify-between items-start text-right">
            <div>
              <h3 className="font-extrabold text-xl text-[#b36d39] mb-2">عروض اليوم الحصرية 🔥</h3>
              <p className="text-sm text-[#7a5a4a] mb-8 font-medium">خصومات وتنزيلات كبرى لفترة محدودة جداً تصل حتى 70%</p>
            </div>
            <Link
              href="/products"
              className="bg-gradient-to-r from-[#b36d39] to-[#8c4f22] text-white px-7 py-3 rounded-xl text-sm font-bold inline-block hover:from-[#9e5c2d] hover:to-[#733e17] transition-all shadow-md hover:shadow-lg"
            >
              اكتشف العروض
            </Link>
          </div>

        </div>
      </section>

      {/* المنتجات الأكثر مبيعاً */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-[#5c3e31] border-r-4 border-[#b36d39] pr-3">
            الأكثر مبيعاً
          </h2>
          <Link href="/products" className="text-[#b36d39] text-sm font-bold hover:underline hover:text-[#8c4f22] transition-colors">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}