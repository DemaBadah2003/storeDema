import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: CartItem[];
  total: number;
}

interface CartStore {
  cart: CartItem[];
  orders: Order[];
  // خصائص البحث والفلترة الجديدة
  searchQuery: string;
  selectedCategory: string;
  
  count: () => number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  placeOrder: () => void;
  
  // دوال البحث والفلترة الجديدة
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      orders: [],
      searchQuery: "",
      selectedCategory: "الكل",

      count: () => get().cart.reduce((total, item) => total + item.quantity, 0),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

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
      })),

      placeOrder: () => set((state) => {
        const total = state.cart.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
        const newOrder: Order = {
          id: Math.floor(10000 + Math.random() * 90000).toString(),
          date: new Date().toLocaleDateString('ar-PS'),
          status: "جاري التجهيز",
          items: [...state.cart],
          total: total
        };
        
        return {
          orders: [...state.orders, newOrder],
          cart: []
        };
      })
    }),
    { name: 'cart-storage' }
  )
);