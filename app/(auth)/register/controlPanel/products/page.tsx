"use client";
import { useState } from "react";
import DataTable from "@/app/(auth)/register/components/DataTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "منتج أ", price: "100 ر.س", stock: 10 },
    { id: 2, name: "منتج ب", price: "200 ر.س", stock: 5 },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: 0 });

  const handleSave = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: "", price: "", stock: 0 });
      setIsModalOpen(false);
    }
  };

  const columns = [
    { header: "الاسم", accessor: "name" },
    { header: "السعر", accessor: "price" },
    { header: "المخزون", accessor: "stock" },
  ];

  return (
    <div className="p-6 relative" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        
        {/* التعديل هنا: العنوان والبحث يمين، وزر الإضافة يسار */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
          {/* جهة اليمين: العنوان والبحث */}
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg text-gray-800">قائمة المنتجات</h2>
            <input 
              type="text" 
              placeholder="بحث عن منتج..." 
              className="border border-gray-200 rounded px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* جهة اليسار: زر الإضافة */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700 transition shadow-sm"
          >
            إضافة منتج جديد +
          </button>
        </div>

        {/* الجدول (المكون العام) */}
        <DataTable 
          columns={columns} 
          data={products} 
          onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
        />
      </div>

      {/* النافذة المنبثقة (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white p-8 rounded-lg shadow-2xl w-96 border border-gray-200 z-10">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition text-2xl">&times;</button>
            <h3 className="font-bold text-xl mb-6">إضافة منتج جديد</h3>
            
            <div className="space-y-4">
              <input placeholder="اسم المنتج" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
              <input placeholder="السعر" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
              <input type="number" placeholder="المخزون" className="w-full border p-2 rounded text-sm" onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700">حفظ</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-300">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}