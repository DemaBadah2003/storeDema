"use client";

import React, { useState } from "react";

export default function AmazonCartPage() {
  const [activeTab, setActiveTab] = useState("buy-again");

  return (
    <div className="p-8 bg-gray-100 min-h-screen" dir="rtl">
      {/* القسم الأول: السلة فارغة */}
      <div className="bg-white p-6 mb-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-2">عربة تسوق أمازون الخاصة بك فارغة</h1>
        <p className="text-gray-700">
          عربة التسوق الخاصة بك موجودة لخدمتك. اجعلها مفيدة — املأها بالبقالة، والملابس، والمستلزمات المنزلية، والإلكترونيات، والمزيد.
        </p>
        <p className="text-gray-700 mt-2">
          تابع التسوق على{" "}
          <a href="#" className="text-blue-600 hover:underline">الصفحة الرئيسية لأمازون</a>، أو تعرف على{" "}
          <a href="#" className="text-blue-600 hover:underline">عروض اليوم</a>، أو قم بزيارة{" "}
          <a href="#" className="text-blue-600 hover:underline">قائمة أمنياتك</a>.
        </p>
      </div>

      {/* القسم الثاني: العناصر الخاصة بك (التبويبات) */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">عناصرك</h2>
        
        {/* التبويبات */}
        <div className="flex border-b border-gray-300 mb-4">
          <button 
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 ${activeTab === "saved" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
          >
            عناصر محفوظة لاحقاً
          </button>
          <button 
            onClick={() => setActiveTab("buy-again")}
            className={`px-4 py-2 ${activeTab === "buy-again" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
          >
            شراء مرة أخرى
          </button>
          <button 
            onClick={() => setActiveTab("lists")}
            className={`px-4 py-2 ${activeTab === "lists" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
          >
            القوائم
          </button>
        </div>

        {/* محتوى التبويب */}
        <div className="border border-gray-300 rounded p-4 text-gray-600">
          لا توجد عناصر
        </div>
      </div>

      {/* التذييل الصغير */}
      <div className="mt-6 text-sm text-gray-600">
        <p>أسعار وتوافر العناصر على Amazon.com عرضة للتغيير. عربة التسوق هي مكان مؤقت لتخزين قائمة عناصرك وتعكس أحدث سعر لكل عنصر. <a href="#" className="text-blue-600 hover:underline">اعرف المزيد</a></p>
        <p className="mt-2">هل لديك بطاقة هدايا أو رمز ترويجي؟ سنطلب منك إدخال رمز المطالبة الخاص بك عندما يحين وقت الدفع.</p>
      </div>
    </div>
  );
}