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

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  const filteredOrders = orders.filter(
    (o) => o.id.includes(search) || o.status.includes(search)
  );

  const columns = [
    { header: "رقم الطلب", accessor: "id" },
    { header: "الحالة", accessor: "status" },
    { header: "الإجمالي", accessor: "totalAmount" },
    { header: "التاريخ", accessor: "createdAt" },
  ];

  if (loading) return <div className="p-6 text-center">جاري التحميل...</div>;

  return (
    <div className="p-6" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-800">طلباتي</h2>
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredOrders}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}