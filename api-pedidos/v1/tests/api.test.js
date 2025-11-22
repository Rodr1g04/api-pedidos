const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Pedido = require("../models/Pedido");

let token = "";

beforeAll(async () => {

    await Pedido.deleteMany({});
});


describe("TESTES DE AUTENTICAÇÃO (JWT)", () => {
    test("Login deve retornar token válido", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({ username: "admin", password: "12345" });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });

    test("Login com credenciais erradas deve retornar 401", async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({ username: "admin", password: "errada" });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Credenciais inválidas");
    });
});



describe("TESTES CRUD DE PEDIDOS", () => {
    test("Criar pedido com token válido", async () => {
        const res = await request(app)
            .post("/api/v1/pedidos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                cliente: "Rodrigo",
                produto: "Teclado Gamer",
                quantidade: 1,
                valorTotal: 300,
                status: "Pendente"
            });

        expect(res.status).toBe(201);
        expect(res.body._id).toBeDefined();
    });

    test("Criar pedido sem token deve retornar 403", async () => {
        const res = await request(app).post("/api/v1/pedidos").send({
            cliente: "Teste",
            produto: "Mouse",
            quantidade: 2,
            valorTotal: 150
        });

        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Token não fornecido");
    });



    test("Listar pedidos deve retornar 200 e um array", async () => {
        const res = await request(app).get("/api/v1/pedidos");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });



    test("Buscar pedido por ID inválido deve retornar 400", async () => {
        const res = await request(app).get("/api/v1/pedidos/123");
        expect(res.status).toBe(400);
    });



    test("Atualizar pedido com token válido", async () => {
        const novoPedido = await Pedido.create({
            cliente: "Rodrigo",
            produto: "Monitor",
            quantidade: 1,
            valorTotal: 900
        });

        const res = await request(app)
            .put(`/api/v1/pedidos/${novoPedido._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ status: "Enviado" });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("Enviado");
    });


    test("Deletar pedido com token válido", async () => {
        const pedido = await Pedido.create({
            cliente: "Teste",
            produto: "Headset",
            quantidade: 1,
            valorTotal: 200
        });

        const res = await request(app)
            .delete(`/api/v1/pedidos/${pedido._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Pedido deletado com sucesso");
    });
});



describe(" TESTES DE VALIDAÇÃO DO MONGOOSE", () => {
    test("Erro ao criar pedido com cliente muito curto", async () => {
        const res = await request(app)
            .post("/api/v1/pedidos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                cliente: "Ro",
                produto: "Teclado",
                quantidade: 1,
                valorTotal: 200
            });

        expect(res.status).toBe(400);
        expect(res.body.detalhes).toContain("O nome deve ter pelo menos 3 caracteres");
    });

    test("Erro ao criar pedido com quantidade inválida", async () => {
        const res = await request(app)
            .post("/api/v1/pedidos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                cliente: "Rodrigo",
                produto: "Mouse",
                quantidade: 0,
                valorTotal: 150
            });

        expect(res.status).toBe(400);
        expect(res.body.detalhes).toContain("quantidade minima é 1");
    });
});


afterAll(async () => {
    await mongoose.connection.close();
});
