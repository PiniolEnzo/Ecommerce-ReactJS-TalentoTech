import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import { useAuth } from "@/contexts/AuthProvider";
import CartPopover from "@/components/CartPopover";

export default function Navbar() {
  const { cartItems, toggleCart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const activeLink = "font-semibold underline";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="flex items-center gap-4">
      {/* Hamburger — visible solo en mobile */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Menú de navegación"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Links de escritorio — ocultos en mobile */}
      <div className="hidden md:flex gap-3">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : "text-gray-700")}>
          Home
        </NavLink>
        <NavLink to="/fashion" className={({ isActive }) => (isActive ? activeLink : "text-gray-700")}>
          Fashion
        </NavLink>
        <NavLink to="/technology" className={({ isActive }) => (isActive ? activeLink : "text-gray-700")}>
          Technology
        </NavLink>
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 text-sm">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `hidden sm:inline ${isActive ? "text-indigo-600 font-semibold" : "text-gray-500 hover:text-indigo-600"}`
              }
            >
              {user?.name}
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-2 py-1 rounded ${isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`
                }
              >
                Admin
              </NavLink>
            )}
            <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600">
              Salir
            </button>
          </div>
        ) : (
          <div className="flex gap-2 text-sm">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-1 border rounded hover:bg-gray-50 ${isActive ? "border-indigo-400 text-indigo-600" : "border-gray-300 text-gray-700"}`
              }
            >
              Ingresar
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-1 rounded text-white ${isActive ? "bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"}`
              }
            >
              Registrarse
            </NavLink>
          </div>
        )}

        <div className="relative">
          <button
            onClick={toggleCart}
            aria-label="Toggle cart"
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-13z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="sr-only">Cart</span>
            <span className="text-sm">{totalCount}</span>
          </button>
          <CartPopover />
        </div>
      </div>

      {/* Menú mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
          <div className="flex flex-col gap-1 p-4">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              Home
            </NavLink>
            <NavLink to="/fashion" onClick={closeMenu} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              Fashion
            </NavLink>
            <NavLink to="/technology" onClick={closeMenu} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
              Technology
            </NavLink>
            {isAuthenticated && (
              <>
                <hr className="my-1" />
                <NavLink to="/account" onClick={closeMenu} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                  Mi cuenta
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                    Panel Admin
                  </NavLink>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
