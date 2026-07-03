"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CategoryData {
  category: string;
  stock: number;
  value: number;
}

interface StockStatusData {
  name: string;
  value: number;
}

interface TopProductData {
  name: string;
  value: number;
}

interface SalesTrendData {
  date: string;
  revenue: number;
  count: number;
}

interface DashboardChartsProps {
  categoryData: CategoryData[];
  stockStatusData: StockStatusData[];
  topProductsData: TopProductData[];
  salesTrendData: SalesTrendData[];
}

// ألوان متناسقة مع هوية المتجر
const BROWN_PALETTE = ["#b36d39", "#a0522d", "#c98f5e", "#d9ac82", "#e8d5c8", "#5c3e31"];
const STATUS_COLORS: Record<string, string> = {
  "متوفر": "#22c55e",
  "منخفض": "#eab308",
  "نفاذ قريب": "#ef4444",
};

// 👈 دالة موحّدة للتولتيب: معاملات بنوع مرن (unknown/any) لتفادي تعارض
// الأنواع مع Formatter<ValueType, NameType> المتوقع من recharts
const currencyFormatter = (value: unknown): [string, string] => {
  const num = typeof value === "number" ? value : Number(value);
  return [`${num.toFixed(2)}₪`, "القيمة"];
};

const trendFormatter = (value: unknown, name: unknown): [string, string] => {
  const num = typeof value === "number" ? value : Number(value);
  if (name === "الإيرادات") {
    return [`${num.toFixed(2)}₪`, "الإيرادات"];
  }
  return [`${num}`, "عدد الطلبات"];
};

export default function DashboardCharts({
  categoryData,
  stockStatusData,
  topProductsData,
  salesTrendData,
}: DashboardChartsProps) {
  return (
    <>
      {/* 📈 اتجاه المبيعات وعدد الطلبات - عرض كامل */}
      <div className="bg-white rounded-2xl p-6 shadow mt-8">
        <h2 className="text-lg font-black text-[#5c3e31] mb-4">
          📈 اتجاه المبيعات (₪) وعدد الطلبات
        </h2>
        {salesTrendData.length === 0 ? (
          <p className="text-center text-gray-400 py-12">لا توجد بيانات مبيعات كافية</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5dc" />
              <XAxis dataKey="date" tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <YAxis
                yAxisId="revenue"
                tick={{ fill: "#5c3e31", fontSize: 12 }}
                label={{ value: "₪", position: "insideLeft", fill: "#5c3e31" }}
              />
              <YAxis
                yAxisId="count"
                orientation="right"
                tick={{ fill: "#5c3e31", fontSize: 12 }}
                allowDecimals={false}
                label={{ value: "طلبات", position: "insideRight", fill: "#5c3e31" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
                formatter={trendFormatter}
              />
              <Legend />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="الإيرادات"
                stroke="#b36d39"
                strokeWidth={3}
                dot={{ r: 4, fill: "#b36d39" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="count"
                type="monotone"
                dataKey="count"
                name="عدد الطلبات"
                stroke="#5c3e31"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 3, fill: "#5c3e31" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* المخزون حسب الفئة */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-black text-[#5c3e31] mb-4">
            📦 المخزون حسب الفئة
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5dc" />
              <XAxis dataKey="category" tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <YAxis tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
              />
              <Bar dataKey="stock" fill="#b36d39" radius={[8, 8, 0, 0]} name="الكمية" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* قيمة المخزون حسب الفئة */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-black text-[#5c3e31] mb-4">
            💰 قيمة المخزون حسب الفئة
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label={(props: any) => {
                  const { category, percent } = props;
                  return `${category} ${((percent ?? 0) * 100).toFixed(0)}%`;
                }}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BROWN_PALETTE[index % BROWN_PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={currencyFormatter}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* حالة المخزون */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-black text-[#5c3e31] mb-4">
            🚦 حالة المخزون
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stockStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                label={(props: any) => {
                  const { name, value } = props;
                  return `${name}: ${value}`;
                }}
              >
                {stockStatusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#ccc"} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* أعلى 5 منتجات من حيث قيمة المخزون */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-black text-[#5c3e31] mb-4">
            🏆 أعلى 5 منتجات (قيمة المخزون)
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5dc" />
              <XAxis type="number" tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fill: "#5c3e31", fontSize: 12 }}
              />
              <Tooltip
                formatter={currencyFormatter}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
              />
              <Bar dataKey="value" fill="#a0522d" radius={[0, 8, 8, 0]} name="القيمة" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}