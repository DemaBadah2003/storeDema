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


     

      {/* الفوتر */}
      <LoginFooter />

    </div>
  );
}