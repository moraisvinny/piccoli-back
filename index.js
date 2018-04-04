const app = require('./config/server');

const PORT = process.env.PORT || 5000;

const MONGOLAB_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
  console.log(`Servidor Online - Porta: ${PORT} - Mongo URI: ${MONGOLAB_URI}`);
});
