const Child = require("../models/Child");
const calcularIdade = require("../utils/index");
const Etapa1 = require("../models/Form5_0a3m");

module.exports = class FormulariosController {
  static async renderForms(req, res) {
    res.render("forms");
  }

  static async showFormulario5(req, res) {
    const { id } = req.params;
    const VisitadorId = req.session.userId;
    console.log(`id da criança ${id}`);
    const child = await Child.findOne({
      where: { id: id, VisitadorId: VisitadorId },
    });
    const idade = calcularIdade(child.born);
    const meses = idade.months;
    const anos = idade.years;

    // if (anos === 1 && meses <= 6) {
    //   return res.render("formularios5/etapa5", { child });
    // } else if (anos === 1 && meses <= 11 && anos <= 2) {
    //   return res.render("formularios5/etapa6", { child });
    // } else if (anos === 2 || anos === 3) {
    //   return res.render("formularios5/etapa7", { child });
    // }

    if (meses <= 3) {
      return res.render("formularios5/etapa1", { child });
    } else if (meses <= 6 || meses <= 3) {
      return res.render("formularios5/etapa2", { child });
    } else if (meses >= 6 && meses <= 9) {
      return res.render("formularios5/etapa3", { child });
    } else if (meses >= 9 && meses <= 12) {
      return res.render("formularios5/etapa4", { child });
    }
  }

  static async showFormulario7(req, res) {
    const { id } = req.params;
    const VisitadorId = req.session.userId;
    const child = await Child.findOne({
      where: { id: id, VisitadorId: VisitadorId },
    });
    const idade = calcularIdade(child.born);
    const meses = idade.months;
    const anos = idade.years;

    if (anos === 1 && meses <= 6) {
      return res.render("formularios7/etapa5", { child });
    } else if (anos === 1 && meses <= 11 && anos <= 2) {
      return res.render("formularios7/etapa6", { child });
    } else if (anos === 2 || anos === 3) {
      return res.render("formularios7/etapa7", { child });
    }

    if (meses <= 3) {
      return res.render("formularios7/etapa1", { child });
    } else if (meses <= 6 || meses <= 3) {
      return res.render("formularios7/etapa2", { child });
    } else if (meses >= 6 && meses <= 9) {
      return res.render("formularios7/etapa3", { child });
    } else if (meses >= 9 && meses <= 12) {
      return res.render("formularios7/etapa4", { child });
    }
  }
};
