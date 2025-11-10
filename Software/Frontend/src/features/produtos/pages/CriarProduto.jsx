import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarProduto } from "../../../services/produtosAPI";
import "../../../styles/Crud.css";
import { useAuth } from "../../auth/context/AuthContext";

export default function CriarProduto() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ nome: "", valor: "", imagem: "", quantity: 0, status: "pendente" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.valor) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const valorNumerico = parseFloat(form.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("O valor precisa ser um número válido e maior que zero.");
      return;
    }

    if (!user?.id) {
      alert("Você precisa estar logado para criar um produto.");
      return;
    }

    const produtoFormatado = {
      nome: form.nome,
      valor: valorNumerico, 
      imagem: form.imagem || null,
      quantity: Number(form.quantity || 0),
      status: form.status || "pendente",
      userId: Number(user.id),
    };

    try {
      setLoading(true);
      const res = await criarProduto(produtoFormatado);
      alert("Produto criado com sucesso!");
      setForm({ nome: "", valor: "", imagem: "", quantity: 0, status: "pendente" });
      navigate("/produtos");
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      alert(`Erro ao criar produto: ${err.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="criar-produto-container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit} className="form-criar-produto">
        <input
          className="input-criar-produto"
          name="nome"
          placeholder="Nome do produto"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          className="input-criar-produto"
          name="valor"
          placeholder="Valor (apenas números)"
          type="number"
          step="0.01"
          value={form.valor}
          onChange={handleChange}
          required
        />
        <input
          className="input-criar-produto"
          name="imagem"
          placeholder="URL da imagem (opcional)"
          value={form.imagem}
          onChange={handleChange}
        />
        <input
          className="input-criar-produto"
          name="quantity"
          placeholder="Quantidade (inicial)"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input-criar-produto"
        >
          <option value="pendente">pendente</option>
          <option value="preparando">preparando</option>
          <option value="pronto">pronto</option>
          <option value="entregue">entregue</option>
        </select>

        {form.imagem && (
          <div className="preview-container">
            <p>Pré-visualização da imagem:</p>
            <img
              src={form.imagem}
              alt="Pré-visualização"
              className="preview-imagem"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <button type="submit" className="btn-criar-produto" disabled={loading}>
          {loading ? "Criando..." : "Criar"}
        </button>
      </form>
    </div>
  );
}
