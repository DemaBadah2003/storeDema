export interface Category {
  name: string;
  slug: string;
  icon: string;
  items?: string[];
}

export const categories: Category[] = [
  { name: "الأحذية", slug: "shoes", icon: "👟" },
  { name: "الملابس", slug: "clothes", icon: "👕" },
  { name: "الإلكترونيات", slug: "electronics", icon: "📱" },
  { name: "المنزل", slug: "home", icon: "🏠" },
  { name: "ساعات", slug: "watches", icon: "⌚" },
  { name: "حقائب", slug: "bags", icon: "👜" },
  { name: "رياضة", slug: "sports", icon: "⚽" },
  { name: "الجمال والصحة", slug: "beauty", icon: "💄" },
];