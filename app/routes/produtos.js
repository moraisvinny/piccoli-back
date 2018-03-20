const ProdutoService = require('../services/ProdutoService');

module.exports = (app) => {
  app.get('/produtos', (req, res) => {
    ProdutoService
      .listarProdutos()
      .then((produtos) => {
        res.json(produtos);
      });
  });

  app.get('/produtos/ativos', (req, res) => {
    ProdutoService
      .listarProdutosAtivos()
      .then((produtosAtivos) => {
        res.json(produtosAtivos);
      });
  });
};
