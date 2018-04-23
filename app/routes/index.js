const clients = require('restify-clients');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const retorno = 'Bem vindo a API de Piccoli Vestiti';
    res.format({
      json: () => {
        res.json({
          msg: retorno,
          links: [{
            href: '/produtos',
            rel: 'produtos',
            method: 'GET',
          },
          {
            href: '/usuarios',
            rel: 'usuarios',
            method: 'GET',
          }],
        });
      },
    });
  });

  app.post('/captcha', (req, res) => {
    const client = clients.createJsonClient({
      url: 'https://www.google.com',
    });

    const secret = '6Lf0E0oUAAAAAOlAIN9sTNF9hyVGpG2cPYG7SLi6';

    const url = `/recaptcha/api/siteverify?secret=${secret}&response=${req.body.captchaResponse}`;
    console.log(req.body);
    client.get(url, (err, reqPost, resPost, obj) => {
      res.send(obj);
    });
  });
};
