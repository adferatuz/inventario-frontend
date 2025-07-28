import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  message = 'Cargando...'
}) => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}>
        <i className="fas fa-spinner fa-spin"></i> {/* Asumiendo FontAwesome */}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
