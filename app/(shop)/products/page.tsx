import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        جميع المنتجات
      </h1>
      <p className="text-gray-500 mb-8">{products.length} منتج متوفر</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}