import HeroBanner from "./components/HeroBanner";
import AmazonSection from "./components/AmazonSection";
import BestSellerProduct from "./components/BestSellerProduct";
import Sidebar from "./components/Sidebar"; // تأكد من استيراد المكون الجانبي

export default function StorePage() {
  const bestSellers = [
    { title: "ورق طابعة HP", price: "25.00 ر.س", image: "/paper.jpg" },
    { title: "شريط لاصق سكوتش", price: "45.00 ر.س", image: "/tape.jpg" },
    { title: "حامي أوراق", price: "30.00 ر.س", image: "/sheets.jpg" },
    { title: "أوراق تغليف حراري", price: "55.00 ر.س", image: "/laminate.jpg" },
  ];

  const furnitureProducts = [
    { title: "سدادات أبواب للموكيت والخشب", price: "4.99 ر.س", oldPrice: "5.99 ر.س", image: "/door.jpg", rating: "★★★★☆ 10,743" },
    { title: "مصباح أرضي ذكي", price: "64.98 ر.س", oldPrice: "99.99 ر.س", image: "/lamp.jpg", rating: "★★★★★ 5,820" },
  ];

  return (
    <main className="bg-gray-100 min-h-screen pb-10">
      {/* 1. البانر الرئيسي */}
      <HeroBanner />

      {/* 2. الحاوية الرئيسية (Flex لتوزيع الجانبي والمحتوى) */}
      <div className="max-w-7xl mx-auto -mt-20 px-4 flex gap-6" dir="rtl">
        
        {/* العمود الجانبي (التصنيفات) */}
        <aside className="w-1/4 hidden md:block">
          <Sidebar />
        </aside>

        {/* العمود الرئيسي للمنتجات */}
        <div className="w-full md:w-3/4">
          
          {/* قسم المستلزمات المكتبية */}
          <AmazonSection title="الأكثر مبيعاً في المستلزمات المكتبية" products={bestSellers} />

          {/* قسم الأثاث والإضاءة */}
          <section className="bg-white p-6 mt-6 shadow-sm rounded border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">الأكثر مبيعاً في الأثاث والإضاءة</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {furnitureProducts.map((p, i) => (
                <BestSellerProduct key={i} {...p} />
              ))}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}