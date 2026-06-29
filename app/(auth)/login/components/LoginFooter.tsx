// app/(auth)/login/_components/LoginFooter.tsx
"use client";

import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="w-full mt-auto pt-10 border-t border-gray-300">
      <div className="flex justify-center gap-6 py-4">
        {/* تم تحديث شروط الاستخدام وسياسة الخصوصية مسبقاً */}
        <Link href="/register/terms" className="text-xs text-[#0066c0] hover:underline">
          شروط الاستخدام
        </Link>
        <Link href="/register/privacy" className="text-xs text-[#0066c0] hover:underline">
          سياسة الخصوصية
        </Link>
        
        {/* التعديل الجديد والمهم هنا: توجيه رابط مساعدة إلى المجلد الحالي بداخل register */}
        <Link href="/register/support" className="text-xs text-[#0066c0] hover:underline">
          مساعدة
        </Link>
      </div>
      <p className="text-center text-xs text-gray-500 pb-4">
        © 2026 متجر ديما — جميع الحقوق محفوظة
      </p>
    </div>
  );
}