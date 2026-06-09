import AmazonSection from "./AmazonSection";

export default function PaperSuppliesSection() {
  const paperSupplies = [
    { title: "دفتر ملاحظات (نوت بوك)", price: "15.00 ر.س", image: "/notebook.jpg" },
    { title: "ورق مقوى ملون", price: "22.00 ر.س", image: "/cardstock.jpg" },
    { title: "مغلفات بريدية", price: "12.00 ر.س", image: "/envelopes.jpg" },
    { title: "ورق تصوير A4", price: "28.00 ر.س", image: "/paper-a4.jpg" },
  ];

  return <AmazonSection title="الورقيات" products={paperSupplies} />;
}