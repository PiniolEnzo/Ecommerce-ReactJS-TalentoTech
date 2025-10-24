import { adaptProducts } from "../adapters/productAdapter";

const API_BASE = "https://fakestoreapi.com";

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products from productService");
  }
  const data = await res.json();
  return adaptProducts(data);
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product by ID from productService");
  }
  const data = await res.json();
  return adaptProducts([data])[0];
}