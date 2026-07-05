"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  user?: { name: string; email: string };
  items: { product: { nameAr: string }; quantity: number; price: number }[];
}

// ⚠️ هذه القيم تبقى بالعربي لأنها Data Values تُرسل للـ backend وتُخزّن بقاعدة البيانات
const STATUS_OPTIONS = ["جاري التجهيز", "تم الشحن", "تم التسليم", "ملغي"];

// ✅ نفس منطق الألوان الدلالية المستخدم بصفحة المنتجات (traffic-light logic)
const statusColors: Record<string, string> = {
  "جاري التجهيز": "bg-yellow-100 text-yellow-700",
  "تم الشحن": "bg-blue-100 text-blue-700",
  "تم التسليم": "bg-green-100 text-green-700",
  "ملغي": "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchInput, setSearchInput] = useState(""); // ما يكتبه المستخدم بالحقل
  const [search, setSearch] = useState(""); // البحث المُطبَّق فعلياً بعد الضغط على الزر
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");

  // 🗺️ خريطة لترجمة نص الحالة للعرض فقط (القيمة الحقيقية تبقى عربي كما في قاعدة البيانات)
  const statusLabels: Record<string, string> = {
    "جاري التجهيز": t("status_preparing"),
    "تم الشحن": t("status_shipped"),
    "تم التسليم": t("status_delivered"),
    "ملغي": t("status_cancelled"),
  };

  useEffect(() => {
    fetch("/api/protected/users/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin_orders_confirm_delete"))) return;

    const res = await fetch("/api/protected/users/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setOrders(orders.filter((o) => o.id !== id));
  };

  const handleEdit = async (id: string) => {
    const res = await fetch(`/api/protected/users/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
      setEditingId(null);
    }
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    setNewStatus(orders.find((o) => o.id === id)?.status || STATUS_OPTIONS[0]);
  };

  // 🔍 تشغيل البحث فعلياً (بدل الفلترة اللحظية مع كل حرف)
  const runSearch = () => {
    setSearch(searchInput.trim());
  };

  const filteredOrders = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q) ||
      (o.user?.name || "").toLowerCase().includes(q) ||
      (o.user?.email || "").toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir={isRtl ? "rtl" : "ltr"}>
        <p className="text-[#5c3e31] font-bold">{t("admin_orders_loading")}</p>
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Header - نفس تصميم صفحة المنتجات، خانة البحث على اليمين جنب العنوان */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-[#5c3e31]">{t("admin_orders_title")}</h1>
          <input
            type="text"
            placeholder={t("admin_orders_search_placeholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#b36d39] bg-white w-64"
          />
          <button
            onClick={runSearch}
            className="bg-[#b36d39] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#9a5c2e] transition"
          >
            {t("admin_orders_search_btn")}
          </button>
        </div>
      </div>

      {/* شريط تعديل الحالة - بنفس هوية الألوان بدل الأزرق */}
      {editingId && (
        <div className="mb-4 flex items-center gap-3 bg-[#f5e4da] p-4 rounded-xl">
          <span className="text-sm font-bold text-[#5c3e31]">{t("admin_orders_edit_status_label")}</span>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#b36d39] bg-white"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{statusLabels[s] || s}</option>
            ))}
          </select>
          <button
            onClick={() => handleEdit(editingId)}
            className="bg-[#b36d39] text-white px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-[#9a5c2e] transition"
          >
            {t("admin_orders_save_btn")}
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="text-gray-500 text-sm hover:underline"
          >
            {t("admin_orders_cancel_btn")}
          </button>
        </div>
      )}

      {/* Table - نفس تصميم صفحة المنتجات بالضبط */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-[#f5e4da] text-[#5c3e31]">
            <tr>
              {[
                t("admin_orders_col_id"),
                t("admin_orders_col_customer"),
                t("admin_orders_col_status"),
                t("admin_orders_col_total"),
                t("admin_orders_col_date"),
                t("admin_orders_col_actions"),
              ].map((h, idx) => (
                <th
                  key={idx}
                  className={`p-4 font-black border-b border-[#e8d5c8] ${
                    h === t("admin_orders_col_actions") ? "text-center" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o, index) => (
              <tr
                key={o.id}
                className={`border-b border-gray-100 hover:bg-[#fdf8f5] transition ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fdfaf8]"
                }`}
              >
                <td className="p-4 border-l border-gray-100 font-bold text-[#5c3e31] text-xs">
                  {o.id}
                </td>

                <td className="p-4 border-l border-gray-100 font-bold text-[#5c3e31]">
                  {o.user?.name || o.user?.email || t("admin_orders_unknown_customer")}
                </td>

                <td className="p-4 border-l border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusColors[o.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {statusLabels[o.status] || o.status}
                  </span>
                </td>

                <td className="p-4 border-l border-gray-100 font-black text-[#a0522d]">
                  {o.totalAmount}₪
                </td>

                <td className="p-4 border-l border-gray-100 text-sm text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
                </td>

                <td className="p-4 border-l border-gray-100">
                  <div className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() => openEdit(o.id)}
                      title={t("admin_orders_edit_tooltip")}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(o.id)}
                      title={t("admin_orders_delete_tooltip")}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-400 py-12">{t("admin_orders_empty")}</p>
        )}
      </div>
    </div>
  );
}