// src/features/auth/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import "../Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); //para bater com o AuthContext
    } catch (err) {
      alert(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        <Link to="/criar-login">Criar conta</Link>
      </p>
    </div>
  );
}
