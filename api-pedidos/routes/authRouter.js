const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '12345') {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: 60 } 
    );

    return res.json({ message: 'Login bem-sucedido', token });
  }

  return res.status(401).json({ error: 'Credenciais inválidas' });
});

module.exports = router;
