"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function UserHomePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const cards = [
    {
      href: "/user/myOrder",
      title: t("user_home_orders_title"),
      desc: t("user_home_orders_desc"),
      icon: "📦",
    },
    {
      href: "/user/checkout",
      title: t("user_home_checkout_title"),
      desc: t("user_home_checkout_desc"),
      icon: "🧾",
    },
  ];

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-black text-[#5c3e31] mb-8">
        {t("user_home_welcome")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#f5e4da] text-2xl">
              {card.icon}
            </div>
            <h3 className="font-black text-[#5c3e31] text-lg">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}