module.exports = function (req, res, next) {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ errors: "Você precisa estar logado" });
  }

  next();
};
