import { db as prisma } from "@/lib/db";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboard() {
  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "asc" },
  });

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const stats = [
    { label: "إجمالي المنتجات", value: totalProducts, icon: "📦" },
    { label: "إجمالي المخزون", value: totalStock, icon: "🏪" },
    { label: "قيمة المخزون", value: `${totalValue.toFixed(2)}₪`, icon: "💰" },
  ];

  // 📊 تجميع البيانات حسب الفئة
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
    { name: "متوفر", value: products.filter((p) => p.stock > 20).length },
    { name: "منخفض", value: products.filter((p) => p.stock > 5 && p.stock <= 20).length },
    { name: "نفاذ قريب", value: products.filter((p) => p.stock <= 5).length },
  ];

  const topProductsData = [...products]
    .map((p) => ({ name: p.nameAr, value: p.price * p.stock }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // 📈 تجميع المبيعات وعدد الطلبات حسب اليوم (آخر 14 يوم فيها طلبات)
  const salesMap = new Map<string, { revenue: number; count: number }>();
  for (const o of orders) {
    const dateKey = new Date(o.createdAt).toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
    });
    const current = salesMap.get(dateKey) || { revenue: 0, count: 0 };
    // 👈 التصحيح: تحويل totalAmount (نوع Decimal من Prisma) لرقم عادي قبل الجمع
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
    .slice(-14); // آخر 14 نقطة بيانات

  return (
    <div>
      <h1 className="text-2xl font-black text-[#5c3e31] mb-8">📊 الإحصائيات العامة</h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow text-center">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-black text-[#b36d39]">{stat.value}</div>
            <div className="text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <DashboardCharts
        categoryData={categoryData}
        stockStatusData={stockStatusData}
        topProductsData={topProductsData}
        salesTrendData={salesTrendData}
      />
    </div>
  );
}