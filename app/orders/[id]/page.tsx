"use client";
import Link from "next/link";
import Image from "next/image";
import { use } from "react"; 
import { useCartStore } from "@/lib/store"; // استيراد المتجر

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders } = useCartStore(); // جلب قائمة الطلبات من المتجر

  // البحث عن الطلب المطابق للـ id القادم من الرابط
  const order = orders.find((o) => o.id === id);

  // في حال لم يتم العثور على الطلب (مثلاً عند تحديث الصفحة)
  if (!order) {
    return <div className="p-10 text-center">جاري تحميل تفاصيل الطلب...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto" dir="rtl">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">تفاصيل الطلب #{order.id}</h1>
          <p className="text-gray-500 text-sm mt-1">تاريخ الطلب: {order.date}</p>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h2 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">المنتجات</h2>
            <div className="space-y-4">
              {/* عرض كل المنتجات الموجودة في هذا الطلب تحديداً */}
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded border border-gray-100 overflow-hidden">
                    <Image src={item.product.image} alt={item.product.nameAr} width={64} height={64} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.product.nameAr}</p>
                    <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">{(Number(item.product.price) * item.quantity).toFixed(2)}₪</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">الإجمالي الكلي:</span>
            <span className="text-2xl font-bold text-gray-900">{order.total.toFixed(2)}₪</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-start">
        <Link href="/orders" className="text-gray-600 font-semibold hover:underline">
          ← العودة للصفحة السابقة
        </Link>
      </div>
    </div>
  );
}