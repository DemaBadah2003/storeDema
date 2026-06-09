"use client";

import Link from "next/link";

export default function BusinessFinishPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-10 w-full max-w-lg text-center">
        
        {/* أيقونة النجاح */}
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#232f3e] mb-2">تم إنشاء حساب الأعمال بنجاح!</h1>
        <p className="text-gray-600 mb-8">
          شكراً لتسجيلك في "متجر ديما للأعمال". لقد تم إرسال رسالة تفعيل إلى بريدك الإلكتروني.
        </p>

        <div className="space-y-4">
          <Link 
            href="/register/controlPanel" 
            className="block w-full bg-[#ffd814] hover:bg-[#f7ca00] py-3 rounded-md font-semibold text-sm shadow-sm transition"
          >
            الانتقال إلى لوحة التحكم
          </Link>
          <Link 
            href="/" 
            className="block text-blue-600 hover:underline text-sm"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}