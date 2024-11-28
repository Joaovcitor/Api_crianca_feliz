const { gerarPDF, pegarId, gerarRelatorios } = require("../utils/generatePdf");
const fs = require("fs");

module.exports = class pdfController {
  static async storePdfPlanos(req, res) {
    try {
      const { id } = req.body;

      const inicioMes = req.query.inicioMes;
      const fimMes = req.query.fimMes;

      const inicioMesFormatado = new Date(inicioMes);
      const fimMesFormatado = new Date(fimMes);

      const ids = await pegarId(id);
      const filePath = await gerarPDF(ids, inicioMesFormatado, fimMesFormatado);

      res.download(filePath, "planos.pdf", (err) => {
        if (err) {
          console.error("Erro ao enviar o arquivo:", err);
          res.status(500).json({ error: "Erro ao enviar o PDF" });
        } else {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Erro ao deletar o arquivo:", unlinkErr);
            }
          });
        }
      });
    } catch (err) {
      console.error("Erro ao gerar o PDF:", err);
      res.status(500).json({ error: "Erro ao gerar o PDF" });
    }
  }

  static async storeRelatorioGeral(req, res) {
    try {
      const id = req.user.userId;
      const filePath = await gerarPDF(id, req);

      res.download(filePath, "visitadores_qtd.pdf", (err) => {
        if (err) {
          console.error("Erro ao enviar o arquivo:", err);
          res.status(500).json({ error: "Erro ao enviar o PDF" });
        } else {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Erro ao deletar o arquivo:", unlinkErr);
            }
          });
        }
      });
    } catch (err) {
      console.error("Erro ao gerar o PDF:", err);
      res.status(500).json({ error: "Erro ao gerar o PDF" });
    }
  }
};
