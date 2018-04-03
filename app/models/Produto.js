/* eslint-disable  no-underscore-dangle */
module.exports = class Produto {
  constructor(titulo, descricao, link, status, imagens, id) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.link = link;
    this.imagens = imagens;
    this._id = id;
  }
};
