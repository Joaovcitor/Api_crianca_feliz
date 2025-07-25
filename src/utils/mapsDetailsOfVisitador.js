const calcularIdade = require("./index");
const PlanosDeVisita = require("../models/plain");
const { Op } = require("sequelize");

async function mapChildrens(Model, visitadorId, VisitadorModel, CaregiverModel) {
  const children = await Model.findAll({
    where: { VisitadorId: visitadorId.id },
    include: [{ model: VisitadorModel, as: "visitador" }, { model: CaregiverModel, as: "Caregiver" }],
  });

  const mappedChildren = children.map((child) => {
    const idade = calcularIdade(child.born);
    const idadeString = `${idade.years} ano(s), ${idade.months} meses e ${idade.days} dia(s)`;
    return {
      id: child.id,
      name: child.name,
      born: new Date(child.born).toLocaleDateString("pt-BR"),
      idade: idadeString,
    };
  });
  return mappedChildren;
}

async function mapPlanos(planos) {
  const dataFormatadaDosPlanos = await planos.map((plano) => {
    return {
      ...plano.dataValues,
      dateOfPlains: plano.createdAt.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      visita_realizada: plano.dia_de_visita_realizado
        ? plano.dia_de_visita_realizado.toLocaleString("pt-BR", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        : "Visita não realizada",
    };
  });

  return dataFormatadaDosPlanos;
}

async function mapPesquisa(id, inicioMes, fimMes, Model) {
  const PesquisainicioMes = new Date(inicioMes);
  const PesquisafimMes = new Date(fimMes);

  return await Model.findAll({
    where: {
      visitadorId: id,
      createdAt: { [Op.between]: [PesquisainicioMes, PesquisafimMes] },
    },
  });
}

async function mapVisitasFeitas(id, inicioMes, fimMes, Model) {
  const PesquisainicioMes = new Date(inicioMes);
  const PesquisafimMes = new Date(fimMes);

  return await Model.findAll({
    where: {
      visitadorId: id,
      createdAt: { [Op.between]: [PesquisainicioMes, PesquisafimMes] },
      visita_marcada_finalizada: true
    },
  });
}

async function mapVisitasPendentesDeSeremFinalizadas(id, inicioMes, fimMes, Model) {
  const PesquisainicioMes = new Date(inicioMes);
  const PesquisafimMes = new Date(fimMes);

  return await Model.findAll({
    where: {
      visitadorId: id,
      createdAt: { [Op.between]: [PesquisainicioMes, PesquisafimMes] },
      visita_marcada_finalizada: false
    },
  });
}

async function mapCaregivers(caregivers) {
  const map = await caregivers.map((caregiver) => {
    return {
      idade: calcularIdade(caregiver.born),
      born: new Date(caregiver.born).toLocaleDateString("pt-BR"),
      pregnantList: caregiver.pregnant ? [caregiver] : [],
    };
  });

  return map;
}

module.exports = { mapChildrens, mapPlanos, mapPesquisa, mapCaregivers, mapVisitasFeitas, mapVisitasPendentesDeSeremFinalizadas };
