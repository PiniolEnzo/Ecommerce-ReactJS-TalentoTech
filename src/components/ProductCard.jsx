import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────────
 * ProductCard — Teal / amber design
 * Every 4th card is wider (md:col-span-2) for
 * genuine size variation without wasted space.
 * ───────────────────────────────────────────── */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleAdd(e) {
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart");
  }

  /* ── Rating stars ── */
  function renderRating(rate) {
    const full = Math.floor(rate);
    const half = rate - full >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === full && half) {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${product.id}-${i}`}>
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${product.id}-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-3.5 h-3.5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  }

  /* Every 4th product spans 2 columns on md+ screens.
     This gives genuine size variation — the extra width
     is filled with a larger image and more content room. */
  const isWide = product.id % 4 === 0;

  return (
    <div
      className={`group bg-white rounded-xl border border-nexo-100/60 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col ${
        isWide ? "md:col-span-2" : ""
      }`}
    >
      <Link to={`/product/${product.id}`} className="block p-4 pb-0">
        {/* Image container — wider cards get a taller image */}
        <div
          className={`w-full flex items-center justify-center bg-surface rounded-lg overflow-hidden ${
            isWide ? "h-56" : "h-44"
          }`}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/200x200/EEE/999?text=Product";
            }}
          />
        </div>

        {/* Title */}
        <h3 className={`${isWide ? "text-base" : "text-sm"} font-medium text-gray-800 mt-3 line-clamp-2 leading-snug`}>
          {product.title}
        </h3>
      </Link>

      {/* Rating */}
      {product.rating != null && (
        <div className="px-4 mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
          <span className="flex items-center gap-0.5">
            {renderRating(product.rating?.rate ?? product.rating)}
          </span>
          <span>({product.rating?.count ?? 0})</span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto px-4 pb-4 pt-3 flex items-center justify-between gap-2">
        <span className="text-base font-bold text-nexo-700">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-nexo-600 text-white text-xs font-medium rounded-lg hover:bg-nexo-700 active:bg-nexo-800 transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
