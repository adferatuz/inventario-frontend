
import React, { useEffect, useState } from 'react';
import StatCard from './ui/StatCard';
import styles from './StatsGrid.module.css';
import { productService, type Product } from '@/entities/Product';

const StatsGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAllProductsForStats();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cálculos para las tarjetas
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stockQuantity < p.minimumStock).length;
  const totalCategories = new Set(products.map(p => p.category)).size;
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stockQuantity, 0);

  if (loading) {
    return <div className={styles.loadingState}>Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  return (
    <div className={styles.statsGrid}>
      <StatCard
        icon={<i className="fas fa-box"></i>}
        label="Total Productos"
        value={totalProducts}
        color="primary"
      />
      <StatCard
        icon={<i className="fas fa-exclamation-triangle"></i>}
        label="Stock Bajo"
        value={lowStockProducts}
        color="secondary"
      />
      <StatCard
        icon={<i className="fas fa-tags"></i>}
        label="Categorías"
        value={totalCategories}
        color="tertiary"
      />
      <StatCard
        icon={<i className="fas fa-dollar-sign"></i>}
        label="Valor Total"
        value={`$${totalValue.toLocaleString('es-MX')}`}
        color="quaternary"
      />
    </div>
  );
};

export default StatsGrid;
