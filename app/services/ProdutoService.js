const { check } = require('express-validator/check');
const ProdutoModel = require('../models/Produto');

function geraProduto(body) {
  return {
    titulo: body.titulo,
    descricao: body.descricao,
    status: body.status,
    link: body.link,
    imagens: body.imagens,
  };
}
module.exports = class ProdutoService {
  static listarProdutos() {
    return ProdutoModel.find();
  }

  static listarProdutosAtivos() {
    return ProdutoModel.find({ status: 'ativo' });
  }
  static incluiProduto(body) {
    return new ProdutoModel(geraProduto(body)).save();
  }

  static getProduto(id) {
    return ProdutoModel.findById(id);
  }
  /* eslint-disable  no-param-reassign */
  static atualizaProduto(id, body) {
    return ProdutoModel
      .findById(id)
      .then((prodBanco) => {
        prodBanco.titulo = body.titulo;
        prodBanco.descricao = body.descricao;
        prodBanco.status = body.status;
        prodBanco.link = body.link;
        prodBanco.imagens = body.imagens;
        return prodBanco.save();
      });
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
