"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // نمسح خطأ الحقل بمجرد ما المستخدم يعدل فيه
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[e.target.name];
        return updated;
      });
    }
  };

  // ✅ دالة التحقق الشاملة من كل الحقول
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // الاسم الكامل: مطلوب + ممنوع يبدأ أو ينتهي بمسافات
    const trimmedName = form.fullName.trim();
    if (!trimmedName) {
      errors.fullName = "الاسم الكامل مطلوب";
    } else if (form.fullName !== trimmedName) {
      errors.fullName = "الاسم لا يجب أن يبدأ أو ينتهي بمسافات";
    } else if (trimmedName.length < 3) {
      errors.fullName = "الاسم قصير جداً";
    }

    // رقم الهاتف: مطلوب + يبدأ بـ 056 أو 059 + يليها 7 أرقام (10 أرقام إجمالي)
    const phonePattern = /^(056|059)\d{7}$/;
    if (!form.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    } else if (!phonePattern.test(form.phone.trim())) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 056 أو 059 ويتكون من 10 أرقام";
    }

    // المدينة: مطلوب + بدون مسافات بالبداية/النهاية
    const trimmedCity = form.city.trim();
    if (!trimmedCity) {
      errors.city = "المدينة مطلوبة";
    } else if (form.city !== trimmedCity) {
      errors.city = "المدينة لا يجب أن تبدأ أو تنتهي بمسافات";
    }

    // العنوان التفصيلي: مطلوب + بدون مسافات بالبداية/النهاية
    const trimmedAddress = form.address.trim();
    if (!trimmedAddress) {
      errors.address = "العنوان التفصيلي مطلوب";
    } else if (form.address !== trimmedAddress) {
      errors.address = "العنوان لا يجب أن يبدأ أو ينتهي بمسافات";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = async () => {
    if (!cart.length) return;

    setError("");

    // ✅ نشغّل التحقق الشامل قبل أي إرسال
    if (!validateForm()) {
      setError("يرجى تصحيح الحقول المطلوبة قبل المتابعة");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/protected/users/myOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
          paymentMethod: form.paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "فشل إرسال الطلب");
        setLoading(false);
        return;
      }

      clearCart();
      router.push("/user/myOrder");
    } catch (err) {
      setError("حدث خطأ أثناء تأكيد الطلب، حاول مرة أخرى");
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <div dir="rtl" className="text-center mt-20">
        <p className="text-gray-400 mb-2">عربتك فارغة</p>
        <a href="/products" className="text-[#b36d39] underline">
          تصفح المنتجات
        </a>
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-black text-[#5c3e31] mb-8">🧾 تأكيد الطلب</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

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
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none ${
                    fieldErrors.fullName
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#b36d39]"
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">رقم الهاتف *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="مثال: 0599123456"
                  maxLength={10}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none ${
                    fieldErrors.phone
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#b36d39]"
                  }`}
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">المدينة *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="مثال: غزة"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none ${
                    fieldErrors.city
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#b36d39]"
                  }`}
                />
                {fieldErrors.city && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-[#5c3e31] block mb-1">العنوان التفصيلي *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="اسم الشارع، رقم المبنى..."
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none ${
                    fieldErrors.address
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#b36d39]"
                  }`}
                />
                {fieldErrors.address && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>
                )}
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
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
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
                  {(Number(item.product.price) * item.quantity).toFixed(2)}₪
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