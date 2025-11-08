const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valorTotal: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pendente', 'Enviado', 'Entregue', 'Cancelado'],
    default: 'Pendente'
  },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
