// src/features/carrinho/pages/Carrinho.jsx
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const { items, adicionarItem, removerItem, total } = useCart();

  const temItens = items.length > 0;

  return (
    <div className="pagina-carrinho">
      <h2>Carrinho de Compras</h2>
      {temItens ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.imagem} alt={item.nome} className="img-carrinho" />
                <p><strong>{item.nome}</strong></p>
                <p>
                  Quantidade: {item.quantidade}
                  <button onClick={() => adicionarItem(item)}>+</button>
                  <button onClick={() => removerItem(item.id)}>-</button>
                </p>
                <p>Subtotal: R$ {(item.valor * item.quantidade).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <Link to="/pagamento">
            <button>Ir para pagamento</button>
          </Link>
        </>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
}