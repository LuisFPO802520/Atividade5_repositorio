import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "../../../styles/OrganizarProdutos.css"; // ajuste o caminho se necessário

export default function AtualizarProduto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", nome: "", valor: "", imagem: "" });
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/produtos/ler")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => setProdutos(data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idNum = Number(form.id);
    if (!produtos.find((p) => p.id === idNum)) {
      alert("Produto não encontrado");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/produtos/atualizar/${form.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          valor: parseFloat(form.valor),
          imagem: form.imagem,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar produto");
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
        <input
          className="input-criar-produto"
          name="id"
          placeholder="ID do Produto"
          value={form.id}
          onChange={handleChange}
          required
        />
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
          Atualizar
        </button>
      </form>
    </div>
  );
}
