const Users = require("../models/Users");

module.exports = class HomeController {
  static async home(req, res) {
    try {
      const id = req.user.userId;

      if (!id) {
        return res
          .status(401)
          .json({ errors: "Ocorreu um erro ao buscar suas informações!" });
      }

      const user = await Users.findOne({ where: { id: id } });
      res.status(200).json({ user });
    } catch (e) {
      console.log("Erro no controlador home:", e);
      return res
        .status(500)
        .json({ errors: "Ocorreu um erro desconhecido. Tente novamente!" });
    }
  }
};
