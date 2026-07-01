"use client";
import { useState } from "react";
// تأكد من ضبط مسار استيراد المكون حسب هيكلة مشروعك
import DataTable from "@/app/components/DataTable"; 

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: "#1001", customer: "أحمد محمد", status: "تم الشحن" },
    { id: "#1002", customer: "سارة علي", status: "قيد المعالجة" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ id: "", customer: "", status: "" });

  const handleSave = () => {
    if (newOrder.id && newOrder.customer) {
      setOrders([...orders, newOrder]);
      setNewOrder({ id: "", customer: "", status: "" });
      setIsModalOpen(false);
    }
  };

  const columns = [
    { header: "رقم الطلب", accessor: "id" },
    { header: "العميل", accessor: "customer" },
    { header: "الحالة", accessor: "status" },
  ];

  return (
    <div className="p-6 relative" dir="rtl">
      {/* الكارد الرئيسي */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg text-gray-800">قائمة الطلبات</h2>
            <input 
              type="text" 
              placeholder="بحث عن عميل..." 
              className="border border-gray-200 rounded px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            إضافة طلب جديد +
          </button>
        </div>

        {/* الجدول */}
        <DataTable 
          columns={columns} 
          data={orders} 
          onDelete={(id) => setOrders(orders.filter(o => o.id !== id))}
        />
      </div>

      {/* النافذة المنبثقة (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* الخلفية المعتمة والمغبشة */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)} 
          ></div>

          {/* محتوى النافذة */}
          <div className="relative bg-white p-8 rounded-lg shadow-2xl w-96 border border-gray-200 z-10">
            {/* زر الإغلاق X */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
            >
              &times;
            </button>

            <h3 className="font-bold text-xl mb-6">إضافة طلب جديد</h3>
            
            <div className="space-y-4">
              <input 
                placeholder="رقم الطلب" 
                className="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={(e) => setNewOrder({...newOrder, id: e.target.value})} 
              />
              <input 
                placeholder="العميل" 
                className="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})} 
              />
              <input 
                placeholder="الحالة" 
                className="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={(e) => setNewOrder({...newOrder, status: e.target.value})} 
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 transition">حفظ</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-300 transition">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}