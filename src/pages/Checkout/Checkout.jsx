import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import { useAuth } from "@/contexts/AuthProvider";
import { useOrders } from "@/contexts/OrderProvider";
import EmptyState from "@/components/ui/EmptyState";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    payment: "credit_card",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.address.trim()) errs.address = "La dirección es obligatoria";
    if (!form.city.trim()) errs.city = "La ciudad es obligatoria";
    if (!form.zip.trim()) errs.zip = "El código postal es obligatorio";
    if (!form.phone.trim()) errs.phone = "El teléfono es obligatorio";
    return errs;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const order = createOrder(cartItems, {
        name: form.name.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
        phone: form.phone.trim(),
      }, form.payment, total);

      clearCart();
      toast.success("Pedido confirmado");
      navigate(`/checkout/success/${order.id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Tu carrito está vacío"
        description="Agregá productos antes de finalizar la compra."
        action={
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Ir a la tienda
          </button>
        }
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-6">Finalizar compra</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Datos de envío */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Datos de envío</h3>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                id="name" name="name" type="text"
                value={form.name} onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                id="address" name="address" type="text"
                value={form.address} onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.address ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  id="city" name="city" type="text"
                  value={form.city} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.city ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  Código postal
                </label>
                <input
                  id="zip" name="zip" type="text"
                  value={form.zip} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.zip ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                id="phone" name="phone" type="tel"
                value={form.phone} onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Resumen y pago */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resumen del pedido</h3>

            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.product.title}</p>
                    <p className="text-xs text-gray-500">
                      ${item.product.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-lg font-semibold px-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div>
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago
              </label>
              <select
                id="payment" name="payment"
                value={form.payment} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="credit_card">Tarjeta de crédito</option>
                <option value="transfer">Transferencia bancaria</option>
                <option value="cash">Contra entrega</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
            >
              {submitting ? "Procesando..." : "Confirmar pedido"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
