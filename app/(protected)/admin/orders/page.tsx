"use client";
import { useState, useEffect } from "react";
import DataTable from "@/app/components/DataTable";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  user?: { name: string; email: string };
  items: { product: { nameAr: string }; quantity: number; price: number }[];
}

const STATUS_OPTIONS = ["جاري التجهيز", "تم الشحن", "تم التسليم", "ملغي"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");

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
      setOrders(orders.map((o) => o.id === id ? { ...o, status: newStatus } : o));
      setEditingId(null);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.includes(search) ||
      o.status.includes(search) ||
      o.user?.name?.includes(search)
  );

  const columns = [
    { header: "رقم الطلب", accessor: "id" },
    {
      header: "العميل",
      accessor: "user.name",
      render: (row: Order) => row.user?.name || row.user?.email || "غير معروف",
    },
    { header: "الحالة", accessor: "status" },
    { header: "الإجمالي", accessor: "totalAmount" },
    { header: "التاريخ", accessor: "createdAt" },
  ];

  if (loading) return <div className="p-6 text-center">جاري التحميل...</div>;

  return (
    <div className="p-6" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-800">إدارة الطلبات</h2>
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {editingId && (
          <div className="mb-4 flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
            <span className="text-sm font-medium">تعديل الحالة:</span>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => handleEdit(editingId)}
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
            >
              حفظ
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="text-gray-500 text-sm hover:underline"
            >
              إلغاء
            </button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredOrders}
          onDelete={handleDelete}
          onEdit={(id) => {
            setEditingId(id);
            setNewStatus(orders.find((o) => o.id === id)?.status || STATUS_OPTIONS[0]);
          }}
        />
      </div>
    </div>
  );
}