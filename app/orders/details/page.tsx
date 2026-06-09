"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import DataTable from "@/app/(auth)/register/components/DataTable";

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '0';

  const reportData = [
    { 
      title: "تفاصيل الإنفاق السنوي", 
      cols: [
        { header: "السنة", accessor: "year" },
        { header: "الإنفاق", accessor: "spend" },
        { header: "الطلبات", accessor: "orders" }
      ], 
      rows: [{ year: "2026", spend: "$12000", orders: "45" }] 
    },
    { 
      title: "تفاصيل الإنفاق حسب الفئة", 
      cols: [
        { header: "الفئة", accessor: "category" },
        { header: "المبلغ", accessor: "amount" },
        { header: "النسبة", accessor: "percentage" }
      ], 
      rows: [{ category: "إلكترونيات", amount: "$5000", percentage: "40%" }] 
    },
    { 
      title: "تفاصيل سياسات الشراء", 
      cols: [
        { header: "السياسة", accessor: "policy" },
        { header: "الامتثال", accessor: "compliance" },
        { header: "المخالفات", accessor: "violations" }
      ], 
      rows: [{ policy: "سياسة المكتب", compliance: "90%", violations: "2" }] 
    },
    { 
      title: "تفاصيل البائعين الصغار", 
      cols: [
        { header: "البائع", accessor: "seller" },
        { header: "المجال", accessor: "field" },
        { header: "المشتريات", accessor: "purchases" }
      ], 
      rows: [{ seller: "مكتبة الأمل", field: "قرطاسية", purchases: "$800" }] 
    },
  ];

  const data = reportData[Number(type)] || reportData[0];

  return (
    <div className="p-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">{data.title}</h1>
      
      <DataTable 
        columns={data.cols} 
        data={data.rows} 
        onDelete={() => {}} 
        onAdd={() => {}} 
      />
    </div>
  );
}