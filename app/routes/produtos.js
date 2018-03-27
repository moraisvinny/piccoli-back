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

  app.post('/produto', [
    check('titulo', 'Titulo deve possuir no minimo 3 caracteres')
      .isLength({ min: 3 }),
    check('descricao', 'Descricao deve possuir no minimo 10 caracteres')
      .isLength({ min: 10 }),
    check('status', 'Status invalido')
      .custom(value => new Promise((resolve, reject) => {
        if (value !== 'ativo' && value !== 'edicao') {
          reject();
        }
        resolve();
      })),
    check('link', 'Link nao eh uma URL valida')
      .isURL(),
    check('imagens', 'E necessario informar ao menos uma imagem')
      .custom(value => new Promise((resolve, reject) => {
        if (value.length < 1 || typeof value !== 'object') {
          reject();
        }
        resolve();
      })),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return res.send('OK');
  });
};
