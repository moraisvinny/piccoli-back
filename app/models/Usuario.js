const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  perfil: String,
});
/* eslint-disable func-names */
usuarioSchema.pre('save', function (next) {
  const usuario = this;
  if (!usuario.isModified('senha')) {
    next();
    return;
  }
  bcrypt.hash(usuario.senha, 5, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    usuario.senha = hash;
    next();
  });
});

const usuarioModel = mongoose.model('Usuario', usuarioSchema);
module.exports = usuarioModel;
