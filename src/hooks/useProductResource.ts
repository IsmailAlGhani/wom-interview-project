import { use } from 'react';
import { productApi } from '../api/productService';
import { Product, ProductResponse } from '../types/product';

// A simple cache to avoid recreating promises on every render
const cache = new Map<string, Promise<any>>();

function getResource<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    cache.set(key, fetcher());
  }
  return cache.get(key)!;
}

export const useProducts = () => {
  const promise = getResource<ProductResponse>('products', productApi.getProducts);
  return use(promise);
};

export const useProductDetail = (id: number) => {
  const promise = getResource<Product>(`product-${id}`, () => productApi.getProductDetail(id));
  return use(promise);
};

export const refreshProducts = () => {
  cache.delete('products');
};
