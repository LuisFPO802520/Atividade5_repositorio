import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./features/carrinho/contexts/cartContext"; // contexto global do carrinho

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);


/*retorno automático do usuário recém-criado (para já logar),

mensagens de erro do backend (por exemplo “email já cadastrado”),

ou integração com JWT para autenticação completa.

fazer o login diferenciar admin de cliente (ex: redirecionar para painel diferente)*/ 
 