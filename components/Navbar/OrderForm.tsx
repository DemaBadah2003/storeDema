"use client";
import { useState } from "react";

export default function OrderForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    street: "",
    name: "",
    phone: "",
    orderNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("بيانات الطلب:", formData);
    alert("تم إرسال طلبك بنجاح!");
    onClose();
  };

  return (
    <div className="relative w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl border border-gray-100" dir="rtl">
      {/* زر الإغلاق X */}
      <button 
        onClick={onClose}
        className="absolute top-2 left-2 p-2 text-gray-400 hover:text-gray-600 transition"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-[#5c3e31] mb-6 text-center">إتمام طلب جديد</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* اختيار الموقع */}
        <select 
          className="w-full p-3 border border-gray-300 rounded-xl text-right" 
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        >
          <option value="">اختر الموقع...</option>
          <option value="شرق">شرق</option>
          <option value="غرب">غرب</option>
          <option value="شمال">شمال</option>
          <option value="جنوب">جنوب</option>
        </select>

        {/* المنطقة والشارع */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="المنطقة" 
            className="p-3 border border-gray-300 rounded-xl text-right" 
            onChange={(e) => setFormData({...formData, area: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="الشارع" 
            className="p-3 border border-gray-300 rounded-xl text-right" 
            onChange={(e) => setFormData({...formData, street: e.target.value})} 
          />
        </div>

        {/* البيانات الشخصية - تم ضبطها جميعاً لتبدأ من اليمين */}
        <input 
          type="text" 
          placeholder="اسم المستلم" 
          className="w-full p-3 border border-gray-300 rounded-xl text-right" 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="tel" 
          placeholder="رقم الجوال" 
          className="w-full p-3 border border-gray-300 rounded-xl text-right" 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
        />
        
        {/* رقم الطلب */}
        <input 
          type="text" 
          placeholder="رقم الطلب" 
          className="w-full p-3 border border-gray-300 rounded-xl text-right" 
          onChange={(e) => setFormData({...formData, orderNumber: e.target.value})} 
        />

        {/* الأزرار: إرسال الطلب (يمين)، إلغاء (يسار) */}
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="flex-1 bg-[#b36d39] text-white py-3 rounded-xl font-bold hover:bg-[#9a5d30] transition"
          >
            إرسال الطلب
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}