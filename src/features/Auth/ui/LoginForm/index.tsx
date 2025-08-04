
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthActions, useAuthState } from '@/app/providers/authHooks';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthActions();
  const { isAuthenticated, isLoading, error } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginHeader}>
        <i className="fas fa-boxes"></i>
        <h1>Sistema de Inventario</h1>
        <p>Inicia sesión para acceder al sistema</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Input
          label="Usuario o Email"
          id="usernameOrEmail"
          type="email" // Forzamos email para simplicidad, Supabase usa email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
          icon={<i className="fas fa-user"></i>}
          required
        />
        <Input
          label="Contraseña"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          icon={<i className="fas fa-lock"></i>}
          required
        />
        <Button type="submit" variant="primary" disabled={isLoading} className={styles.loginBtn}>
          {isLoading ? (
            <><i className="fas fa-spinner fa-spin"></i> Cargando...</>
          ) : (
            <><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</>
          )}
        </Button>
      </form>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.demoCredentials}>
        <h3>Credenciales de prueba:</h3>
        <div className={styles.credentialItem}>
          <strong>Email:</strong> user@example.com
        </div>
        <div className={styles.credentialItem}>
          <strong>Contraseña:</strong> password123
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
