"use client";

import { useTranslation } from "react-i18next";

interface DashboardStatsProps {
  totalProducts: number;
  totalStock: number;
  totalValue: string;
}

export default function DashboardStats({
  totalProducts,
  totalStock,
  totalValue,
}: DashboardStatsProps) {
  const { t } = useTranslation();

  const stats = [
    { label: t("stat_total_products"), value: totalProducts, icon: "📦" },
    { label: t("stat_total_stock"), value: totalStock, icon: "🏪" },
    { label: t("stat_stock_value"), value: totalValue, icon: "💰" },
  ];

  return (
    <>
      <h1 className="text-2xl font-black text-[#5c3e31] mb-8">
        {t("dashboard_page_title")}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow text-center">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-black text-[#b36d39]">{stat.value}</div>
            <div className="text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}