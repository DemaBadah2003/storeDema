"use client"; 

import Logo from "./logo"; 
import SearchBar from "./search-bar"; 
import NavActions from "./nav-actions"; 
import CartButton from "./cart-button"; 
import CategoryBar from "./category-bar"; 
import { useTranslation } from "react-i18next"; 

export default function Navbar() { 
  const { t } = useTranslation(); 
 
  return ( 
    <header className="w-full shadow-sm relative z-50 select-none"> 
      <nav className="bg-[#f5e4da] border-b border-[#e6cebf] px-6 py-3.5"> 
        <div className="flex items-center justify-between gap-6 h-14"> 
          <div className="flex items-center gap-4"> 
            <Logo /> 
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
    </header> 
  ); 
}