"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const { cart, changeQty, removeItem } = useCartStore();

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#3a2010] mb-6">عربة التسوق</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p>عربتك فارغة</p>
          <Link href="/products" className="text-[#c8a98a] underline">تصفح المنتجات</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-4 items-center bg-white p-4 rounded-xl">
              <Image src={item.product.image} alt={item.product.nameAr} width={80} height={80} className="object-cover rounded" />
              <div className="flex-1">
                <p className="font-bold">{item.product.nameAr}</p>
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => changeQty(item.product.id, -1)} className="px-2 font-bold">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQty(item.product.id, 1)} className="px-2 font-bold">+</button>
                <button onClick={() => removeItem(item.product.id)} className="text-red-500 text-xs">حذف</button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold">الإجمالي: ${cartTotal.toFixed(2)}</div>
        </div>
      )}
    </main>
  );
}