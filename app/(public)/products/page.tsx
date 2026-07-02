// app/products/page.tsx
import ProductCard from "@/components/ProductCard";
import { db as prisma } from "@/lib/db";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const filteredProducts = await prisma.product.findMany({
    where: category ? { categorySlug: category } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6" dir="rtl">
      {category && (
        <h2 className="text-xl font-bold text-[#5c3e31] mb-6">
          نتائج الفئة: {category}
        </h2>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          لا توجد منتجات في هذه الفئة حالياً
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