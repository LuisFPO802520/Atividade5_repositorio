import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function adicionarItem(produto) {
    setItems((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(id) {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, quantidade: p.quantidade - 1 }
            : p
        )
        .filter((p) => p.quantidade > 0)
    );
  }

  function limparCarrinho() {
    setItems([]);
  }

  function atualizarQuantidade(id, quantidade) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade } : p))
    );
  }

  const total = items.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, adicionarItem, removerItem, limparCarrinho, atualizarQuantidade, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
