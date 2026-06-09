"use client";

import React, { useState } from 'react';

const filterOptions = [
  "مجموعات الحساب", "مستخدمو الحساب", "فئات المنتجات", "اعتمادات البائع",
  "تاريخ الطلب", "حالة الطلب", "نوع الطلب", "رقم أمر الشراء (PO)", "رقم التعريف القياسي (ASIN)",
  "البريد الإلكتروني لمستخدم الحساب", "الاتفاقية", "امتثال الشركة",
  "حالة الفاتورة الإلكترونية", "حالة الفاتورة", "رقم الطلب",
  "مرجع الدفع", "برنامج توفير التسعير", "اسم البائع", "العنوان"
];

const columnSections = [
  "معلومات الطلب", "معلومات العميل", "معلومات الفاتورة الإلكترونية", "معلومات الفاتورة", 
  "معلومات الدفع", "معلومات المنتج", "معلومات خاصة بالمنظمة", "معلومات البائع"
];

const dateOptions = [
  "منذ بداية الأسبوع", "آخر 7 أيام", "منذ بداية الشهر", "آخر 4 أسابيع", "الشهر الماضي", 
  "منذ بداية الربع", "آخر 12 أسبوع", "منذ بداية السنة", "آخر 12 شهر", "نطاق مخصص"
];

const docOptions = ["تنزيل المحدد (0)", "تنزيل الكل"];

export default function BusinessCreditContent() {
  const [activeSidePanel, setActiveSidePanel] = useState<'filter' | 'columns' | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDocDropdown, setShowDocDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  
  // حالة لإظهار حقل إضافة العنوان
  const [showTitleInput, setShowTitleInput] = useState(false);

  const togglePanel = (panel: 'filter' | 'columns') => {
    setActiveSidePanel(activeSidePanel === panel ? null : panel);
  };

  return (
    <div className="flex w-full bg-white min-h-[600px] border border-gray-200 rounded-lg overflow-hidden" dir="rtl">
      
      {/* الشريط الجانبي */}
      <div className="w-16 border-l border-gray-200 flex flex-col items-center py-6 gap-6 bg-gray-50">
        <div onClick={() => togglePanel('filter')} className={`p-2 cursor-pointer ${activeSidePanel === 'filter' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>⚙️</div>
        <div onClick={() => togglePanel('columns')} className={`p-2 cursor-pointer ${activeSidePanel === 'columns' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>📊</div>
      </div>

      {/* اللوحة الجانبية */}
      {activeSidePanel && (
        <div className="w-72 border-l border-gray-200 bg-white p-4 shadow-sm overflow-y-auto">
          <h2 className="font-bold mb-4 text-sm border-b pb-2">{activeSidePanel === 'filter' ? 'تصفية النتائج' : 'تعديل الأعمدة'}</h2>
          {activeSidePanel === 'filter' ? (
            <div className="space-y-4">
              <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="w-full border rounded px-3 py-2 text-right hover:bg-gray-50 text-sm flex justify-between items-center">
                اختر الفلتر <span>▾</span>
              </button>
              {showFilterDropdown && (
                <div className="border bg-white max-h-40 overflow-y-auto">
                   {filterOptions.map((opt) => (<button key={opt} className="w-full text-right px-4 py-2 hover:bg-blue-50 text-xs border-b">{opt}</button>))}
                </div>
              )}
              <select className="w-full border rounded px-3 py-2 text-sm text-gray-600"><option>يساوي</option><option>لا يساوي</option></select>
              <button className="w-full bg-blue-600 text-white py-2 rounded text-xs font-bold hover:bg-blue-700">إرسال</button>
            </div>
          ) : (
            <div className="space-y-3">
              {columnSections.map((sec) => (
                <label key={sec} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1"><input type="checkbox" /> {sec}</label>
              ))}
              <button className="w-full bg-blue-600 text-white py-2 rounded text-xs font-bold hover:bg-blue-700 mt-4">إرسال</button>
            </div>
          )}
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1"> حساب الائتمان التجارى</h1>
        
        {/* رابط إضافة العنوان */}
        <button onClick={() => setShowTitleInput(true)} className="text-blue-600 text-sm underline mb-4">إضافة عنوان وحفظه في قوالبك</button>
        
        {/* حقل الإدخال والأزرار عند تفعيل الرابط */}
        {showTitleInput && (
          <div className="mb-6 space-y-3">
            <input type="text" placeholder="أدخل اسم التقرير" className="border rounded px-3 py-2 w-64 text-sm block" />
            <div className="flex gap-2">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-bold">حفظ كتقرير جديد</button>
              <button onClick={() => setShowTitleInput(false)} className="border px-4 py-2 rounded-full text-sm font-bold">إلغاء</button>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 mb-6">عرض سجل الطلبات والحالات مع تفاصيل العناصر.</p>
        
        {/* ... باقي الكود (أزرار التاريخ والتحميل) كما هو ... */}
        <div className="flex items-end gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-1">تاريخ الطلب</label>
            <button onClick={() => setShowDateDropdown(!showDateDropdown)} className="border px-4 py-2 rounded flex items-center justify-between w-48 text-sm">منذ بداية الشهر ▾</button>
            {showDateDropdown && (
              <div className="absolute mt-1 w-48 bg-white border shadow-lg z-50 text-sm">{dateOptions.map(opt => <div key={opt} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{opt}</div>)}</div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowDocDropdown(!showDocDropdown)} className="border px-4 py-2 rounded flex items-center justify-between w-64 text-sm">تنزيل مستندات الطلب ▾</button>
            {showDocDropdown && (
              <div className="absolute mt-1 w-64 bg-white border shadow-lg z-50 text-sm">{docOptions.map(opt => <div key={opt} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{opt}</div>)}</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <button className="bg-blue-800 text-white px-6 py-2 rounded-full text-sm font-bold">إنشاء تقرير</button>
            <a href="#" className="text-blue-600 text-xs underline">سجل التنزيلات</a>
          </div>
        </div>

        <div className="bg-blue-50 border p-4 text-sm text-blue-900">لا توجد سجلات للفترة الزمنية المحددة و/أو الفلاتر المطبقة.</div>
      </div>
    </div>
  );
}