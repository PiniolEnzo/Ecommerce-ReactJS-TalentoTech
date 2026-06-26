import { useAuth } from "@/contexts/AuthProvider";
import { useOrders } from "@/contexts/OrderProvider";
import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/EmptyState";

export default function Account() {
  const { user, isAdmin } = useAuth();
  const { orders } = useOrders();

  const statusColors = {
    Pendiente: "bg-yellow-100 text-yellow-800",
    "En camino": "bg-blue-100 text-blue-800",
    Entregado: "bg-green-100 text-green-800",
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Mi cuenta</h2>

      {/* Datos del usuario */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 mb-8">
        <div>
          <span className="text-sm text-gray-500">Nombre</span>
          <p className="font-medium">{user?.name}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Email</span>
          <p className="font-medium">{user?.email}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Rol</span>
          <p className="font-medium">{isAdmin ? "Administrador" : "Cliente"}</p>
        </div>
      </div>

      {/* Historial de órdenes */}
      <h3 className="text-xl font-semibold mb-4">Mis pedidos</h3>

      {orders.length === 0 ? (
        <EmptyState
          title="No tenés pedidos"
          description="Todavía no realizaste ninguna compra."
          action={
            <Link
              to="/"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
            >
              Ir a la tienda
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {[...orders].reverse().map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-mono">{order.id}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    statusColors[order.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {new Date(order.date).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-2 flex gap-1">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.product.id}
                    src={item.product.image}
                    alt=""
                    className="w-8 h-8 object-contain border border-gray-100 rounded"
                  />
                ))}
                {order.items.length > 4 && (
                  <span className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 bg-gray-50 rounded border border-gray-100">
                    +{order.items.length - 4}
                  </span>
                )}
              </div>

              <div className="mt-2 text-xs text-gray-400">
                {order.items.length} producto{order.items.length !== 1 ? "s" : ""} — {order.shipping.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
