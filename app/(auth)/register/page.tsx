"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // التحقق من البيانات
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMessage("جميع الحقول مطلوبة");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("كلمات المرور غير متطابقة");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setLoading(false);
      return;
    }

    try {
      // استدعاء API التسجيل
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "حدث خطأ أثناء التسجيل");
        setLoading(false);
        return;
      }

      // ✅ تسجيل ناجح - التوجيه لصفحة تسجيل الدخول
      router.push("/login");
    } catch (error) {
      setErrorMessage("حدث خطأ في الاتصال");
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 px-4">

      {/* اللوغو */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          متجر <span style={{ color: "#D4900A" }}>ديما</span>
        </h1>
      </div>

      {/* بطاقة التسجيل */}
      <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-sm shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">إنشاء حساب</h2>

        {/* رسالة الخطأ */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* الاسم */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">اسمك</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="الاسم الأول والأخير"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ "--tw-ring-color": "#D4900A" } as React.CSSProperties}
              required
            />
            <span className="text-xs text-gray-500">الاسم على بطاقات الحساب</span>
          </div>

          {/* البريد الإلكتروني */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">رقم الجوال أو البريد الإلكتروني</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              required
            />
          </div>

          {/* كلمة المرور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="٦ أحرف على الأقل"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:border-transparent transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-xs hover:underline"
                style={{ color: "#D4900A" }}
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-800">أعد إدخال كلمة المرور</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="أعد إدخال كلمة المرور"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              required
            />
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            disabled={loading}
            className="text-white font-semibold text-sm py-2 rounded-md border transition active:opacity-90 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#D4900A", borderColor: "#B8780A" }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#B8780A")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#D4900A")}
          >
            {loading ? "جاري التسجيل..." : "متابعة"}
          </button>
        </form>

        {/* شروط الاستخدام */}
        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          بالمتابعة، فأنت توافق على{" "}
          <a href="#" style={{ color: "#D4900A" }} className="hover:underline">شروط الاستخدام</a>{" "}
          و{" "}
          <a href="#" style={{ color: "#D4900A" }} className="hover:underline">سياسة الخصوصية</a>{" "}
          الخاصة بمتجر ديما.
        </p>

        {/* تسجيل الدخول */}
        <div className="border-t border-gray-200 mt-5 pt-4">
          <p className="text-sm text-gray-700">
            هل لديك حساب بالفعل؟{" "}
            <a href="/login" style={{ color: "#D4900A" }} className="hover:underline font-medium">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>

      {/* فاصل */}
      <div className="flex items-center gap-3 w-full max-w-sm my-5">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-xs text-gray-500">جديد في متجر ديما؟</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* إنشاء حساب تجاري */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 w-full max-w-sm text-center shadow-sm">
        <p className="text-sm text-gray-700 mb-2">هل تتسوق للعمل أو لمؤسستك؟</p>
        <a href="/register/business" style={{ color: "#D4900A" }} className="text-sm hover:underline font-medium">
          إنشاء حساب تجاري مجاني
        </a>
      </div>

      {/* فوتر */}
      <footer className="mt-8 pb-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-xs mb-3">
          <a href="#" style={{ color: "#D4900A" }} className="hover:underline">شروط الاستخدام</a>
          <a href="#" style={{ color: "#D4900A" }} className="hover:underline">سياسة الخصوصية</a>
          <a href="#" style={{ color: "#D4900A" }} className="hover:underline">مساعدة</a>
        </div>
        <p className="text-xs text-gray-500">© 2026 متجر ديما. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}