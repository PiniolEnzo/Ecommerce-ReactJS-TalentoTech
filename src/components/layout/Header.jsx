import React from "react";
import Navbar from "./Navbar";

/* ─────────────────────────────────────────────
 * Nexo Header — Brand logo + main navigation
 * ───────────────────────────────────────────── */
export default function Header() {
  return (
    <header className="border-b border-nexo-100 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container-main flex items-center justify-between h-16">
        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 group">
          {/* Venn-diagram logo mark */}
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7 text-nexo-600 group-hover:text-nexo-700 transition-colors"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="16" r="9" />
            <circle cx="20" cy="16" r="9" />
          </svg>
          <span className="font-heading text-xl font-bold tracking-tight text-nexo-900">
            NEXO
          </span>
        </a>

        <Navbar />
      </div>
    </header>
  );
}
