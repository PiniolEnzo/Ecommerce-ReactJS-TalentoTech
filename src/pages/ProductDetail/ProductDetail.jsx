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

  if (loading) return <Spinner text="Cargando producto..." />;
  if (error) return <EmptyState title="Error al cargar producto" description={error} />;
  if (!product) return <EmptyState title="Producto no encontrado" description="El producto que buscás no existe." />;

  function handleAdd() {
    addToCart(product);
    toast.success("Agregado al carrito");
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-xs object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300?text=Sin+imagen";
          }}
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="mb-2">
          <strong>Categoría:</strong> {product.category}
        </p>
        <p className="mb-4 text-xl font-bold">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
