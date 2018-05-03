const { check } = require('express-validator/check');
const ProdutoModel = require('../models/Produto');
const cloudinary = require('cloudinary');

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
  static incluiProduto(req) {
    return new Promise((resolve, reject) => {
      req.files.imagem.mv('./imagem', (errMv) => {
        if (errMv) {
          reject(errMv);
          return;
        }
        cloudinary.uploader.upload('./imagem', (result) => {
          if (!result.url) {
            reject(new Error('erro no upload da imagem'));
            return;
          }
          req.body.imagens = [];
          req.body.imagens.push(result.url);
          new ProdutoModel(geraProduto(req.body))
            .save()
            .then((resultSave) => {
              resolve(resultSave);
            });
        });
      });
    });
  }

  static removeProduto(id) {
    return ProdutoModel
      .findByIdAndRemove(id);
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
