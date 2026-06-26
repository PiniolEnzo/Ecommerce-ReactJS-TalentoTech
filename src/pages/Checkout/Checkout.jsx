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
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.zip.trim()) errs.zip = "ZIP code is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
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
      toast.success("Order confirmed");
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
        title="Your cart is empty"
        description="Add some products before checking out."
        action={
          <button
            onClick={() => navigate("/")}
            className="inline-flex px-4 py-2 bg-nexo-600 text-white rounded-lg hover:bg-nexo-700 text-sm font-medium transition-colors"
          >
            Browse products
          </button>
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
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid md:grid-cols-5 gap-6">
          {/* Shipping details — 3 cols */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white border border-nexo-100/60 rounded-xl shadow-card p-6">
              <h2 className="text-base font-heading font-semibold text-gray-900 mb-4">Shipping details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? "border-red-300 focus:ring-red-400"
                        : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    id="address" name="address" type="text"
                    value={form.address} onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.address
                        ? "border-red-300 focus:ring-red-400"
                        : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                      City
                    </label>
                    <input
                      id="city" name="city" type="text"
                      value={form.city} onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.city
                          ? "border-red-300 focus:ring-red-400"
                          : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1.5">
                      ZIP code
                    </label>
                    <input
                      id="zip" name="zip" type="text"
                      value={form.zip} onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.zip
                          ? "border-red-300 focus:ring-red-400"
                          : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
                      }`}
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone
                        ? "border-red-300 focus:ring-red-400"
                        : "border-gray-200 focus:ring-nexo-400 focus:border-nexo-400"
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Order summary + payment — 2 cols */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white border border-nexo-100/60 rounded-xl shadow-card p-5">
              <h2 className="text-base font-heading font-semibold text-gray-900 mb-3">Order summary</h2>
              <div className="divide-y divide-nexo-100/60 max-h-64 overflow-auto -mx-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 px-1 py-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-10 h-10 object-contain shrink-0 rounded-lg bg-surface border border-nexo-100/50"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/40x40/EEE/999?text=P";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">{item.product.title}</p>
                      <p className="text-xs text-gray-400">
                        ${item.product.price.toFixed(2)} &times; {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-nexo-100/60 flex justify-between items-center">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-xl font-bold text-nexo-700">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white border border-nexo-100/60 rounded-xl shadow-card p-5">
              <h2 className="text-base font-heading font-semibold text-gray-900 mb-3">Payment</h2>
              <div className="space-y-3">
                <div>
                  <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payment method
                  </label>
                  <select
                    id="payment" name="payment"
                    value={form.payment} onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-nexo-400 focus:border-nexo-400 transition-colors"
                  >
                    <option value="credit_card">Credit card</option>
                    <option value="transfer">Bank transfer</option>
                    <option value="cash">Cash on delivery</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 text-sm font-medium transition-colors"
                >
                  {submitting ? "Processing..." : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
