"use client";
import { useCartStore } from "@/lib/store"; // تأكدي أن المتجر يحتوي على هذه القيم

export default function SearchBar() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCartStore();

  return (
    <form 
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-1 max-w-xl rounded-xl border border-[#dfc4b5] bg-white overflow-hidden h-11 shadow-inner shrink-0 focus-within:border-[#b36d39] transition-all duration-300"
    >
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-[#fbf5f1] border-l border-[#dfc4b5] outline-none px-4 text-xs font-bold text-[#5c3e31] cursor-pointer shrink-0"
      >
        <option value="الكل">الكل</option>
        <option value="أحذية">الأحذية</option>
        <option value="إلكترونيات">الإلكترونيات</option>
        <option value="جمال وصحة">الجمال والصحة</option>
        <option value="ملابس">الملابس</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="ابحث عن منتجات، ماركات وأكثر..."
        className="flex-1 px-4 text-sm outline-none bg-white text-right text-gray-800"
      />
      <button type="button" className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] w-14 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}