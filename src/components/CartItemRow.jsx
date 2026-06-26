import React from "react";

/* ─────────────────────────────────────────────
 * Cart item row — shared in Cart + CartPopover
 * ───────────────────────────────────────────── */
export default function CartItemRow({ item, onRemove, onRemoveAll }) {
  return (
    <li className="py-3 flex gap-3 items-center">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-12 h-12 object-contain shrink-0 rounded-lg bg-surface border border-nexo-100/50"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/48x48/EEE/999?text=P";
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 truncate">{item.product.title}</div>
        <div className="text-xs text-gray-400 mt-0.5">
          ${item.product.price.toFixed(2)} &times; {item.quantity}
        </div>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button
          onClick={() => onRemove(item.product.id)}
          className="w-7 h-7 flex items-center justify-center text-xs rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label={`Remove one ${item.product.title}`}
        >
          −
        </button>
        <button
          onClick={() => onRemoveAll(item.product.id)}
          className="text-[11px] px-2 py-0.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
          aria-label={`Remove all ${item.product.title}`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
