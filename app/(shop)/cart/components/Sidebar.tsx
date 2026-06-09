"use client";

import Sidebar from "@/app/(shop)/cart/components/Sidebar";
import HeroBanner from "@/app/(shop)/cart/components/HeroBanner";
import AmazonSection from "@/app/(shop)/cart/components/AmazonSection";
import ElectronicsSection from "@/app/(shop)/cart/components/ElectronicsSection";
import WritingToolsSection from "@/app/(shop)/cart/components/WritingToolsSection";
import PaperSuppliesSection from "@/app/(shop)/cart/components/PaperSuppliesSection";

export default function StorePage() {
  const bestSellers = [
    { title: "ورق HP", price: "25 ر.س", image: "/paper.jpg" },
    { title: "شريط لاصق", price: "45 ر.س", image: "/tape.jpg" }
  ];

  return (
    <main className="bg-gray-100 min-h-screen" dir="rtl">
      {/* 1. البانر العلوي */}
      <HeroBanner />
      
      {/* 2. الحاوية الرئيسية (القائمة الجانبية + المنتجات) */}
      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-6 items-start">
        
        {/* السايدبار (القائمة الجانبية) */}
        <aside className="w-1/4 sticky top-6">
          <Sidebar />
        </aside>

        {/* منطقة المنتجات */}
        <div className="w-3/4 space-y-6">
          <AmazonSection title="الأكثر مبيعاً في المستلزمات المكتبية" products={bestSellers} />
          <ElectronicsSection />
          <WritingToolsSection />
          <PaperSuppliesSection />
        </div>
      </div>
    </main>
  );
}