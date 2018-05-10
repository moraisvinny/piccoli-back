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

  static validaToken(req, res, next) {
    const token = (req.body && req.body.access_token)
      || (req.query && req.query.access_token)
      || req.headers['x-access-token'];
    if (!token) return res.status(400).json({ msg: 'Token não informado' });
    const decoded = jwt.verify(token, segredo);
    if (decoded.exp > Date.now()) return res.status(401).json({ msg: 'login expirado' });
    if (decoded.perfil !== 'adm') return res.status(403).json({ msg: 'nao autorizado' });
    return next();
  }
};
