import React from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
 * Nexo Footer — Brand info + quick links
 * ───────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-nexo-100 bg-white mt-16">
      <div className="container-main py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6 text-nexo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="16" r="9" />
                <circle cx="20" cy="16" r="9" />
              </svg>
              <span className="font-heading text-lg font-bold text-nexo-900">
                NEXO
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Curated products with style and purpose — delivered to your door.
            </p>
          </div>

          {/* Shop links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Shop
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-gray-500 hover:text-nexo-600 transition-colors">
                Home
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Support
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/account" className="text-sm text-gray-500 hover:text-nexo-600 transition-colors">
                My account
              </Link>
              <Link to="/checkout" className="text-sm text-gray-500 hover:text-nexo-600 transition-colors">
                Checkout
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nexo-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>&copy; {year} Nexo. All rights reserved.</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
