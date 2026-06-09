"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BusinessDetailsPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    receiveTexts: false,
    businessName: "",
    businessType: "",
    streetAddress: "",
    suite: "",
    zipCode: "",
    city: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/register/finishBusines");
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col" dir="rtl">

      {/* الهيدر */}
      <div className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[#232f3e] font-bold text-2xl">متجر ديما</span>
          <span className="text-orange-500 font-bold text-xl mr-1">للأعمال</span>
        </div>

        <div className="flex items-center gap-4">
          {/* الخطوة 1 - مكتملة */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#232f3e] text-white flex items-center justify-center text-sm font-bold">✓</span>
            <span className="text-sm text-[#232f3e] font-bold">إنشاء الحساب</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          {/* الخطوة 2 - حالية */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#232f3e] text-white flex items-center justify-center text-sm font-bold">2</span>
            <span className="text-sm text-[#232f3e] font-bold">تفاصيل العمل</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          {/* الخطوة 3 */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm">3</span>
            <span className="text-sm text-gray-400">إنهاء</span>
          </div>
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-1 justify-center px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-10 w-full max-w-2xl">

          <h1 className="text-2xl font-semibold text-[#232f3e] mb-2">أدخل تفاصيل عملك التجاري</h1>
          <p className="text-sm text-gray-600 mb-6">
            أخبرنا عنك وعن عملك حتى نتمكن من التحقق منه. يرجى تقديم المعلومات وفقاً للوثائق الرسمية للحصول على التحقق بشكل أسرع.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* معلومات الاتصال */}
            <div>
              <h2 className="text-lg font-bold text-[#232f3e] mb-4 pb-2 border-b border-gray-200">معلومات الاتصال</h2>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">الاسم الأول والأخير</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                    هاتف العمل
                    <span className="w-4 h-4 rounded-full border border-blue-500 text-blue-500 text-xs flex items-center justify-center">i</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="receiveTexts"
                    checked={form.receiveTexts}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-orange-500"
                  />
                  <label className="text-sm text-gray-700">
                    تلقي رسائل نصية للحصول على تحديثات حول حالة التحقق من حسابك. قد تُطبق رسوم الرسائل والبيانات.
                  </label>
                </div>
              </div>
            </div>

            {/* معلومات العمل */}
            <div>
              <h2 className="text-lg font-bold text-[#232f3e] mb-4 pb-2 border-b border-gray-200">معلومات العمل التجاري</h2>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                    اسم العمل التجاري
                    <span className="w-4 h-4 rounded-full border border-blue-500 text-blue-500 text-xs flex items-center justify-center">i</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-800">نوع العمل التجاري</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="businessType"
                      value="sole"
                      checked={form.businessType === "sole"}
                      onChange={handleChange}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-700">ملكية فردية (غير مسجلة)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="businessType"
                      value="other"
                      checked={form.businessType === "other"}
                      onChange={handleChange}
                      className="accent-orange-500"
                    />
                    <span className="text-sm text-gray-700">أخرى</span>
                  </label>
                </div>
              </div>
            </div>

            {/* عنوان العمل */}
            <div>
              <h2 className="text-lg font-bold text-[#232f3e] mb-1 pb-2 border-b border-gray-200">عنوان العمل التجاري</h2>
              <p className="text-sm text-gray-600 mb-4">هل لديك مواقع متعددة؟ استخدم العنوان الموضح في المستندات الرسمية كنماذج الضرائب.</p>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">عنوان الشارع</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={form.streetAddress}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">الجناح، الوحدة، الطابق (اختياري)</label>
                  <input
                    type="text"
                    name="suite"
                    value={form.suite}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">الرمز البريدي</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">المدينة</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-800">المنطقة / المحافظة</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-right bg-white"
                    required
                  >
                    <option value="">اختر منطقة</option>
                    <option value="riyadh">الرياض</option>
                    <option value="jeddah">جدة</option>
                    <option value="makkah">مكة المكرمة</option>
                    <option value="madinah">المدينة المنورة</option>
                    <option value="dammam">الدمام</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-md py-3 text-sm font-semibold shadow-sm transition"
            >
              إنشاء حساب أعمال
            </button>

          </form>
        </div>
      </div>

      {/* الفوتر */}
      <div className="w-full py-6 flex flex-col items-center gap-3 border-t border-gray-300 bg-white">
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