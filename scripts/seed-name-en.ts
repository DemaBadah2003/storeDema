// scripts/seed-name-en.ts
import "dotenv/config"; // 👈 هذا السطر لازم يكون أول شي بالملف
import { db as prisma } from "../lib/db";

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: { nameEn: product.name },
    });
  }

  console.log(`🎉 تم تحديث ${products.length} منتج`);
}

main()
  .catch((e) => {
    console.error("❌ خطأ:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });