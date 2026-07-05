"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { nameAr: string; name: string; nameEn: string; image: string };
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
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🗺️ خريطة لترجمة نص عرض الحالة فقط (القيمة الحقيقية تبقى عربي كما في قاعدة البيانات)
  const statusLabels: Record<string, string> = {
    "جاري التجهيز": t("status_preparing"),
    "تم الشحن": t("status_shipped"),
    "تم التوصيل": t("status_delivered"),
    "ملغي": t("status_cancelled"),
  };

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
      .catch(() => setError(t("order_details_fetch_error")))
      .finally(() => setLoading(false));
  }, [orderId, t]);

  if (loading) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="text-center mt-20 text-gray-400">
        {t("order_details_loading")}
      </div>
    );
  }

  if (error || !order) {
    return (
      <div dir={isRtl ? "rtl" : "ltr"} className="text-center mt-20 text-red-500">
        {error || t("order_details_load_failed")}
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#5c3e31]">{t("order_details_title")}</h1>
        <span
          className={`text-sm font-bold px-3 py-1.5 rounded-full ${
            statusColors[order.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود بيانات الشحن والدفع */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* بيانات الشحن */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">{t("order_details_shipping_address_title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">{t("order_details_full_name_label")}</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.fullName}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">{t("order_details_phone_label")}</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.phone}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">{t("order_details_city_label")}</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.city}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">{t("order_details_address_label")}</label>
                <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                  {order.address}
                </div>
              </div>
              {order.notes && (
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold text-[#5c3e31] block mb-1">{t("order_details_notes_label")}</label>
                  <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-700">
                    {order.notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* طريقة الدفع */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">{t("order_details_payment_method_title")}</h2>
            <div className="border border-[#b36d39] bg-[#f5e4da] rounded-xl p-3">
              <span className="font-bold text-sm text-[#5c3e31]">
                {order.paymentMethod === "cash" ? t("order_details_payment_cash") : t("order_details_payment_card")}
              </span>
            </div>
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
          <h2 className="font-black text-[#5c3e31] mb-4">{t("order_details_summary_title")}</h2>

          <div className="flex flex-col gap-4 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={isRtl ? item.product.nameAr : item.product.nameEn}
                  className="w-14 h-14 object-contain rounded-lg bg-[#f5e4da] p-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#5c3e31]">
                    {isRtl ? item.product.nameAr : item.product.nameEn}
                  </p>
                  <p className="text-xs text-gray-400">{t("quantity_label")} {item.quantity}</p>
                </div>
                <p className="text-sm font-black text-[#a0522d]">
                  {(item.price * item.quantity).toFixed(2)}₪
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>{t("order_details_subtotal_label")}</span>
              <span>{Number(order.subtotal).toFixed(2)}₪</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t("order_details_shipping_label")}</span>
              <span>{Number(order.shipping) === 0 ? t("order_details_free_shipping") : `${Number(order.shipping).toFixed(2)}₪`}</span>
            </div>
            <div className="flex justify-between font-black text-[#5c3e31] text-lg border-t border-gray-100 pt-2 mt-2">
              <span>{t("order_details_total_label")}</span>
              <span>{Number(order.totalAmount).toFixed(2)}₪</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/user/myOrder")}
            className="w-full bg-[#b36d39] text-white font-bold py-3 rounded-xl mt-6 hover:bg-[#9a5c2e] transition"
          >
            {t("order_details_back_btn")}
          </button>
        </div>
      </div>
    </div>
  );
}