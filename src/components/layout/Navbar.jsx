import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";
import { useAuth } from "@/contexts/AuthProvider";
import CartPopover from "@/components/CartPopover";

export default function Navbar() {
  const { cartItems, toggleCart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const activeClass = "font-semibold underline";

  return (
    <nav className="flex items-center gap-4">
      <div className="hidden md:flex gap-3">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Home
        </NavLink>
        <NavLink to="/fashion" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Fashion
        </NavLink>
        <NavLink to="/technology" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Technology
        </NavLink>
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 text-sm">
            {isAdmin && (
              <NavLink
                to="/admin"
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700"
              >
                Admin
              </NavLink>
            )}
            <span className="text-gray-500 hidden sm:inline">{user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-600"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex gap-2 text-sm">
            <NavLink
              to="/login"
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
            >
              Ingresar
            </NavLink>
            <NavLink
              to="/register"
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
              <path d="M6 6h15l-1.5 9h-13z" strokeLinecap="round" strokeLinejoin="round"></path>
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="sr-only">Cart</span>
            <span className="text-sm">{totalCount}</span>
          </button>
          <CartPopover />
        </div>
      </div>
    </nav>
  );
}