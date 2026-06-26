import React from "react";
import { useCart } from "@/contexts/CartProvider";
import CartItemRow from "./CartItemRow";

/* Popover del carrito en la Navbar. Usa CartItemRow para cada producto. */
export default function CartPopover() {
  const { cartItems, removeFromCart, removeAllOf, clearCart, total, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-md z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Cart</h3>
          <button onClick={closeCart} className="text-sm text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-gray-500">Your cart is empty</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-100 max-h-60 overflow-auto">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onRemove={removeFromCart}
                  onRemoveAll={removeAllOf}
                />
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="font-semibold">${total.toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    /* No hay pasarela de pago */
                  }}
                  className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Checkout
                </button>
                <button onClick={clearCart} className="px-3 py-1 text-sm text-gray-600 hover:underline">
                  Clear
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}