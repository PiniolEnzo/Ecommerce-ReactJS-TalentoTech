import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import useProduct from "@/hooks/useProduct";


export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) return <div>Loading product...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-w-xs object-contain" />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="mb-2"><strong>Category:</strong> {product.category}</p>
        <p className="mb-4 text-xl font-bold">${product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product)} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Add to cart
        </button>
      </div>
    </div>
  );
}