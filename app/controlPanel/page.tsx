"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardHome() {
  // تنسيق الأرقام كعملة (ريال سعودي)
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(val);

  // بيانات المخططات
  const data = [
    { name: 'يناير', مبيعات: 4000 },
    { name: 'فبراير', مبيعات: 3000 },
    { name: 'مارس', مبيعات: 5000 },
    { name: 'أبريل', مبيعات: 2780 },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      
      {/* 1. صف البطاقات (KPIs) - مع نسب النمو */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "إجمالي المبيعات", value: 15000, trend: "+12%" },
          { title: "الطلبات الجديدة", value: 5, trend: "+2%" },
          { title: "المنتجات النشطة", value: 24, trend: "0%" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl font-bold mt-2">
                {item.title === "إجمالي المبيعات" ? formatCurrency(item.value) : item.value}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${item.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {item.trend}
            </span>
          </div>
        ))}
      </div>

      {/* 2. قسم المخططات البيانية الاحترافية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* مخطط خطي للمبيعات */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold mb-6 text-gray-700">اتجاه المبيعات</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" />
                 <YAxis />
                 {/* حل مشكلة النوع في الـ Tooltip */}
<Tooltip 
  formatter={(value: any) => {
    if (typeof value === 'number') {
      return [formatCurrency(value), 'المبيعات'];
    }
    return [value, 'المبيعات'];
  }} 
/>                 <Line type="monotone" dataKey="مبيعات" stroke="#2563eb" strokeWidth={3} dot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
        
        {/* مخطط أعمدة للمنتجات */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
           <h3 className="font-bold mb-6 text-gray-700">الأداء الشهري للمنتجات</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" />
                 <YAxis />
<Tooltip 
  formatter={(value: any) => {
    if (typeof value === 'number') {
      return [formatCurrency(value), 'المبيعات'];
    }
    return [value, 'المبيعات'];
  }} 
/>                 <Bar dataKey="مبيعات" fill="#10b981" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}