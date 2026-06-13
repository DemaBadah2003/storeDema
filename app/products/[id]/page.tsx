// app/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma  from "@/lib/prisma";

import AddToCartSection from "@/components/AddToCartSection";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f5] to-[#f5ebe0] py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* صورة المنتج */}
          <div className="bg-gradient-to-b from-[#fbf5f1] to-[#f5e4da]/60 flex items-center justify-center p-10 min-h-[350px] relative">
            <Image
              src={product.image ?? "/placeholder.png"}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* تفاصيل + زر */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#b36d39] uppercase tracking-widest bg-[#b36d39]/10 px-3 py-1 rounded-full">
                {product.category}
              </span>

              <h1 className="text-2xl font-black text-[#5c3e31] mt-4 mb-3">
                {product.name}
              </h1>

              <p className="text-sm text-[#8c6a57] leading-relaxed mb-6">
                {product.description ?? "منتج عالي الجودة من متجر ديما."}
              </p>

              <span className="text-3xl font-black text-[#a0522d]">
                {product.price}₪
              </span>
            </div>

<AddToCartSection product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}