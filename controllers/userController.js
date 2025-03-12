const Users = require("../models/Users");

module.exports = class UsersController {
  // método feito unicamente para coordenadores
  static async showAllUsersWithRoleVisitador(req, res) {
    try {
      const visitadores = await Users.findOne({ where: { role: "visitador" } });
      res.status(200).json({ visitadores });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido ao buscar os dados" });
    }
  }

  // método feito unicamente para coordenadores
  static async validatePendingUserWithRoleVisitador(req, res) {
    const { id } = req.body;
    const coordenadorId = req.user.userId;
    try {
      await Users.update(
        { isPending: false, coordenadorId: coordenadorId },
        { where: { id: id } }
      );

      res.status(200).json({ message: "Visitador validado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao validar seu visitador",
      });
    }
  }

  // método feito unicamente para coordenadores
  static async showAllUsersWithRoleVisitadorThatAtributeIsPending(req, res) {
    try {
      const users = await Users.findAll({
        where: { isPending: true, role: "visitador" },
      });
      if (!users) return;
      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar os visitadores!",
      });
    }
  }

  // método feito unicamente para coordenadores
  static async disableUserAccount(req, res) {
    const { id } = req.body;
    try {
      await Users.update({ isActive: false }, { where: { id: id } });
      res.status(200).json({ message: "Usuário desativado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  // método feito unicamente para coordenadores
  static async show(req, res) {
    try {
      const users = await Users.findAll();
      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao buscar os usuários!",
      });
    }
  }
};
