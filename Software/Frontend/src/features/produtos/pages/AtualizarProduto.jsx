import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Crud.css";

import { listarProdutos, atualizarProduto } from "../../../services/produtosAPI";

export default function AtualizarProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nome: "",
    valor: "",
    imagem: "",
    quantity: "",
    status: "pendente",
  });

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch((err) => {
        console.error(err);
        alert("Erro ao carregar produtos.");
      });
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSelectProduct = (e) => {
    const id = e.target.value;
    const produto = produtos.find((p) => p.id == id);
    if (!produto) return;

    setForm({
      id,
      nome: produto.nome,
      valor: produto.valor,
      imagem: produto.imagem,
      quantity: produto.quantity,
      status: produto.status,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id) return alert("Selecione um produto");

    try {
      await atualizarProduto(form.id, {
        nome: form.nome,
        valor: parseFloat(form.valor),
        imagem: form.imagem,
        quantity: Number(form.quantity),
        status: form.status,
      });

      alert("Produto atualizado com sucesso!");
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className="criar-produto-container">
      <h2>Atualizar Produto</h2>

      <form onSubmit={handleSubmit} className="form-criar-produto">

        <select
          className="input-criar-produto"
          name="id"
          value={form.id}
          onChange={handleSelectProduct}
        >
          <option value="">Selecione um produto...</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} — {p.nome}
            </option>
          ))}
        </select>

        <input
          className="input-criar-produto"
          name="nome"
          placeholder="Novo Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          className="input-criar-produto"
          name="valor"
          placeholder="Novo Valor"
          type="number"
          step="0.01"
          value={form.valor}
          onChange={handleChange}
          required
        />

        <input
          className="input-criar-produto"
          name="imagem"
          placeholder="Nova URL da imagem"
          value={form.imagem}
          onChange={handleChange}
          required
        />

        <input
          className="input-criar-produto"
          name="quantity"
          placeholder="Quantidade em estoque"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        <select
          className="input-criar-produto"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pendente">pendente</option>
          <option value="preparando">preparando</option>
          <option value="pronto">pronto</option>
          <option value="entregue">entregue</option>
        </select>

        {form.imagem && (
          <div className="preview-container">
            <p>Pré-visualização da imagem:</p>
            <img src={form.imagem} className="preview-imagem" alt="prévia" />
          </div>
        )}

        <button type="submit" className="btn-criar-produto">
          Atualizar
        </button>
      </form>
    </div>
  );
}
