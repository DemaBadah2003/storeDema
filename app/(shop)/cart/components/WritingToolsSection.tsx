import AmazonSection from "./AmazonSection";

export default function WritingToolsSection() {
  const writingTools = [
    { title: "أقلام حبر جل ملونة", price: "45.00 ر.س", image: "/pens.jpg" },
    { title: "أقلام تحديد (Highlighters)", price: "20.00 ر.س", image: "/highlighters.jpg" },
    { title: "مجموعة أقلام رصاص فاخرة", price: "35.00 ر.س", image: "/pencils.jpg" },
    { title: "أقلام خطاط احترافية", price: "60.00 ر.س", image: "/markers.jpg" },
  ];

  return <AmazonSection title="أدوات الكتابة" products={writingTools} />;
}