const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const segredo = 'lulalivre';

module.exports = class UsuarioService {
  static incluiUsuario(body) {
    return new Usuario(Usuario.geraUsuario(body)).save();
  }

  static login(id, body) {
    return new Promise((resolve, reject) => {
      Usuario
        .findOne({ email: body.email })
        .then((usuario) => {
          usuario
            .validaSenha(body.senha)
            .then((isSenhaValida) => {
              if (!isSenhaValida) {
                reject(new Error('Senha Invalida'));
                return;
              }
              const token = jwt.sign({ perfil: usuario.perfil }, segredo, { expiresIn: '12h' });
              resolve(token);
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    });
  }

  static isUsuarioAdm() {

  }
};
