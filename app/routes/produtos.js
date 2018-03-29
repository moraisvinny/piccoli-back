const ProdutoService = require('../services/ProdutoService');

const { validationResult } = require('express-validator/check');

module.exports = (app) => {
  app.get('/produtos', (req, res) => {
    ProdutoService
      .listarProdutos()
      .then((produtos) => {
        res.json(produtos);
      });
  });

  app.get('/produtos/ativos', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ProdutoService
      .listarProdutosAtivos()
      .then((produtosAtivos) => {
        res.json(produtosAtivos);
      });
  });

  app.post(
    '/produto',
    ProdutoService.validaProduto(false),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      return res.send('OK');
    },
  );
};
