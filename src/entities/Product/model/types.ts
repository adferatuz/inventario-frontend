export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  minimumStock: number;
  category?: string;
  brand?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
}
