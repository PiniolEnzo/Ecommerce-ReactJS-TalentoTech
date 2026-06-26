import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Admin panel</h1>

      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          to="/admin/products"
          className="group border border-nexo-100/60 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow bg-white"
        >
          <div className="w-10 h-10 rounded-lg bg-nexo-100 flex items-center justify-center text-nexo-600 mb-3 group-hover:bg-nexo-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="font-heading font-semibold text-gray-900 mb-1">Products</h3>
          <p className="text-sm text-gray-400">Manage the product catalog</p>
        </Link>
      </div>
    </div>
  );
}
