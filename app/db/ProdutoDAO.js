const Produto = require('../models/Produto');

module.exports = class ProdutoDAO {
  constructor(connection) {
    this.connection = connection;
  }

  listarProdutos() {
    console.log(this.connection);
    return new Promise((resolve, reject) => {
      const produtos = [
        new Produto('Titulo 1', 'descricao1', 'link1', 'Ativo', 1, undefined, '123'),
        new Produto('Titulo 2', 'descricao2', 'link2', 'Edicao', 2, undefined, '456'),
      ];
      if (!produtos) {
        reject(new Error('sem produtos'));
      }
      resolve(produtos);
    });
  }

  listarProdutosAtivos() {
    console.log(this.connection);
    return new Promise((resolve, reject) => {
      const produtos = [new Produto('Titulo 1', 'descricao1', 'link1', 'Ativo', 1, undefined, '123')];
      if (!produtos) {
        reject(new Error('sem produtos'));
      }
      resolve(produtos);
    });
  }
};
