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
};
