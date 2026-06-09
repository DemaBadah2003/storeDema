"use client"; 

import { useState } from "react"; 
import Logo from "./logo"; 
import SearchBar from "./search-bar"; 
import NavActions from "./nav-actions"; 
import CartButton from "./cart-button"; 
import CategoryBar from "./category-bar"; 
import LocationModal from "./location-modal"; 
import { useTranslation } from "react-i18next"; // 👈 استيراد الـ hook للترجمة
 
export default function Navbar() { 
  const { t } = useTranslation(); // 👈 تفعيل الترجمة
  const [locationOpen, setLocationOpen] = useState(false); 
  const [country, setCountry] = useState("فلسطين"); 
 
  return ( 
    <header className="w-full shadow-sm relative z-50 select-none"> 
      <nav className="bg-[#f5e4da] border-b border-[#e6cebf] px-6 py-3.5"> 
        <div className="flex items-center justify-between gap-6 h-14"> 
 
          {/* اليمين: شعار + زر الموقع */} 
          <div className="flex items-center gap-4"> 
            <Logo /> 
            <button 
              onClick={() => setLocationOpen(true)} 
              className="flex items-center gap-1.5 border border-transparent hover:border-[#dfc4b5] hover:bg-white/40 rounded-xl px-3 py-1.5 transition cursor-pointer" 
            > 
              <svg className="w-4 h-4 text-[#b36d39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}> 
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> 
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> 
              </svg> 
              <span className="text-[#5c3e31] font-bold text-sm">
                {/* 👈 إذا كانت القيمة الافتراضية "فلسطين" تترجم ديناميكياً، وإلا تعرض اسم المدينة المختار */}
                {country === "فلسطين" ? t("palestine") : country}
              </span> 
            </button> 
          </div> 
 
          {/* الوسط: شريط البحث المرن */} 
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar /> 
          </div>
 
          {/* اليسار: الأزرار والـ Actions والسلة */} 
          <div className="flex items-center gap-5"> 
            <NavActions /> 
            {/* الخط الفاصل */}
            <div className="w-px bg-[#e6cebf] h-6 self-center" /> 
            <CartButton /> 
          </div> 
 
        </div> 
      </nav> 
 
      <CategoryBar /> 
 
      <LocationModal 
        isOpen={locationOpen} 
        onClose={() => setLocationOpen(false)} 
        onSelect={(c) => setCountry(c)} 
      /> 
    </header> 
  ); 
}