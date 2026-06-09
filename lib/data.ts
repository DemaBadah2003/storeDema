// lib/data.ts
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'حذاء رياضي',
    price: 150,
    image: '/images/shoe.jpg',
    description: 'حذاء رياضي مريح للجري',
    category: 'أحذية',
    stock: 10,
  },
  {
    id: '2',
    name: 'تيشيرت قطني',
    price: 75,
    image: '/images/shirt.jpg',
    description: 'تيشيرت قطن 100%',
    category: 'ملابس',
    stock: 25,
  },
];