// src/App.jsx
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { CartProvider } from "./features/carrinho/contexts/cartContext";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./features/auth/ProtectedRoute";

// Páginas de produtos
import Home from "./features/produtos/pages/Home";
import OrganizarProdutos from "./features/produtos/pages/OrganizarProduto";
import ListarProdutos from "./features/produtos/pages/ListarProdutos";
import CriarProduto from "./features/produtos/pages/CriarProduto";
import AtualizarProduto from "./features/produtos/pages/AtualizarProduto";
import RemoverProduto from "./features/produtos/pages/RemoverProduto";

// Outras páginas
import Carrinho from "./features/carrinho/pages/Carrinho";
import Pagamento from "./features/pagamento/pages/Pagamento";

// Autenticação
import Login from "./features/auth/pages/Login";
import CriarLogin from "./features/auth/pages/CriarLogin";

function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link> |
      <Link to="/carrinho"> Carrinho</Link> |
      <Link to="/pagamento"> Pagamento</Link>

      {isAdmin && (
        <>
          {" | "}
          <Link to="/produtos">Gerenciar Produtos</Link>
        </>
      )}

      {" | "}
      {!isAuthenticated ? (
        <Link to="/login">Login</Link>
      ) : (
        <span style={{ marginLeft: 8 }}>
          ({user?.email}){" "}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Sair
          </button>
        </span>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />

        <Routes>
          {/* 🌐 Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-login" element={<CriarLogin />} />

          {/* 🔒 Rotas protegidas (admin) */}
          <Route
            path="/produtos"
            element={
              <ProtectedRoute adminOnly>
                <OrganizarProdutos />
              </ProtectedRoute>
            }
          >
            <Route index element={<ListarProdutos />} />
            <Route path="criar" element={<CriarProduto />} />
            <Route path="atualizar" element={<AtualizarProduto />} />
            <Route path="remover" element={<RemoverProduto />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
