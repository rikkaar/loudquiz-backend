const ApiError = require("../error/ApiError");
const tokenService = require('../service/tokenService')


module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        let token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return next(ApiError.unauthorized("UserUnAuthorized", "Пользователь не авторизован"))
        }
        req.user = tokenService.validateAccessToken(token)
        next()
    } catch (e) {
        return next(ApiError.unauthorized("UserUnAuthorized", "Пользователь не авторизован"))
    }
}