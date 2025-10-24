import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-start gap-3">
      <Link to={`/product/${product.id}`} className="w-full text-left">
        <div className="w-full h-36 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-32 object-contain" />
        </div>
        <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.title}</h3>
      </Link>
      <div className="w-full flex items-center justify-between mt-auto">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <button
          onClick={() => addToCart(product)}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}