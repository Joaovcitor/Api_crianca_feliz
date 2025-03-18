const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticateUser = async (model, req, res) => {
  try {
    const { email, password } = req.body;

    const user = await model.findOne({
      where: { email },
      attributes: ["role", "password", "isPending", "isActive", "id"],
    });

    if (!user) {
      return res.status(400).json({
        errors: "Usuário não encontrado, verifique suas credenciais!",
      });
    }

    // if (user.role === "visitador") {
    //   if (user.isPending) {
    //     return res
    //       .status(401)
    //       .json({ errors: "Sua conta está pendente! Aguarde." });
    //   }
    //   if (!user.isActive) {
    //     return res
    //       .status(401)
    //       .json({ errors: "Sua conta está inativa! Aguarde." });
    //   }
    // }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ errors: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.role },
      process.env.SECRET_JWT,
      { expiresIn: "8h" }
    );

    // Configurando o cookie com o token JWT
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Buscando mais informações do usuário
    const { name, email: userEmail } = await model.findOne({
      where: { id: user.id },
      attributes: ["name", "email"],
    });

    // Retornando os dados do usuário e o token
    return res.status(200).json({
      token,
      user: { name, email: userEmail, role: user.role, id: user.id },
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res
      .status(500)
      .json({ errors: "Ocorreu um erro ao autenticar o usuário." });
  }
};

module.exports = authenticateUser;
