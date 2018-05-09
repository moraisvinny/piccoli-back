const usuarioService = require('../services/UsuarioService');

module.exports = (app) => {
  app.post('/usuario', (req, res) => {
    usuarioService
      .incluiUsuario(req.body)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
};
