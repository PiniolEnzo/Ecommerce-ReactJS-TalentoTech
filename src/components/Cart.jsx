import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
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
      <div className="mt-4 space-y-2">
        <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        <Link
          to="/checkout"
          className="inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium"
        >
          Finalizar compra
        </Link>
        <div>
          <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">
            Clear cart
          </button>
        </div>
      </div>
    </aside>
  );
}
