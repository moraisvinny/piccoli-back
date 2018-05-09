const Usuario = require('../models/Usuario');

function geraUsuario(body) {
  return {
    nome: body.nome,
    senha: body.senha,
    email: body.email,
    perfil: body.perfil,
  };
}

module.exports = class UsuarioService {
  static incluiUsuario(body) {
    return new Usuario(geraUsuario(body)).save();
  }

  static login() {

  }

  static isUsuarioAdm() {

  }
};
