import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarProdutos } from "../../../services/produtosAPI";
import "../../../styles/Crud.css";

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos()
      .then((res) => {
        if (!res || res.erro) {
          throw new Error(res?.erro || "Erro desconhecido");
        }

        setProdutos(res);
      })
      .catch((err) => {
        console.error(err);
        alert(`Erro ao listar produtos: ${err.message}`);
      });
  }, []);

  return (
    <div>
      <h1 className="titulo-crud">Gerenciar Produtos</h1>
      <div className="botoes-crud">
        
        <Link to="/produtos/criar">Criar</Link>
        <Link to="/produtos/atualizar">Atualizar</Link>
        <Link to="/produtos/remover">Remover</Link>
      </div>
      <ul className="produtos">
        {produtos.map((produto) => (
          <li className="produto" key={produto.id}>
            <p><strong>ID:</strong> {produto.id}</p>
            {produto.imagem && (
              <img src={produto.imagem} alt={produto.nome} width={100} />
            )}
            <h3>{produto.nome}</h3>
            <p>R$ {Number(produto.valor ?? 0).toFixed(2)}</p>
            <p>Quantidade: {produto.quantity ?? 0}</p>
            <p>Status: {produto.status ?? "pendente"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
