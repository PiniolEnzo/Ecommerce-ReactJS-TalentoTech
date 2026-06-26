import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);
    const toggleCart = useCallback(() => setIsCartOpen((v) => !v), []);

    const addToCart = useCallback((product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => {
            const found = prev.find((item) => item.product.id === productId);
            if (!found) return prev;
            if (found.quantity > 1) {
                return prev.map((item) =>
                    item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prev.filter((item) => item.product.id !== productId);
        });
    }, []);

    const removeAllOf = useCallback((productId) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    const total = useMemo(
        () => cartItems.reduce((acum, item) => acum + item.product.price * item.quantity, 0),
        [cartItems],
    );

    const value = useMemo(
        () => ({
            cartItems,
            addToCart,
            removeFromCart,
            removeAllOf,
            clearCart,
            total,
            isCartOpen,
            openCart,
            closeCart,
            toggleCart,
        }),
        [cartItems, addToCart, removeFromCart, removeAllOf, clearCart, total, isCartOpen, openCart, closeCart, toggleCart],
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
