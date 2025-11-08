const Pedido = require('../models/Pedido');

// Criar pedido
exports.criarPedido = async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    const salvo = await novoPedido.save();
    res.status(201).json(salvo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pedido', detalhes: error.message });
  }
};

// Listar todos
exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

// Buscar por ID
exports.buscarPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

// Atualizar pedido
exports.atualizarPedido = async (req, res) => {
  try {
    const atualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!atualizado) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar pedido', detalhes: error.message });
  }
};

// Deletar pedido
exports.deletarPedido = async (req, res) => {
  try {
    const deletado = await Pedido.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar pedido', detalhes: error.message });
  }
};
