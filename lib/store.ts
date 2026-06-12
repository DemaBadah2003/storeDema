import { create } from "zustand";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  userId: number | null;
  loading: boolean;

  setUserId: (id: number) => void;
  fetchCart: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string, cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  userId: null,
  loading: false,

  // تعيين المستخدم عند تسجيل الدخول
  setUserId: (id) => {
    set({ userId: id });
    get().fetchCart();
  },

  // جلب السلة من DB
  fetchCart: async () => {
    const userId = get().userId;
    if (!userId) return;

    set({ loading: true });

    const res = await fetch(`/api/cart?userId=${userId}`);
    const data = await res.json();

    // data = [ { id, cartId, productId, quantity, product: {...} } ]
    const items: CartItem[] = data.map((item: any) => ({
      cartItemId: item.id,   // مهم للحذف والتعديل
      product: item.product,
      quantity: item.quantity,
    }));

    set({ items, loading: false });
  },

  // إضافة منتج
  addItem: async (product) => {
    const userId = get().userId;
    if (!userId) return;

    // تحديث فوري في الـ UI
    const existing = get().items.find((i) => i.product.id === product.id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { product, quantity: 1 }],
      }));
    }

    // حفظ في DB
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: product.id }),
    });

    // جيبي البيانات الحديثة (عشان تاخدي cartItemId)
    await get().fetchCart();
  },

  // حذف منتج
  removeItem: async (productId, cartItemId) => {
    // تحديث فوري في الـ UI
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }));

    // حذف من DB
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId }),
    });
  },

  // تعديل الكمية
  updateQuantity: async (cartItemId, quantity) => {
    // تحديث فوري في الـ UI
    set((state) => ({
      items: state.items.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity } : i
      ),
    }));

    // تحديث في DB
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId, quantity }),
    });
  },

  clearCart: () => set({ items: [] }),

  total: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

  count: () =>
    get().items.reduce((sum, i) => sum + i.quantity, 0),
}));