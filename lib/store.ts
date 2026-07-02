import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  searchQuery: string;
  selectedCategory: string;

  count: () => number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  clearCart: () => void;

  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      searchQuery: "",
      selectedCategory: "الكل",

      count: () => get().cart.reduce((total, item) => total + item.quantity, 0),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      addItem: (product) => set((state) => {
        const existing = state.cart.find((i) => i.product.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }
        return { cart: [...state.cart, { product, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        cart: state.cart.filter(i => i.product.id !== id)
      })),

      changeQty: (id, delta) => set((state) => ({
        cart: state.cart.map(i =>
          i.product.id === id
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
      })),

      // تفرغ السلة بعد تأكيد الطلب عبر الباك
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage', version: 1 }

  )
);