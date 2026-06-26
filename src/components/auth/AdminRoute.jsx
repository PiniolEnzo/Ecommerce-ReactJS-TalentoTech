import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Spinner from "@/components/ui/Spinner";

/* Protege una ruta para administradores: redirige a /login o / según el caso */
export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <Spinner text="Verificando sesión..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
