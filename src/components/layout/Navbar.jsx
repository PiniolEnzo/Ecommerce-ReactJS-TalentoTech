import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import { useAuth } from "@/contexts/AuthProvider";
import CartPopover from "@/components/CartPopover";

/* ─────────────────────────────────────────────
 * Navbar — Desktop + mobile hamburger nav
 * ───────────────────────────────────────────── */
export default function Navbar() {
  const { cartItems, toggleCart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  function closeMenu() {
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-nexo-600"
        : "text-gray-500 hover:text-nexo-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-nexo-50 text-nexo-700"
        : "text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <nav className="relative flex items-center gap-3 md:gap-5">
      {/* ── Hamburger (mobile only) ── */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-nexo-400"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* ── Desktop nav links ── */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/fashion" className={linkClass}>
          Fashion
        </NavLink>
        <NavLink to="/technology" className={linkClass}>
          Technology
        </NavLink>
      </div>

      {/* ── User / auth section ── */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:gap-3 text-sm">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `hidden sm:inline text-sm font-medium transition-colors ${
                  isActive ? "text-nexo-600" : "text-gray-500 hover:text-nexo-600"
                }`
              }
            >
              {user?.name}
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-nexo-100 text-nexo-700"
                      : "bg-gray-100 text-gray-600 hover:bg-nexo-50 hover:text-nexo-600"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  isActive
                    ? "border-nexo-400 text-nexo-600 bg-nexo-50"
                    : "border-gray-200 text-gray-600 hover:border-nexo-300 hover:text-nexo-600"
                }`
              }
            >
              Sign in
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-nexo-700 text-white"
                    : "bg-nexo-600 text-white hover:bg-nexo-700"
                }`
              }
            >
              Sign up
            </NavLink>
          </div>
        )}

        {/* ── Cart button ── */}
        {isAuthenticated && (
          <button
            onClick={logout}
            className="hidden md:inline text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Log out
          </button>
        )}

        <div className="relative">
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-nexo-600 focus:outline-none focus:ring-2 focus:ring-nexo-400 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-13z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4.5 h-4.5 text-[10px] font-bold text-white bg-accent-500 rounded-full">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </button>
          <CartPopover />
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-md bg-white border border-nexo-100 shadow-popover rounded-xl md:hidden z-40 animate-fade-in-up">
          <div className="flex flex-col gap-1 p-3">
            <NavLink to="/" onClick={closeMenu} className={mobileLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/fashion" onClick={closeMenu} className={mobileLinkClass}>
              Fashion
            </NavLink>
            <NavLink to="/technology" onClick={closeMenu} className={mobileLinkClass}>
              Technology
            </NavLink>
            {isAuthenticated && (
              <>
                <hr className="my-2 border-nexo-100" />
                <NavLink to="/account" onClick={closeMenu} className={mobileLinkClass}>
                  My account
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" onClick={closeMenu} className={mobileLinkClass}>
                    Admin panel
                  </NavLink>
                )}
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  Log out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <hr className="my-2 border-nexo-100" />
                <NavLink to="/login" onClick={closeMenu} className={mobileLinkClass}>
                  Sign in
                </NavLink>
                <NavLink to="/register" onClick={closeMenu} className={mobileLinkClass}>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
