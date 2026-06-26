import React, { useState, useMemo } from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

/* ─────────────────────────────────────────────
 * Home — Hero + category filter + product grid
 * ───────────────────────────────────────────── */

const CATEGORY_LABELS = {
  electronics: "Electronics",
  jewelery: "Jewelery",
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

/** Capitalise first letter of each word, preserving apostrophes */
function formatLabel(str) {
  return str.replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}

export default function Home() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");

  /* Derive unique categories from products */
  const categories = useMemo(() => {
    if (!products.length) return [];
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats.sort()];
  }, [products]);

  /* Filter products by active category */
  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  if (loading) return <Spinner text="Loading products..." />;
  if (error) return <EmptyState title="Failed to load products" description={error} />;

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexo-900 via-nexo-800 to-nexo-600 p-8 md:p-12 mb-10">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <svg
              viewBox="0 0 32 32"
              className="w-6 h-6 text-amber-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="16" r="9" />
              <circle cx="20" cy="16" r="9" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              NEXO
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight max-w-2xl">
            Discover what moves you
          </h1>
          <p className="text-base md:text-lg text-nexo-100 mt-3 max-w-lg">
            Curated products with style and purpose — from fashion to tech, delivered to your door.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-500 text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors"
            >
              Shop now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Products section ── */}
      <div id="products" className="scroll-mt-24">
        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-nexo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                }`}
              >
                {cat === "all" ? "All" : CATEGORY_LABELS[cat] || formatLabel(cat)}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try a different category."
          />
        ) : (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
