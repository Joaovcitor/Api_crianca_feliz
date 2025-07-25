const Users = require("../models/Users");
const Caregiver = require("../models/Caregiver");
const Child = require("../models/Child");
const Visitador = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports = class SupervisorController {
  static async index(req, res) {
    const id = req.user.userId;

    try {
      const supervisores = await Users.findAll({
        where: { coordenadorId: id, role: "supervisor" },
      });
      if (supervisores.length === 0) {
        return res
          .status(400)
          .json({ errors: "Você não possui supervisores!" });
      }

      res.status(200).json({ supervisores });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const supervisores = await Users.findOne({
        where: { id: id, role: "supervisor" },
      });
      if (supervisores.length === 0) {
        return res
          .status(400)
          .json({ errors: "Você não possui supervisores!" });
      }

      res.status(200).json({ supervisores });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  static async store(req, res) {
    const id = req.user.userId;
    const { name, password, email, cpf, confirmepassword } = req.body;

    if (password !== confirmepassword) {
      return res.status(401).json({ errors: "Senhas não iguais!" });
    }

    if (!name && !password && !email && !cpf) {
      return res.status(401).json({ errors: "Preencha todos os campos!" });
    }

    const checkUserExist = await Users.findOne({ where: { cpf, email } });

    if (checkUserExist) {
      return res.status(401).json({ errors: "Usuário já existe no sistema" });
    }

    const salt = bcrypt.genSaltSync(15);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const supervisor = {
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      cpf: req.body.cpf,
      role: "supervisor",
      coordenadorId: id,
      territorio: "",
    };
    try {
      const supervisorCriado = await Users.create(supervisor);

      req.user.userId = supervisorCriado.id;

      res.status(200).json({ success: "supervisor criado com sucesso!" });
    } catch (e) {
      console.log(e);
    }
  }

  static async showBeneficiarios(req, res) {
    const id = req.user.userId;
    const visitadores = await Visitador.findAll({
      where: { SupervisorId: id },
    });

    const visitadoresId = visitadores.map((visitador) => visitador.id);
    const caregivers = await Caregiver.findAll({
      where: { VisitadorId: visitadoresId },
    });
    const caregiverId = caregivers.map((caregiver) => caregiver.id);

    const childrens = await Child.findAll({
      where: {
        VisitadorId: visitadoresId,
        CaregiverId: caregiverId,
        isPending: true,
      },
      include: [
        {
          model: Visitador,
          as: "visitador",
          attributes: ["name"],
        },
        {
          model: Caregiver,
          as: "Caregiver",
          attributes: ["name", "cpf", "rg", "address", "contact", "district"],
        },
      ],
    });
    res.status(200).json({ childrens });
  }

  static async postBeneficiariosValidar(req, res) {
    const { id } = req.body;
    try {
      await Child.update({ isPending: false }, { where: { id } });
      res.status(200).json({ success: "Beneficiário validado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao validar o beneficiário!",
      });
    }
  }
};
