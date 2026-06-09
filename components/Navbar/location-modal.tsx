"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 1. استيراد الموجه الخاص بـ Next.js

const COUNTRIES = [
  "فلسطين", "الأردن", "السعودية", "الإمارات", "مصر",
  "الكويت", "قطر", "البحرين", "عُمان", "لبنان",
];

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: string, city?: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  onSelect,
}: LocationModalProps) {
  const router = useRouter(); // 👈 2. تجهيز الـ router للاستخدام
  const [selected, setSelected] = useState("فلسطين");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ── وظيفة الانتقال لصفحة تسجيل الدخول ─────────────────
  const handleSignInClick = () => {
    onClose(); // إغلاق الـ Modal أولاً لضمان تجربة مستخدم سلسة
    router.push("/login"); // الانتقال إلى مسار صفحة تسجيل الدخول الخاصة بك
  };

  // ── زر "تطبيق" للمدينة ──────────────────────────────
  const handleApplyCity = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/location/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selected, city: city.trim() }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onSelect(data.country, data.city);
      onClose();
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  // ── زر "تم" للدولة ───────────────────────────────────
  const handleDone = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/location/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selected }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onSelect(data.country);
      onClose();
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[100]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-white rounded-xl shadow-2xl w-[340px] p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#5c3e31] font-bold text-lg">اختر موقعك</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* وصف */}
        <p className="text-gray-500 text-sm mb-4 text-right leading-relaxed">
          خيارات التوصيل والسرعة قد تختلف حسب الموقع
        </p>

        {/* رسالة خطأ */}
        {error && (
          <p className="text-red-500 text-xs text-right mb-3 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* زر تسجيل الدخول (تم ربطه هنا) */}
        <button 
          onClick={handleSignInClick} // 👈 3. ربط الحدث بالزر
          className="w-full bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:opacity-90 text-white font-bold py-2.5 rounded-full mb-4 transition shadow-sm cursor-pointer"
        >
          سجّل الدخول لرؤية عناوينك
        </button>

        {/* فاصل */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">أو أدخل المدينة</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* حقل المدينة */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="اسم المدينة..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b36d39] focus:ring-1 focus:ring-[#b36d39]/20 text-right"
          />
          <button
            onClick={handleApplyCity}
            disabled={loading || !city.trim()}
            className="bg-[#f5e4da] hover:bg-[#ebd2c3] text-[#5c3e31] font-bold px-4 py-2 rounded-lg text-sm transition border border-[#dfc4b5] disabled:opacity-50"
          >
            {loading ? "..." : "تطبيق"}
          </button>
        </div>

        {/* فاصل */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">أو اختر الدولة</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* قائمة الدول */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#b36d39] text-right mb-5 cursor-pointer"
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* زر تم */}
        <div className="flex justify-end">
          <button
            onClick={handleDone}
            disabled={loading}
            className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:opacity-90 text-white font-bold px-8 py-2 rounded-full transition shadow-md disabled:opacity-50"
          >
            {loading ? "جارٍ الحفظ..." : "تم"}
          </button>
        </div>

      </div>
    </>
  );
}