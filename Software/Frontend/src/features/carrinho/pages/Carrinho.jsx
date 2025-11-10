import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";
import "../../../styles/Carrinho.css";

export default function Carrinho() {
  const { items, adicionarItem, removerItem, total, limparCarrinho } = useCart();

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
                  Quantidade: {item.quantidade} <br />
                  <button className="quantidade-btn" onClick={() => adicionarItem(item)}>+</button>
                  <button className="quantidade-btn" onClick={() => removerItem(item.id)}>-</button>
                </p>
                <p>Subtotal: R$ {(item.valor * item.quantidade).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <h3>Total: R$ {total.toFixed(2)}</h3>

          <div className="carrinho-actions">
            <button className="btn-padrao" onClick={limparCarrinho}>Limpar Carrinho</button>

            <Link to="/pagamento" className="link-pagamento">
              <button className="btn-padrao btn-pagamento">
                Ir para pagamento
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
}