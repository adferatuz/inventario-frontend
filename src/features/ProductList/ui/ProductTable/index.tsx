import React, { useEffect, useState } from 'react';
import { productService } from '@/entities/Product/api/productService';
import type { Product } from '@/entities/Product/model/types';
import type { PageProduct } from '@/entities/Product/model/types';
import Table from '@/shared/ui/Table';
import Spinner from '@/shared/ui/Spinner';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

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
  }, [page, size]);

  const handleSearch = () => {
    setPage(0);
    fetchProducts();
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalType(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      setLoading(true); // Mostrar spinner durante la eliminación
      try {
        await productService.deleteProduct(selectedProduct.id);
        console.log(`Product with ID: ${selectedProduct.id} deleted successfully.`);
        fetchProducts(); // Recargar la lista de productos
        handleCloseModal();
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product. Please try again.');
        setLoading(false); // Ocultar spinner en caso de error
      }
    }
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
                <Button
                  variant="action"
                  className={styles.editButton}
                  onClick={() => handleEditClick(product)}
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  variant="action"
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(product)}
                >
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalType === 'edit' ? 'Edit Product' : 'Delete Product'}
      >
        {modalType === 'edit' && selectedProduct && (
          <div>
            <h3>Edit Product: {selectedProduct.name}</h3>
            <p>ID: {selectedProduct.id}</p>
            <p>SKU: {selectedProduct.sku}</p>
            <p>Formulario de edición del producto irá aquí.</p>
            {/* Aquí iría el formulario real */}
          </div>
        )}
        {modalType === 'delete' && selectedProduct && (
          <div>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete product: <strong>{selectedProduct.name}</strong> (ID: {selectedProduct.id})?</p>
            <div className={styles.modalActions}>
              <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;
