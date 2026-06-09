"use client";
import { useState } from "react";

export default function SearchBar() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${query} in category: ${category}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex flex-1 max-w-xl rounded-xl border border-[#dfc4b5] bg-white overflow-hidden h-11 shadow-inner shrink-0 focus-within:border-[#b36d39] focus-within:ring-2 focus-within:ring-[#b36d39]/10 transition-all duration-300"
    >
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-[#fbf5f1] border-l border-[#dfc4b5] outline-none px-4 text-xs font-bold text-[#5c3e31] cursor-pointer shrink-0"
      >
        <option>الكل</option>
        <option>أحذية</option>
        <option>إلكترونيات</option>
        <option>ملابس</option>
        <option>جمال</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث عن منتجات، ماركات وأكثر..."
        className="flex-1 px-4 text-sm outline-none bg-white text-right min-w-0 text-gray-800 font-medium placeholder:text-gray-400"
      />
      <button type="submit" className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] hover:from-[#bd7a47] hover:to-[#9e5c2d] transition-all shrink-0 w-14 flex items-center justify-center">
        <svg className="w-5 h-5 text-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}