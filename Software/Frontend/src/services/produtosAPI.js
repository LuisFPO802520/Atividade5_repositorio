import { apiFetch } from "./api.js";

export async function listarProdutos() {
  return apiFetch("/produtos");
}

export async function buscarProduto(id) {
  return apiFetch(`/produtos/${id}`);
}

export async function criarProduto(dados) {
  return apiFetch("/produtos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function atualizarProduto(id, dados) {
  return apiFetch(`/produtos/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export async function deletarProduto(id) {
  return apiFetch(`/produtos/${id}`, { method: "DELETE" });
}
