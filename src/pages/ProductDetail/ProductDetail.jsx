import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import useProduct from "@/hooks/useProduct";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) return <Spinner text="Loading product..." />;
  if (error) return <EmptyState title="Failed to load product" description={error} />;
  if (!product) return <EmptyState title="Product not found" description="The product you're looking for doesn't exist." />;

  function handleAdd() {
    addToCart(product);
    toast.success("Added to cart");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white rounded-xl border border-nexo-100/60 p-8 shadow-card">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-80 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/300x300/EEE/999?text=Product";
            }}
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-nexo-600 bg-nexo-50 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-500 leading-relaxed text-sm">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-amber-500 font-medium">
              {product.rating?.rate ?? "—"} / 5
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">{product.rating?.count ?? 0} reviews</span>
          </div>

          <div className="pt-4 border-t border-nexo-100/60">
            <div className="text-3xl font-bold text-nexo-700">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-8 py-3 bg-accent-500 text-white font-medium rounded-lg hover:bg-accent-600 active:bg-accent-700 transition-colors text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
