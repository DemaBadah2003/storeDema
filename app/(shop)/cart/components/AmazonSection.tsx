import AmazonProductCard from "./AmazonProductCard";

export default function AmazonSection({ title, products }: { title: string, products: any[] }) {
  return (
    <section className="my-6 bg-white p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <AmazonProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}