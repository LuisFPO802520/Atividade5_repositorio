import { apiFetch } from "./api.js";

export async function processarPagamento(dadosPagamento) {
  return apiFetch("/pagamentos", {
    method: "POST",
    body: JSON.stringify(dadosPagamento),
  });
}

export async function buscarStatusPagamento(id) {
  return apiFetch(`/pagamentos/${id}`);
}
