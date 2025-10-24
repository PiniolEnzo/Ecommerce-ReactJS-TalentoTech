import React from "react";
import Navbar from "./Navbar";
import '../../index.css'
/* Encabezado de la app con Navbar */
export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold m-0">TalentoTech</h1>
        <Navbar />
      </div>
    </header>
  );
}