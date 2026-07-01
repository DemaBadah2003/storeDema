"use client";
import { useCartStore } from "@/lib/store";

export default function AdminOrders() {
  const orders = useCartStore((state) => state.orders);

  return (
    <div>
      <h1 className="text-2xl font-black text-[#5c3e31] mb-6">🧾 إدارة الطلبات</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-20">لا توجد طلبات بعد</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between mb-3">
                <span className="font-black text-[#5c3e31]">#{order.id}</span>
                <span className="text-gray-400 text-sm">{order.date}</span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                  {order.status}
                </span>
                <span className="font-black text-[#a0522d]">{order.total.toFixed(2)}₪</span>
              </div>
              <div className="flex flex-col gap-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    • {item.product.nameAr} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}