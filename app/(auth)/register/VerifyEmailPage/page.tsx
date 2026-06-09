"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  const email = "demabadah4@gmail.com"; // استبدلها بالإيميل الحقيقي من الـ params أو session

  const handleVerify = () => {
    if (!code.trim()) {
      setError("الرجاء إدخال رمز التحقق");
      return;
    }
    if (code.length < 4) {
      setError("رمز التحقق غير صحيح");
      return;
    }
    setError("");
    // هنا تضيف منطق التحقق من الكود
    router.push("/register/businessDetails");
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
    // هنا تضيف منطق إعادة الإرسال
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col" dir="rtl">

      {/* الهيدر */}
      <div className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        {/* اللوجو */}
        <div className="flex items-center gap-1">
          <span className="text-[#232f3e] font-bold text-2xl">متجر ديما</span>
          <span className="text-orange-500 font-bold text-xl mr-1">للأعمال</span>
        </div>

        {/* الخطوات */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#232f3e] text-white flex items-center justify-center text-sm font-bold">1</span>
            <span className="font-bold text-sm text-[#232f3e]">إنشاء الحساب</span>
          </div>

          <div className="w-8 h-px bg-gray-300" />

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm">2</span>
            <span className="text-sm text-gray-400">تفاصيل العمل</span>
          </div>

          <div className="w-8 h-px bg-gray-300" />

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm">3</span>
            <span className="text-sm text-gray-400">إنهاء</span>
          </div>
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-1 items-start justify-center pt-16 px-4">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-10 w-full max-w-md">

          {/* العنوان */}
          <h1 className="text-2xl font-semibold mb-4 text-[#232f3e]">تحقق من البريد الإلكتروني</h1>

          {/* الوصف */}
          <p className="text-sm text-gray-700 mb-1">
            للتحقق من بريدك الإلكتروني، أرسلنا كلمة مرور لمرة واحدة (OTP) إلى
          </p>
          <p className="text-sm text-gray-700 mb-1 font-medium">{email}</p>
          <Link href="/business" className="text-sm text-[#0066c0] hover:text-orange-500 hover:underline mb-6 block">
            (تغيير)
          </Link>

          {/* حقل الكود */}
          <label className="text-sm font-semibold text-[#232f3e] mb-2 block">
            أدخل رمز الأمان
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className={`w-full border ${
              error ? "border-red-500" : "border-gray-400"
            } rounded p-2 mb-1 text-sm focus:ring-2 focus:ring-orange-400 outline-none text-right`}
            placeholder="أدخل الرمز هنا"
          />

          {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

          {/* زر التحقق */}
          <button
            onClick={handleVerify}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-md py-2 text-sm font-semibold shadow-sm transition mt-3"
          >
            تحقق
          </button>

          {/* إعادة الإرسال */}
          <div className="mt-4 text-center">
            {resent ? (
              <p className="text-green-600 text-sm">✓ تم إعادة إرسال الرمز</p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-[#0066c0] hover:text-orange-500 hover:underline"
              >
                إعادة إرسال الرمز
              </button>
            )}
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <div className="w-full py-6 flex flex-col items-center gap-3 border-t border-gray-300 bg-white mt-10">
        <div className="flex gap-6 text-sm text-[#0066c0]">
          <Link href="#" className="hover:text-orange-500 hover:underline">خدمة عملاء الأعمال</Link>
          <Link href="#" className="hover:text-orange-500 hover:underline">شروط الاستخدام</Link>
          <Link href="#" className="hover:text-orange-500 hover:underline">سياسة الخصوصية</Link>
        </div>
        <p className="text-xs text-gray-500">© 1996-2026، متجر ديما وشركاته التابعة</p>
      </div>

    </div>
  );
}