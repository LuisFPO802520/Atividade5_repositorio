// src/features/produtos/pages/RemoverProduto.jsx
import { useState } from "react";
//import "./OrganizarProdutos.css";
import { deletarProduto } from "../../../services/produtosAPI";

function RemoverProduto() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (!id) return alert("Informe o ID");

    try {
      await deletarProduto(id);
      alert("Produto removido com sucesso!");
      setId("");
    } catch (err) {
      console.error(err);
      alert("Erro ao remover produto");
    }
  };

  return (
    <div className="criar-produto-container">
      <h2>Remover Produto</h2>
      <div className="form-criar-produto">
        <input
          className="input-criar-produto"
          type="number"
          placeholder="ID do Produto"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button onClick={handleDelete} className="btn-criar-produto">
          Remover
        </button>
      </div>
    </div>
  );
}

export default RemoverProduto;
