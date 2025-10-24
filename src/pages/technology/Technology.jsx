import React from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";


export default function Tecnology() {
  const { products, loading, error } = useProducts();

  const technology = products.filter((p) =>
    p.category?.toLowerCase().includes("electronics")
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Electronics</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && !error && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {technology.length === 0 ? <div>No electronics products found</div> : technology.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}