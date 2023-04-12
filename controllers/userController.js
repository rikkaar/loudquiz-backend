const ApiError = require('../error/ApiError')
const UserService = require('../service/userSevice')


class UserController {
    async getUser(req, res, next) {
        try {
        } catch (e) {
            next(e)
        }
    }

    async createUser(req, res, next) {
        const {name} = req.params

        try {
            const result = await UserService.createUser(name)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }

    async putUserInRoom(req, res, next) {
        const {roomId, userId} = req.query
        // const {userId} = req.cookies
        try {
            const result = await UserService.putUserInRoom(userId, roomId)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()