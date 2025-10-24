import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let canceled = false;
        setLoading(true);
        setError(null);

        fetchProducts()
            .then((data) => {
                if (!canceled) setProducts(data);
            })
            .catch((err) => {
                if (!canceled) setError(err.message || "Unknown error");
            })
            .finally(() => {
                if (!canceled) setLoading(false);
            });

        return () => {
            canceled = true;
        };
    }, []);

    return { products, loading, error };
}

