const axios = require("axios");
const { request } = require("express");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");
const iso88592 = require("iso-8859-2");
class FundamentusService {
  async dadosAtivo(req, res, next) {
    const sigla = req.body.sigla;

    await axios
      .request({
        method: "GET",
        url: `https://www.fundamentus.com.br/detalhes.php?papel=${sigla}`,
        responseType: "arraybuffer",
        responseEncoding: "binary",
      })
      .then(function (response) {
        if (response.status === 200) {
          let html = iso88592.decode(response.data.toString("binary"));

          const $ = cheerio.load(html, { decodeEntities: true });

          const tables = $(".w728");

          //Dados do Ativo
          const ativo = {};
          const table_ativo = $(tables[0]).find("tr");
          table_ativo.map((i, data) => {
            let item = $(data).find("span.txt");

            let coluna = "";
            item.map((i, span) => {
              let x = $(span).text();

              if (i === 0 || i === 2) {
                coluna = x;
              } else {
                ativo[coluna] = x;
              }
            });
          });
          return res.status(200).json(ativo)
        }
      });
      
  }


}

module.exports = new FundamentusService();
