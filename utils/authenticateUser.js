const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticateUser = async (model, req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.findOne({
      where: { email },
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({
        errors: "Usuário não encontrado, verifique suas crendenciais!",
      });
    }

    if (user.role === "visitador" && user.isPending) {
      return res
        .status(401)
        .json({ errors: "Sua conta se encontra pendente! Aguarde." });
    }

    if (user.role === "visitador" && !user.isActive) {
      return res
        .status(401)
        .json({ errors: "Sua conta se encontra inativa! Aguarde." });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ errors: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.role },
      process.env.SECRET_JWT,
      { expiresIn: "8h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    return res.status(200).json({
      token,
      user: { name: user.name, email, role: user.role, id: user.id },
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res
      .status(500)
      .json({ errors: "Ocorreu um erro ao autenticar o usuário." });
  }
};

module.exports = authenticateUser;
