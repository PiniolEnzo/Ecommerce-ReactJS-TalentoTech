import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import CartItemRow from "./CartItemRow";

/* ─────────────────────────────────────────────
 * Cart sidebar — shown on Home
 * ───────────────────────────────────────────── */
export default function Cart() {
  const { cartItems, removeFromCart, removeAllOf, clearCart, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <aside className="border border-nexo-100 rounded-xl p-6 bg-white shadow-card">
        <h3 className="text-base font-semibold text-gray-500">Your cart is empty</h3>
      </aside>
    );
  }

  return (
    <aside className="border border-nexo-100 rounded-xl bg-white shadow-card">
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Cart</h3>
        <ul className="divide-y divide-nexo-100/60">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onRemove={removeFromCart}
              onRemoveAll={removeAllOf}
            />
          ))}
        </ul>
      </div>

      <div className="border-t border-nexo-100/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-lg font-bold text-nexo-700">${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="block w-full text-center px-4 py-2.5 bg-accent-500 text-white rounded-lg hover:bg-accent-600 text-sm font-medium transition-colors"
        >
          Checkout
        </Link>
        <button onClick={clearCart} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Clear cart
        </button>
      </div>
    </aside>
  );
}
