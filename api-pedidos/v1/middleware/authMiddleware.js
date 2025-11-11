const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header existe e começa com "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // pega só o token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adiciona o usuário no req
    next(); // segue pra rota
  } catch (error) {
    res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
