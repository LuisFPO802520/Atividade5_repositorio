// src/features/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    alert("Faça login para continuar.");
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    alert("Acesso restrito aos administradores.");
    return <Navigate to="/" />;
  }

  return children;
}
