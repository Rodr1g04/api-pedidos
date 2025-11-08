require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');
const authRouter = require('./routes/authRouter');
const pedidosRouter = require('./routes/pedidosRouter');

connectDB();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/pedidos', pedidosRouter);

module.exports = app;
