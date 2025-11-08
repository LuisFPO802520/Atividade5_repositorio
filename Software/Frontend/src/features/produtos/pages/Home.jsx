// src/features/produtos/pages/Home.jsx
import { useState, useEffect } from "react";
import { useCart } from "../../carrinho/contexts/cartContext";
import { listarProdutos } from "../../../services/produtosAPI";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const { adicionarItem } = useCart();

  useEffect(() => {
      listarProdutos()
      .then(setProdutos)
      .catch(() => alert("Erro ao carregar produtos"));
  }, []);

  return (
    <div className="produtos">
      {produtos.map((produto) => (
        <div className="produto" key={produto.id}>
          {produto.imagem && (
            <img src={produto.imagem} alt={produto.nome} />
          )}
          <h3>{produto.nome}</h3>
          <p>R$ {Number(produto.valor ?? 0).toFixed(2)}</p>
          <p>Quantidade: {produto.quantity ?? 0}</p>
          <p>Status: {produto.status ?? "pendente"}</p>
          <button onClick={() => adicionarItem(produto)}>Comprar</button>
        </div>
      ))}
    </div>
  );
}
