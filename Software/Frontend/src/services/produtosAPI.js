import api from "./api.js";

export async function listarProdutos() {
  return api.get("/produtos");
}

export async function buscarProduto(id) {
  return api.get(`/produtos/${id}`);
}

export async function criarProduto(dados) {
  return api.post("/produtos", dados);
}

export async function atualizarProduto(id, dados) {
  return api.put(`/produtos/${id}`, dados);
}

export async function deletarProduto(id) {
  return api.delete(`/produtos/${id}`);
}
