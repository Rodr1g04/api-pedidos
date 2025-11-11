require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./v1/config/database'); 

connectDB();

const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pedidosRouter = require('./v1/routes/pedidosRouter');
const authRouter = require('./v1/routes/authRouter'); 


app.use('/api/v1/pedidos', pedidosRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
