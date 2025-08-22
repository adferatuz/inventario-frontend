import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  message?: string;
  size?: 'sm' | 'full';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  message = 'Cargando...',
  size = 'full',
  className,
}) => {
  if (size === 'sm') {
    return (
      <i
        className={`fas fa-spinner fa-spin ${styles.inlineSpinner} ${className || ''}`}
      ></i>
    );
  }

  return (
    <div className={`${styles.loadingOverlay} ${className || ''}`}>
      <div className={styles.loadingSpinner}>
        <i className="fas fa-spinner fa-spin"></i>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Spinner;