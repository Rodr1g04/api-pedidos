require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');

// Conecta ao MongoDB
connectDB();

// Importa rotas
const pedidosRouter = require('./routes/pedidosRouter'); // ✅ nome atualizado

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rotas
app.use('/api/pedidos', pedidosRouter); // ✅ nome atualizado

module.exports = app;
