"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { nameAr: string; image: string };
};

type OrderDetails = {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string | null;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

const statusColors: Record<string, string> = {
  "جاري التجهيز": "bg-yellow-100 text-yellow-700",
  "تم الشحن": "bg-blue-100 text-blue-700",
  "تم التوصيل": "bg-green-100 text-green-700",
  "ملغي": "bg-red-100 text-red-700",
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/protected/users/myOrder/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrder(data);
        }
      })
      .catch(() => setError("حدث خطأ أثناء جلب تفاصيل الطلب"))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return <div dir="rtl" className="text-center mt-20 text-gray-400">جاري تحميل تفاصيل الطلب...</div>;
  }

  if (error || !order) {
    return (
      <div dir="rtl" className="text-center mt-20 text-red-500">
        {error || "تعذر تحميل الطلب"}
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#5c3e31]">🧾 تفاصيل الطلب</h1>
        <span
          className={`text-sm font-bold px-3 py-1.5 rounded-full ${
            statusColors[order.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود بيانات الشحن والدفع */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* بيانات الشحن */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">📍 عنوان التوصيل</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">الاسم الكامل</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.fullName}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">رقم الهاتف</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.phone}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">المدينة</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.city}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">العنوان التفصيلي</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.address}
                </div>
              </div>
              {order.notes && (
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-[#5c3e31] block mb-1">ملاحظات إضافية</label>
                  <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                    {order.notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* طريقة الدفع */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">💳 طريقة الدفع</h2>
            <div className="border border-[#b36d39] bg-[#f5e4da] rounded-xl p-3">
              <span className="font-bold text-sm text-[#5c3e31]">
                {order.paymentMethod === "cash" ? "الدفع عند الاستلام" : "بطاقة ائتمان"}
              </span>
            </div>
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
          <h2 className="font-black text-[#5c3e31] mb-4">📦 ملخص الطلب</h2>

          <div className="flex flex-col gap-4 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.nameAr}
                  className="w-14 h-14 object-contain rounded-lg bg-[#f5e4da] p-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#5c3e31]">{item.product.nameAr}</p>
                  <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                </div>
                <p className="text-sm font-black text-[#a0522d]">
                  {(item.price * item.quantity).toFixed(2)}₪
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>المجموع الفرعي</span>
              <span>{Number(order.subtotal).toFixed(2)}₪</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>الشحن</span>
              <span>{Number(order.shipping) === 0 ? "مجاني" : `${Number(order.shipping).toFixed(2)}₪`}</span>
            </div>
            <div className="flex justify-between font-black text-[#5c3e31] text-lg border-t border-gray-100 pt-2 mt-2">
              <span>الإجمالي</span>
              <span>{Number(order.totalAmount).toFixed(2)}₪</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/user/myOrder")}
            className="w-full bg-[#b36d39] text-white font-bold py-3 rounded-xl mt-6 hover:bg-[#9a5c2e] transition"
          >
            الرجوع لطلباتي
          </button>
        </div>
      </div>
    </div>
  );
}