const ProdutoDAO = require('../db/ProdutoDAO');
const clientFactory = require('../db/connectionFactory');

module.exports = class ProdutoService {
  static listarProdutos() {
    return clientFactory()
      .then((client) => {
        const produtoDAO = new ProdutoDAO(client);
        return produtoDAO.listarProdutos();
      });
  }

  static listarProdutosAtivos() {
    return clientFactory()
      .then((client) => {
        const produtoDAO = new ProdutoDAO(client);
        return produtoDAO.listarProdutosAtivos();
      });
  }
};
