import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

const STORAGE_PREFIX = "orders_";

function loadOrders(userEmail) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userEmail);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(userEmail, orders) {
  localStorage.setItem(STORAGE_PREFIX + userEmail, JSON.stringify(orders));
}

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email;

  const [orders, setOrders] = useState(() => (email ? loadOrders(email) : []));
  const [lastOrderId, setLastOrderId] = useState(null);

  /* Recargar cuando cambia el usuario logueado */
  useEffect(() => {
    setOrders(email ? loadOrders(email) : []);
    setLastOrderId(null);
  }, [email]);

  const createOrder = useCallback(
    (items, shipping, payment, total) => {
      if (!email) throw new Error("Debés iniciar sesión para comprar");

      const order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        date: new Date().toISOString(),
        items: items.map((i) => ({
          product: { id: i.product.id, title: i.product.title, price: i.product.price, image: i.product.image },
          quantity: i.quantity,
        })),
        shipping,
        payment,
        total,
        status: "Pendiente",
      };

      const updated = [...orders, order];
      setOrders(updated);
      saveOrders(email, updated);
      setLastOrderId(order.id);
      return order;
    },
    [email, orders],
  );

  const getOrderById = useCallback(
    (orderId) => orders.find((o) => o.id === orderId) || null,
    [orders],
  );

  const value = useMemo(
    () => ({ orders, lastOrderId, createOrder, getOrderById }),
    [orders, lastOrderId, createOrder, getOrderById],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
