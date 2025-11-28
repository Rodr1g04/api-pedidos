const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    enum: ["Pendente", "Enviado", "Entregue", "Cancelado"],
    default: "Pendente"
  },

  dataCriacao: {
    type: Date,
    default: Date.now
  }
});


pedidoSchema.pre('save', function (next) {
  if (!this.isModified('cliente')) return next();

  const salt = bcrypt.genSaltSync(10);
  this.cliente = bcrypt.hashSync(this.cliente, salt);

  next();
});

module.exports = mongoose.model('Pedido', pedidoSchema);
