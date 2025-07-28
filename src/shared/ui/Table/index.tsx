import React from 'react';
import styles from './Table.module.css';

interface TableProps {
  headers: string[];
  children: React.ReactNode; // Las filas de la tabla (tbody)
}

const Table: React.FC<TableProps> = ({
  headers,
  children
}) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.productsTable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
