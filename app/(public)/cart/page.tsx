"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { t } = useTranslation();
  const { cart, changeQty, removeItem } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  // ✅ هاد الزر بس بيوديكي لصفحة الـ checkout، مش بيرسل الطلب مباشرة
  const goToCheckout = () => {
    if (!cart.length) return;
    if (!session?.user?.id) {
      router.push("/signin");
      return;
    }
    router.push("/user/checkout");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">{t("cart_page_title")}</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="mb-2">{t("cart_empty_message")}</p>
          <Link href="/products" className="text-[#c8a98a] underline">
            {t("cart_browse_products")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100"
            >
              <Image
                src={item.product.image}
                alt={item.product.nameAr}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-bold">{item.product.nameAr}</p>
                <p>{(Number(item.product.price) * item.quantity).toFixed(2)}₪</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => changeQty(item.product.id, -1)} className="px-2 font-bold">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => changeQty(item.product.id, 1)} className="px-2 font-bold">+</button>
                <button onClick={() => removeItem(item.product.id)} className="text-red-500 text-xs mr-4">
                  {t("cart_remove_item")}
                </button>
              </div>
            </div>
          ))}

          <div className="text-xl font-bold pt-4">
            {t("cart_total_label")} {cartTotal.toFixed(2)}₪
          </div>

          {/* ✅ نفس اسم الزر "تأكيد الطلب"، بس هلق بيوديكي عالـ checkout */}
          <button
            onClick={goToCheckout}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
          >
            {t("cart_checkout_btn")}
          </button>
        </div>
      )}
    </main>
  );
}