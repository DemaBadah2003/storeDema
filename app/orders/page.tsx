"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/app/(auth)/register/components/DataTable";

type ReportView = null | "business-credit" | "allOrders";

export default function OrdersReportPage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ───────────── الصفحة الرئيسية ─────────────
  return (
    <>
      <div className="p-8 bg-white min-h-screen" dir="rtl">
        <header className="mb-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-6">طلباتك</h1>
          
          {/* شريط البحث */}
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="البحث عن عنصر أو رقم طلب..." 
              className="border border-gray-400 rounded px-4 py-2 w-full max-w-md focus:outline-none" 
            />
            <button className="bg-gray-200 border border-gray-400 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-300">
              البحث عن الطلبات
            </button>
          </div>

          {/* التابات العلوية */}
          <div className="flex gap-8 border-b border-gray-300 mb-6 text-sm">
            <span className="border-b-2 border-orange-500 pb-2 font-medium">الطلبات</span>
          </div>
        </header>

        {/* منطقة الفلترة مع القوائم المنسدلة */}
        <section className="flex items-center gap-4 mb-6">
          <span className="text-sm">عرض 0 طلبات في</span>
          
          <select className="border border-gray-400 rounded px-2 py-1 text-sm bg-gray-50 focus:outline-none">
            <option>كل الطلبات</option>
            <option>كل الطلبات : اسم شركتك</option>
            <option>طلباتك : مدفوعة بواسطة شركتك</option>
            <option>طلباتك : مدفوعة بواسطتك</option>
          </select>

          <select className="border border-gray-400 rounded px-2 py-1 text-sm bg-gray-50 focus:outline-none">
            <option>آخر 3 أشهر</option>
            <option>آخر 30 يوم</option>
            <option>عام 2026</option>
          </select>

          {/* التعديل هنا: عند الضغط يتم الانتقال للمسار المحدد */}
          <button 
            onClick={() => router.push("/orders/report")} 
            className="mr-auto text-blue-700 hover:underline text-sm cursor-pointer"
          >
            عرض تقارير الطلبات
          </button>
        </section>

        <p className="mb-6 text-sm">لم تقم بإجراء أي طلبات في آخر 3 أشهر. <span className="text-blue-700 underline cursor-pointer">عرض الطلبات في عام 2026.</span></p>

        {/* كارد المنتج */}
        <section className="border border-gray-300 rounded-lg p-4 flex gap-4 items-center shadow-sm">
          <div className="w-24 h-24 bg-gray-100 flex items-center justify-center border text-xs text-gray-400">صورة</div>
          <div>
            <h3 className="text-blue-700 hover:underline cursor-pointer font-medium">TOLEAD Low Bunk Bed with Slide, Floor Loft Be...</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-orange-500">★★★★☆</span> 295
            </div>
          </div>
          <div className="mr-auto text-lg font-bold">189.99$</div>
        </section>
        <div className="text-xs text-gray-500 mt-2">إعلان ⓘ</div>
      </div>
    </>
  );
}