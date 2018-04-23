const app = require('./config/server');
const http = require('http');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor Online - Porta: ${PORT}`);
});

setInterval(() => http.get('https://piccoli-vestiti.herokuapp.com/'), 1800000);
