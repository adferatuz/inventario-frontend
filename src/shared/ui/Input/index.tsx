import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode; // Para iconos como los de FontAwesome
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  id,
  className,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label}
        </label>
      )}
      <input id={inputId} className={`${styles.input} ${className || ''}`} {...props} />
    </div>
  );
};

export default Input;
