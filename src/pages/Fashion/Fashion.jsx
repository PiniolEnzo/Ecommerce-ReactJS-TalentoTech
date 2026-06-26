import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";

/* Página de "Fashion" filtrando por categoría 'women\'s clothing' o 'men's clothing' */
export default function Fashion() {
  const { products, loading, error } = useProducts();

  const fashion = products.filter((p) =>
    p.category?.toLowerCase().includes("clothing") 
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Fashion</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {fashion.length === 0 ? <div>No fashion products found</div> : fashion.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}