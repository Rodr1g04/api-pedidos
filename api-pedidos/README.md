🧾 README.md — API RESTful de Pedidos com Autenticação JWT
# 🛍️ API RESTful de Pedidos (Express + MongoDB + JWT)

Este projeto foi desenvolvido como parte de um trabalho prático para a disciplina de **Desenvolvimento de APIs RESTful**.  
O objetivo é criar uma API completa utilizando o framework **Express.js**, integrada ao **MongoDB Atlas**,  
com rotas **CRUD**, estrutura **MVC** e **autenticação JWT** para proteger as rotas de escrita.

---

## 🚀 Tecnologias utilizadas

- **Node.js** — Ambiente de execução JavaScript no servidor  
- **Express.js** — Framework para criação da API REST  
- **MongoDB Atlas** — Banco de dados não relacional em nuvem  
- **Mongoose** — ODM para integração com o MongoDB  
- **JWT (jsonwebtoken)** — Autenticação segura com tokens  
- **dotenv** — Gerenciamento de variáveis de ambiente  
- **morgan** — Logger de requisições HTTP  
- **cors** — Liberação de acesso entre origens (CORS)

---

## 📁 Estrutura do projeto

api-pedidos/
├─ app.js
├─ .env
├─ package.json
├─ config/
│ └─ database.js
├─ controllers/
│ └─ pedidoController.js
├─ middleware/
│ └─ authMiddleware.js
├─ models/
│ └─ Pedido.js
├─ routes/
│ ├─ authRouter.js
│ └─ pedidosRouter.js
└─ public/


---

## ⚙️ Configuração do ambiente

### 1️⃣ Instalar dependências
```bash
npm install

2️⃣ Criar arquivo .env

Crie o arquivo .env na raiz do projeto com as seguintes variáveis:

MONGODB_USER=seuUsuario
MONGODB_PASS=suaSenha
MONGODB_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DBNAME=pedidosdb
JWT_SECRET=flamengo12

🧠 Conexão com o banco (MongoDB Atlas)

O arquivo config/database.js realiza a conexão com o MongoDB usando o Mongoose:

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;

Quando o servidor é iniciado, aparece no console:
✅ MongoDB Atlas conectado com sucesso!

🧩 Entidade: Pedido

O modelo Pedido foi definido em models/Pedido.js com os seguintes campos obrigatórios:
cliente: { type: String, required: true },
produto: { type: String, required: true },
quantidade: { type: Number, required: true },
valorTotal: { type: Number, required: true },
status: { type: String, enum: ['Pendente', 'Enviado', 'Entregue', 'Cancelado'], default: 'Pendente' },
dataCriacao: { type: Date, default: Date.now }

🔄 Rotas CRUD (Pedidos)

As rotas foram criadas em routes/pedidosRouter.js e seguem a convenção REST:

Método	Rota	Descrição	Protegida (JWT)
GET	/api/pedidos	Lista todos os pedidos	❌
GET	/api/pedidos/:id	Busca um pedido por ID	❌
POST	/api/pedidos	Cria um novo pedido	✅
PUT	/api/pedidos/:id	Atualiza um pedido completo	✅
PATCH	/api/pedidos/:id	Atualiza parcialmente um pedido	✅
DELETE	/api/pedidos/:id	Deleta um pedido	✅

🔐 Autenticação JWT

A autenticação foi implementada para proteger as rotas de escrita (POST, PUT, PATCH e DELETE).

Rota de login:

POST /api/auth/login

Exemplo de requisição:
{
  "username": "admin",
  "password": "12345"
}

Resposta:
{
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
Use o token retornado nas rotas protegidas através do header:
Authorization: Bearer SEU_TOKEN_AQUI

🧱 Exemplo de requisição protegida

POST → http://localhost:3000/api/pedidos

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Body:
{
  "cliente": "Rodrigo Araújo",
  "produto": "Teclado Mecânico RGB",
  "quantidade": 1,
  "valorTotal": 200
}

✅ Resposta:

{
  "_id": "690f0db4a7936c842fcef6bb",
  "cliente": "Rodrigo Araújo",
  "produto": "Teclado Mecânico RGB",
  "quantidade": 1,
  "valorTotal": 200,
  "status": "Pendente",
  "dataCriacao": "2025-11-08T09:30:28.098Z",
  "__v": 0
}

🧠 Estrutura MVC

O projeto segue o padrão Model–View–Controller:

Camada	Função	Local
Model	Define a estrutura dos dados e integra com o banco	models/Pedido.js
Controller	Contém a lógica de negócio (CRUD)	controllers/pedidoController.js
Router	Define os endpoints e direciona para o controller	routes/pedidosRouter.js
Middleware	Verifica o token JWT	middleware/authMiddleware.js
Config	Responsável pela conexão com o MongoDB	config/database.js
🧪 Testes de rotas

As rotas foram testadas utilizando o Postman com o seguinte fluxo:

POST /api/auth/login → gera token JWT

POST /api/pedidos → cria um pedido (enviando o token)

GET /api/pedidos → lista pedidos

PUT /api/pedidos/:id → atualiza pedido

DELETE /api/pedidos/:id → remove pedido

🧰 Scripts úteis
Rodar o servidor

node app.js

ou, se estiver usando nodemon:

npm run dev

✅ Requisitos atendidos
Requisito	Descrição	Status
(a)	API RESTful com Express e entidade escolhida	✅
(b)	Rotas CRUD com respostas HTTP adequadas	✅
(c)	Separação em controllers e models	✅
(e)	Autenticação JWT para proteger rotas de escrita	✅
👨‍💻 Autor

Rodrigo Araújo
Desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas (IESB)

Projeto criado com o objetivo de aplicar os conceitos de APIs RESTful, Express.js, MongoDB e autenticação JWT.

