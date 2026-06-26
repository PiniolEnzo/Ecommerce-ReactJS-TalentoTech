import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { loginUser, registerUser, fetchCurrentUser } from "@/services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* Verificar token guardado al montar la app */
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCurrentUser(token)
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerUser(name, email, password);
    localStorage.setItem("token", data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
