// src/features/produtos/pages/OrganizarProduto.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { listarProdutos } from "../../../services/produtosAPI";
//import "../../../styles/OrganizarProdutos.css";

export default function OrganizarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    listarProdutos()
      .then((data) => setProdutos(data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div style={{ display: "flex", marginTop: "60px" }}>
      <aside className="organizar-produtos">
        <h2 className="text-menu">Organizar Produtos</h2>

        <Link
          to="/produtos"
          onClick={(e) => {
            if (location.pathname === "/produtos") {
              e.preventDefault();
              alert("Você já está em Produtos");
            }
          }}
        >
          Produtos
        </Link>
        <hr />

        <Link
          to="/produtos/criar"
          onClick={(e) => {
            if (location.pathname === "/produtos/criar") {
              e.preventDefault();
              alert("Você já está em Adicionar Produtos");
            }
          }}
        >
          Adicionar Produto
        </Link>
        <hr />

        <Link
          to="/produtos/atualizar"
          onClick={(e) => {
            if (location.pathname === "/produtos/atualizar") {
              e.preventDefault();
              alert("Você já está em Atualizar Produtos");
            }
          }}
        >
          Atualizar Produto
        </Link>
        <hr />

        <Link
          to="/produtos/remover"
          onClick={(e) => {
            if (location.pathname === "/produtos/remover") {
              e.preventDefault();
              alert("Você já está em Remover Produtos");
            }
          }}
        >
          Remover Produto
        </Link>
      </aside>

      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet context={{ produtos, setProdutos }} />
      </main>
    </div>
  );
}