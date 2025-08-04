import React from 'react';
import Header from '@/widgets/Header';
import StatsGrid from '@/widgets/StatsGrid';
import ProductTable from '@/features/ProductList/ui/ProductTable';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <main className={styles.dashboardMain}>
        <StatsGrid />
        <ProductTable />
      </main>
    </div>
  );
};

export default DashboardPage;