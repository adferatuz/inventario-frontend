import React, { useEffect, useState } from 'react';
import { productService } from '@/entities/Product/api/productService';
import type { Product } from '@/entities/Product/model/types';
import type { PageProduct } from '@/entities/Product/model/types';
import Table from '@/shared/ui/Table';
import Spinner from '@/shared/ui/Spinner';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import ProductForm from '@/shared/ui/ProductForm';
import useMediaQuery from '@/shared/lib/hooks/useMediaQuery'; // Importar useMediaQuery
import styles from './ProductTable.module.css';

const ProductTable: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detectar si es móvil
  const initialPageSize = isMobile ? 5 : 10; // Tamaño de página dinámico

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(initialPageSize); // Usar tamaño de página dinámico
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'delete' | 'view' | 'create' | null>(null); // Añadir 'create' al tipo de modal
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // Estado para la eliminación

  // Actualizar el tamaño de página si cambia el estado móvil
  useEffect(() => {
    setSize(isMobile ? 5 : 10);
    setPage(0); // Resetear a la primera página al cambiar el tamaño
  }, [isMobile]);

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
    setEditLoading(false);
    setEditError(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleViewMoreClick = (product: Product) => {
    setSelectedProduct(product);
    setModalType('view');
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedProduct(null);
    setModalType('create');
    setEditLoading(false);
    setEditError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalType(null);
    setEditLoading(false);
    setEditError(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      setIsDeleting(true); // Usar el nuevo estado de eliminación
      try {
        await productService.deleteProduct(selectedProduct.id);
        console.log(`Product with ID: ${selectedProduct.id} deleted successfully.`);
        await fetchProducts(); // Recargar la lista de productos
        handleCloseModal();
      } catch (err) {
        console.error('Error deleting product:', err);
        // Opcional: mostrar un error específico en el modal
      } finally {
        setIsDeleting(false); // Finalizar el estado de eliminación
      }
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setEditLoading(true);
    setEditError(null);
    try {
      if (modalType === 'edit' && selectedProduct) {
        await productService.updateProduct(selectedProduct.id, productData);
      } else {
        await productService.createProduct(productData);
      }
      await fetchProducts();
      handleCloseModal();
    } catch (err: any) {
      setEditError('Error al guardar el producto.');
      setEditLoading(false);
    }
  };

  // Función para renderizar cada elemento (fila de tabla o card item)
  const renderProductItem = (product: Product, headers: string[]) => {
    if (isMobile) {
      return (
        <>
          <div className={styles.cardItem}>
            <span className={styles.cardLabel}>{headers[0]}:</span>
            <span className={styles.cardValue}>{product.id}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardLabel}>{headers[1]}:</span>
            <span className={styles.cardValue}>{product.name}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardLabel}>{headers[2]}:</span>
            <span className={styles.cardValue}>{product.sku}</span>
          </div>
          <div className={styles.cardItem}>
            <span className={styles.cardLabel}>{headers[6]}:</span>
            <span className={styles.cardValue}>${product.price.toFixed(2)}</span>
          </div>
          <div className={styles.cardActions}>
            <Button
              variant="action"
              className={styles.viewMoreButton}
              onClick={() => handleViewMoreClick(product)}
            >
              <i className="fas fa-eye"></i> View
            </Button>
            <Button
              variant="action"
              className={styles.editButton}
              onClick={() => handleEditClick(product)}
            >
              <i className="fas fa-edit"></i> Edit
            </Button>
            <Button
              variant="action"
              className={styles.deleteButton}
              onClick={() => handleDeleteClick(product)}
            >
              <i className="fas fa-trash-alt"></i> Delete
            </Button>
          </div>
        </>
      );
    }
    // Table Row View: retorna SOLO el <tr>
    return (
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
    );
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
        <div style={{ flex: 1 }} />
        <Button variant="success" onClick={handleCreateClick}>
          <i className="fas fa-plus"></i> Agregar producto
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
          data={products}
          renderItem={renderProductItem}
          isMobile={isMobile}
        />
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
        title={
          modalType === 'create'
            ? 'Crear Producto'
            : modalType === 'edit'
            ? 'Editar Producto'
            : modalType === 'delete'
            ? 'Eliminar Producto'
            : 'Detalles del Producto'
        }
      >
        {(modalType === 'create' || modalType === 'edit') && (
          <ProductForm
            mode={modalType}
            product={selectedProduct}
            loading={editLoading}
            onCancel={handleCloseModal}
            onSave={handleSaveProduct}
          />
        )}
        {editError && <div className={styles.errorMessage}>{editError}</div>}
        {modalType === 'delete' && selectedProduct && (
          <div>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete product: <strong>{selectedProduct.name}</strong> (ID: {selectedProduct.id})?</p>
            <div className={styles.modalActions}>
              <Button variant="danger" onClick={handleConfirmDelete} disabled={isDeleting}>
                {isDeleting ? <Spinner size="sm" /> : 'Delete'}
              </Button>
              <Button variant="secondary" onClick={handleCloseModal} disabled={isDeleting}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {modalType === 'view' && selectedProduct && (
          <div>
            <h3>Product Details: {selectedProduct.name}</h3>
            <p><strong>ID:</strong> {selectedProduct.id}</p>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
            <p><strong>SKU:</strong> {selectedProduct.sku}</p>
            <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <p><strong>Stock:</strong> {selectedProduct.stockQuantity}</p>
            <p><strong>Min Stock:</strong> {selectedProduct.minimumStock}</p>
            <p><strong>Category:</strong> {selectedProduct.category || 'N/A'}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand || 'N/A'}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;