import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import CartItemRow from "./CartItemRow";

/* ─────────────────────────────────────────────
 * Cart popover in the Navbar
 * ───────────────────────────────────────────── */
export default function CartPopover() {
  const { cartItems, removeFromCart, removeAllOf, clearCart, total, isCartOpen, closeCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  function handleCheckout() {
    closeCart();
    navigate("/checkout");
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-nexo-100 shadow-popover rounded-xl z-50 animate-fade-in-up">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-900">Cart</h3>
          <button
            onClick={closeCart}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400">Your cart is empty</div>
        ) : (
          <>
            <ul className="divide-y divide-nexo-100/60 max-h-60 overflow-auto -mx-1">
              {cartItems.map((item) => (
                <div key={item.product.id} className="px-1">
                  <CartItemRow
                    item={item}
                    onRemove={removeFromCart}
                    onRemoveAll={removeAllOf}
                  />
                </div>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-nexo-100/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">Total</div>
                <div className="text-base font-bold text-nexo-700">${total.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-4 py-1.5 bg-accent-500 text-white text-xs font-medium rounded-lg hover:bg-accent-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
