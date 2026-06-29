"use client"; 

import { useState } from "react"; 
import Logo from "./logo"; 
import SearchBar from "./search-bar"; 
import NavActions from "./nav-actions"; 
import CartButton from "./cart-button"; 
import CategoryBar from "./category-bar"; 
import OrderForm from "./OrderForm"; 
import { useTranslation } from "react-i18next"; 

export default function Navbar() { 
  const { t } = useTranslation(); 
  const [isOrderOpen, setIsOrderOpen] = useState(false); 
 
  return ( 
    <header className="w-full shadow-sm relative z-50 select-none"> 
      <nav className="bg-[#f5e4da] border-b border-[#e6cebf] px-6 py-3.5"> 
        <div className="flex items-center justify-between gap-6 h-14"> 
          <div className="flex items-center gap-4"> 
            <Logo /> 
            <button 
              onClick={() => setIsOrderOpen(true)} 
              className="flex items-center gap-1.5 border border-transparent hover:border-[#dfc4b5] hover:bg-white/40 rounded-xl px-3 py-1.5 transition cursor-pointer" 
            > 
              <span className="text-[#5c3e31] font-bold text-sm">
                إرسال الطلب
              </span> 
            </button>
          </div> 
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar /> 
          </div>
          <div className="flex items-center gap-5"> 
            <NavActions /> 
            <div className="w-px bg-[#e6cebf] h-6 self-center" /> 
            <CartButton /> 
          </div> 
        </div> 
      </nav> 
      <CategoryBar /> 
      {isOrderOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg">
            {/* الحل النهائي: تمرير onClose */}
            <OrderForm onClose={() => setIsOrderOpen(false)} />
          </div>
        </div>
      )}
    </header> 
  ); 
}