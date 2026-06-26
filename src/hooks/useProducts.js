import useAsync from './useAsync';
import { fetchProducts } from '@/services/productService';

export default function useProducts() {
  const { data, loading, error } = useAsync(() => fetchProducts(), []);

  return { products: data ?? [], loading, error };
}

