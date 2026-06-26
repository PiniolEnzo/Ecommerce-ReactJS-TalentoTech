import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "@/services/productService";
import { useAuth } from "@/contexts/AuthProvider";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmModal from "@/components/ui/ConfirmModal";
import toast from "react-hot-toast";

export default function AdminProductList() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    setLoading(true);
    setError(null);
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget.id, token);
      toast.success(`"${deleteTarget.title}" eliminado`);
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Spinner text="Cargando productos..." />;
  if (error) return <EmptyState title="Error al cargar productos" description={error} />;

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Productos</h2>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Imagen</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Precio</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Categoría</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={p.image}
                    alt=""
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40?text=X";
                    }}
                  />
                </td>
                <td className="px-4 py-3 max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No hay productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar producto"
        message={`¿Estás seguro de eliminar "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
