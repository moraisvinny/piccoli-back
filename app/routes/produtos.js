const ProdutoService = require('../services/ProdutoService');

module.exports = (app) => {
  app.get('/produtos', (req, res) => {
    res.send(ProdutoService.obterProdutos());
  });
};
