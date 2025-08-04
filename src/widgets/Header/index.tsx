
import React from 'react';
import { useAuthState, useAuthActions } from '@/app/providers/authHooks';
import Button from '@/shared/ui/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { user } = useAuthState();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.headerLeft}>
        <i className="fas fa-boxes"></i>
        <h1>Sistema de Inventario</h1>
      </div>
      <div className={styles.headerRight}>
        {user && (
          <span className={styles.userInfo}>
            <i className="fas fa-user"></i>
            <span>{user.email}</span>
          </span>
        )}
        <Button variant="danger" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
};

export default Header;
