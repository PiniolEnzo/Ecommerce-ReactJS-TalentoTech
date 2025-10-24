import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/productService";
import { useCart } from "../../contexts/CartProvider";


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((p) => {
        if (!canceled) setProduct(p);
      })
      .catch((err) => {
        if (!canceled) setError(err.message || "Error fetching product");
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [id]);

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