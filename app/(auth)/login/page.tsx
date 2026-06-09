// app/(auth)/login/page.tsx
"use client";

import Link from "next/link";
import { useLogin } from "./useLogin";
import LoginHeader from "./components/LoginHeader";
import LoginCard from "./components/LoginCard";
import LoginFooter from "./components/LoginFooter";

export default function LoginPage() {
  const { email, setEmail, loading, message, handleLogin } = useLogin();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8" dir="rtl">

      {/* الشعار */}
      <LoginHeader />

      {/* كارد تسجيل الدخول */}
      <LoginCard
        email={email}
        setEmail={setEmail}
        loading={loading}
        message={message}
        onLogin={handleLogin}
      />

      {/* تحتاج مساعدة */}
      <div className="mt-4 text-center">
        <Link href="/register/support" className="text-xs text-[#0066c0] hover:underline hover:text-[#c45500]">
          تحتاج مساعدة؟
        </Link>
      </div>

      {/* ✅ رابط حساب الأعمال - مصحح */}
      <div className="mt-6 w-full max-w-sm">
        <div className="border-t border-gray-300 pt-5 text-center">
          <p className="text-sm text-gray-700 font-medium">هل تشتري لعمل تجاري؟</p>
          <Link
            href="/register/business"
            className="text-sm text-[#0066c0] hover:underline hover:text-[#c45500]"
          >
            أنشئ حساب أعمال مجاني
          </Link>
        </div>
      </div>

      {/* الفوتر */}
      <LoginFooter />

    </div>
  );
}