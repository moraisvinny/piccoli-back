const Produto = require('../models/Produto');

const ProdutoService = require('../services/ProdutoService');

const { check, validationResult } = require('express-validator/check');

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

  app.get('/produtos/produto/:id', (req, res) => {
    ProdutoService
      .getProduto(req.params.id)
      .then(produto => res.json(produto))
      .catch((err) => {
        console.log(err);
        res.status(404).send('Produto nao encontrado');
      });
  });

  app.post(
    '/produtos/produto',
    ProdutoService.validaProduto(false), // express-validator
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.mapped() });
        return;
      }
      ProdutoService.incluiProduto(new Produto(
        req.body.titulo,
        req.body.descricao,
        req.body.link,
        req.body.status,
        req.body.imagens,
      )).then(id => res.status(201).json({
        msg: 'produto inserido com sucesso',
        links: [
          {
            href: `/produtos/produto/${id}`,
            rel: 'obter produto',
            method: 'GET',
          },
        ],
      }));
    },
  );
};
