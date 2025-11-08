/*:

🧩 1. Se o “cadastro de cliente” é diferente do “cadastro de login”

➡️ Mantenha a pasta cadastro-cliente/.
Ela serve para cadastrar clientes no sistema, não usuários que fazem login.

Por exemplo:

Um administrador logado pode criar, listar ou editar clientes.

O usuário cliente cria apenas seu próprio login (em /auth/register).

✅ Nesse caso:

Deixe a pasta cadastro-cliente/ exatamente como está.

O arquivo clienteService.js continua útil, porque ele faz chamadas à rota /clientes do seu backend. */ 