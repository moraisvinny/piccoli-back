module.exports = class Produto {
  constructor(titulo, descricao, link, status, id, files, imagens) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.link = link;
    this.id = id;
    this.files = files;
    this.imagens = imagens;
  }
};
