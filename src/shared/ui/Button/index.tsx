import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success' | 'secondary' | 'action';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className || ''}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
