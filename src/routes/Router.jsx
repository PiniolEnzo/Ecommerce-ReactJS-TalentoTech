import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home/Home";
import Fashion from "../pages/Fashion/Fashion";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Technology from "../pages/technology/Technology";  

/* Router de la app con layout común */
export default function RouterComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<div className="text-center py-10">404 - Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}