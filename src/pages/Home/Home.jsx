import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

/* ─────────────────────────────────────────────
 * Home — Hero section + product grid + cart
 * ───────────────────────────────────────────── */
export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner text="Loading products..." />;
  if (error) return <EmptyState title="Failed to load products" description={error} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
      <section>
        {/* ── Hero ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nexo-900 via-nexo-800 to-nexo-600 p-8 md:p-12 mb-8">
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
              <a
                href="/fashion"
                className="inline-flex items-center px-5 py-2.5 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse fashion
              </a>
            </div>
          </div>
        </div>

        {/* ── Product grid ── */}
        <div id="products">
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">All products</h2>
          {products.length === 0 ? (
            <EmptyState
              title="No products yet"
              description="Check back soon — new items are on the way."
            />
          ) : (
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] auto-rows-min">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart sidebar */}
      <div className="lg:sticky lg:top-24">
        <Cart />
      </div>
    </div>
  );
}
