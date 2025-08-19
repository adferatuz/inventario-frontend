import React from 'react';
import styles from './Table.module.css';
import useMediaQuery from '@/shared/lib/hooks/useMediaQuery';

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderItem: (item: T, headers: string[]) => React.ReactNode;
}

const Table = <T,>({ headers, data, renderItem }: TableProps<T>) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <div className={styles.cardContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            {renderItem(item, headers)}
          </div>
        ))}
      </div>
    );
  }

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
          {data.map((item, index) => {
            // Se recomienda que renderItem retorne un <tr>, aquí le agregamos key si no la tiene
            const element = renderItem(item, headers);
            if (React.isValidElement(element)) {
              return React.cloneElement(element, { key: index });
            }
            return element;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
