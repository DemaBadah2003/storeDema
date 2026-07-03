import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "ar",
  fallbackLng: false,
  resources: {
    ar: {
      translation: {
        // Navbar Actions
        deliver_to: "التوصيل إلى",
        palestine: "فلسطين",
        cart: "السلة",
        cart_items: "عناصر",
        language: "اللغة",
        hello_login: "مرحباً، سجّل الدخول",
        my_account: "حسابي",
        new: "جديد؟",
        create_account: "إنشاء حساب",
        account_management: "إدارة حسابي", // 👈 بدل returns + orders
        wishlist_list: "قائمة",
        wishlist: "المفضلة",
        search_placeholder: "ابحث عن منتجات، ماركات وأكثر...",

        // Categories Keys
        all: "الكل",
        shoes: "الأحذية",
        electronics: "الإلكترونيات",
        beauty: "الجمال والصحة",
        clothes: "الملابس",
        deals: "عروض اليوم",
        sports: "الرياضة",
        home: "المنزل",
        watches: "ساعات",
        bags: "حقائب",
      },
    },
    en: {
      translation: {
        // Navbar Actions
        deliver_to: "Deliver to",
        palestine: "Palestine",
        cart: "Cart",
        cart_items: "items",
        language: "Language",
        hello_login: "Hello, sign in",
        my_account: "Account",
        new: "New?",
        create_account: "Create account",
        account_management: "Account Management", // 👈 بدل returns + orders
        wishlist_list: "Wish",
        wishlist: "List",
        search_placeholder: "Search for products, brands and more...",

        // Categories Keys
        all: "All",
        shoes: "Shoes",
        electronics: "Electronics",
        beauty: "Beauty & Health",
        clothes: "Clothes",
        deals: "Today's Deals",
        sports: "Sports",
        home: "Home",
        watches: "Watches",
        bags: "Bags",
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;