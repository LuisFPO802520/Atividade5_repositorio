import { useState, useEffect } from "react";
import { useCart } from "../../carrinho/contexts/cartContext";
import { listarProdutos } from "../../../services/produtosAPI";
import { useNavigate } from "react-router-dom";
import "../../../styles/Produtos.css";
import "../../../styles/Home.css";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [addedId, setAddedId] = useState(null); 
  const { adicionarItem } = useCart();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    listarProdutos()
      .then((res) => {
        if (!res || res.erro) {
          throw new Error(res?.erro || "Erro desconhecido");
        }
        setProdutos(res);
      })
      .catch((err) => {
        console.error(err);
        alert(`Erro ao listar produtos: ${err.message}`);
      });
  }, []);

  const comprar = (produto) => {
    adicionarItem(produto);     
    setAddedId(produto.id);     
    setTimeout(() => {
      setAddedId(null);
      navigate("/carrinho");    
    }, 700); 
  };

  return (
    <>
      {/* HERO MINIMALISTA */}
      <section className="hero">
        <img src="/logo.png" alt="Big Bar's" className="img-logo" />
        <h1>Bem-vindo(a) à Big Bar's</h1>
        <p>Comidas selecionadas com qualidade e ótimo preço.</p>
        <a href="#produtos">
          <button
            className={`hero-btn ${clicked ? "clicked" : ""}`}
            onClick={() => {
              setClicked(true);
              setTimeout(() => setClicked(false), 300); 
              document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver Comidas
          </button>
        </a>
      </section>

      {/* LISTA DE PRODUTOS */}
      <div id="produtos" className="produtos">
        {produtos.map((produto) => (
          <div
            className={`produto ${addedId === produto.id ? "added" : ""}`}
            key={produto.id}
          >
            {produto.imagem && <img src={produto.imagem} alt={produto.nome} />}
            <h3>{produto.nome}</h3>
            <p>R$ {Number(produto.valor ?? 0).toFixed(2)}</p>
            <p>Quantidade: {produto.quantity ?? 0}</p>
            <p>Status: {produto.status ?? "pendente"}</p>

            <button onClick={() => comprar(produto)}>
              Comprar
            </button>

            {addedId === produto.id && (
              <span className="add-feedback">✔ Adicionado!</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
