"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/app/(auth)/register/components/DataTable";

const optionsFilter = ["تاريخ الطلب", "حالة الطلب", "نوع الطلب", "اسم البائع", "العنوان"];
const sectionsColumns = ["معلومات الطلب", "معلومات العميل", "معلومات الدفع", "معلومات المنتج"];
const optionsDate = ["منذ بداية الأسبوع", "آخر 7 أيام", "منذ بداية الشهر", "الشهر الماضي"];
const optionsDoc = ["تنزيل المحدد (0)", "تنزيل الكل"];

export default function BusinessAnalyticsPage() {
  const router = useRouter();
  const [showSaveBox, setShowSaveBox] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [downloadDropdown, setDownloadDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const [activeSidePanel, setActiveSidePanel] = useState<'filter' | 'columns' | null>(null);

  return (
    <div className="flex w-full bg-white min-h-screen" dir="rtl">
      {/* 1. الشريط الجانبي الثابت */}
      <div className="w-16 border-l border-gray-200 flex flex-col items-center py-6 gap-6 bg-gray-50 shrink-0">
        <div onClick={() => setActiveSidePanel(activeSidePanel === 'filter' ? null : 'filter')} className="p-3 cursor-pointer hover:bg-gray-200 rounded text-xl">⚙️</div>
        <div onClick={() => setActiveSidePanel(activeSidePanel === 'columns' ? null : 'columns')} className="p-3 cursor-pointer hover:bg-gray-200 rounded text-xl">📊</div>
      </div>

      {/* 2. اللوحة الجانبية المتحركة */}
      {activeSidePanel && (
        <div className="w-72 border-l border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="font-bold mb-4 text-sm border-b pb-2">
            {activeSidePanel === 'filter' ? 'تصفية النتائج' : 'تعديل الأعمدة'}
          </h2>
          {activeSidePanel === 'filter' ? (
            <div className="space-y-4">
              <select className="w-full border rounded px-3 py-2 text-sm">{optionsFilter.map(opt => <option key={opt}>{opt}</option>)}</select>
              <select className="w-full border rounded px-3 py-2 text-sm text-gray-600"><option>يساوي</option><option>لا يساوي</option></select>
              <input type="text" placeholder="أدخل القيمة..." className="w-full border rounded px-3 py-2 text-sm" />
              <button className="w-full bg-[#005ea2] text-white py-2 rounded text-sm font-bold hover:bg-[#004880]">إرسال</button>
            </div>
          ) : (
            <div className="space-y-3">{sectionsColumns.map(sec => <label key={sec} className="flex items-center gap-2 text-sm"><input type="checkbox" /> {sec}</label>)}</div>
          )}
        </div>
      )}

      {/* 3. المحتوى الرئيسي */}
      <div className="flex-1 p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">تحليلات الأعمال</h1>
          <div className="flex gap-8 border-b border-gray-200 mb-6 text-sm text-gray-600">
            <span onClick={() => router.push('/orders/home')} className="pb-2 cursor-pointer hover:text-black">الرئيسية</span>
            <div className="relative">
              <span onClick={() => setReportDropdown(!reportDropdown)} className="pb-2 border-b-2 border-black text-black font-medium cursor-pointer flex items-center gap-1">التقارير ▾</span>
              {reportDropdown && (
                <div className="absolute top-full mt-2 w-48 bg-white border shadow-lg z-20 rounded-md">
                  <div onClick={() => router.push('/orders/business-credit')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">حساب الائتمان التجاري</div>
                  <div onClick={() => router.push('/orders/allOrders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">الطلبات</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-1">تقرير الطلبات</h2>
          <button onClick={() => setShowSaveBox(!showSaveBox)} className="text-blue-700 text-sm hover:underline mb-4 block">إضافة عنوان وحفظه في قوالبك</button>
          
          <div className="flex flex-wrap items-end gap-6 text-sm bg-gray-50 p-4 border rounded-lg">
            <div className="relative">
              <label className="block text-xs font-bold mb-1">تاريخ الطلب</label>
              <button onClick={() => setDateDropdown(!dateDropdown)} className="border bg-white rounded px-4 py-2 flex items-center gap-2 w-40 justify-between">منذ بداية الشهر ▾</button>
            </div>
            <button className="bg-[#005ea2] text-white px-6 py-2 rounded-full font-bold">إنشاء تقرير</button>
          </div>
        </section>

        {/* حل الايرور هنا بتمرير دوال فارغة بدلاً من undefined */}
        <section className="border border-gray-300 rounded p-4">
          <div className="flex items-center gap-3 bg-[#eaf3fb] border border-[#c0d9ee] p-4 rounded text-gray-700 text-sm mb-6">
            <span>ℹ️</span>
            <p>لا توجد سجلات للفترة الزمنية المحددة و/أو الفلاتر المطبقة</p>
          </div>
          <DataTable 
            columns={[]} 
            data={[]} 
            onDelete={() => {}} 
            onAdd={() => {}} 
          />
        </section>
      </div>
    </div>
  );
}