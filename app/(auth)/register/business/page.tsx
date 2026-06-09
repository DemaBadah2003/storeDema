"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateEmailOnly } from "../../login/emailValidation";

export default function BusinessRegisterPage() {
  const router = useRouter();
  const [step] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleStart = () => {
    const validation = validateEmailOnly(email);

    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    if (!isVerified) {
      setError("الرجاء إثبات أنك لست روبوت");
      return;
    }

    setError("");
    // ✅ يروح لصفحة التحقق مع الإيميل
    router.push(`/register/VerifyEmailPage?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-4" dir="rtl">

      {/* الهيدر */}
      <div className="w-full max-w-5xl flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <Link href="/" className="text-[#232f3e] font-bold text-2xl">
          متجر ديما <span className="text-sm font-normal text-orange-700">للأعمال</span>
        </Link>

        <div className="flex gap-8">
          <div className={`flex items-center gap-2 ${step === 1 ? "font-bold" : "text-gray-400"}`}>
            <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">1</span>
            إنشاء الحساب
          </div>
          <div className={`flex items-center gap-2 ${step === 2 ? "font-bold" : "text-gray-400"}`}>
            <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm">2</span>
            تفاصيل العمل
          </div>
          <div className={`flex items-center gap-2 ${step === 3 ? "font-bold" : "text-gray-400"}`}>
            <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm">3</span>
            إنهاء
          </div>
        </div>
      </div>

      {/* الكارد */}
      <div className="w-full max-w-4xl border border-gray-300 rounded-lg shadow-sm mt-10 flex flex-col md:flex-row overflow-hidden">

        <div className="flex-1 p-10 bg-white">
          <h1 className="text-2xl font-bold mb-2">أنشئ حساب متجر ديما للأعمال مجاناً</h1>
          <p className="mb-6 text-sm text-gray-600">أدخل البريد الإلكتروني للعمل (يفضل بريد الشركة)</p>

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border ${error ? "border-red-500" : "border-gray-400"} rounded p-2 mb-4 focus:ring-2 focus:ring-orange-500 outline-none`}
          />

          <div
            onClick={() => setIsVerified(!isVerified)}
            className={`flex items-center gap-3 border ${
              isVerified ? "border-gray-300 bg-gray-50" : "border-gray-300"
            } rounded p-3 mb-4 cursor-pointer select-none`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                isVerified ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
              }`}
            >
              {isVerified && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            <span className="text-sm text-gray-700">لست روبوتاً</span>

            <div className="mr-auto flex flex-col items-center">
              <svg viewBox="0 0 64 64" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z" fill="#4A90D9"/>
                <path d="M32 12c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z" fill="#fff"/>
                <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" fill="#4A90D9"/>
              </svg>
              <span className="text-[8px] text-gray-400 mt-1">reCAPTCHA</span>
            </div>
          </div>

          {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

          <button
            onClick={handleStart}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-md py-2 text-sm font-medium shadow-sm transition"
          >
            ابدأ الآن
          </button>

          <div className="mt-6 text-sm">
            هل لديك حساب أعمال بالفعل؟{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              سجل دخولك
            </Link>
          </div>
        </div>

        {/* المميزات */}
        <div className="flex-1 p-10 bg-gray-50 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6">قيمة مضافة لكل أنواع المؤسسات</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-1">اشترِ أكثر، وفّر أكثر</h3>
              <p className="text-sm text-gray-600">وفّر على أكثر من 60 مليون منتج عند شراء قطعتين أو أكثر.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">اربط فريق عملك</h3>
              <p className="text-sm text-gray-600">أنشئ مجموعات، شارك طرق الدفع، وأدر مشترياتك في مكان واحد.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">شحن سريع ومجاني</h3>
              <p className="text-sm text-gray-600">استمتع بشحن سريع ومجاني للمؤسسات المؤهلة لجميع طلبات العمل.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}