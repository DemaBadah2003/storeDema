interface ProductProps {
  title: string;
  price: string;
  image: string;
}

export default function AmazonProductCard({ title, price, image }: ProductProps) {
  return (
    <div className="bg-white p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-full h-32 object-contain" />
      <h3 className="mt-2 text-sm text-gray-800">{title}</h3>
      <p className="font-bold text-lg mt-1">{price}</p>
    </div>
  );
}