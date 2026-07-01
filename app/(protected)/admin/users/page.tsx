"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  createdAt: string;
}

const initialUsers: User[] = [
  { id: "1", name: "ديما بعده", email: "dima@store.com", role: "admin", createdAt: "2026-06-01" },
  { id: "2", name: "أحمد علي", email: "ahmed@example.com", role: "customer", createdAt: "2026-06-15" },
  { id: "3", name: "منى خالد", email: "mona@example.com", role: "customer", createdAt: "2026-06-20" },
  { id: "4", name: "يوسف عمر", email: "yousef@example.com", role: "customer", createdAt: "2026-06-28" },
];

const emptyForm = {
  id: "",
  name: "",
  email: "",
  role: "customer" as "admin" | "customer",
  password: "",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Load from localStorage on client-side
  useEffect(() => {
    const stored = localStorage.getItem("store_users");
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
      } catch (e) {
        setUsers(initialUsers);
      }
    } else {
      setUsers(initialUsers);
      localStorage.setItem("store_users", JSON.stringify(initialUsers));
    }
  }, []);

  // Save to localStorage whenever users list changes
  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("store_users", JSON.stringify(updatedUsers));
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setForm({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      password: "", // do not fill password for editing for security reasons
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    const userToDelete = users.find((u) => u.id === id);
    if (userToDelete?.role === "admin" && users.filter((u) => u.role === "admin").length <= 1) {
      toast.error("لا يمكن حذف آخر مسؤول (Admin) في النظام!");
      return;
    }

    if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      const updated = users.filter((u) => u.id !== id);
      saveUsers(updated);
      toast.success("تم حذف المستخدم بنجاح! 🗑️");
    }
  };

  const handleSave = () => {
    if (!form.name || !form.email) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة!");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("يرجى إدخال بريد إلكتروني صالح!");
      return;
    }

    if (editingUser) {
      // Check if email exists in other users
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === form.email.toLowerCase() && u.id !== editingUser.id
      );
      if (emailExists) {
        toast.error("البريد الإلكتروني مسجل بالفعل لمستخدم آخر!");
        return;
      }

      const updated = users.map((u) =>
        u.id === editingUser.id
          ? { ...u, name: form.name, email: form.email, role: form.role }
          : u
      );
      saveUsers(updated);
      toast.success("تم تحديث بيانات المستخدم بنجاح! ✏️");
    } else {
      // Check if email exists
      const emailExists = users.some((u) => u.email.toLowerCase() === form.email.toLowerCase());
      if (emailExists) {
        toast.error("البريد الإلكتروني مسجل بالفعل!");
        return;
      }

      const newUser: User = {
        id: String(Date.now()),
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date().toISOString().split("T")[0],
      };
      const updated = [newUser, ...users];
      saveUsers(updated);
      toast.success("تم إضافة المستخدم الجديد بنجاح! 🎉");
    }
    setShowModal(false);
  };

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-[#5c3e31]">👥 إدارة المستخدمين</h1>
          <input
            type="text"
            placeholder="🔍 ابحث بالاسم أو البريد..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#b36d39] bg-white w-64 shadow-sm"
          />
        </div>
        <button
          onClick={openAdd}
          className="bg-[#b36d39] text-white px-5 py-2 rounded-xl font-bold hover:bg-[#9a5c2e] transition flex items-center gap-2 whitespace-nowrap shadow-sm active:scale-95"
        >
          <span className="text-xl font-black">+</span> إضافة مستخدم
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-100">
        <table className="w-full text-right">
          <thead className="bg-[#f5e4da] text-[#5c3e31]">
            <tr>
              {["المعرف", "الاسم", "البريد الإلكتروني", "الصلاحية", "تاريخ التسجيل", "إجراءات"].map((h) => (
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
            {filtered.map((u, index) => (
              <tr
                key={u.id}
                className={`border-b border-gray-100 hover:bg-[#fdf8f5] transition ${
                  index % 2 === 0 ? "bg-white" : "bg-[#fdfaf8]"
                }`}
              >
                <td className="p-4 border-l border-gray-50 text-xs text-gray-400">
                  #{u.id}
                </td>

                <td className="p-4 border-l border-gray-50 font-bold text-[#5c3e31]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#f5e4da] text-[#b36d39] flex items-center justify-center font-bold text-sm">
                      {u.name.charAt(0)}
                    </div>
                    <span>{u.name}</span>
                  </div>
                </td>

                <td className="p-4 border-l border-gray-50 text-[#b36d39] font-medium">
                  {u.email}
                </td>

                <td className="p-4 border-l border-gray-50">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      u.role === "admin"
                        ? "bg-[#b36d39]/10 text-[#b36d39] border border-[#b36d39]/20"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    {u.role === "admin" ? "مسؤول" : "عميل"}
                  </span>
                </td>

                <td className="p-4 border-l border-gray-50 text-sm text-gray-500 font-mono">
                  {u.createdAt}
                </td>

                <td className="p-4">
                  <div className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() => openEdit(u)}
                      title="تعديل الصلاحيات أو الاسم"
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      title="حذف المستخدم"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <p className="text-lg">لا توجد نتائج بحث تطابق استعلامك</p>
            <p className="text-sm mt-1">تأكد من كتابة الاسم أو البريد الإلكتروني بشكل صحيح</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-[#5c3e31] flex items-center gap-2">
                {editingUser ? "✏️ تعديل بيانات المستخدم" : "➕ إضافة مستخدم جديد"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-650 text-2xl font-bold transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#5c3e31] mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: ديما بعده"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39] bg-gray-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5c3e31] mb-1">البريد الإلكتروني *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@store.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39] bg-gray-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5c3e31] mb-1">الصلاحية / الدور *</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "customer" })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39] bg-gray-50/50 cursor-pointer"
                >
                  <option value="customer">عميل (Customer)</option>
                  <option value="admin">مسؤول (Admin)</option>
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-bold text-[#5c3e31] mb-1">كلمة المرور</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39] bg-gray-50/50"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#b36d39] hover:bg-[#9a5c2e] text-white py-3 rounded-xl font-bold transition shadow-sm active:scale-95 cursor-pointer"
                >
                  حفظ
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition active:scale-95 cursor-pointer"
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