import { apiFetch } from "./api.js";

/**
 * Gera uma nota fiscal (PDF ou JSON) a partir do pedido/pagamento
 */
export async function gerarNota(pedidoId) {
  return apiFetch("/notas", {
    method: "POST",
    body: JSON.stringify({ pedidoId }),
  });
}

/**
 * Lista notas emitidas (opcional)
 */
export async function listarNotas() {
  return apiFetch("/notas");
}
