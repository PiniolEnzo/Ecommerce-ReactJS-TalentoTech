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
        title="Orden no encontrada"
        description="No encontramos ninguna orden con ese código."
        action={
          <Link
            to="/"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Volver al inicio
          </Link>
        }
      />
    );
  }

  const paymentLabels = {
    credit_card: "Tarjeta de crédito",
    transfer: "Transferencia bancaria",
    cash: "Contra entrega",
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        {/* Check icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold mb-2">¡Pedido confirmado!</h2>
        <p className="text-gray-500 mb-6">
          Gracias por tu compra. Te va a llegar un resumen a tu email.
        </p>

        <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Número de orden</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fecha</span>
            <span className="font-medium">
              {new Date(order.date).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Método de pago</span>
            <span className="font-medium">{paymentLabels[order.payment] || order.payment}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2">
            <span className="text-gray-500">Total</span>
            <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-left mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Productos</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-sm">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-8 h-8 object-contain shrink-0"
                />
                <span className="flex-1 truncate">{item.product.title}</span>
                <span className="text-gray-500 shrink-0">
                  ${item.product.price.toFixed(2)} x {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Dirección de envío</h4>
          <p className="text-sm text-gray-600">
            {order.shipping.name}
            <br />
            {order.shipping.address}
            <br />
            {order.shipping.city}, CP {order.shipping.zip}
            <br />
            Tel: {order.shipping.phone}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Volver al inicio
          </Link>
          <Link
            to="/account"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
          >
            Mis pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}
