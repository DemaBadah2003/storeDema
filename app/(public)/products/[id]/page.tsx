import { notFound } from "next/navigation";
import { db as prisma } from "@/lib/db";
import ProductDetails from "@/components/orderDetails";

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

  return <ProductDetails product={product} />;
}