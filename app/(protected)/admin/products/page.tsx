"use client";
import { useState } from "react";
import { products as initialProducts } from "@/lib/data";
import { Product } from "@/types";

const emptyForm = {
  id: "", name: "", nameAr: "", price: "", category: "",
  categorySlug: "", image: "", stock: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = products.filter((p) =>
    p.nameAr.includes(search) || p.category.includes(search)
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr,
      price: String(p.price),
      category: p.category,
      categorySlug: p.categorySlug,
      image: p.image,
      stock: String(p.stock),
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف المنتج؟")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.nameAr || !form.price) return alert("يرجى تعبئة جميع الحقول");

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: form.name,
        nameAr: form.nameAr,
        price: Number(form.price),
        category: form.category,
        categorySlug: form.categorySlug,
        image: form.image || "/placeholder.jpg",
        stock: Number(form.stock),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-[#5c3e31]">📦 إدارة المنتجات</h1>
          <input
            type="text"
            placeholder="🔍 ابحث باسم المنتج أو الفئة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#b36d39] bg-white w-64"
          />
        </div>
        <button
          onClick={openAdd}
          className="bg-[#b36d39] text-white px-5 py-2 rounded-xl font-bold hover:bg-[#9a5c2e] transition flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl">+</span> إضافة منتج
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-[#f5e4da] text-[#5c3e31]">
            <tr>
              {["الصورة", "الاسم", "الفئة", "السعر", "المخزون", "إجراءات"].map((h) => (
                <th
                  key={h}
                  className={`p-4 font-black border-b border-[#e8d5c8] ${
                    h === "إجراءات" ? "text-center" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr
                key={p.id}
                className={`border-b border-gray-100 hover:bg-[#fdf8f5] transition ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fdfaf8]"
                }`}
              >
                <td className="p-4 border-l border-gray-100">
                  <img
                    src={p.image}
                    alt={p.nameAr}
                    className="w-12 h-12 object-contain rounded-lg bg-[#f5e4da] p-1"
                  />
                </td>

                <td className="p-4 border-l border-gray-100 font-bold text-[#5c3e31]">
                  {p.nameAr}
                </td>

                <td className="p-4 border-l border-gray-100">
                  <span className="bg-[#f5e4da] text-[#b36d39] px-3 py-1 rounded-full text-xs font-bold">
                    {p.category}
                  </span>
                </td>

                <td className="p-4 border-l border-gray-100 font-black text-[#a0522d]">
                  {p.price}₪
                </td>

                <td className="p-4 border-l border-gray-100">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    p.stock > 20
                      ? "bg-green-100 text-green-700"
                      : p.stock > 5
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {p.stock}
                  </span>
                </td>

                <td className="p-4 border-l border-gray-100">
                  <div className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() => openEdit(p)}
                      title="تعديل"
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      title="حذف"
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

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">لا توجد نتائج</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#5c3e31]">
                {editingProduct ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {form.image && (
                <div className="flex justify-center mb-2">
                  <img
                    src={form.image}
                    alt="preview"
                    className="w-28 h-28 object-contain rounded-xl bg-[#f5e4da] p-2"
                  />
                </div>
              )}

              {[
                { key: "nameAr", label: "اسم المنتج (عربي)", placeholder: "مثال: دفتر ملاحظات" },
                { key: "name", label: "اسم المنتج (إنجليزي)", placeholder: "مثال: Notebook" },
                { key: "price", label: "السعر ₪", placeholder: "مثال: 9.99" },
                { key: "category", label: "الفئة", placeholder: "مثال: أدوات مكتبية" },
                { key: "categorySlug", label: "Slug الفئة", placeholder: "مثال: office" },
                { key: "image", label: "مسار الصورة", placeholder: "مثال: /notebook.jpg" },
                { key: "stock", label: "الكمية المتوفرة", placeholder: "مثال: 50" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[#5c3e31] font-bold block mb-1 text-sm">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#b36d39] text-sm"
                  />
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#b36d39] text-white font-bold py-3 rounded-xl hover:bg-[#9a5c2e] transition"
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}