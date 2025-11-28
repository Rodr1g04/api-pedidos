const { cifrarSenha, compararSenha, gerarToken } = require('../middleware/auth');
const Usuario = require('../models/usuario');

async function criar(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(422).json({ msg: "Email e senha são obrigatórios" });
        }

        const existe = await Usuario.findOne({ email });
        if (existe) {
            return res.status(409).json({ msg: "Email já cadastrado" });
        }

        const senhaCifrada = cifrarSenha(senha);
        const novoUsuario = await Usuario.create({ email, senha: senhaCifrada });

        return res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
    } catch (err) {
        return res.status(500).json({ msg: "Erro ao criar usuário" });
    }
}

async function entrar(req, res) {
    try {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const encontrado = await Usuario.findOne({ email: usuario });
        if (!encontrado) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const senhasIguais = compararSenha(senha, encontrado.senha);
        if (!senhasIguais) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const token = gerarToken({ email: encontrado.email });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ msg: "Erro interno" });
    }
}

async function renovar(req, res) {
    try {
        const token = gerarToken({ email: req.usuario });
        return res.status(200).json({ token });
    } catch {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

async function remover(req, res) {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } catch {
        return res.status(500).json({ msg: "Erro ao remover usuário" });
    }
}

module.exports = { criar, entrar, renovar, remover };
