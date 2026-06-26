import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

/* ─────────────────────────────────────────────
 * Technology — Filtered product view
 * ───────────────────────────────────────────── */
export default function Technology() {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner text="Loading products..." />;
  if (error) return <EmptyState title="Failed to load products" description={error} />;

  const tech = products.filter((p) =>
    p.category?.toLowerCase().includes("electronics")
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-gray-900">Technology</h1>
        <p className="text-sm text-gray-400 mt-1">Gadgets and gear for the modern world.</p>
      </div>

      {tech.length === 0 ? (
        <EmptyState
          title="No tech products"
          description="We couldn't find any items in this category."
        />
      ) : (
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
          {tech.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
