"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "@/types";

const emptyForm = {
  id: "", name: "", nameAr: "", price: "", category: "",
  categorySlug: "", image: "", stock: "",
};

// 👈 يربط النص العربي المخزّن بقاعدة البيانات بمفتاح الترجمة الموجود بملف i18n
const CATEGORY_KEY_MAP: Record<string, string> = {
  "أحذية": "shoes",
  "الأحذية": "shoes",
  "إلكترونيات": "electronics",
  "الإلكترونيات": "electronics",
  "ملابس": "clothes",
  "الملابس": "clothes",
  "جمال": "beauty",
  "الجمال والصحة": "beauty",
  "المنزل": "home",
  "منزل": "home",
  "ساعات": "watches",
  "حقائب": "bags",
  "رياضة": "sports",
  "أدوات مكتبية": "office",
};

export default function AdminProducts() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/protected/admin/products");
      if (!res.ok) throw new Error(t("admin_products_fetch_error"));
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      alert(t("admin_products_fetch_error_alert"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const runSearch = () => {
    setSearch(searchInput.trim());
  };

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

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin_products_delete_confirm"))) return;

    try {
      const res = await fetch(`/api/protected/admin/products?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert(t("admin_products_delete_error"));
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!form.nameAr || !form.price) {
      alert(t("admin_products_fill_required"));
      return;
    }

    setSaving(true);
    try {
      if (editingProduct) {
        const res = await fetch(
          `/api/protected/admin/products/${editingProduct.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
        if (!res.ok) throw new Error("Update failed");

        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
      } else {
        const res = await fetch(`/api/protected/admin/products/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Create failed");

        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      }
      setShowModal(false);
    } catch (error) {
      alert(t("admin_products_save_error"));
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const tableHeaders = [
    { key: "image", label: t("admin_products_table_image") },
    { key: "name", label: t("admin_products_table_name") },
    { key: "category", label: t("admin_products_table_category") },
    { key: "price", label: t("admin_products_table_price") },
    { key: "stock", label: t("admin_products_table_stock") },
    { key: "actions", label: t("admin_products_table_actions") },
  ];

  const formFields = [
    { key: "nameAr", label: t("admin_products_field_nameAr"), placeholder: t("admin_products_field_nameAr_placeholder") },
    { key: "name", label: t("admin_products_field_name"), placeholder: t("admin_products_field_name_placeholder") },
    { key: "price", label: t("admin_products_field_price"), placeholder: t("admin_products_field_price_placeholder") },
    { key: "category", label: t("admin_products_field_category"), placeholder: t("admin_products_field_category_placeholder") },
    { key: "categorySlug", label: t("admin_products_field_categorySlug"), placeholder: t("admin_products_field_categorySlug_placeholder") },
    { key: "image", label: t("admin_products_field_image"), placeholder: t("admin_products_field_image_placeholder") },
    { key: "stock", label: t("admin_products_field_stock"), placeholder: t("admin_products_field_stock_placeholder") },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" dir={isRtl ? "rtl" : "ltr"}>
        <p className="text-[#5c3e31] font-bold">{t("admin_products_loading")}</p>
      </div>
    );
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-[#5c3e31]">{t("admin_products_title")}</h1>
          <input
            type="text"
            placeholder={t("admin_products_search_placeholder")}
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
            {t("admin_products_search_btn")}
          </button>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#b36d39] text-white px-5 py-2 rounded-xl font-bold hover:bg-[#9a5c2e] transition flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl">+</span> {t("admin_products_add_btn")}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className={`w-full ${isRtl ? "text-right" : "text-left"}`}>
          <thead className="bg-[#f5e4da] text-[#5c3e31]">
            <tr>
              {tableHeaders.map((h) => (
                <th
                  key={h.key}
                  className={`p-4 font-black border-b border-[#e8d5c8] ${
                    h.key === "actions" ? "text-center" : ""
                  }`}
                >
                  {h.label}
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
                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100`}>
                  <img
                    src={p.image}
                    alt={p.nameAr}
                    className="w-12 h-12 object-contain rounded-lg bg-[#f5e4da] p-1"
                  />
                </td>

                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100 font-bold text-[#5c3e31]`}>
                  {isRtl ? p.nameAr : p.name}
                </td>

                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100`}>
                  <span className="bg-[#f5e4da] text-[#b36d39] px-3 py-1 rounded-full text-xs font-bold">
                    {t(CATEGORY_KEY_MAP[p.category] || p.category)}
                  </span>
                </td>

                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100 font-black text-[#a0522d]`}>
                  {p.price}₪
                </td>

                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100`}>
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

                <td className={`p-4 ${isRtl ? "border-l" : "border-r"} border-gray-100`}>
                  <div className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() => openEdit(p)}
                      title={t("admin_products_edit_tooltip")}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      title={t("admin_products_delete_tooltip")}
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
          <p className="text-center text-gray-400 py-12">{t("admin_products_no_results")}</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#5c3e31]">
                {editingProduct
                  ? t("admin_products_modal_edit_title")
                  : t("admin_products_modal_add_title")}
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

              {formFields.map((field) => (
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
                  disabled={saving}
                  className="flex-1 bg-[#b36d39] text-white font-bold py-3 rounded-xl hover:bg-[#9a5c2e] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving
                    ? t("admin_products_saving_btn")
                    : editingProduct
                    ? t("admin_products_save_btn")
                    : t("admin_products_add_submit_btn")}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="flex-1 border border-gray-200 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  {t("admin_products_cancel_btn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}