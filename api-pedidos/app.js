require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./v1/config/database');


const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

connectDB();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerPath = path.join(__dirname, 'v1', 'docs', 'swagger.yaml');
const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const pedidosRouter = require('./v1/routes/pedidosRouter');
const authRouter = require('./v1/routes/authRouter');

app.use('/api/v1/pedidos', pedidosRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
