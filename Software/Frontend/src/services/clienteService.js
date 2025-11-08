import { apiFetch } from "./api.js";

export async function cadastrarCliente(dados) {
  return apiFetch("/clientes", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function listarClientes() {
  return apiFetch("/clientes");
}

export async function buscarCliente(id) {
  return apiFetch(`/clientes/${id}`);
}
