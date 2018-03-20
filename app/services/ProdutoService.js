const ProdutoDAO = require('../db/ProdutoDAO');

module.exports = class ProdutoService {
  static listarProdutos() {
    const produtoDAO = new ProdutoDAO('futura conexao com BD - listarProdutos');
    return produtoDAO.listarProdutos();
  }

  static listarProdutosAtivos() {
    const produtoDAO = new ProdutoDAO('futura conexao com BD - listarProdutosAtivos');
    return produtoDAO.listarProdutosAtivos();
  }
};
