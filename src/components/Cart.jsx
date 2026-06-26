import React from "react";
import { useCart } from "../contexts/CartProvider";
import CartItemRow from "./CartItemRow";

/* Componente Cart: sidebar con los productos seleccionados. */
export default function Cart() {
  const { cartItems, removeFromCart, removeAllOf, clearCart, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <aside className="border p-4 rounded bg-white">
        <h3 className="text-lg font-medium">Your cart is empty</h3>
      </aside>
    );
  }

  return (
    <aside className="border p-4 rounded bg-white">
      <h3 className="text-lg font-medium mb-2">Cart</h3>
      <ul className="divide-y divide-gray-100">
        {cartItems.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onRemove={removeFromCart}
            onRemoveAll={removeAllOf}
          />
        ))}
      </ul>
      <div className="mt-4">
        <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        <div className="mt-2">
          <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">
            Clear cart
          </button>
        </div>
      </div>
    </aside>
  );
}