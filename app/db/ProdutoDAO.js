const { ObjectId } = require('mongodb');

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

  incluiProduto(produto) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('produtos')
        .insertOne(produto)
        .then((result) => {
          resolve(result.insertedId.toHexString());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getProduto(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('produtos')
        .find({ _id: new ObjectId(id) })
        .toArray((err, produto) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(produto[0]);
        });
    });
  }
};
