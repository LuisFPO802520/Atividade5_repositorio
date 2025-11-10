import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Crud.css";

import { listarProdutos, deletarProduto } from "../../../services/produtosAPI";

export default function RemoverProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar produtos.");
      });
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    const produto = produtos.find((p) => p.id == id);
    setSelecionado(produto || null);
  };

  const handleDelete = async () => {
    if (!selecionado) return alert("Selecione um produto.");

    const confirmar = confirm(
      `Tem certeza que deseja remover o produto "${selecionado.nome}" (#${selecionado.id})?`
    );

    if (!confirmar) return;

    try {
      await deletarProduto(selecionado.id);
      alert("Produto removido com sucesso!");
      setSelecionado(null);

      // Recarregar lista
      listarProdutos().then(setProdutos);

    } catch (err) {
      console.error(err);
      alert("Erro ao remover produto");
    }
  };

  return (
    <div className="criar-produto-container">
      <h2>Remover Produto</h2>

      <div className="form-criar-produto">

        {/* Seleção */}
        <select
          className="input-criar-produto"
          onChange={handleSelect}
          value={selecionado?.id || ""}
        >
          <option value="">Selecione um produto...</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} — {p.nome}
            </option>
          ))}
        </select>

        {/* Preview */}
        {selecionado && (
          <div className="preview-container">
            <p>Produto selecionado:</p>
            <strong>{selecionado.nome}</strong>
            <p>Valor: R$ {Number(selecionado.valor).toFixed(2)}</p>

            {selecionado.imagem && (
              <img
                src={selecionado.imagem}
                alt="prévia"
                className="preview-imagem"
              />
            )}
          </div>
        )}

        <button onClick={handleDelete} className="btn-criar-produto" disabled={!selecionado}>
          Remover
        </button>

      </div>
    </div>
  );
}
