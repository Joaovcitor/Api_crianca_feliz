const Users = require("../models/Users")
const authenticateUser = require('../utils/authenticateUser')

module.exports = class AuthController {
  static async loginPost(req, res) {
    await authenticateUser(Users, req, res)
  }
  
  static async logout(req, res) {
    req.session.destroy();
    res.status(200).json({success: "Logout feito com sucesso"})
  }
}