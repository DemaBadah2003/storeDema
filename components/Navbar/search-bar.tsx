"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "الكل");

  // ✅ دالة موحّدة لبناء الرابط وتنفيذ الفلترة، تستقبل category كـ parameter
  // عشان نتجنب مشكلة الـ state القديم (stale state) لما نستدعيها من onChange مباشرة
  const applyFilters = (newCategory: string, newQuery: string) => {
    const params = new URLSearchParams();

    if (newQuery.trim()) params.set("search", newQuery.trim());
    if (newCategory && newCategory !== "الكل") params.set("category", newCategory);

    router.push(`/products?${params.toString()}`);
  };

  // ✅ فلترة فورية بمجرد اختيار فئة من القائمة
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    applyFilters(newCategory, query);
  };

  const handleSearchSubmit = () => {
    applyFilters(category, query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
      className="flex flex-1 max-w-xl rounded-xl border border-[#dfc4b5] bg-white overflow-hidden h-11 shadow-inner shrink-0 focus-within:border-[#b36d39] transition-all duration-300"
    >
      <select
        value={category}
        onChange={handleCategoryChange}
        className="bg-[#fbf5f1] border-l border-[#dfc4b5] outline-none px-4 text-xs font-bold text-[#5c3e31] cursor-pointer shrink-0"
      >
        <option value="الكل">الكل</option>
        <option value="shoes">أحذية</option>
        <option value="electronics">إلكترونيات</option>
        <option value="beauty">جمال</option>
        <option value="clothes">ملابس</option>
        <option value="bags">حقائب</option>
        <option value="watches">ساعات</option>
        <option value="sports">رياضة</option>
        <option value="home">المنزل</option>
        <option value="office">أدوات مكتبية</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ابحث عن منتجات، ماركات وأكثر..."
        className="flex-1 px-4 text-sm outline-none bg-white text-right text-gray-800"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-[#d48c56] to-[#b36d39] w-14 flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}