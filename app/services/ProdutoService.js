const ProdutoDAO = require('../db/ProdutoDAO');
const clientFactory = require('../db/connectionFactory');
const { check } = require('express-validator/check');

module.exports = class ProdutoService {
  static listarProdutos() {
    return clientFactory()
      .then(client => new ProdutoDAO(client).listarProdutos());
  }

  static listarProdutosAtivos() {
    return clientFactory()
      .then(client => new ProdutoDAO(client).listarProdutosAtivos());
  }

  static incluiProduto(produto) {
    return clientFactory()
      .then(client => new ProdutoDAO(client).incluiProduto(produto));
  }

  static getProduto(id) {
    return clientFactory()
      .then(client => new ProdutoDAO(client).getProduto(id));
  }

  static atualizaProduto(produto) {
    return clientFactory()
      .then(client => new ProdutoDAO(client).atualizaProduto(produto));
  }

  static validaProduto() {
    const validacoes = [
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
      // check('imagens', 'E necessario informar ao menos uma imagem')
      //   .custom(value => new Promise((resolve, reject) => {
      //     if (value.length < 1 || typeof value !== 'object') {
      //       reject();
      //     }
      //     resolve();
      //   })),
    ];
    return validacoes;
  }
};
