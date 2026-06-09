"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessAnalyticsDashboard() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [timeDropdown, setTimeDropdown] = useState(false);

  const cards = [
    { title: "مقارنة الإنفاق السنوي" },
    { title: "الإنفاق حسب الفئة" },
    { title: "الإنفاق المتعلق بسياسات الشراء" },
    { title: "الإنفاق مع البائعين الصغار والمتنوعين" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen" dir="rtl">
      {/* الرأس */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">لوحة تحليلات الأعمال</h1>
        <div className="flex items-center gap-4 relative">
          <span className="text-sm text-gray-700">الفترة الزمنية ℹ️</span>
          <button 
            onClick={() => setTimeDropdown(!timeDropdown)}
            className="border px-4 py-2 rounded-lg text-sm bg-white hover:bg-gray-50 border-gray-300 shadow-sm"
          >
            الربع الحالي {timeDropdown ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* البطاقات */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-sm">{card.title} ℹ️</h2>
              <button 
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className="text-xl hover:bg-gray-200 rounded-full w-8 h-8"
              >⋮</button>
            </div>

            {openDropdown === index && (
              <div className="absolute left-6 top-14 bg-white border shadow-lg rounded z-10 w-32">
                <button 
                  onClick={() => router.push('/orders/details')}
                  className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
                >
                  عرض الجدول
                </button>
              </div>
            )}

            <div className="text-center py-10 text-gray-500">
                <p className="font-bold text-lg">لا توجد بيانات</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}