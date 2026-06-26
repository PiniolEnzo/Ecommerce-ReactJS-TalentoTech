import React from "react";
import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartProvider";
import { OrderProvider } from "./contexts/OrderProvider";

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}