import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import Spinner from "@/components/ui/Spinner";

const Home = lazy(() => import("@/pages/Home/Home"));
const Fashion = lazy(() => import("@/pages/Fashion/Fashion"));
const Technology = lazy(() => import("@/pages/Technology/Technology"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail/ProductDetail"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Register = lazy(() => import("@/pages/Register/Register"));
const Account = lazy(() => import("@/pages/Account/Account"));
const AdminDashboard = lazy(() => import("@/pages/Admin/Dashboard"));
const AdminProductList = lazy(() => import("@/pages/Admin/ProductList"));
const AdminProductForm = lazy(() => import("@/pages/Admin/ProductForm"));
const Checkout = lazy(() => import("@/pages/Checkout/Checkout"));
const OrderConfirmation = lazy(() => import("@/pages/Checkout/OrderConfirmation"));

export default function RouterComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: "0.875rem", borderRadius: "0.75rem" },
          success: { iconTheme: { primary: "#0D9488", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />
      <Header />
      <main className="container-main py-6 flex-1">
        <Suspense fallback={<Spinner text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/success/:orderId"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />

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
            <Route
              path="/admin/products/new"
              element={
                <AdminRoute>
                  <AdminProductForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminRoute>
                  <AdminProductForm />
                </AdminRoute>
              }
            />

            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-nexo-50 flex items-center justify-center mb-4">
                  <span className="text-2xl font-heading font-bold text-nexo-300">404</span>
                </div>
                <p className="text-gray-400">Page not found</p>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
