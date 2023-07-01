const mongoose = require('mongoose');

const prestadorSchema = new mongoose.Schema({
  codigo_prestador: {
    type: String,
    required: true,
    unique: true,
  },
  nome_prestador: {
    type: String,
    required: true,
  },
  cpf_prestador: {
    type: String,
    required: true,
    unique: true,
  },
  categoria: {
    id_categoria: {
      type: String,
      required: true,
    },
    nome_categoria: {
      type: String,
      required: true,
    },
  },
  servico_principal: {
    id_servico: {
      type: String,
      required: true,
    },
    nome_servico: {
      type: String,
      required: true,
    },
    vlr_servico: {
      type: Number,
      required: true,
    },
    experiencia: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

module.exports = mongoose.model('Prestador', prestadorSchema);

