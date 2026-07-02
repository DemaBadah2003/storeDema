"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// بيانات تجريبية - استبدليها لاحقاً بالبيانات الحقيقية من السلة (context/DB)
const cartItems = [
  { id: "1", nameAr: "سماعات لاسلكية", price: 29.99, quantity: 1, image: "/headphones.jpg" },
  { id: "2", nameAr: "دفتر ملاحظات", price: 5.99, quantity: 2, image: "/notebook.jpg" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!form.fullName || !form.phone || !form.city || !form.address) {
      alert("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);
    try {
      // TODO: استبدلي هذا بطلب API فعلي لحفظ الطلب في قاعدة البيانات
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cartItems, total }),
      });

      if (!res.ok) throw new Error("فشل إرسال الطلب");

      router.push("/user/orders?success=1");
    } catch (err) {
      alert("حدث خطأ أثناء تأكيد الطلب، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-black text-[#5c3e31] mb-8">🧾 تأكيد الطلب</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود بيانات الشحن والدفع */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* بيانات الشحن */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">📍 عنوان التوصيل</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">الاسم الكامل *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="مثال: محمد أحمد"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39]"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">رقم الهاتف *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="مثال: 0599123456"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39]"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">المدينة *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="مثال: غزة"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39]"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">العنوان التفصيلي *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="اسم الشارع، رقم المبنى..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">ملاحظات إضافية</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="أي تفاصيل تسهّل عملية التوصيل..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b36d39]"
                />
              </div>
            </div>
          </div>

          {/* طريقة الدفع */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-black text-[#5c3e31] mb-4">💳 طريقة الدفع</h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer has-[:checked]:border-[#b36d39] has-[:checked]:bg-[#f5e4da]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={form.paymentMethod === "cash"}
                  onChange={handleChange}
                />
                <span className="font-bold text-sm text-[#5c3e31]">الدفع عند الاستلام</span>
              </label>
              <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer has-[:checked]:border-[#b36d39] has-[:checked]:bg-[#f5e4da]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <span className="font-bold text-sm text-[#5c3e31]">بطاقة ائتمان</span>
              </label>
            </div>
          </div>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
          <h2 className="font-black text-[#5c3e31] mb-4">📦 ملخص الطلب</h2>

          <div className="flex flex-col gap-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.nameAr}
                  className="w-14 h-14 object-contain rounded-lg bg-[#f5e4da] p-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#5c3e31]">{item.nameAr}</p>
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
              <span>{subtotal.toFixed(2)}₪</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>الشحن</span>
              <span>{shipping === 0 ? "مجاني" : `${shipping.toFixed(2)}₪`}</span>
            </div>
            <div className="flex justify-between font-black text-[#5c3e31] text-lg border-t border-gray-100 pt-2 mt-2">
              <span>الإجمالي</span>
              <span>{total.toFixed(2)}₪</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full bg-[#b36d39] text-white font-bold py-3 rounded-xl mt-6 hover:bg-[#9a5c2e] transition disabled:opacity-50"
          >
            {loading ? "جاري التأكيد..." : "تأكيد الطلب"}
          </button>
        </div>
      </div>
    </div>
  );
}