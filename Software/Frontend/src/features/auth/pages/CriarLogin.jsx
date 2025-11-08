// src/features/auth/pages/CriarLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CriarLogin() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleCadastro = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    if (password !== confirmarPassword) {
      alert("Senhas diferentes.");
      return;
    }

    setBusy(true);
    try {
      await register(name, email, password);
    } catch (err) {
      console.error("→ Erro no register (front):", err);
      alert("Erro ao criar conta: " + (err?.message || err));
    } finally {
      setBusy(false);
    }
  };

  // helper: dispara o submit via JS se por algum motivo o onSubmit não estiver ligado
  const handleClickSubmit = async (ev) => {
    ev.preventDefault();
    await handleCadastro();
  };

  return (
    <div className="login-container">
      <h1>Criar Login</h1>

      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
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

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          onClick={handleClickSubmit}
          disabled={busy}
        >
          {busy ? "Criando..." : "Criar Conta"}
        </button>
      </form>

      <p>
        <Link to="/login">Já tem conta? Faça login</Link>
      </p>
    </div>
  );
}

