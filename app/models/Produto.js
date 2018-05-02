const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  status: String,
  link: String,
  imagens: [String],

});

const produtoModel = mongoose.model('Produto', produtoSchema);

module.exports = produtoModel;
