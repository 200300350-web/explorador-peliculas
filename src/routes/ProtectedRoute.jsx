import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, lo mandamos a la ruta principal ("/")
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, lo dejamos pasar al componente hijo
  return children;
};