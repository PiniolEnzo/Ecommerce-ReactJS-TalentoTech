import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TalentoTech. All rights reserved.
      </div>
    </footer>
  );
}