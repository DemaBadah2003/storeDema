"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "📊 الإحصائيات" },
  { href: "/admin/products", label: "📦 المنتجات" },
  { href: "/admin/orders", label: "🧾 الطلبات" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen" dir="rtl">
      {/* Sidebar */}
      <aside className="w-56 bg-[#5c3e31] text-white flex flex-col py-8 px-4 gap-2 fixed h-full">
        <h2 className="text-xl font-black mb-6 text-center">⚙️ لوحة التحكم</h2>
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
      <main className="mr-56 flex-1 bg-[#fdf8f5] p-8">
        {children}
      </main>
    </div>
  );
}