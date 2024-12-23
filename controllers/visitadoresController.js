const Users = require("../models/Users");
const { editarInformacoesUsuarios } = require("../utils/editUser");
const { hashPassword } = require("../services/users/senha");
const {
  procurarUsuarioNoBancoDeDados,
} = require("../services/users/procurarUsuarios");

module.exports = class VisitadoresController {
  // esse método é usado apenas pelos coordenadores
  static async showVisitadorPendente(req, res) {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({ errors: "ID é necessário!" });
    }
    try {
      const visitadorPendente = await Users.findAll({
        where: { supervisorId: id, isPending: true, role: "visitador" },
        include: [
          {
            model: Users,
            as: "supervisores",
          },
        ],
      });
      if (!visitadorPendente) {
        return res
          .status(404)
          .json({ errors: "Você não possui visitadores pendentes!" });
      }

      res.status(200).json({ visitadorPendente });
    } catch (e) {
      console.log(e);
      res.status(500).json({ errors: "Ocorreu um erro desconhecido!" });
    }
  }

  static async validarVisitador(req, res) {
    const session = req.user.userId;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ errors: "ID faltando" });
    }

    try {
      await Users.update(
        { isPending: false, coordenadorId: session },
        { where: { id: id } }
      );
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          errors: "Ocorreu um erro desconhecido ao validar o visitador!",
        });
    }
  }

  static async show(req, res) {
    const id = req.user.userId;
    try {
      const user = await Users.findOne({
        where: id,
        attributes: ["name", "id", "email", "password", "role"],
      });
      if (!user) {
        return res
          .status(404)
          .json({ notFoundUser: "Não foi encontrado nenhum usuário!" });
      }

      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao carregar suas informações! Recarregue a página.",
      });
    }
  }

  static async store(req, res) {
    const SupervisorId = req.user.userId;
    const { name, email, cpf: numCpf, password, territorio, cras } = req.body;

    const verificarUsuario = await procurarUsuarioNoBancoDeDados(email, numCpf);

    if (!verificarUsuario) {
      return res.status(400).json({ errors: verificarUsuario.msg });
    }

    const limiteDeVisitadores = await Users.count({
      where: { role: "visitador", supervisorId: SupervisorId },
    });

    if (limiteDeVisitadores > 10) {
      return res
        .status(401)
        .json({ errors: "Você já possui 10 visitadores no sistema!" });
    }

    const hashedPassword = await hashPassword(password);

    const Criarvisitador = {
      name: name,
      email: email,
      cpf: numCpf,
      password: hashedPassword,
      territorio: territorio,
      cras: cras,
      supervisorId: SupervisorId,
      isActive: true,
      role: "visitador",
    };

    try {
      const visitadorCriado = await Users.create(Criarvisitador);

      req.user.userId = visitadorCriado.id;

      res.status(200).json({ success: "Visitador criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro interno ao cadastrar visitador. Tente novamente",
      });
    }
  }

  static async index(req, res) {
    const session = req.user.userId;
    try {
      const visitadores = await Users.findAll({
        where: { supervisorId: session },
      });

      if (!visitadores) {
        return res
          .status(400)
          .json({ errors: "Ocorreu um erro ao procurar seus visitadores!" });
      }

      res.status(200).json({ visitadores });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errorInternal:
          "Ocorreu um erro ao procurar seus visitadores na base de dados!",
      });
    }
  }

  static async editPost(req, res) {
    await editarInformacoesUsuarios(Users, req, res);
  }
};
