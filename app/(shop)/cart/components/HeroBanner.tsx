// app/(shop)/cart/components/HeroBanner.tsx
export default function HeroBanner() {
  return (
    <div className="bg-[#F3E7DC] h-64 flex items-center justify-between px-10 text-gray-900" dir="rtl">
      <div>
        <h1 className="text-4xl font-bold">كرسي مكتبي مريح للاستخدام طوال اليوم</h1>
        <button className="mt-4 bg-[#8B4513] text-white px-6 py-2 rounded font-semibold hover:bg-[#6F370D] transition-colors">
          تسوق الآن
        </button>
      </div>
      <div className="h-full flex items-center">
        <div className="bg-gray-300 w-40 h-40 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}