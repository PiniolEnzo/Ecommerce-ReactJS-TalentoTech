import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

/* Página principal donde listamos productos.
   Implementamos estado de carga y manejo de errores con el hook useProducts. */
export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner text="Cargando productos..." />;
  if (error) return <EmptyState title="Error al cargar productos" description={error} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <section>
        <h2 className="text-2xl font-semibold mb-4">All products</h2>
        {products.length === 0 ? (
          <EmptyState
            title="No hay productos"
            description="No se encontraron productos disponibles."
          />
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Cart />
    </div>
  );
}
