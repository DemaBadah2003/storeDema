export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-bold mb-3">🛍️ متجري</h3>
            <p className="text-gray-400 text-sm">
              أفضل المنتجات بأفضل الأسعار
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>الرئيسية</li>
              <li>المنتجات</li>
              <li>تواصل معنا</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">تواصل معنا</h3>
            <p className="text-gray-400 text-sm">info@mystore.com</p>
          </div>

        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
          © 2026 متجري — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}