"use client";

import Link from "next/link";

interface LoginCardProps {
  email: string;
  setEmail: (value: string) => void;
  loading: boolean;
  message: string;
  onLogin: () => void;
}

export default function LoginCard({ email, setEmail, loading, message, onLogin }: LoginCardProps) {
  return (
    <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 bg-white">
      <h1 className="text-2xl font-medium text-gray-900 mb-5">
        تسجيل الدخول أو إنشاء حساب
      </h1>

      {/* عرض رسائل الخطأ أو النجاح */}
      {message && (
        <div className={`mb-4 p-2 text-sm rounded text-center ${message.includes("نجاح") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      {/* حقل الإيميل أو الجوال */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-800 mb-1">
          أدخل رقم الجوال أو البريد الإلكتروني
        </label>
        <input
          type="text"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)]"
        />
      </div>

      {/* زر المتابعة */}
      <button 
        onClick={onLogin}
        disabled={loading}
        className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded-md py-2 text-sm font-medium text-gray-900 hover:from-[#f5d78e] hover:to-[#eeb933] transition mb-3 disabled:opacity-50"
      >
        {loading ? "جاري المتابعة..." : "متابعة"}
      </button>

      {/* نص الموافقة */}
      <p className="text-xs text-gray-600 leading-relaxed mb-4">
        بالمتابعة، أنت توافق على{" "}
        <Link href="/register/terms" className="text-[#0066c0] hover:text-[#c45500] hover:underline">
          شروط الاستخدام
        </Link>{" "}
        و{" "}
        <Link href="/register/privacy" className="text-[#0066c0] hover:text-[#c45500] hover:underline">
          سياسة الخصوصية
        </Link>
        .
      </p>

      {/* فاصل جديد في متجر ديما */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-xs text-gray-500">جديد في متجر ديما؟</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* زر إنشاء حساب يوجه إلى صفحة الـ register */}
      <Link
        href="/register"
        className="block w-full text-center bg-gradient-to-b from-[#f3f3f3] to-[#e4e4e4] border border-gray-400 rounded-md py-2 text-sm font-medium text-gray-800 hover:from-[#e8e8e8] hover:to-[#d9d9d9] transition"
      >
        إنشاء حساب جديد
      </Link>
    </div>
  );
}