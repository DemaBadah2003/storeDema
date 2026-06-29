// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
// استدعاء دالة التحقق من مسارها النسبي الصحيح بداخل مجلد الـ login
import { validateLoginInput } from "../login/validation";

export default function ForgotPasswordPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // تصفير الرسائل السابقة

    // 1. استدعاء دالة التحقق وتمرير القيمة المدخلة لها
    const validation = validateLoginInput(input);

    // 2. إذا كانت البيانات غير صالحة، يتم عرض رسالة الخطأ المحددة وإيقاف العملية
    if (!validation.isValid) {
      setMessage(validation.message);
      return;
    }
    
    // 3. إذا كانت البيانات صحيحة، تستمر العملية بشكل طبيعي
    setLoading(true);

    // محاكاة إرسال طلب للـ API الخاص بالـ OTP
    setTimeout(() => {
      setLoading(false);
      setMessage("نجاح: إذا كان الحساب موجوداً، فستتلقى رمز التحقق (OTP) قريباً.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8" dir="rtl">
      {/* اللوغو */}
      <Link href="/" className="mb-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d48c56] to-[#b36d39] rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-1">
          د
        </div>
        <span className="text-[#5c3e31] font-extrabold text-xl">متجر ديما</span>
      </Link>

      {/* كارد المساعدة */}
      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-medium text-gray-900 mb-3">مساعدة في كلمة المرور</h1>
        <p className="text-xs text-gray-600 mb-5 leading-relaxed">
          أدخل عنوان البريد الإلكتروني أو رقم الهاتف المحمول المرتبط بحسابك على متجر ديما، وسنرسل لك رمزاً لتفعيل كلمة المرور الجديدة.
        </p>

        {/* عرض الرسائل الديناميكية بناءً على نتيجة الفحص */}
        {message && (
          <div className={`mb-4 p-2 text-sm rounded text-center ${message.includes("نجاح") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-1">البريد الإلكتروني أو رقم الجوال</label>
            <input
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)]"
              placeholder="059xxxxxxx أو name@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded-md py-2 text-sm font-medium text-gray-900 hover:from-[#f5d78e] hover:to-[#eeb933] transition disabled:opacity-50"
          >
            {loading ? "جاري الإرسال..." : "متابعة"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        هل تذكرت كلمة المرور؟ <Link href="/login" className="text-[#0066c0] hover:underline font-medium">تسجيل الدخول</Link>
      </div>
    </div>
  );
}