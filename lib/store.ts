import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  // تعريف الدالة هنا
  count: () => number; 
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      // تنفيذ الدالة هنا
      count: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      
      addItem: (product) => set((state) => {
        const existing = state.cart.find((i) => i.product.id === product.id);
        if (existing) {
          return { cart: state.cart.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { cart: [...state.cart, { product, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({ cart: state.cart.filter(i => i.product.id !== id) })),
      changeQty: (id, delta) => set((state) => ({
        cart: state.cart.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
      }))
    }),
    { name: 'cart-storage' }
  )
);