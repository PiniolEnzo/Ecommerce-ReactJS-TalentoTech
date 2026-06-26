import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Home = lazy(() => import("@/pages/Home/Home"));
const Fashion = lazy(() => import("@/pages/Fashion/Fashion"));
const Technology = lazy(() => import("@/pages/Technology/Technology"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail/ProductDetail"));

/* Router de la app con layout común y lazy loading de páginas */
export default function RouterComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<div className="text-center py-10">404 - Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}