const checkUserType = (allowedUserTypes) => {
  return (req, res, next) => {
    const { userType } = req.user.id;

    if (!allowedUserTypes.includes(userType)) {
      return res.status(403).json({
        errors: "Você não tem permissão para acessar esta página!",
      });
    }

    next();
  };
};

module.exports = checkUserType;
