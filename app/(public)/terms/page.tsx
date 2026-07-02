// app/terms/page.tsx
"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-8 pb-12" dir="rtl">
      <Link href="/" className="mb-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d48c56] to-[#b36d39] rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-1">د</div>
        <span className="text-[#5c3e31] font-extrabold text-xl">متجر ديما</span>
      </Link>

      <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg p-8 shadow-sm text-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 pb-4 border-b border-gray-200">شروط الاستخدام</h1>
        <p className="text-xs text-gray-500 mb-6">آخر تحديث: 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-justify">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">العلامات التجارية والملكية الفكرية</h2>
            <p>إن الرسومات، والشعارات، ورؤوس الصفحات، وأيقونات الأزرار، والنصوص البرمجية، وأسماء الخدمات المضمنة في متجر ديما هي ملك للمتجر ولا يجوز استخدامها بأي طريقة تسبب ارتباكاً لدى العملاء.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">الأسعار ومخاطر الفقدان</h2>
            <p>يتم شراء السلع المادية بموجب عقد شحن، مما يعني أن مخاطر الفقدان تنتقل إليك بمجرد تسليمنا الشحنة إلى الشركة الناقلة. يحق للمتجر تعديل أو إلغاء الطلبات في حال وجود خطأ غير مقصود في تسعير المنتج.</p>
          </section>
        </div>
      </div>
    </div>
  );
}