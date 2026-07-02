// app/products/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db as prisma } from "@/lib/db"
import AddToCartSection from "@/components/AddToCartSection";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-6" dir="rtl">
      {/* مسار التنقل (Breadcrumb) */}
      <div className="text-sm text-[#8a6d5f] mb-6">
        <Link href="/products" className="hover:text-[#b36d39] transition">
          المنتجات
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#5c3e31] font-semibold">{product.nameAr}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* صورة المنتج */}
        <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/40 rounded-2xl h-96 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.nameAr}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col">
          <p className="text-xs font-bold text-[#b36d39] uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl font-black text-[#5c3e31] mb-4">
            {product.nameAr}
          </h1>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black text-[#a0522d]">
              {product.price}₪
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            منتج أصلي بجودة عالية وضمان شامل. مناسب للاستخدام اليومي.
          </p>

          {/* زر أضف للسلة (Client Component منفصل) */}
          <AddToCartSection product={product} />

          <Link
            href="/products"
            className="mt-6 text-sm text-[#b36d39] hover:underline font-semibold text-center"
          >
            ← الرجوع لكل المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
}