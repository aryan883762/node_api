const UserModel = require("./user/user.model")
const AuthService = require("./auth/auth.service")
const UserService = require("./user/user.service")
module.exports = {
    authService: new AuthService(UserModel),
    userService: new UserService(UserModel)
}