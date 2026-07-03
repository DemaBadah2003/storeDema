// app/products/page.tsx
import ProductCard from "@/components/ProductCard";
import { db as prisma } from "@/lib/db";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  // ✅ نبني شرط الفلترة يدويًا بدون الحاجة لنوع Prisma.ProductWhereInput
  const where: Record<string, any> = {};

  if (category && category !== "الكل") {
    where.categorySlug = category;
  }

  if (search && search.trim() !== "") {
    where.OR = [
      { nameAr: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  const filteredProducts = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6" dir="rtl">
      {(category || search) && (
        <h2 className="text-xl font-bold text-[#5c3e31] mb-6">
          {search ? `نتائج البحث عن: "${search}"` : `نتائج الفئة: ${category}`}
        </h2>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          لا توجد منتجات مطابقة حالياً
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}