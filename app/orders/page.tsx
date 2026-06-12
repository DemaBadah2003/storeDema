"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const { orders } = useCartStore();

  const filteredOrders = orders.filter(order => 
    order.id.includes(search)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-6 p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">طلباتي</h1>
          <input
            type="text"
            placeholder="بحث برقم الطلب..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-72 focus:ring-1 focus:ring-gray-400 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="p-4 border-l border-gray-200 text-gray-700">رقم الطلب</th>
                <th className="p-4 border-l border-gray-200 text-gray-700">المنتجات</th>
                <th className="p-4 border-l border-gray-200 text-gray-700">التاريخ</th>
                <th className="p-4 border-l border-gray-200 text-gray-700">الحالة</th>
                <th className="p-4 border-l border-gray-200 text-gray-700">الإجمالي</th>
                <th className="p-4 text-center text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-4 border-l border-gray-100 font-bold text-gray-900">#{order.id}</td>
                  <td className="p-4 border-l border-gray-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 rounded overflow-hidden border">
                           <Image src={item.product.image} alt={item.product.nameAr} width={40} height={40} className="object-cover"/>
                        </div>
                        <span className="text-xs">{item.product.nameAr} (×{item.quantity})</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-l border-gray-100 text-gray-600">{order.date}</td>
                  <td className="p-4 border-l border-gray-100">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 border-l border-gray-100 font-bold text-gray-800">{order.total.toFixed(2)}₪</td>
                  <td className="p-4 text-center">
                    <Link href={`/orders/${order.id}`} className="text-gray-900 font-semibold underline hover:text-[#D4900A]">
                      عرض التفاصيل
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}