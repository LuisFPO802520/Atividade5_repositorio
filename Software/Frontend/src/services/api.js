// src/services/api.js

// ✅ Usa import.meta.env em vez de process.env
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * apiFetch - wrapper sobre fetch:
 * - prefixa BASE_URL
 * - faz tratamento de JSON e erros
 */
export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const opts = { headers: {}, ...options };

  if (opts.body && typeof opts.body === "object") {
    opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/json";
    if (opts.headers["Content-Type"].includes("application/json")) {
      opts.body = JSON.stringify(opts.body);
    }
  }

  const res = await fetch(url, opts);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

// atalhos
const api = {
  get: (p) => apiFetch(p, { method: "GET" }),
  post: (p, body) => apiFetch(p, { method: "POST", body }),
  put: (p, body) => apiFetch(p, { method: "PUT", body }),
  delete: (p) => apiFetch(p, { method: "DELETE" }),
};

export default api;
