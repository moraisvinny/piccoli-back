const ProdutoDAO = require('../persistencia/ProdutoDAO');

module.exports = class ProdutoService {
  static obterProdutos() {
    const produtoDAO = new ProdutoDAO('futura conexao com BD');
    return produtoDAO.obterProdutos();
  }
};
