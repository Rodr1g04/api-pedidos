const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: [true, "o campo cliente é obrigatorio"],
    trim: true,
    minlength: [3, "O nome deve ter pelo menos 3 caracteres"],
    maxlength: [60, "O nome não pode ter mais de 60 caracteres"]
  },

  produto: {
    type: String,
    required: [true, "O campo produto é obrigatório"],
    trim: true
  },
    
  quantidade: {
    type: Number,
    required: [true, "Campo quantidade é obrigatório"],
    min: [1, "quantidade minima é 1"],
    validate: {
      validator: Number.isInteger,
      message: "A quantidade deve ser um numero inteiro"
    }
  },

  valorTotal: {
    type: Number,
    required: [true, "Valor total é obrigatório"],
    min: [1, "valor total deve ser maior que zero"]
  },

  status: {
    type: String,
    enum: {
      values: ["Pendente", "Enviado", "Entregue", "Cancelado"],
      message: "Status inválido. apenas: Pendente, Enviado, Entregue ou Cancelado"
    },
    default: "Pendente"
  },

  dataCriacao: {
    type: Date,
    default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
