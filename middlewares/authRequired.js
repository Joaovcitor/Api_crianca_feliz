module.exports = function(req, res, next) {
  const userId = req.session.userId;

  if(!userId) {
    return res.status(401).json({errors: "Você precisa estar logado"})
  }

  next();
}