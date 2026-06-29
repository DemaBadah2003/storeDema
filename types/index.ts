// types/index.ts

export interface Product {
  id: string;
  name: string;
  nameAr: string;      // ← إضافة الخاصية الناقصة
  price: number;
  categorySlug: string; // جديد

  image: string;
  description?: string; // ← إضافة علامة الاستفهام تجعلها اختيارية (ليست ضرورية لكل منتج)
  category: string;
  stock: number;
}

export interface CartItem {
  cartItemId?: number;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}