interface ProductProps {
  title: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: string;
}

export default function BestSellerProduct({ title, price, oldPrice, image, rating }: ProductProps) {
  return (
    <div className="bg-white p-4 border rounded shadow-sm text-center">
      <img src={image} alt={title} className="w-full h-40 object-contain mb-3" />
      <h3 className="text-sm text-gray-700 hover:text-orange-700 cursor-pointer line-clamp-2">{title}</h3>
      <div className="text-yellow-500 text-xs my-1">{rating}</div>
      <div className="font-bold text-lg text-red-700">{price}</div>
      {oldPrice && <p className="text-xs text-gray-500 line-through">السعر السابق: {oldPrice}</p>}
    </div>
  );
}