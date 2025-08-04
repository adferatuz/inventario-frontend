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
  createdAt: string;
  updatedAt: string;
}

export interface PageableObject {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: SortObject[];
}

export interface SortObject {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface PageProduct {
  totalPages: number;
  totalElements: number;
  pageable: PageableObject;
  size: number;
  content: Product[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
