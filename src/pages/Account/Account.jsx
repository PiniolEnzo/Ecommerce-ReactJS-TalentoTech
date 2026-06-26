import { useAuth } from "@/contexts/AuthProvider";
import { useOrders } from "@/contexts/OrderProvider";
import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/EmptyState";

export default function Account() {
  const { user, isAdmin } = useAuth();
  const { orders } = useOrders();

  const statusColors = {
    Pending: "bg-amber-50 text-amber-700",
    "In transit": "bg-sky-50 text-sky-700",
    Delivered: "bg-green-50 text-green-700",
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">My account</h1>

      {/* User info card */}
      <div className="bg-white border border-nexo-100/60 rounded-xl shadow-card p-6 space-y-4 mb-8">
        <div className="flex items-center gap-3 pb-3 border-b border-nexo-100/60">
          <div className="w-10 h-10 rounded-full bg-nexo-100 flex items-center justify-center text-nexo-700 font-heading font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          {isAdmin && (
            <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full bg-accent-50 text-accent-600">
              Admin
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Role</span>
            <p className="font-medium text-gray-800">{isAdmin ? "Administrator" : "Customer"}</p>
          </div>
          <div>
            <span className="text-gray-400">Member since</span>
            <p className="font-medium text-gray-800">—</p>
          </div>
        </div>
      </div>

      {/* Order history */}
      <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">My orders</h2>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="You haven't placed any orders yet."
          action={
            <Link
              to="/"
              className="inline-flex px-4 py-2 bg-nexo-600 text-white rounded-lg hover:bg-nexo-700 text-sm font-medium transition-colors"
            >
              Browse products
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {[...orders].reverse().map((order) => (
            <div
              key={order.id}
              className="bg-white border border-nexo-100/60 rounded-xl p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-300 font-mono">{order.id.slice(0, 12)}…</span>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    statusColors[order.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="font-bold text-nexo-700">${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-3 flex gap-1.5">
                {order.items.slice(0, 5).map((item) => (
                  <img
                    key={item.product.id}
                    src={item.product.image}
                    alt=""
                    className="w-9 h-9 object-contain border border-nexo-100/60 rounded-lg bg-surface"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/36x36/EEE/999?text=P";
                    }}
                  />
                ))}
                {order.items.length > 5 && (
                  <span className="w-9 h-9 flex items-center justify-center text-xs text-gray-400 bg-surface-dark rounded-lg border border-nexo-100/60">
                    +{order.items.length - 5}
                  </span>
                )}
              </div>

              <div className="mt-2 text-xs text-gray-400">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""} — {order.shipping.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
