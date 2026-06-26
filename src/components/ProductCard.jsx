import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  function handleAdd(e) {
    e.preventDefault();
    addToCart(product);
    toast.success("Agregado al carrito");
  }

  /* Estrellas para el rating */
  function renderRating(rate) {
    const full = Math.floor(rate);
    const half = rate - full >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === full && half) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${product.id}-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${product.id}-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  }

  return (
    <div className="border border-gray-200 p-4 rounded-lg flex flex-col items-start gap-3 hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} className="w-full text-left">
        <div className="w-full h-36 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-32 object-contain"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=Sin+imagen";
            }}
          />
        </div>
        <h3 className="text-sm font-medium mt-2 line-clamp-2">{product.title}</h3>
      </Link>

      {/* Rating */}
      {product.rating != null && (
        <div className="flex items-center gap-1 text-xs text-gray-500" title={`${product.rating?.rate ?? product.rating} / 5`}>
          <span className="flex">{renderRating(product.rating?.rate ?? product.rating)}</span>
          <span>({product.rating?.count ?? 0})</span>
        </div>
      )}

      <div className="w-full flex items-center justify-between mt-auto">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
