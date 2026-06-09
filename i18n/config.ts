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
        palestine: "فلسطين", // 👈 إضافة ترجمة فلسطين
        cart: "السلة",        // 👈 إضافة ترجمة السلة
        cart_items: "عناصر",  // 👈 إضافة كلمة عناصر للسلة في حال الحاجة لها
        language: "اللغة",
        hello_login: "مرحباً، سجّل الدخول",
        my_account: "حسابي",
        new: "جديد؟",
        create_account: "إنشاء حساب",
        returns: "الإرجاع",
        orders: "والطلبات",
        wishlist_list: "قائمة",
        wishlist: "المفضلة",
        search_placeholder: "ابحث عن منتجات، ماركات وأكثر...",
        
        // Categories Keys
        all: "الكل",
        home_page: "الأحذية",
        electronics: "الإلكترونيات",
        beauty: "الجمال والصحة",
        clothes: "الملابس",
        deals: "عروض اليوم",
        sports: "الرياضة",
        home: "المنزل",
      },
    },
    en: {
      translation: {
        // Navbar Actions
        deliver_to: "Deliver to",
        palestine: "Palestine", // 👈 إضافة ترجمة فلسطين
        cart: "Cart",          // 👈 إضافة ترجمة السلة
        cart_items: "items",   // 👈 إضافة كلمة عناصر بالإنجليزية
        language: "Language",
        hello_login: "Hello, sign in",
        my_account: "Account",
        new: "New?",
        create_account: "Create account",
        returns: "Returns",
        orders: "& Orders",
        wishlist_list: "Wish",
        wishlist: "List",
        search_placeholder: "Search for products, brands and more...",
        
        // Categories Keys
        all: "All",
        home_page: "Shoes",
        electronics: "Electronics",
        beauty: "Beauty & Health",
        clothes: "Clothes",
        deals: "Today's Deals",
        sports: "Sports",
        home: "Home",
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