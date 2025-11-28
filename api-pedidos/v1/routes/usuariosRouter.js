const express = require('express');
const router = express.Router();
const { criar, entrar, renovar, remover } = require('../controllers/usuarioController');
const { verificarToken } = require('../middleware/auth');

router.post('/', criar);                    // Criar usuário
router.post('/login', entrar);              // Login real
router.post('/renovar', verificarToken, renovar); 
router.delete('/:id', verificarToken, remover);

module.exports = router;
