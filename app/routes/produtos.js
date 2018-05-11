const ProdutoService = require('../services/ProdutoService');
const UsuarioService = require('../services/UsuarioService');
const { validationResult } = require('express-validator/check');

module.exports = (app) => {
  app.get(
    '/produtos',
    (req, res, next) => {
      UsuarioService.validaToken(req, res, next);
    }, (req, res) => {
      ProdutoService
        .listarProdutos()
        .then((produtos) => {
          res.json(produtos);
        });
    },
  );

  app.get('/produtos/ativos', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ProdutoService
      .listarProdutosAtivos()
      .then((produtosAtivos) => {
        res.json(produtosAtivos);
      });
  });

  app.delete(
    '/produtos/produto/:id',
    (req, res, next) => {
      UsuarioService.validaToken(req, res, next);
    },
    (req, res) => {
      const { id } = req.params;
      ProdutoService
        .removeProduto(id)
        .then(() => res.json({ msg: `produto com id ${id} removid com sucesso` }))
        .catch(err => res.status(500).json({ msg: 'Ocorreu um erro ao excluir', error: err }));
    },
  );

  app.get('/produtos/produto/:id', (req, res) => {
    ProdutoService
      .getProduto(req.params.id)
      .then((produto) => {
        if (!produto) {
          res.status(404).json({ msg: 'Produto nao encontrado' });
          return;
        }
        res.json(produto);
      })
      .catch((err) => {
        res.status(500).json({ msg: 'Ocorreu um erro', error: err.message });
      });
  });

  app.put(
    '/produtos/produto/:id',
    (req, res, next) => {
      UsuarioService.validaToken(req, res, next);
    },
    (req, res) => {
      const { id } = req.params;
      ProdutoService
        .atualizaProduto(id, req)
        .then(() => res.json({ msg: 'produto alterado com sucesso' }))
        .catch(err => res.status(500).json({ msg: 'Ocorreu um erro', error: err.message }));
    },
  );

  app.post(
    '/produtos/produto',
    (req, res, next) => {
      UsuarioService.validaToken(req, res, next);
      ProdutoService.validaProduto(); // express-validator
    },
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.mapped() });
        return;
      }
      ProdutoService
        .incluiProduto(req)
        .then(id => res.status(201).json({
          msg: 'produto inserido com sucesso',
          id,
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
