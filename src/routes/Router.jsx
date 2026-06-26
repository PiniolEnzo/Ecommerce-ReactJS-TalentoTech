import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";

const Home = lazy(() => import("@/pages/Home/Home"));
const Fashion = lazy(() => import("@/pages/Fashion/Fashion"));
const Technology = lazy(() => import("@/pages/Technology/Technology"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail/ProductDetail"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Account = lazy(() => import("@/pages/Account/Account"));
const AdminDashboard = lazy(() => import("@/pages/Admin/Dashboard"));
const AdminProductList = lazy(() => import("@/pages/Admin/ProductList"));

/* Router de la app con layout común y lazy loading de páginas */
export default function RouterComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas (cualquier usuario autenticado) */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />

            {/* Rutas de administrador */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProductList />
                </AdminRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<div className="text-center py-10">404 - Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}