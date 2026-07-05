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
        account_management: "إدارة حسابي",
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

        // Auth - Shared
        store_name_prefix: "متجر",
        store_name_highlight: "ديما",
        show_password: "إظهار كلمة المرور",
        hide_password: "إخفاء كلمة المرور",

        // Signin Page
        signin_title: "تسجيل الدخول",
        signin_email_label: "البريد الإلكتروني",
        signin_email_placeholder: "أدخل بريدك الإلكتروني",
        signin_password_label: "كلمة المرور",
        signin_password_placeholder: "أدخل كلمة المرور",
        signin_forgot_password: "نسيت كلمة المرور؟",
        signin_remember_me: "تذكرني على هذا الجهاز",
        signin_submit_btn: "تسجيل الدخول",
        signin_submit_loading: "جارٍ التحقق...",
        signin_no_account: "ليس لديك حساب؟",
        signin_create_account_link: "إنشاء حساب جديد",
        signin_generic_error: "بريد إلكتروني أو كلمة مرور غير صحيحة",
        signin_unexpected_error: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",

        // Signup Page
        signup_title: "إنشاء حساب جديد",
        signup_name_label: "الاسم الكامل",
        signup_name_placeholder: "أدخل اسمك الثلاثي",
        signup_email_label: "البريد الإلكتروني",
        signup_email_placeholder: "example@relief.org",
        signup_password_label: "كلمة المرور",
        signup_password_placeholder: "••••••••",
        signup_confirm_password_label: "تأكيد كلمة المرور",
        signup_confirm_password_placeholder: "أعد كتابة كلمة المرور",
        signup_accept_terms_prefix: "أوافق على",
        signup_privacy_policy_link: "سياسة الخصوصية",
        signup_accept_terms_suffix: "لنظام الإغاثة.",
        signup_submit_btn: "إنشاء الحساب",
        signup_submit_loading: "جارٍ الإنشاء...",
        signup_have_account: "لديك حساب بالفعل؟",
        signup_signin_link: "تسجيل الدخول",
        signup_generic_error: "حدث خطأ أثناء إنشاء الحساب",
        signup_connection_error: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً.",

        // Cart Page
        cart_page_title: "عربة التسوق",
        cart_empty_message: "عربتك فارغة",
        cart_browse_products: "تصفح المنتجات",
        cart_remove_item: "حذف",
        cart_total_label: "الإجمالي:",
        cart_checkout_btn: "تأكيد الطلب",

        // Home Page
        home_promo_banner: "🚚 شحن مجاني على الطلبات فوق 100₪ — توصيل خلال 24 ساعة",
        home_hero_badge: "عرض محدود 🔥",
        home_hero_title: "تسوق الآن واحصل على أفضل الأسعار 🛍️",
        home_hero_subtitle: "أكثر من 1000 منتج أصلي بأسعار منافسة لا تُقاوم وبجودة مضمونة",
        home_hero_cta: "تسوق الآن ←",
        home_categories_title: "تسوق حسب الفئة",
        home_category_shoes: "أحذية",
        home_category_clothes: "ملابس",
        home_category_electronics: "إلكترونيات",
        home_category_home: "المنزل",
        home_category_watches: "ساعات",
        home_category_bags: "حقائب",
        home_category_sports: "رياضة",
        home_category_beauty: "جمال",
              office: "أدوات مكتبية",

        

        // Product Card
        add_to_cart: "أضف للسلة",
        details: "التفاصيل",
        added_to_cart_toast: "تمت الإضافة للسلة! 🛒",
        quantity_label: "الكمية:",
      },
      breadcrumb_products: "المنتجات",
back_to_products: "← الرجوع لكل المنتجات",
product_default_description: "منتج أصلي بجودة عالية وضمان شامل. مناسب للاستخدام اليومي.",

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
        account_management: "Account Management",
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
        office: "Office Supplies",


        // Auth - Shared
        store_name_prefix: "Dima",
        store_name_highlight: "Store",
        show_password: "Show password",
        hide_password: "Hide password",

        // Signin Page
        signin_title: "Sign In",
        signin_email_label: "Email",
        signin_email_placeholder: "Enter your email",
        signin_password_label: "Password",
        signin_password_placeholder: "Enter your password",
        signin_forgot_password: "Forgot password?",
        signin_remember_me: "Remember me on this device",
        signin_submit_btn: "Sign In",
        signin_submit_loading: "Verifying...",
        signin_no_account: "Don't have an account?",
        signin_create_account_link: "Create a new account",
        signin_generic_error: "Incorrect email or password",
        signin_unexpected_error: "An unexpected error occurred. Please try again.",

        // Signup Page
        signup_title: "Create New Account",
        signup_name_label: "Full Name",
        signup_name_placeholder: "Enter your full name",
        signup_email_label: "Email",
        signup_email_placeholder: "example@relief.org",
        signup_password_label: "Password",
        signup_password_placeholder: "••••••••",
        signup_confirm_password_label: "Confirm Password",
        signup_confirm_password_placeholder: "Re-enter your password",
        signup_accept_terms_prefix: "I agree to the",
        signup_privacy_policy_link: "Privacy Policy",
        signup_accept_terms_suffix: "of the relief system.",
        signup_submit_btn: "Create Account",
        signup_submit_loading: "Creating account...",
        signup_have_account: "Already have an account?",
        signup_signin_link: "Sign In",
        signup_generic_error: "An error occurred while creating the account",
        signup_connection_error: "Unable to connect to the server, please try again later.",

        // Cart Page
        cart_page_title: "Shopping Cart",
        cart_empty_message: "Your cart is empty",
        cart_browse_products: "Browse Products",
        cart_remove_item: "Remove",
        cart_total_label: "Total:",
        cart_checkout_btn: "Confirm Order",

        // Home Page
        home_promo_banner: "🚚 Free shipping on orders over ₪100 — Delivery within 24 hours",
        home_hero_badge: "Limited Offer 🔥",
        home_hero_title: "Shop Now and Get the Best Prices 🛍️",
        home_hero_subtitle: "Over 1000 original products at unbeatable prices with guaranteed quality",
        home_hero_cta: "Shop Now ←",
        home_categories_title: "Shop by Category",
        home_category_shoes: "Shoes",
        home_category_clothes: "Clothes",
        home_category_electronics: "Electronics",
        home_category_home: "Home",
        home_category_watches: "Watches",
        home_category_bags: "Bags",
        home_category_sports: "Sports",
        home_category_beauty: "Beauty",

        // Product Card
        add_to_cart: "Add to Cart",
        details: "Details",
        added_to_cart_toast: "Added to cart! 🛒",
        quantity_label: "Quantity:",



        breadcrumb_products: "Products",
back_to_products: "← Back to all products",
product_default_description: "Original high-quality product with full warranty. Suitable for daily use.",
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