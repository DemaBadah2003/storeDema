"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/user/orders", label: "طلباتي", icon: "📦" },
  { href: "/user/checkout", label: "تأكيد الطلب", icon: "🧾" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#faf6f2]">
      {/* السايدبار */}
      <aside className="w-64 bg-[#5c3e31] text-white flex flex-col p-6 gap-2">
        <h2 className="text-lg font-black mb-6 flex items-center gap-2">
          ⚙️ حسابي
        </h2>

        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition ${
                isActive
                  ? "bg-[#b36d39] text-white"
                  : "text-[#e8d5c8] hover:bg-[#6e4a3a]"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </aside>

      {/* المحتوى */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}