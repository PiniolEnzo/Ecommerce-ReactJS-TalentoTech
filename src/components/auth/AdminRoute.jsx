import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

/* Protege una ruta para administradores: redirige a /login o / según el caso */
export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Verificando sesión...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
