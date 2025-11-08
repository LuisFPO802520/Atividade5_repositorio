import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../../../styles/OrganizarProdutos.css"; // ajuste o caminho se necessário

export default function CriarProduto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", valor: "", imagem: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.valor || !form.imagem) {
      alert("Preencha todos os campos.");
      return;
    }

    const valorNumerico = parseFloat(form.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("O valor precisa ser um número válido e maior que zero.");
      return;
    }

    const produtoFormatado = {
      nome: form.nome,
      valor: valorNumerico,
      imagem: form.imagem,
      quantity: 0,        // campo do Prisma/DB se necessário
      status: "pendente",
      // userId será definido no backend com base no usuário logado (admin)
    };

    try {
      const res = await fetch("http://localhost:3000/produtos/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoFormatado),
      });

      if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        throw new Error(erro.erro || "Erro desconhecido");
      }

      alert("Produto criado com sucesso!");
      setForm({ nome: "", valor: "", imagem: "" });
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      alert(`Erro ao criar produto: ${err.message}`);
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
          placeholder="URL da imagem"
          value={form.imagem}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="btn-criar-produto">
          Criar
        </button>
      </form>
    </div>
  );
}
