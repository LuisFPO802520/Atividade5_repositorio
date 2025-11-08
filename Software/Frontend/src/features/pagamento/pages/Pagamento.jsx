// src/features/pagamento/pages/Pagamento.jsx
import { useCart } from "../../carrinho/contexts/cartContext";

export default function Pagamento() {
  const { items, total } = useCart();

  return (
    <div className="pagina-pagamento">
      <h2>Pagamento</h2>
      {items.length > 0 ? (
        <>
          <p>Você está comprando {items.length} produto(s)</p>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button onClick={() => alert("Processando pagamento...")}>
            Finalizar Compra
          </button>
        </>
      ) : (
        <p>Adicione produtos ao carrinho antes de pagar.</p>
      )}
    </div>
  );
}