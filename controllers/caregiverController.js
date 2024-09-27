const Caregiver = require("../models/Caregiver");

module.exports = class CaregiverController {
  static async Store(req, res) {
    try {
      const caregiverCreate = {
        name: req.body.name,
        cpf: req.body.cpf,
        rg: req.body.rg,
        address: req.body.address,
        district: req.body.district,
        contact: req.body.contact,
        pregnant: req.body.pregnant === "on" ? 1 : 0,
        born: req.body.born,
        visitadorId: req.session.userId,
        week_pregnant: req.body.week_pregnant,
      };

      if (
        !caregiverCreate.name &&
        !caregiverCreate.cpf &&
        !caregiverCreate.address &&
        !caregiverCreate.contact
      ) {
        return res
          .status(400)
          .json({ errors: "Nome, CPF, Endereço e Contato são obrigatórios" });
      }

      const cuidador = await Caregiver.create(caregiverCreate);
      res.status(200).json({ success: "Cuidador criado com sucesso!", id: cuidador.id })
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal: "Ocorreu um erro ao criar um cuidador! Tente novamente.",
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.body.id;

      await Caregiver.destroy({ where: { id } });

      res
        .status(200)
        .json({ sucess: "Cuidador deletado com sucesso!" });
    } catch (e) {
      console.log(`o erro foi: ${e}`);
      res.status(500).json({
        errors:
          "Ocorreu um erro inesperado ao deletar cuidador! Tente novamente.",
      });
    }
  }

  static async index(req, res) {
    const id = req.session.userId;

    try {
      const cuidadores = await Caregiver.findAll({
        where: { visitadorId: id },
        attributes: ["id", "name", "address", "district", "contact"],
      });

      res.status(200).json({ cuidadores });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro ao procurar seus cuidadores! Tente novamente,",
      });
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    try {
      const cuidador = await Caregiver.findOne({ where: { id: id } });
      if (!cuidador) {
        return res.status(404).json({ error: "Cuidador não encontrado" });
      }
      res.status(200).json({ cuidador });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errors: "Ocorreu um erro ao buscar informações do cuidador",
      });
    }
  }

  static async update(req, res) {
    const { address, district, contact } = req.body
    const id = req.params.id;

    try {
      const cuidador = {
        address: address.trim(),
        district: district.trim(),
        contact: contact.trim(),
      };

      await Caregiver.update(cuidador, { where: { id: id } });

      res
        .status(200)
        .json({ sucess: "Cuidador editado com sucesso!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ errors: "Ocorreu um erro ao editar o cuidador" });
    }
  }
};
