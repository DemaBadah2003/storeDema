"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.language === "ar";

  const links = [
    { href: "/admin", label: t("admin_link_stats") },
    { href: "/admin/products", label: t("admin_link_products") },
    { href: "/admin/orders", label: t("admin_link_orders") },
  ];

  return (
    <div className="flex min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside
        className={`w-56 bg-[#5c3e31] text-white flex flex-col py-8 px-4 gap-2 fixed h-full ${
          isRtl ? "right-0" : "left-0"
        }`}
      >
        <h2 className="text-xl font-black mb-6 text-center">
          {t("admin_panel_title")}
        </h2>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`py-2 px-4 rounded-xl font-bold transition ${
              pathname === link.href
                ? "bg-[#b36d39] text-white"
                : "hover:bg-[#7a5241]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 bg-[#fdf8f5] p-8 ${isRtl ? "mr-56" : "ml-56"}`}>
        {children}
      </main>
    </div>
  );
}