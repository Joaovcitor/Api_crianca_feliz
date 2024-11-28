const Caregiver = require("../models/Caregiver");
const Child = require("../models/Child");
const Usuario = require("../models/Users");

module.exports = class FamiliaController {
  static async show(req, res) {
    try {
      const VisitadorId = req.user.userId;

      const children = await Child.findAll({
        where: {
          visitadorId: VisitadorId,
        },
        include: [
          {
            model: Usuario,
            as: "visitador",
          },
        ],
      });

      const caregivers = await Caregiver.findAll({
        where: {
          visitadorId: VisitadorId,
        },
        include: [
          {
            model: Usuario,
            as: "visitador",
          },
        ],
      });

      const gravidas = await Caregiver.findAll({
        where: {
          visitadorId: VisitadorId,
          pregnant: true,
        },
        include: [
          {
            model: Usuario,
            as: "visitador",
          },
        ],
      });

      res.status(200).json({ children, caregivers, gravidas });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro desconhecido! Tente novamente.",
      });
    }
  }
};
