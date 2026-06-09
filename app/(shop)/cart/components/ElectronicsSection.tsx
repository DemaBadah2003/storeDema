import AmazonSection from "./AmazonSection";

export default function ElectronicsSection() {
  const products = [
    { title: "سماعات رأس", price: "150 ر.س", image: "/headset.jpg" },
    { title: "ماوس لاسلكي", price: "80 ر.س", image: "/mouse.jpg" },
  ];
  return <AmazonSection title="الإلكترونيات" products={products} />;
}