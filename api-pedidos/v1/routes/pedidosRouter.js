const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/', pedidoController.listarPedidos);
router.get('/:id', pedidoController.buscarPedidoPorId);

router.post('/', authMiddleware, pedidoController.criarPedido);
router.put('/:id', authMiddleware, pedidoController.atualizarPedido);
router.patch('/:id', authMiddleware, pedidoController.atualizarPedido);
router.delete('/:id', authMiddleware, pedidoController.deletarPedido);

module.exports = router;
