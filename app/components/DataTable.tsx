"use client";

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode; // ← جديد
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onDelete: (id: any) => void;
  onEdit?: (id: any) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
}

// helper: يدعم "user.name" عن طريق تفكيك النقاط
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export default function DataTable({ columns, data, onDelete, onEdit, onAdd, addButtonLabel }: DataTableProps) {
  return (
    <div className="bg-white p-6 rounded shadow border border-gray-100">
      {onAdd && (
        <button
          onClick={onAdd}
          className="mb-6 bg-[#5c4033] text-white px-4 py-2 rounded text-sm hover:bg-[#4a3329] transition"
        >
          {addButtonLabel || "إضافة جديد"}
        </button>
      )}

      <table className="w-full text-right border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#fdf5e6] border-b border-[#deb887] text-[#5c4033] text-sm font-bold">
            {columns.map((col, idx) => (
              <th key={idx} className="py-3 px-4 border-x border-[#deb887]">{col.header}</th>
            ))}
            <th className="py-3 px-4 border-x border-[#deb887]">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-orange-50 transition">
              {columns.map((col, idx) => (
                <td key={idx} className="py-4 px-4 border-x border-gray-200">
                  {col.render ? col.render(row) : (getNestedValue(row, col.accessor) ?? "-")}
                </td>
              ))}
              <td className="py-4 px-4 border-x border-gray-200 flex gap-4">
                {onEdit && (
                  <button onClick={() => onEdit(row.id)} className="text-gray-600 hover:text-[#5c4033] transition">
                    ✏️
                  </button>
                )}
                <button onClick={() => onDelete(row.id)} className="text-gray-600 hover:text-red-700 transition">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}