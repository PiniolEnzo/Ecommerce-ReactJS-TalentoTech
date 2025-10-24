import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen((v) => !v);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
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
    };


    const removeAllOf = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const total = cartItems.reduce(
        (acum, item) => acum + item.product.price * item.quantity, 0
    );

    return (
        <CartContext.Provider
            value={{
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
            }}
        >
            {children}
        </CartContext.Provider>
    );
}