'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/data'
import { Product, CartItem } from '@/types'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  // ======= حساب إجمالي العربة =======
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  // ======= تغيير الكمية =======
  const changeQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  // ======= حذف منتج =======
  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId))
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#3a2010] mb-6">عربة التسوق</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-[#e8d5c0]">
          <p className="text-[#7a4e2d] mb-4">عربتك فارغة حالياً</p>
          <Link href="/" className="bg-[#c8a98a] text-white px-8 py-3 rounded-full hover:bg-[#b8977a] transition">
            تصفح المتجر
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white border border-[#e8d5c0] p-4 rounded-2xl flex gap-4 items-center">
                <div className="relative w-20 h-20 bg-[#faf6f2] rounded-xl overflow-hidden">
                  <Image src={item.product.image} alt={item.product.nameAr} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#3a2010]">{item.product.nameAr}</p>
                  <p className="text-base font-bold text-[#3a2010]">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                     <button onClick={() => changeQty(item.product.id, -1)} className="px-2 font-bold text-[#c8a98a]">−</button>
                     <span className="text-sm font-medium">{item.quantity}</span>
                     <button onClick={() => changeQty(item.product.id, 1)} className="px-2 font-bold text-[#c8a98a]">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-xs text-red-400 mt-1 hover:underline">حذف</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full md:w-64 bg-white p-5 rounded-2xl border border-[#e8d5c0] h-fit">
            <h2 className="font-bold text-[#3a2010] mb-4">ملخص الطلب</h2>
            <div className="flex justify-between mb-4 text-[#7a4e2d]">
                <span>الإجمالي</span>
                <span className="font-bold text-[#3a2010]">${cartTotal.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full bg-[#c8a98a] text-white text-center py-3 rounded-full hover:bg-[#b8977a] transition">
              إتمام الشراء
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}