import React from 'react';
import LoginForm from '@/features/Auth/ui/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;