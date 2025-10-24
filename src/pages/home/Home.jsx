import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";

/* Página principal donde listamos productos.
   Implementamos estado de carga y manejo de errores con el hook useProducts. */
export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1rem" }}>
      <section>
        <h2 className="text-2xl font-semibold mb-4">All products</h2>
        {loading && <div>Loading products...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && (
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