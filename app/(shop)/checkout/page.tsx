"use client";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">✅</p>
        <h2 className="text-2xl font-bold text-green-600">
          تم تأكيد طلبك بنجاح!
        </h2>
        <p className="text-gray-500 mt-2">سيتم التواصل معك قريباً</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">إتمام الشراء</h1>

      {/* ملخص الطلب */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">ملخص الطلب</h2>
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between py-2 border-b">
            <span>{product.name} × {quantity}</span>
            <span className="font-bold">{product.price * quantity} ₪</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-xl font-bold text-blue-600">
          <span>المجموع:</span>
          <span>{total()} ₪</span>
        </div>
      </div>

      {/* بيانات الشحن */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">بيانات الشحن</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="العنوان"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="رقم الهاتف"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-green-600 text-white py-3 rounded-xl 
                   hover:bg-green-700 transition font-bold text-lg"
      >
        تأكيد الطلب ✅
      </button>
    </div>
  );
}