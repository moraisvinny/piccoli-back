module.exports = class Produto {
  constructor(titulo, descricao, link, status, imagens) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.link = link;
    this.imagens = imagens;
  }
};
