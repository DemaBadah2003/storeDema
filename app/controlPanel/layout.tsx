// app/(auth)/register/controlPanel/layout.tsx
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      {/* القائمة الجانبية */}
      <aside className="w-64 bg-[#232f3e] text-white p-6">
        <h2 className="text-xl font-bold mb-10">متجر ديما</h2>
        <nav className="space-y-4">
          <Link href="/register/controlPanel" className="block hover:text-orange-400">الرئيسية</Link>
          <Link href="/register/controlPanel/products" className="block hover:text-orange-400">المنتجات</Link>
          <Link href="/register/controlPanel/orders" className="block hover:text-orange-400">الطلبات</Link>
        </nav>
      </aside>

      {/* المحتوى */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}