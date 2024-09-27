const User = require('../models/User')

async function getVisitadores(supervisorId) {
  const user = await User.findByPk(supervisorId, {
    include: {
      model: User,
      as: 'visitador'
    }
  });

  return user.visitador;
}

module.exports = getVisitadores