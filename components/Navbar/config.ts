export interface Category {
  name: string;
  slug: string;
  items: string[];
}

export const categories: Category[] = [
  {
    name: "الأحذية", slug: "shoes",
    items: ["أحذية رياضية (Sneakers)", "أحذية كلاسيكية ورسمية", "أحذية خفيفة (Loafers / Slides)"],
  },
  {
    name: "الإلكترونيات", slug: "electronics",
    items: ["الهواتف الذكية وإكسسواراتها", "الحواسب ومستلزمات الغيمنق", "الأجهزة المنزلية الذكية"],
  },
  {
    name: "الجمال والصحة", slug: "beauty",
    items: ["العناية بالبشرة والشعر", "المكياج وأدوات التجميل", "العطور والروائح الفاخرة"],
  },
  {
    name: "الملابس", slug: "fashion",
    items: ["ملابس رياضية (Activewear)", "ملابس كاجوال يومية", "أزياء المناسبات والرسمية"],
  },
];

export const staticLinks = ["عروض اليوم", "الرياضة", "المنزل"];