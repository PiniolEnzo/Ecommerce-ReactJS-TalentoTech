import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import Spinner from "@/components/ui/Spinner";

/* Protege una ruta: si no está autenticado redirige a /login */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner text="Verificando sesión..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
