import React from "react";
import Router from "./routes/Router";
import { CartProvider } from "./contexts/CartProvider";


export default function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}