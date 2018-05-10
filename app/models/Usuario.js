const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
  },
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

usuarioSchema.methods.validaSenha = function (senhaDigitada) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(senhaDigitada, this.senha, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

usuarioSchema.statics.geraUsuario = function (body) {
  return {
    senha: body.senha,
    email: body.email,
    perfil: body.perfil,
  };
};
const usuarioModel = mongoose.model('Usuario', usuarioSchema);
module.exports = usuarioModel;
