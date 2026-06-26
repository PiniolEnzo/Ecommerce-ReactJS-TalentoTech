import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Panel de Administración</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/products"
          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-1">Productos</h3>
          <p className="text-sm text-gray-500">Gestionar el catálogo de productos</p>
        </Link>
      </div>
    </div>
  );
}
