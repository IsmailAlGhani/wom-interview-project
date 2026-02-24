import axiosInstance from './axiosInstance';
import { Product, ProductResponse } from '../types/product';

export const productApi = {
  getProducts: async (): Promise<ProductResponse> => {
    const response = await axiosInstance.get<ProductResponse>('/products');
    return response.data;
  },
  getProductDetail: async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/products/${id}`);
    return response.data;
  },
};
