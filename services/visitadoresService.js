const Users = require("../models/Users");
async function validarVisitador(session, req, res) {
  const visitadores = await Users.findAll({
    where: { coordenadorId: session, isPending: true },
  });

  if (!visitadores) {
    return res.status(401).json({
      errors: "Ocorreu um erro ao buscar seus visitadores pendentens!",
    });
  }
}
