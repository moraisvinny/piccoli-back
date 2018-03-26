const Produto = require('../models/Produto');

module.exports = class ProdutoDAO {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  get db() {
    return this.mongoClient.db('piccoli');
  }

  close() {
    this.mongoClient.close();
  }

  listarProdutos() {
    return new Promise((resolve, reject) => {
      const col = this.db.collection('produtos');
      col.find({}).toArray((err, prods) => {
        if (err) reject(err);
        resolve(prods);
      });
    });
  }

  listarProdutosAtivos() {
    return new Promise((resolve, reject) => {
      const col = this.db.collection('produtos');
      col.find({ status: 'ativo' }).toArray((err, prods) => {
        if (err) reject(err);
        resolve(prods);
      });
    });
  }
};
