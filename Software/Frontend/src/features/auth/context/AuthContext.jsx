// src/features/auth/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  console.info("🔐 AuthContext inicializado");

  const login = async (email, password) => {
    try {
      
      const res = await api.post("/auth/login", { email, password });
      const data = res?.user ? res.user : res;  // Compatível com ambos formatos
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch {
      alert("E-mail ou senha incorretos");
    }
  };

  const register = async (name, email, password, role = "cliente") => {
    try {
      await api.post("/auth/register", { name, email, password, role });
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error("❌ Erro ao registrar:", err);
      alert("Erro ao criar conta");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
