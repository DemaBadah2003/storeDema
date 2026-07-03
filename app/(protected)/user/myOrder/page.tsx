"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: { id: string }[];
};

const statusColors: Record<string, string> = {
  "جاري التجهيز": "bg-yellow-100 text-yellow-700",
  "تم الشحن": "bg-blue-100 text-blue-700",
  "تم التوصيل": "bg-green-100 text-green-700",
  "ملغي": "bg-red-100 text-red-700",
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/protected/users/myOrder")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div dir="rtl" className="text-center mt-20 text-gray-400">جاري تحميل طلباتك...</div>;
  }

  if (orders.length === 0) {
    return (
      <div dir="rtl" className="text-center mt-20">
        <p className="text-gray-400 mb-4">لا يوجد لديك أي طلبات بعد</p>
        <Link href="/" className="text-[#b36d39] font-bold">ابدأ التسوق الآن</Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-3xl mx-auto mt-10 mb-16 px-4">
      <h1 className="text-2xl font-black text-[#5c3e31] mb-6">📦 طلباتي</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/user/myOrder/${order.id}`}
            className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-[#5c3e31]">
                  طلب #{order.id.slice(0, 8)}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    statusColors[order.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleDateString("ar-EG")} · {order.items.length} منتجات
              </p>
            </div>
            <div className="text-left">
              <p className="font-black text-[#a0522d]">
                {Number(order.totalAmount).toFixed(2)}₪
              </p>
              <span className="text-xs text-gray-400">عرض التفاصيل ›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}