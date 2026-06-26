import React from "react";

/* Fila de item del carrito, compartida entre Cart (sidebar) y CartPopover. */
export default function CartItemRow({ item, onRemove, onRemoveAll }) {
  return (
    <li className="py-2 flex gap-3 items-center">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-12 h-12 object-contain shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{item.product.title}</div>
        <div className="text-xs text-gray-500">
          ${item.product.price.toFixed(2)} x {item.quantity}
        </div>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button
          onClick={() => onRemove(item.product.id)}
          className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
          aria-label={`Remove one ${item.product.title}`}
        >
          −
        </button>
        <button
          onClick={() => onRemoveAll(item.product.id)}
          className="text-sm px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
          aria-label={`Remove all ${item.product.title}`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
