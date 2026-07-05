import { db as prisma } from "@/lib/db";
import { cookies } from "next/headers"; // 👈 جديد
import DashboardCharts from "./DashboardCharts";
import DashboardStats from "./DashboardStats";

export default async function AdminDashboard() {
  // 👈 نقرأ اللغة الحالية من الـ cookie
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "en" ? "en" : "ar";

  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
  });

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const categoryMap = new Map<string, { stock: number; value: number }>();
  for (const p of products) {
    const current = categoryMap.get(p.category) || { stock: 0, value: 0 };
    categoryMap.set(p.category, {
      stock: current.stock + p.stock,
      value: current.value + p.price * p.stock,
    });
  }
  const categoryData = Array.from(categoryMap.entries()).map(
    ([category, { stock, value }]) => ({ category, stock, value })
  );

  const stockStatusData = [
    { name: "available", value: products.filter((p) => p.stock > 20).length },
    { name: "low", value: products.filter((p) => p.stock > 5 && p.stock <= 20).length },
    { name: "critical", value: products.filter((p) => p.stock <= 5).length },
  ];

  // 👈 التغيير هنا: نختار nameAr أو nameEn حسب اللغة الحالية
  const topProductsData = [...products]
    .map((p) => ({
      name: lang === "en" ? p.nameEn || p.nameAr : p.nameAr,
      value: p.price * p.stock,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const salesMap = new Map<string, { revenue: number; count: number }>();
  for (const o of orders) {
    const dateKey = new Date(o.createdAt).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
    });
    const current = salesMap.get(dateKey) || { revenue: 0, count: 0 };
    const amount = Number(o.totalAmount);
    salesMap.set(dateKey, {
      revenue: current.revenue + amount,
      count: current.count + 1,
    });
  }
  const salesTrendData = Array.from(salesMap.entries())
    .map(([date, { revenue, count }]) => ({
      date,
      revenue: Number(revenue.toFixed(2)),
      count,
    }))
    .slice(-14);

  return (
    <div>
      <DashboardStats
        totalProducts={totalProducts}
        totalStock={totalStock}
        totalValue={`${totalValue.toFixed(2)}₪`}
      />

      <DashboardCharts
        categoryData={categoryData}
        stockStatusData={stockStatusData}
        topProductsData={topProductsData}
        salesTrendData={salesTrendData}
      />
    </div>
  );
}