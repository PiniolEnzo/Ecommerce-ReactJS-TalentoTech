import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

/* Página de "Fashion" filtrando por categoría 'women\'s clothing' o 'men's clothing' */
export default function Fashion() {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner text="Cargando productos..." />;
  if (error) return <EmptyState title="Error al cargar productos" description={error} />;

  const fashion = products.filter((p) =>
    p.category?.toLowerCase().includes("clothing")
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Fashion</h2>
      {fashion.length === 0 ? (
        <EmptyState title="No hay productos de moda" description="No se encontraron productos en esta categoría." />
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {fashion.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
