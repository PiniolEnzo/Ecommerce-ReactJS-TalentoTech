import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartProvider";
import CartPopover from "../CartPopover";

export default function Navbar() {
  const { cartItems, toggleCart } = useCart();

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
    </nav>
  );
}