const mongo = require('mongodb');

let cliente = null;

module.exports = () => {
  // Connection URL
  const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const mongoClient = mongo.MongoClient;
  return new Promise((resolve, reject) => {
    if (cliente) {
      resolve(cliente);
      return;
    }
    // Use connect method to connect to the server
    mongoClient.connect(url, (err, client) => {
      if (err) {
        console.error('deu ruim! - ', err);
        reject(err);
        return;
      }
      console.log('Conexão realizada com sucesso');
      cliente = client;
      resolve(cliente);
    });
  });
};
