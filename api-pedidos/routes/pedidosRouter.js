const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Rotas CRUD
router.get('/', pedidoController.listarPedidos);
router.get('/:id', pedidoController.buscarPedidoPorId);
router.post('/', pedidoController.criarPedido);
router.put('/:id', pedidoController.atualizarPedido);
router.patch('/:id', pedidoController.atualizarPedido);
router.delete('/:id', pedidoController.deletarPedido);

module.exports = router;
