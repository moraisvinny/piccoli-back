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

function upload(req) {
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
        resolve();
      });
    });
  });
}

function removeImagem(url) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .destroy(
        url.match(/\w*\./g).pop().split('.')[0],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        },
      );
  });
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
      upload(req)
        .then(() => {
          new ProdutoModel(geraProduto(req.body))
            .save()
            .then(resultSave => resolve(resultSave))
            .catch(errModel => reject(errModel));
        })
        .catch(err => reject(err));
    });
  }

  static removeProduto(id) {
    return new Promise((resolve, reject) => {
      ProdutoModel
        .findById(id)
        .then((produto) => {
          if (!produto) {
            reject(new Error('Produto nao encontrado'));
            return;
          }
          produto.imagens.forEach((imagem) => {
            removeImagem(imagem)
              .catch(err => reject(err));
          });
          ProdutoModel.remove({ _id: id })
            .then((resultRem) => {
              resolve(resultRem);
            })
            .catch(errRem => reject(errRem));
        });
    });
  }

  static getProduto(id) {
    return ProdutoModel.findById(id);
  }
  /* eslint-disable  no-param-reassign */
  static atualizaProduto(id, req) {
    // 1- obtem por id
    // 2- remove as imagens antigas da cloud
    // 3- insere as imagens novas na cloud
    // 4- atualiza registro no banco

    return new Promise((resolve, reject) => {
      ProdutoModel
        .findById(id)
        .then((prodBanco) => {
          prodBanco.imagens.forEach((imagem) => {
            removeImagem(imagem)
              .then(() => console.log(`imagem ${imagem} removida`))
              .catch((errDel) => {
                reject(errDel);
              });
          });
          upload(req).then(() => {
            prodBanco.titulo = req.body.titulo;
            prodBanco.descricao = req.body.descricao;
            prodBanco.status = req.body.status;
            prodBanco.link = req.body.link;
            prodBanco.imagens = req.body.imagens;
            prodBanco
              .save()
              .then(() => resolve());
          }).catch((errUp) => {
            console.log(errUp);
            reject(errUp);
          });
        });
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
