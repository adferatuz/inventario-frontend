import apiClient from '@/shared/api';
import type { Product, PageProduct } from '@/entities/Product/model/types';

// Wrapper for all product-related API calls
export const productService = {
  /**
   * Fetches a paginated list of products.
   * @param page - The page number to retrieve (0-indexed).
   * @param size - The number of items per page.
   * @param sortBy - The field to sort by.
   * @param sortDir - The sort direction ('asc' or 'desc').
   * @param term - Optional search term.
   * @returns A promise that resolves to the paginated response of products.
   */
  getProducts: async (
    page = 0,
    size = 10,
    sortBy = 'id',
    sortDir = 'asc',
    term?: string
  ): Promise<PageProduct> => {
    const params: Record<string, any> = { page, size, sortBy, sortDir };
    if (term) {
      params.term = term;
    }
    const response = await apiClient.get<PageProduct>('/api/products', {
      params,
    });
    return response.data;
  },

  /**
   * Fetches all products for statistical purposes by requesting a large page.
   * @returns A promise that resolves to an array of all products.
   */
  getAllProductsForStats: async (): Promise<Product[]> => {
    const response = await apiClient.get<PageProduct>('/api/products', {
      params: { page: 0, size: 1000, sortBy: 'id', sortDir: 'asc' }, // Request a large number of items
    });
    return response.data.content; // Return just the content array
  },

  /**
   * Creates a new product.
   * @param productData - The data for the new product.
   * @returns A promise that resolves to the created product.
   */
  createProduct: async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> => {
    const response = await apiClient.post<Product>('/api/products', productData);
    return response.data;
  },

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param productData - The partial data to update the product with.
   * @returns A promise that resolves to the updated product.
   */
  updateProduct: async (
    id: number,
    productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> => {
    const response = await apiClient.put<Product>(`/api/products/${id}`, productData);
    return response.data;
  },

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves when the product is deleted.
   */
  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  },
};