const checkUserType = (allowedUserTypes) => {
  return (req, res, next) => {
    const userType = req.session.userRole;
    const user = req.session.userId;

    if (!allowedUserTypes.includes(userType)) {
      if (user) {
        res.status(403).json({ errors: 'Você não tem permissão para acessar esta página!' });
        return;
      } else {
        res.status(403).json({ errors: 'Você não tem permissão para acessar esta página!' });
        return;
      }
    }
    next();
  };
};

module.exports = checkUserType;