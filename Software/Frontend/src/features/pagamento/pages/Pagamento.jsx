import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../carrinho/contexts/cartContext";
import "../../../styles/Pagamento.css";

export default function Pagamento() {
  const { items, total, limparCarrinho } = useCart();
  const navigate = useNavigate();

  const [metodo, setMetodo] = useState("cartao");
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [popup, setPopup] = useState(false);

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === "desconto10") {
      setDesconto(total * 0.10);
    } else {
      setDesconto(0);
      alert("Cupom inválido.");
    }
  };

  const totalFinal = (total - desconto).toFixed(2);

  const finalizarCompra = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3500);
  };


  if (items.length === 0) {
    return (
      <div className="pagamento-wrap">
        <h2>Pagamento</h2>
        <p>Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="pagamento-wrap fade-in">
      {popup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>✅ Compra finalizada!</h2>
            <p>Obrigado pela preferência 💛</p>

            <button
              className="popup-ok-btn"
              onClick={() => {
                limparCarrinho();   // 🔥 limpar só aqui!
                navigate("/");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <h2>Checkout</h2>

      <div className="pagamento-grid">
        {/* FORM */}
        <form className="form-pagamento">

          <label>Nome Completo</label>
          <input type="text" required />

          <label>Email</label>
          <input type="email" required />

          <label>Endereço</label>
          <input type="text" required />

          <label>Método de Pagamento</label>

          <div className="metodos">
            {["cartao", "pix", "boleto", "dinheiro"].map((m) => (
              <button
                type="button"
                key={m}
                className={`metodo ${metodo === m ? "selected" : ""}`}
                onClick={() => setMetodo(m)}
              >
                {m === "cartao" && "Cartão"}
                {m === "pix" && "Pix"}
                {m === "boleto" && "Boleto"}
                {m === "dinheiro" && "Dinheiro Físico"}
              </button>
            ))}
          </div>

          {/* Campos condicionais */}
          {metodo === "cartao" && (
            <>
              <label>Número do Cartão</label>
              <input type="text" placeholder="0000 0000 0000 0000" />

              <div className="field-inline">
                <div>
                  <label>Validade</label>
                  <input type="text" placeholder="MM/AA" />
                </div>
                <div>
                  <label>CVV</label>
                  <input type="text" placeholder="000" />
                </div>
              </div>
            </>
          )}

          {metodo === "pix" && (
            <>
              <label>Código PIX</label>
              <input
                type="text"
                readOnly
                value="00020126580014BR.GOV.BCB.PIX0136a1b2c3d4e5f6g7h8i9j0k12345678952040000530398654041.005802BR5913BIG BARS6009SAO PAULO"
              />
              <p className="pix-info">Copie o código acima para pagamento.</p>
            </>
          )}

          {metodo === "boleto" && (
            <>
              <label>Linha Digitável do Boleto</label>
              <input
                type="text"
                readOnly
                value="34191.79001 01043.510047 91020.150008 9 12340000015000"
              />
              <p className="boleto-info">Copie o código acima para pagamento.</p>
            </>
          )}

          {metodo === "dinheiro" && (
            <>
              <label>Código do atendente</label>
              <input type="text" placeholder="Ex: 48-B" />
            </>
          )}

          <label>Cupom de desconto</label>
          <div className="field-inline">
            <input
              type="text"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
            />
            <button type="button" onClick={aplicarCupom} className="cupom-btn">
              Aplicar
            </button>
          </div>
        </form>

        {/* RESUMO */}
        <div className="resumo-pedido fade-slide-up">
          <h3>Resumo</h3>

          {items.map((item) => (
            <div className="linha" key={item.id}>
              <span>{item.nome} (x{item.quantidade})</span>
              <span>R$ {(item.valor * item.quantidade).toFixed(2)}</span>
            </div>
          ))}

          {desconto > 0 && (
            <div className="linha desconto">
              <span>Desconto:</span>
              <span>- R$ {desconto.toFixed(2)}</span>
            </div>
          )}

          <div className="total">
            Total: R$ {totalFinal}
          </div>

          <button className="pagar-btn" onClick={finalizarCompra}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
