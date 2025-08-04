import React, { useEffect, useState } from 'react';
import { productService } from '@/entities/Product/api/productService';
import type { Product } from '@/entities/Product/model/types';
import type { PageProduct } from '@/entities/Product/model/types';
import Table from '@/shared/ui/Table';
import Spinner from '@/shared/ui/Spinner';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import styles from './ProductTable.module.css';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: PageProduct = await productService.getProducts(page, size, 'id', 'asc', searchTerm);
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, size, searchTerm]);

  const handleSearch = () => {
    setPage(0); // Reset to first page on new search
    fetchProducts();
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (loading) {
    return <Spinner message="Loading products..." />;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.productTableContainer}>
      <div className={styles.searchBar}>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch} variant="primary">
          <i className="fas fa-search"></i> Search
        </Button>
      </div>

      {products.length === 0 ? (
        <div className={styles.noProductsMessage}>No products found.</div>
      ) : (
        <Table
          headers={[
            'ID',
            'Name',
            'SKU',
            'Category',
            'Brand',
            'Stock',
            'Price',
            'Actions',
          ]}
        >
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.category || 'N/A'}</td>
              <td>{product.brand || 'N/A'}</td>
              <td>{product.stockQuantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className={styles.actions}>
                <Button variant="action" className={styles.editButton}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="action" className={styles.deleteButton}>
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <div className={styles.paginationControls}>
        <Button onClick={handlePrevPage} disabled={page === 0} variant="secondary">
          <i className="fas fa-chevron-left"></i> Previous
        </Button>
        <span>
          Page {page + 1} of {totalPages} ({totalElements} items)
        </span>
        <Button onClick={handleNextPage} disabled={page === totalPages - 1} variant="secondary">
          Next <i className="fas fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default ProductTable;
