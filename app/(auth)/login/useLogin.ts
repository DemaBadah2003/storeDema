// app/(auth)/login/useLogin.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateLoginInput } from "./validation"; // استيراد دالة التحقق

export function useLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // 1. تشغيل الفحص من ملف الـ validation
    const validation = validateLoginInput(email);
    
    if (!validation.isValid) {
      setMessage(validation.message); // عرض رسالة الخطأ المناسبة
      return;
    }

    // 2. إذا نجح الفحص، نتابع عملية الاتصال بالخادم
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("تم إرسال البيانات وحفظها بنجاح!");
        setEmail("");
        router.push("/"); 
      } else {
        setMessage(data.message || "حدث خطأ ما");
      }
    } catch (error) {
      setMessage("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    message,
    handleLogin,
  };
}