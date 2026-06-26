import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

/* Protege una ruta: si no está autenticado redirige a /login */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Verificando sesión...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
