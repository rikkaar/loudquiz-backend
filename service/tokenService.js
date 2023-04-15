const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");

class TokenService {
    generateAccessToken(payload) {
        return  jwt.sign(payload, process.env.JWT_ACCESS_KEY)
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)
        } catch (e) {
            throw ApiError.unauthorized("invalidToken", "Access token не прошел проверку")
        }
    }
}

module.exports = new TokenService()
