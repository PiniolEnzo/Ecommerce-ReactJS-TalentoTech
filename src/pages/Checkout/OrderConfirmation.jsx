import { useParams, Link } from "react-router-dom";
import { useOrders } from "@/contexts/OrderProvider";
import EmptyState from "@/components/ui/EmptyState";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        description="We couldn't find an order with that code."
        action={
          <Link
            to="/"
            className="inline-flex px-4 py-2 bg-nexo-600 text-white rounded-lg hover:bg-nexo-700 text-sm font-medium transition-colors"
          >
            Back to home
          </Link>
        }
      />
    );
  }

  const paymentLabels = {
    credit_card: "Credit card",
    transfer: "Bank transfer",
    cash: "Cash on delivery",
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <div className="bg-white border border-nexo-100/60 rounded-2xl shadow-card p-8">
        {/* Success icon */}
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Order confirmed!</h1>
        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
          Thanks for your purchase. You&apos;ll receive a confirmation email shortly.
        </p>

        {/* Order details */}
        <div className="text-left bg-surface rounded-xl p-5 space-y-2.5 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-400">Order number</span>
            <span className="font-medium text-gray-800">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>
            <span className="font-medium text-gray-800">
              {new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Payment</span>
            <span className="font-medium text-gray-800">{paymentLabels[order.payment] || order.payment}</span>
          </div>
          <div className="flex justify-between border-t border-nexo-100/60 pt-2.5">
            <span className="text-gray-400">Total</span>
            <span className="font-bold text-lg text-nexo-700">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Items */}
        <div className="text-left mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Items</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-9 h-9 object-contain shrink-0 rounded-lg bg-surface border border-nexo-100/50"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/36x36/EEE/999?text=P";
                  }}
                />
                <span className="flex-1 truncate text-gray-700">{item.product.title}</span>
                <span className="text-gray-400 shrink-0">
                  ${item.product.price.toFixed(2)} &times; {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="text-left mb-6 bg-surface rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Shipping address</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {order.shipping.name}<br />
            {order.shipping.address}<br />
            {order.shipping.city}, {order.shipping.zip}<br />
            Tel: {order.shipping.phone}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-nexo-600 text-white rounded-lg hover:bg-nexo-700 text-sm font-medium transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            to="/account"
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            My orders
          </Link>
        </div>
      </div>
    </div>
  );
}
