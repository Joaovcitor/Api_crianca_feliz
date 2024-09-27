const PlanosDeVisita = require("../models/plain");
const { Op } = require("sequelize");
const Child = require("../models/Child");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Visitador = require("../models/Users");
const Supervisor = require("../models/Users");

async function pegarId(id) {
  const childs = await Child.findAll({ where: { VisitadorId: id } });
  const ids = childs.map((child) => child.id);
  return ids;
}

async function gerarPDF(ids, inicioMes, fimMes) {
  const PesquisainicioMes = new Date(inicioMes);
  const PesquisafimMes = new Date(fimMes);

  try {
    const planos = await PlanosDeVisita.findAll({
      where: {
        childId: ids,
        createdAt: { [Op.between]: [PesquisainicioMes, PesquisafimMes] },
      },
      include: [{ model: Child, as: "Child" }],
    });

    const filePath = path.join(__dirname, "output.pdf");
    const doc = new PDFDocument({
      size: "A4",
      layout: "portrait",
    });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    planos.forEach((plano, index) => {
      if (index > 0) {
        doc.addPage();
      }
      doc.font("./public/fonts/Roboto-Bold.ttf");
      doc.fontSize(14).text("PLANOS DE VISITAS", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(10)
        .text(
          `1. número de identificação social (NIS): ${plano.Child.nis ? plano.Child.nis : ""
          }`
        );
      doc
        .fontSize(10)
        .text(`2. Nome completo do beneficiário: ${plano.Child.name}`);
      doc
        .fontSize(10)
        .text(
          `3. Idade: ${plano.Child.born}                 4. Gestante:  Semanas`
        );
      doc.moveDown();
      doc.fontSize(10).text(`OBJETIVO (S):`);
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc.fontSize(10).text(`${plano.objetivo}`);
      doc.moveDown();
      doc.font("./public/fonts/Roboto-Bold.ttf");
      doc
        .fontSize(10)
        .text(
          `MOMENTO I - Organização e acolhimento: Criar espaço de escuta/realizar leitura do contexto familiar/identificar demandas. Retomada das atividades propostas na última visita. Apresentação da atividade: (objetivos, orientações, material utilizado e participação das famílias): \n`
        );
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc.fontSize(10).text(`${plano.etapa1}`);
      doc.moveDown();
      doc.font("./public/fonts/Roboto-Bold.ttf");
      doc
        .fontSize(10)
        .text(
          `MOMENTO II - Desenvolvimento: execução das atividades pelas famílias/gestantes/observação e mediação do visitador. \n`
        );
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc.fontSize(10).text(`${plano.etapa2}`);
      doc.moveDown();
      doc.font("./public/fonts/Roboto-Bold.ttf");
      doc
        .fontSize(10)
        .text(
          `MOMENTO FINAL - Avaliação das atividades pelas famílias: identificar progressos/dificuldades, esclarecer dúvidas e reforçar a importância dos objetivos.`
        );
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc.fontSize(10).text(`${plano.etapa3}`);
      doc.moveDown();
      doc.font("./public/fonts/Roboto-Bold.ttf");
      doc.fontSize(10).text(`OBSERVAÇÕES SOBRE A VISITA:`);
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc.fontSize(10).text(`${plano.observacao}`);
      doc.moveDown();
      doc.font("./public/fonts/Roboto-Regular.ttf");
      doc
        .fontSize(7)
        .text(
          "Esse formulário deve ser preenchido pelo visitador, com apoio do supervisor, para planejamento de cada visita domiciliar no âmbito do Programa Criança Feliz. Ao final do formulário, o visitador deve registrar os principais pontos observados durante a visita. Isso facilitará o acompahamento da família e o trabalho do supervisor. Sugere-se que esses formulários fiquem arquivados no CRAS.",
          { align: "center" }
        );
    });

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on("finish", () => resolve(filePath));
      writeStream.on("error", reject);
    });
  } catch (err) {
    console.error("Erro ao gerar o PDF:", err);
    throw err;
  }
}

async function gerarRelatorios(id) {
  const visitador = await Visitador.findAll({
    where: { CoordenadorId: id },
    include: Supervisor,
  });

  const filePath = path.join(__dirname, "output.pdf");
  const doc = new PDFDocument({
    size: "A4",
    layout: "portrait",
  });
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  doc.fontSize(20).text("Lista de Visitadores", { align: "center" });
  doc.moveDown();

  visitador.forEach((visitadores, index) => {
    if (index > 0) {
      doc.addPage();
    }
    doc.fontSize(12).text(`Nome do Visitador: ${visitadores.name}`);
    doc.moveDown();
    doc
      .fontSize(12)
      .text(`Supervisor do Visitador: ${visitadores.Supervisor.name}`);
    doc.moveDown();
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
  });
}

module.exports = { gerarPDF, pegarId, gerarRelatorios };
