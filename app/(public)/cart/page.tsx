"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CartPage() {
  const { cart, changeQty, removeItem, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!cart.length) return;

    if (!session?.user?.id) {
      router.push("/signin");
      return;
    }

    setLoading(true);
    setError("");

const res = await fetch(`/api/protected/users/orders/${session.user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "حدث خطأ أثناء إرسال الطلب");
      setLoading(false);
      return;
    }

    clearCart();

    // redirect حسب الدور
    if (session.user.roleSlug === "admin") {
      router.push("/admin/orders");
    } else {
      router.push("/user/orders");
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">عربة التسوق</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="mb-2">عربتك فارغة</p>
          <Link href="/products" className="text-[#c8a98a] underline">
            تصفح المنتجات
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
                <p>
                  {(Number(item.product.price) * item.quantity).toFixed(2)}₪
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeQty(item.product.id, -1)}
                  className="px-2 font-bold"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => changeQty(item.product.id, 1)}
                  className="px-2 font-bold"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 text-xs mr-4"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          <div className="text-xl font-bold pt-4">
            الإجمالي: {cartTotal.toFixed(2)}₪
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
          </button>
        </div>
      )}
    </main>
  );
}