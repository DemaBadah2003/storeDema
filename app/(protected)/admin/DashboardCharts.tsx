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
import { useTranslation } from "react-i18next";

interface CategoryData {
  category: string;
  stock: number;
  value: number;
}

interface StockStatusData {
  name: string; // "available" | "low" | "critical"
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

// 👈 ألوان حالة المخزون بمفاتيح إنجليزية (تطابق stockStatusData بعد التعديل بـ page.tsx)
const STATUS_COLORS: Record<string, string> = {
  available: "#22c55e",
  low: "#eab308",
  critical: "#ef4444",
};

// 👈 يربط النص العربي المخزّن بقاعدة البيانات بمفتاح الترجمة الموجود مسبقاً بملف i18n
const CATEGORY_KEY_MAP: Record<string, string> = {
  "أحذية": "shoes",
  "إلكترونيات": "electronics",
  "الجمال والصحة": "beauty",
  "جمال": "beauty",
  "ملابس": "clothes",
  "عروض اليوم": "deals",
  "رياضة": "sports",
  "المنزل": "home",
  "ساعات": "watches",
  "حقائب": "bags",
  "أدوات مكتبية": "office",
};

export default function DashboardCharts({
  categoryData,
  stockStatusData,
  topProductsData,
  salesTrendData,
}: DashboardChartsProps) {
  const { t } = useTranslation();

  // 👈 دالة موحّدة للتولتيب: تستخدم t() من جوا الكومبونينت
  const currencyFormatter = (value: unknown): [string, string] => {
    const num = typeof value === "number" ? value : Number(value);
    return [`${num.toFixed(2)}₪`, t("tooltip_value_label")];
  };

  const revenueLegend = t("chart_revenue_legend");
  const ordersLegend = t("chart_orders_legend");

  const trendFormatter = (value: unknown, name: unknown): [string, string] => {
    const num = typeof value === "number" ? value : Number(value);
    if (name === revenueLegend) {
      return [`${num.toFixed(2)}₪`, revenueLegend];
    }
    return [`${num}`, ordersLegend];
  };

  // 👈 نضيف حقل category مترجم لكل عنصر، مع fallback للنص الأصلي لو ما لقيناه بالـ map
  const translatedCategoryData = categoryData.map((item) => ({
    ...item,
    categoryLabel: t(CATEGORY_KEY_MAP[item.category] || item.category),
  }));

  // 👈 نترجم اسم حالة المخزون للعرض بالرسمة والـ Legend
  const stockStatusLabels: Record<string, string> = {
    available: t("stock_status_available"),
    low: t("stock_status_low"),
    critical: t("stock_status_critical"),
  };
  const translatedStockStatusData = stockStatusData.map((item) => ({
    ...item,
    statusLabel: stockStatusLabels[item.name] || item.name,
  }));

  return (
    <>
      {/* 📈 اتجاه المبيعات وعدد الطلبات - عرض كامل */}
      <div className="bg-white rounded-2xl p-6 shadow mt-8">
        <h2 className="text-lg font-black text-[#5c3e31] mb-4">
          {t("chart_sales_trend_title")}
        </h2>
        {salesTrendData.length === 0 ? (
          <p className="text-center text-gray-400 py-12">{t("chart_no_sales_data")}</p>
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
                label={{
                  value: t("chart_orders_axis_label"),
                  position: "insideRight",
                  fill: "#5c3e31",
                }}
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
                name={revenueLegend}
                stroke="#b36d39"
                strokeWidth={3}
                dot={{ r: 4, fill: "#b36d39" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="count"
                type="monotone"
                dataKey="count"
                name={ordersLegend}
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
            {t("chart_stock_by_category_title")}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={translatedCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5dc" />
              <XAxis dataKey="categoryLabel" tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <YAxis tick={{ fill: "#5c3e31", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e8d5c8",
                  fontFamily: "inherit",
                }}
              />
              <Bar
                dataKey="stock"
                fill="#b36d39"
                radius={[8, 8, 0, 0]}
                name={t("chart_quantity_legend")}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* قيمة المخزون حسب الفئة */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-black text-[#5c3e31] mb-4">
            {t("chart_value_by_category_title")}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={translatedCategoryData}
                dataKey="value"
                nameKey="categoryLabel"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label={(props: any) => {
                  const { categoryLabel, percent } = props;
                  return `${categoryLabel} ${((percent ?? 0) * 100).toFixed(0)}%`;
                }}
              >
                {translatedCategoryData.map((_, index) => (
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
            {t("chart_stock_status_title")}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={translatedStockStatusData}
                dataKey="value"
                nameKey="statusLabel"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                label={(props: any) => {
                  const { statusLabel, value } = props;
                  return `${statusLabel}: ${value}`;
                }}
              >
                {translatedStockStatusData.map((entry) => (
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
            {t("chart_top5_products_title")}
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
              <Bar
                dataKey="value"
                fill="#a0522d"
                radius={[0, 8, 8, 0]}
                name={t("tooltip_value_label")}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}