🧾 README.md — API RESTful de Pedidos (Express + MongoDB + JWT + Swagger)
🛍️ API RESTful de Pedidos — v1

API desenvolvida como trabalho prático da disciplina de Desenvolvimento de APIs RESTful.
O objetivo é construir uma API completa usando Node.js, Express, MongoDB (Mongoose), autenticação JWT, validações, testes automatizados e documentação com Swagger — seguindo o padrão REST + MVC.

🚀 Tecnologias utilizadas

Node.js – Ambiente de execução
Express.js – Framework para criação da API
MongoDB Atlas – Banco de dados em nuvem
Mongoose – Modelagem e validação dos dados
JWT (jsonwebtoken) – Autenticação segura
dotenv – Variáveis de ambiente
morgan – Log de requisições
cors – Controle de acesso
Jest + Supertest – Testes automatizados
Swagger UI + OpenAPI 3.1 – Documentação oficial da API

📁 Estrutura do Projeto (versão final)
api-pedidos/
├─ app.js
├─ swagger.yaml
├─ .env
├─ package.json
│
├─ v1/
│  ├─ bin/
│  ├─ config/
│  │   └─ database.js
│  ├─ controllers/
│  │   └─ pedidoController.js
│  ├─ middleware/
│  │   └─ authMiddleware.js
│  ├─ models/
│  │   └─ Pedido.js
│  ├─ routes/
│  │   ├─ pedidosRouter.js
│  │   └─ authRouter.js
│  ├─ tests/
│      └─ api.test.js
│
└─ README.md


📌 Pontos importantes:
✔️ Separação MVC
✔️ Versão da API: /api/v1
✔️ Swagger integrado em /api-docs

⚙️ Configuração do Ambiente
1️⃣ Instalar dependências
npm install

2️⃣ Criar arquivo .env

Crie na raiz:

MONGODB_USER=seuUsuario
MONGODB_PASS=suaSenha
MONGODB_HOST=cluster0.xxxxx.mongodb.net
MONGODB_DBNAME=pedidosdb
JWT_SECRET=sua_chave_secreta

🧠 Conexão com o Banco (MongoDB Atlas)

Arquivo: v1/config/database.js
Ao iniciar sua API, deve aparecer:

✅ MongoDB Atlas conectado com sucesso!
📦 Modelo (Model) — Pedido
Arquivo: v1/models/Pedido.js

Validações aplicadas com Mongoose:

cliente: { type: String, required: true, minlength: 3 },
produto: { type: String, required: true },
quantidade: { type: Number, required: true, min: 1 },
valorTotal: { type: Number, required: true, min: 1 },
status: { type: String, enum: ['Pendente', 'Enviado', 'Entregue', 'Cancelado'], default: 'Pendente' },
dataCriacao: { type: Date, default: Date.now }


✔️ Tipos
✔️ Obrigatoriedade
✔️ Mínimo/máximo
✔️ Enums
✔️ Mensagens personalizadas

🔄 Rotas CRUD (Pedidos)
Método	Rota	Função	JWT
GET	/api/v1/pedidos	Lista pedidos	❌
GET	/api/v1/pedidos/:id	Busca por ID	❌
POST	/api/v1/pedidos	Cria pedido	✔️
PUT	/api/v1/pedidos/:id	Atualiza pedido	✔️
DELETE	/api/v1/pedidos/:id	Remove pedido	✔️
🔐 Autenticação JWT
Login
POST /api/v1/auth/login

Exemplo:
{
  "username": "admin",
  "password": "12345"
}

Resposta:
{
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Enviar token no header:
Authorization: Bearer SEU_TOKEN


Middleware em:
v1/middleware/authMiddleware.js

🧱 Exemplo de requisição protegida
POST /api/v1/pedidos

Headers:

Authorization: Bearer SEU_TOKEN
Content-Type: application/json


Body:

{
  "cliente": "Rodrigo Araújo",
  "produto": "Teclado Mecânico RGB",
  "quantidade": 1,
  "valorTotal": 200
}


Resposta:

{
  "_id": "690f0db4a7936c842fcef6bb",
  "cliente": "Rodrigo Araújo",
  "produto": "Teclado Mecânico RGB",
  "quantidade": 1,
  "valorTotal": 200,
  "status": "Pendente",
  "dataCriacao": "2025-11-08T09:30:28.098Z"
}

📐 Arquitetura — MVC
Camada	Função	Local
Model	Estrutura dos dados	/models/Pedido.js
Controller	Lógica de negócio (CRUD)	/controllers/pedidoController.js
Router	Define rotas REST	/routes/pedidosRouter.js
Middleware	JWT	/middleware/authMiddleware.js
Config	Conexão com DB	/config/database.js
🧪 Testes Automatizados (Jest + Supertest)

Rodar os testes:

npm test


Cobertura de testes:

✔️ Login
✔️ Pedidos CRUD
✔️ Validadores Mongoose
✔️ Status HTTP corretos
✔️ JWT funcionando

📄 Documentação Oficial – Swagger

Acesse:

👉 http://localhost:3000/api-docs

Gerado a partir de:

swagger.yaml


Documentação inclui:

✔️ Todos os endpoints
✔️ Exemplos de requisições
✔️ Respostas com códigos HTTP
✔️ Schemas
✔️ JWT Bearer integrado
✔️ Versionamento da API

🧰 Scripts úteis
Rodar em desenvolvimento:
npm run dev

Rodar em produção:
npm start

✅ Checklist de Requisitos Atendidos
Requisito	Descrição	Status
(a)	API RESTful completa com Express	✔️
(b)	CRUD com respostas HTTP adequadas	✔️
(c)	Separação em Controllers e Models	✔️
(e)	Autenticação JWT	✔️
(f)	Validações de entrada e regras	✔️
(g)	Boas práticas REST + versionamento	✔️
(h)	Testes unitários	✔️
(i)	Documentação Swagger	✔️
(k)	README completo	✔️
👨‍💻 Autor

Rodrigo Araújo
Estudante de Análise e Desenvolvimento de Sistemas (IESB)
Projeto desenvolvido com foco em APIs RESTful, boas práticas e segurança.