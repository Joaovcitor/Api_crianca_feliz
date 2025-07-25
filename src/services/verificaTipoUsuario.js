const Users = require("../models/Users");

async function verificarTipo(session, req, res) {
  session = req.user.id;
  const user = await Users.findOne({ where: { id: session } });

  if (user.role === "visitador") {
    return;
  }
}
