// app/register/support/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupportPage() {
  const [selectedTopic, setSelectedTopic] = useState("cannot-create");

  // دالة لإرجاع الحل المناسب بناءً على الخيار المحدد
  const renderHelpContent = () => {
    switch (selectedTopic) {
      case "forgot-password":
        return (
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-2 text-base">نسيت كلمة المرور؟</h3>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              يرجى تجربة الانتقال إلى{" "}
              <Link href="/forgot-password" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">
                صفحة استعادة الحساب
              </Link>{" "}
              وإدخال بريدك الإلكتروني أو رقم الجوال المسجل لتلقي رمز التحقق.
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              إذا كنت قد حاولت بالفعل إعادة تعيين كلمة المرور الخاصة بك، ولكنك لم تتلقَّ رسالة البريد الإلكتروني بعد، فيرجى التحقق من مجلدات البريد المهمل (Junk) أو الرسائل غير المرغوب فيها (Spam).
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              أو، إذا لم يعد بإمكانك الوصول إلى بريدك الإلكتروني، فجرّب إعادة تعيينه مباشرةً لدى مزود خدمة البريد الإلكتروني الخاص بك.
            </p>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              أخيراً، إذا قمت بتحديث كلمة المرور الخاصة بك مؤخراً، فتأكد من عدم حفظ كلمة المرور القديمة في المتصفح. بدلاً من ذلك، جرب إدخالها يدوياً.
            </p>

            <div className="border-t border-gray-200 pt-3">
              <Link href="/login" className="text-sm text-[#0066c0] hover:underline font-medium">
                ← الرجوع لصفحة تسجيل الدخول
              </Link>
            </div>
          </div>
        );
      case "not-working":
        return (
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-2 text-base">كلمة المرور لا تعمل؟</h3>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              في بعض الأحيان، لمزيد من الأمان، نقوم بإرسال بريد إلكتروني للتحقق من الحساب. يرجى التحقق من صندوق الوارد الخاص بك للحصول على رسالة التحقق.
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              إذا قمت بتغيير كلمة المرور الخاصة بك مؤخراً، فتأكد من أن متصفحك لا يحفظ كلمة المرور القديمة، وحاول إدخالها يدوياً بدلاً من ذلك.
            </p>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              ألم تقم بإعادة تعيين كلمة مرور بريدك الإلكتروني بعد؟ يرجى زيارة{" "}
              <Link href="/forgot-password" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">
                صفحة إعادة تعيين كلمة المرور
              </Link>{" "}
              الخاصة بنا.
            </p>

            <div className="border-t border-gray-200 pt-3 text-gray-700">
              <p className="text-sm font-medium mb-2">إذا لم تصلك رسالة بريد إلكتروني منا وما زلت تواجه مشكلة في تسجيل الدخول، يرجى الاتصال بنا على:</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• الولايات المتحدة وكندا: <span className="font-sans font-bold text-gray-900">1-800-388-5512</span></li>
                <li>• الدول الأخرى (تطبق الرسوم): <span className="font-sans font-bold text-gray-900">1-206-577-1364</span></li>
              </ul>
            </div>
          </div>
        );
      case "on-hold":
        return (
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-2 text-base">الحساب معلق أو قيد المراجعة</h3>
            
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              نأسف لمواجهتك مشكلة في الوصول إلى حسابك. يمكن أن يتم تعليق حسابك مؤقتاً لمزيد من الأمان عند ملاحظة نشاط دفع غير معتاد.
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              لاستعادة إمكانية الوصول، يرجى تسجيل الدخول إلى حسابك وإكمال النموذج المطلوب بما في ذلك المرفقات اللازمة. إذا كنت قد قمت بالفعل بإرسال النموذج، فيرجى الانتظار لمدة 24 ساعة للحصول على تحديثات جديدة منا.
            </p>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              لمزيد من المعلومات، يرجى زيارة{" "}
              <Link href="/register/terms" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">
                صفحة المساعدة الخاصة باستعادة الوصول إلى حساب معلق
              </Link>.
            </p>

            <div className="border-t border-gray-200 pt-3 text-gray-700">
              <p className="text-sm font-medium mb-2">إذا كنت بحاجة إلى مزيد من المساعدة، يرجى الاتصال بنا على:</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• الولايات المتحدة وكندا: <span className="font-sans font-bold text-gray-900">1-800-388-5512</span></li>
                <li>• الدول الأخرى (تطبق الرسوم): <span className="font-sans font-bold text-gray-900">1-206-577-1364</span></li>
              </ul>
            </div>
          </div>
        );
      case "need-assistance":
        return (
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-2 text-base">ليس لدي حساب ولكن أحتاج إلى مساعدة</h3>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              يمكنك إنشاء حساب جديد بسرعة من خلال زيارة{" "}
              <Link href="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">
                صفحة إنشاء حساب
              </Link>{" "}
              الخاصة بنا.
            </p>

            <div className="border-t border-gray-200 pt-3 text-gray-700">
              <p className="text-sm font-medium mb-2">إذا كنت بحاجة إلى مزيد من المساعدة في إنشاء حساب، يرجى الاتصال بنا على:</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• الولايات المتحدة وكندا: <span className="font-sans font-bold text-gray-900">1-800-388-5512</span></li>
                <li>• الدول الأخرى (تطبق الرسوم): <span className="font-sans font-bold text-gray-900">1-206-577-1364</span></li>
              </ul>
            </div>
          </div>
        );
      case "cannot-create":
      default:
        return (
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-900 mb-2 text-base">نأسف لمواجهتك مشكلات في إنشاء حساب.</h3>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              هل قمت بتجربة الانتقال إلى{" "}
              <Link href="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline font-medium">
                صفحة إنشاء حساب
              </Link>{" "}
              الخاصة بنا؟
            </p>

            <div className="border-t border-gray-200 pt-3 text-gray-700">
              <p className="text-sm font-medium mb-2">إذا كنت بحاجة إلى مزيد من المساعدة في إنشاء حساب، يرجى الاتصال بنا على:</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>• الولايات المتحدة وكندا: <span className="font-sans font-bold text-gray-900">1-800-388-5512</span></li>
                <li>• الدول الأخرى (تطبق الرسوم): <span className="font-sans font-bold text-gray-900">1-206-577-1364</span></li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8" dir="rtl">
      
      {/* هيدر وشعار المتجر المتناسق مع بقية الصفحات */}
      <Link href="/" className="mb-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-[#d48c56] to-[#b36d39] rounded-full flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-1">
          د
        </div>
        <span className="text-[#5c3e31] font-extrabold text-xl">متجر ديما</span>
      </Link>

      {/* كارد المساعدة الرئيسي */}
      <div className="w-full max-w-2xl border border-gray-300 rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          المساعدة في تسجيل الدخول
        </h1>
        <h2 className="text-base font-medium text-gray-800 mb-5">
          ما هي المشكلة التي تواجهك؟
        </h2>

        {/* القائمة المنسدلة المترجمة لمطابقة الصورة */}
        <div className="mb-6">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full border border-gray-400 rounded-md px-3 py-2.5 bg-gray-50 text-sm font-medium text-gray-800 outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 cursor-pointer"
          >
            <option value="choose" disabled>اختر المشكلة المحددة...</option>
            <option value="cannot-create">لا يمكنني إنشاء حساب جديد</option>
            <option value="forgot-password">لقد نسيت كلمة المرور الخاصة بي</option>
            <option value="not-working">كلمة المرور الخاصة بي لا تعمل</option>
            <option value="on-hold">حسابي معلق أو قيد التوقيف المؤقت</option>
            <option value="need-assistance">ليس لدي حساب ولكن أحتاج إلى مساعدة عامة</option>
          </select>
        </div>

        {/* عرض المحتوى الديناميكي المتغير بناءً على الـ Select */}
        <div className="min-h-[140px]">
          {renderHelpContent()}
        </div>

      </div>

      {/* فوتر الصفحة السفلي المتناسق مع هوية المتاجر الاحترافية */}
      <div className="w-full mt-auto pt-10 border-t border-gray-200 bg-gray-50 flex flex-col items-center">
        <div className="flex justify-center gap-6 py-3">
          <Link href="/register/terms" className="text-xs text-[#0066c0] hover:underline">شروط الاستخدام</Link>
          <Link href="/register/privacy" className="text-xs text-[#0066c0] hover:underline">سياسة الخصوصية</Link>
        </div>
        <p className="text-center text-xs text-gray-500 pb-4">
          © 2026 متجر ديما — جميع الحقوق محفوظة
        </p>
      </div>

    </div>
  );
}