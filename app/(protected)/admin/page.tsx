import { products } from "@/lib/data";

export default function AdminDashboard() {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const stats = [
    { label: "إجمالي المنتجات", value: totalProducts, icon: "📦" },
    { label: "إجمالي المخزون", value: totalStock, icon: "🏪" },
    { label: "قيمة المخزون", value: `${totalValue.toFixed(2)}₪`, icon: "💰" },
  ];

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
    </div>
  );
}