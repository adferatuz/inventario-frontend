import apiClient from '@/shared/api';
import type { Product } from '@/entities/Product/model/types';

// A generic paginated response type, common in Spring Boot backends
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page number
}

/**
 * Fetches a paginated list of products.
 * @param page - The page number to retrieve.
 * @param size - The number of items per page.
 * @param sortBy - The field to sort by.
 * @param sortDir - The direction to sort in ('asc' or 'desc').
 * @returns A promise that resolves to the paginated response of products.
 */
export const getProducts = async (
  page = 0,
  size = 10,
  sortBy = 'id',
  sortDir = 'asc'
): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
    params: { page, size, sortBy, sortDir },
  });
  return response.data;
};

/**
 * Creates a new product.
 * @param productData - The data for the new product.
 * @returns A promise that resolves to the created product.
 */
export const createProduct = async (
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> => {
  const response = await apiClient.post<Product>('/products', productData);
  return response.data;
};

/**
 * Updates an existing product.
 * @param id - The ID of the product to update.
 * @param productData - The partial data to update the product with.
 * @returns A promise that resolves to the updated product.
 */
export const updateProduct = async (
  id: number,
  productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Product> => {
  const response = await apiClient.put<Product>(`/products/${id}`, productData);
  return response.data;
};

/**
 * Deletes a product by its ID.
 * @param id - The ID of the product to delete.
 * @returns A promise that resolves when the product is deleted.
 */
export const deleteProduct = async (id: number): Promise<void> => {
  await apiClient.delete(`/products/${id}`);
};
