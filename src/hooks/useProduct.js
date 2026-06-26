import useAsync from './useAsync';
import { fetchProductById } from '@/services/productService';

/* Hook para obtener un producto individual por ID. */
export default function useProduct(id) {
  const { data, loading, error } = useAsync(() => fetchProductById(id), [id]);

  return { product: data, loading, error };
}
