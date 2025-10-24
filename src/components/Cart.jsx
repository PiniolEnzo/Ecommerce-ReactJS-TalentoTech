import React from "react";
import { useCart } from "../contexts/CartProvider";

/* Componente Cart: muestra los productos seleccionados */
export default function Cart() {
  const { cartItems, removeFromCart, removeAllOf, clearCart, total } = useCart();

  if (cartItems.length === 0) {
    return <div><h3 className="text-lg font-medium">Your cart is empty</h3></div>;
  }

  return (
    <aside className="border p-4 rounded bg-white">
      <h3 className="text-lg font-medium mb-2">Cart</h3>
      <ul className="space-y-3">
        {cartItems.map((item) => (
          <li key={item.product.id} className="flex items-center gap-3">
            <img src={item.product.image} alt={item.product.title} className="w-12 h-12 object-contain" />
            <div className="flex-1">
              <div className="font-medium">{item.product.title}</div>
              <small className="text-gray-500">${item.product.price.toFixed(2)} x {item.quantity}</small>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => removeFromCart(item.product.id)} className="px-2 py-1 bg-gray-100 rounded">-</button>
              <button onClick={() => removeAllOf(item.product.id)} className="px-2 py-1 bg-red-50 text-red-600 rounded">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <div className="font-semibold">Total: ${total.toFixed(2)}</div>
        <div className="mt-2">
          <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">Clear cart</button>
        </div>
      </div>
    </aside>
  );
}