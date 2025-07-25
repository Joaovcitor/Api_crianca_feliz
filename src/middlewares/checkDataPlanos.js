module.exports = function checkData(req, res, next) {
  const {
    etapa1,
    etapa2,
    etapa3,
    objetivo,
    dia_a_ser_realizada_a_visita,
    grau_de_dificuldade_objetivo,
  } = req.body;

  if (
    !objetivo ||
    !etapa1 ||
    !etapa2 ||
    !etapa3 ||
    !dia_a_ser_realizada_a_visita ||
    !grau_de_dificuldade_objetivo
  ) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  next();
};
