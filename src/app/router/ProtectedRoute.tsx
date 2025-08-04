
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '@/app/providers/authHooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthState();
  const location = useLocation();

  if (isLoading) {
    // Muestra un spinner o un componente de carga mientras se verifica la autenticación
    // Esto previene un "parpadeo" a la página de login mientras se carga la sesión
    return <div>Loading...</div>; // O un componente <Spinner />
  }

  if (!isAuthenticated) {
    // Redirige al usuario a la página de login si no está autenticado.
    // Se guarda la ubicación actual para poder redirigir de vuelta después del login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
