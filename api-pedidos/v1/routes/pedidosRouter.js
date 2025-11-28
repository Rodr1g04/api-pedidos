const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { verificarToken } = require('../middleware/auth');

router.get('/', pedidoController.listarPedidos);
router.get('/:id', pedidoController.buscarPedidoPorId);

router.post('/', verificarToken, pedidoController.criarPedido);
router.put('/:id', verificarToken, pedidoController.atualizarPedido);
router.patch('/:id', verificarToken, pedidoController.atualizarPedido);
router.delete('/:id', verificarToken, pedidoController.deletarPedido);

module.exports = router;

